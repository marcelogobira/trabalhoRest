/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Calendar extends React.Component {
  
  render() {

    const today = new Date();
    var month = today.getMonth();
    var previous_month = today.getMonth() - 1;
    var last_day_previous_month =  new Date(today.getFullYear(), previous_month + 1, 0);
    var last_day_current_month =  new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    var first_day_current_month =  new Date(today.getFullYear(), today.getMonth(), 0);
    var date = new Date(today.getFullYear(), month, 1);
    var days = [];
    var dow = [0, 1, 2, 3, 4, 5, 6];
    var calendar = [];
    var current_day = 1;

    //assign days last month
    if(first_day_current_month.getDay() !== 0){
      for(var j = last_day_previous_month.getDay(); j >= 0; j--){
        days.push(last_day_previous_month.getDate() - j);        
      }

      console.log('calendar -> ', calendar);
      console.log('days -> ', days);
    }
    
    var week = days;

    //assign days of month
    while(current_day <= last_day_current_month){
      console.log('i -> ', current_day);
      console.log('last day ->', last_day_current_month );
      console.log('days.length -> ', days.length);

      for(var k = week.length; k <= 6; k++){
        if(current_day <= last_day_current_month){
          week.push(current_day);
          current_day++;
        }
        else{
          var offset_day = new Date(today.getFullYear(), today.getMonth(), last_day_current_month + k).getDate() - 1;
          week.push(offset_day);
        }
      }

      calendar.push(week);
      week = [];

      console.log('calendar -> ', calendar);
    }

    // while (date.getMonth() === month) {
    //   days.push(new Date(date));
    //   date.setDate(date.getDate() + 1);
    // }

    return (
      <>
        <div className="content">
          
        <table className="table">
        <tbody>
          {calendar.map(function (week, key) {
            return (
              <tr key={key}>
                {
                  week.map(function (day, index) {
                    return (
                      <td key={index}>{day}</td>
                    );
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>

        </div>
      </>
    );
  }
}

export default Calendar;
