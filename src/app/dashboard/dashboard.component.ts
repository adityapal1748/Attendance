import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { format, parse } from 'date-fns';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  evntsData: any = [];
  color:string =""

  data = [
    {
      "date": "Sat Nov 04 2023 21:01:39 GMT+0530 (India Standard Time)",
      "punchIn": "10",
      "punchOut": "10",
      "status": "abs",
      "duration": "23:0:0"
    }
  ]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
  ngOnInit(): void {
    this.data.forEach((el: any) => {
      this.evntsData.push({
        date: format(new Date(el.date), 'yyyy-MM-dd'),
        title: el.status,
        color:el.status == 'abs' ?'red' : 'green'
      })
    })
    console.log(this.evntsData);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin],
      events: this.evntsData
    }
  }



}
