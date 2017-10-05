import {Component, OnInit} from '@angular/core';
import { UserReport } from '../model/user.report';
import { DayReport } from '../model/day.report';
import * as _ from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'app-metricsresult',
  templateUrl: './metricsresult.component.html',
  styleUrls: ['./metricsresult.component.css']
})
export class MetricsresultComponent implements OnInit {

  structuredData: UserReport[] = [];
  dataReceived = false;

  constructor() { }

  ngOnInit() {
  }


  prepareData(allData) {

    console.log(allData);
    // COSA MALIGNA, ESTOY MODIFICANDO LOS DATOS PARA QUE LAS FECHAS SEAN COMPARABLES
    _.each(allData, function(line){
      line['max_time'] = moment(line['max_time']).startOf('day').format('LLLL');
    });

    // EXTRAIGO NOMBRES DE USUARIO ÚNICOS
    const distinctUserNames =  _.uniq(_.pluck(allData, 'user'));
    const that = this;
    // PARA CADA NOMBRE DE USUARIO CREO UNA LISTA DE DATOS
    _.each(distinctUserNames, function(name) {

      const newUser: UserReport = new UserReport();
      newUser.user = name;
      newUser.informeDiario = [];
      const userData = _.filter(allData, function (line) {
        return line['user'] === name;
      });

      // EXTRAIGO FECHAS DISTINTAS
      const distinctDates =  _.uniq(_.pluck(userData, 'max_time'));
      newUser.diasTotalesRegistrados = distinctDates.length;
      // PARA CADA FECHA CREO UNA LISTA DE DATOS
      _.each(distinctDates, function(date) {
        const newDay: DayReport = new DayReport();
        newDay.fecha = moment(date).format('DD/MM/YYYY');
        newDay.diaSemana = moment(date).day();

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

        _.each(dateData, function(line){
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

        newDay.tiempoRegistradoTotal = totalTime;
        newDay.tiempoCasaTotal = totalTimeInside;
        newDay.tiempoFueraTotal = totalTimeOutside;
        newDay.tiempoCasaManyana = timeInsideMorning;
        newDay.tiempoCasaTarde = timeInsideAfternoon;
        newDay.tiempoCasaNoche = timeInsideNight;
        newDay.tiempoFueraManyana = timeOutsideMorning;
        newDay.tiempoFueraTarde = timeOutsideAfternoon;
        newDay.tiempoFueraNoche = timeOutsideNight;
        newDay.tiempoRegistradoManyana = totalTimeMorning;
        newDay.tiempoRegistradoTarde = totalTimeAfternoon;
        newDay.tiempoRegistradoNoche = totalTimeNight;

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
      that.structuredData.push(newUser);
    });

    this.dataReceived = true;
    console.log(this.structuredData);
  }
}
