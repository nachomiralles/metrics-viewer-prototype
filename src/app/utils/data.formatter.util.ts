import { UserReport } from '../model/user.report';
import { DayReport } from '../model/day.report';
import * as _ from 'underscore';
import * as moment from 'moment';
const days = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sabado',
  0: 'Domingo'
};

export class DataFormatterUtil {
  public static createMetricData(allData): UserReport[] {
    const structuredData: UserReport[] = [];

    // COSA MALIGNA, ESTOY MODIFICANDO LOS DATOS PARA QUE LAS FECHAS SEAN COMPARABLES
    _.each(allData, function (line) {
      line['max_time'] = moment(line['max_time']).startOf('day').format('LLLL');
    });

    // EXTRAIGO NOMBRES DE USUARIO ÚNICOS
    const distinctUserNames = _.uniq(_.pluck(allData, 'user'));
    // const that = this;
    // PARA CADA NOMBRE DE USUARIO CREO UNA LISTA DE DATOS
    _.each(distinctUserNames, function (name) {

      const newUser: UserReport = new UserReport();
      newUser.user = name;
      newUser.informeDiario = [];
      const userData = _.filter(allData, function (line) {
        return line['user'] === name;
      });

      // EXTRAIGO FECHAS DISTINTAS
      const distinctDates = _.uniq(_.pluck(userData, 'max_time'));
      newUser.diasTotalesRegistrados = distinctDates.length;
      // PARA CADA FECHA CREO UNA LISTA DE DATOS
      _.each(distinctDates, function (date) {
        const newDay: DayReport = new DayReport();
        newDay.fecha = moment(date).format('DD/MM/YYYY');
        newDay.diaSemana = days[moment(date).day()];

        const dateData = _.filter(userData, function (line) {
          return line['max_time'] === date;
        });
        let totalTime = 0;
        let totalTimeInside = 0;
        let totalTimeOutside = 0;
        let totalTimeMorning = 0;
        let totalTimeAfternoon = 0;
        let totalTimeNight = 0;
        let timeInsideMorning = 0;
        let timeInsideAfternoon = 0;
        let timeInsideNight = 0;
        let timeOutsideMorning = 0;
        let timeOutsideAfternoon = 0;
        let timeOutsideNight = 0;

        let totalNumberOfTimesInside = 0;
        let totalNumberOfTimesOutside = 0;
        let numberOfTimesInsideMorning = 0;
        let numberOfTimesInsideAfternoon = 0;
        let numberOfTimesInsideNight = 0;
        let numberOfTimesOutsideMorning = 0;
        let numberOfTimesOutsideAfternoon = 0;
        let numberOfTimesOutsideNight = 0;

        _.each(dateData, function (line) {
          totalTime += line['timeInside'] + line['timeOutside'];
          totalTimeInside += line['timeInside'];
          totalTimeOutside += line['timeOutside'];
          totalNumberOfTimesInside += line['countEntering'];
          totalNumberOfTimesOutside += line['countExiting'];

          if (line['batch'] === 'morning') {
            totalTimeMorning += line['timeInside'] + line['timeOutside'];
            timeInsideMorning += line['timeInside'];
            timeOutsideMorning += line['timeOutside'];
            numberOfTimesInsideMorning += line['countEntering'];
            numberOfTimesOutsideMorning += line['countExiting'];
          } else if (line['batch'] === 'afternoon') {
            totalTimeAfternoon += line['timeInside'] + line['timeOutside'];
            timeInsideAfternoon += line['timeInside'];
            timeOutsideAfternoon += line['timeOutside'];
            numberOfTimesInsideAfternoon += line['countEntering'];
            numberOfTimesOutsideAfternoon += line['countExiting'];
          } else if (line['batch'] === 'night') {
            totalTimeNight += line['timeInside'] + line['timeOutside'];
            timeInsideNight += line['timeInside'];
            timeOutsideNight += line['timeOutside'];
            numberOfTimesInsideNight += line['countEntering'];
            numberOfTimesOutsideNight += line['countExiting'];
          }
        });

        newDay.tiempoRegistradoTotal = _toMinutes(totalTime);
        newDay.tiempoCasaTotal = _toMinutes(totalTimeInside);
        newDay.tiempoFueraTotal = _toMinutes(totalTimeOutside);
        newDay.tiempoCasaManyana = _toMinutes(timeInsideMorning);
        newDay.tiempoCasaTarde = _toMinutes(timeInsideAfternoon);
        newDay.tiempoCasaNoche = _toMinutes(timeInsideNight);
        newDay.tiempoFueraManyana = _toMinutes(timeOutsideMorning);
        newDay.tiempoFueraTarde = _toMinutes(timeOutsideAfternoon);
        newDay.tiempoFueraNoche = _toMinutes(timeOutsideNight);
        newDay.tiempoRegistradoManyana = _toMinutes(totalTimeMorning);
        newDay.tiempoRegistradoTarde = _toMinutes(totalTimeAfternoon);
        newDay.tiempoRegistradoNoche = _toMinutes(totalTimeNight);

        newDay.vecesCasaTotal = totalNumberOfTimesInside;
        newDay.vecesFueraTotal = totalNumberOfTimesOutside;
        newDay.vecesCasaManyana = numberOfTimesInsideMorning;
        newDay.vecesCasaTarde = numberOfTimesInsideAfternoon;
        newDay.vecesCasaNoche = numberOfTimesInsideNight;
        newDay.vecesFueraManyana = numberOfTimesOutsideMorning;
        newDay.vecesFueraTarde = numberOfTimesOutsideAfternoon;
        newDay.vecesFueraNoche = numberOfTimesOutsideNight;


        newUser.informeDiario.push(newDay);
      });
      structuredData.push(newUser);

      function _toMinutes(seconds: number): string {
        const hours = Math.trunc((seconds / 60) / 60);
        const minutes = Math.trunc((seconds / 60) % 60);
        return hours.toString() + 'h ' + minutes.toString() + 'm.';
      }

    });
    return structuredData;
  }


  public static exportToCSV(userDataObject: UserReport[]) {
    const arrayToreturn = [];
    const header = [];
    header.push('ID');
    header.push('DiaTotalRegistro');

    function getMaximum(data: UserReport[]): number {
      let candidate = 0;
      _.each(data, function (user) {
        if (user.informeDiario.length > candidate) {
          candidate = user.informeDiario.length;
        }

      });
      return candidate;
    }
    const max = getMaximum(userDataObject);


    for (let i = 1; i <= max; i++) {
      console.log(i);
      header.push('Fecha' + i.toString());
      header.push('Dsemanafecha' + i.toString());
      header.push('Tiempo_registrado' + i.toString());
      header.push('Horas_manyana' + i.toString());
      header.push('Horas_tarde' + i.toString());
      header.push('Horas_noche' + i.toString());
      header.push('Tiempo_casa_in' + i.toString());
      header.push('Tiempo_casa_out' + i.toString());
      header.push('Tiempo_out_manyana' + i.toString());
      header.push('Tiempo_out_tarde' + i.toString());
      header.push('Tiempo_out_noche' + i.toString());
      header.push('num_veces_out' + i.toString());
      header.push('num_veces_out_manyana' + i.toString());
      header.push('num_veces_out_tarde' + i.toString());
      header.push('num_veces_out_noche' + i.toString());
    }
    arrayToreturn.push(header);


    _.each(userDataObject, function (user) {
      const newLine = [];
      newLine.push(user.user);
      newLine.push(user.diasTotalesRegistrados.toString());
      // let i = = 1 ;
      _.each(user.informeDiario, function (day) {
        newLine.push(day.fecha);
        newLine.push(day.diaSemana);
        newLine.push(day.tiempoRegistradoTotal);
        newLine.push(day.tiempoRegistradoManyana);
        newLine.push(day.tiempoRegistradoTarde);
        newLine.push(day.tiempoRegistradoNoche);
        newLine.push(day.tiempoCasaTotal);
        newLine.push(day.tiempoFueraTotal);
        newLine.push(day.tiempoFueraManyana);
        newLine.push(day.tiempoFueraTarde);
        newLine.push(day.tiempoFueraNoche);
        newLine.push(day.vecesFueraTotal);
        newLine.push(day.vecesFueraManyana);
        newLine.push(day.vecesFueraTarde);
        newLine.push(day.vecesFueraNoche);
        // newLine.push(day.vecesFueraTotal);
      });
      arrayToreturn.push(newLine);
    });


    function createCSV(d): string {
      let csvContent = 'data:text/csv;charset=utf-8,';
      // let csvContent = '';
      d.forEach(function (infoArray, index) {

        const dataString = infoArray.join(';');
        csvContent += index < d.length ? dataString + '\n' : dataString;

      });
      return csvContent;
    }

    return createCSV(arrayToreturn);
  }
}
