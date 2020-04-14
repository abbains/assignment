import { Component, OnInit } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "assignment";
  mobileNumber: string = "2345678";
  start: number;
  end: number;
  errorMessage = "";
  regexp = new RegExp("^[0-9]*$");
  tableData: any;

  constructor(private appService: AppService) {}

  ngOnInit() {}

  generateCombinations() {
    if (this.mobileNumber.length < 7) {
      this.errorMessage = "Mobile number should have minimum 7 digits";
    }
    if (this.mobileNumber.length > 10) {
      this.errorMessage = "Mobile number should not exceed 10 digits";
    }
    if (this.regexp.test(this.mobileNumber) === false) {
      this.errorMessage = "Enter only numerics";
    }
    if (!this.errorMessage) {
      this.getRecords();
    }
  }

  hideErrorMessage() {
    if (this.errorMessage && this.errorMessage.length > 0) {
      this.errorMessage = "";
    }
  }

  pageChanged($event) {
    console.log('event ---> ', $event);
    this.start = $event.start
    this.end = $event.end
    this.getRecords();
  }

  getRecords() {
    const payload = {
      "mobileNumber": this.mobileNumber,
      "start": this.start,
      "end": this.end
    }
    this.appService.fetchRecords(payload).subscribe(response => {
      console.log('response recieved => ', response);
      this.tableData = response;
    });
  }
}
