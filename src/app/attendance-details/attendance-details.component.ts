import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { EmployeeService } from '../employee.service';
const ELEMENT_DATA: any = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'punchIn', 'punchOut', 'status','duration'];
  dataSource: any = new MatTableDataSource([]);
  punchInBtn: boolean = false
  punchOutBtn: boolean = false

  constructor(private service: EmployeeService) { }
  ngOnInit() {
    this.getUserData()
    
    console.log(new Date())
  }
  getUserData() {
    this.service.getLoginData().subscribe((res: any) => {
      console.log(res?.attendanceData[0].attendance);

      this.dataSource = new MatTableDataSource(res?.attendanceData[0].attendance)
    })
  }
  punchIn() {
    let payload = {
      date: new Date(),
      punchIn: format(new Date(), 'HH:mm:ss'),
      punchOut: "",
      status: "prs"
    }
    this.dataSource.data.push(payload)
    this.dataSource = new MatTableDataSource(this.dataSource.data); // Reassign the data source
    this.punchInBtn = true
  }
  punchOut() {
    this.dataSource.data[this.dataSource.data.length - 1].punchOut = format(new Date(), 'HH:mm:ss')
    this.dataSource = new MatTableDataSource(this.dataSource.data)
    this.punchOutBtn = true
    // this.subtractTimes()
    let time = this.dataSource.data[this.dataSource.data.length - 1] 
    this.dataSource.data[this.dataSource.data.length - 1].duration = this.subtractTimes(time.punchIn,time.punchOut)
    this.dataSource = new MatTableDataSource(this.dataSource.data)

  }
  subtractTimes(time1:any,time2:any) {
    
    const time1Parts = time1.split(':');
    const time2Parts = time2.split(':');
  
    // Convert times to seconds
    const time1Seconds = (+time1Parts[0]) * 3600 + (+time1Parts[1]) * 60 + (+time1Parts[2]);
    const time2Seconds = (+time2Parts[0]) * 3600 + (+time2Parts[1]) * 60 + (+time2Parts[2]);
  
    // Calculate the difference in seconds
    let timeDifference = time2Seconds - time1Seconds;
  
    // Handle negative differences (if time1 is greater than time2)
    if (timeDifference < 0) {
      timeDifference += 24 * 3600; // Assuming it's within a 24-hour period
    }
  
    // Convert the difference back to HH:mm:ss format
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = Math.floor(timeDifference % 60);
  
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  
  
}
