import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string;
  //private testing: any;

  constructor(private testingService: ObservableExampleService, private config: ConfigService) {
    testingService.initObservable()
  }

  ngOnInit() {

    this.config.configLoad()

    const myObservable = this.testingService.getObservable();
    myObservable.subscribe(() => {
      //console.log('first myObservable data', data)
    });
    myObservable.subscribe(() => {
      //console.log('second myObservable data', data)
    });
    const mySubject = this.testingService.getSubject();
    mySubject.next('subject value');
    mySubject.next('value 1');
  }
}
