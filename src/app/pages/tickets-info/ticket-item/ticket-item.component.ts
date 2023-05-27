import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ICustomTicketData, INearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {forkJoin, fromEvent, Subscription} from "rxjs";
import {TicketService} from "../../../services/tickets/tickets.service";


@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {
  ticket: ITour | undefined;
  user: IUser | null;
  userForm: FormGroup;
  ticketSearchValue: string;
  nearestTours: ICustomTicketData[];  //INearestTour[];
  toursLocation: ITourLocation[] | any;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketRestSub: Subscription;
  searchTypes = [1, 2, 3];

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketService) { }


  ngOnInit(): void {

    //first get user info
    this.user = this.userService.getUser();

    //init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''), //(this.user?.cardNumber)
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    });

    //get nearest tours
    forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe( (data) => {
      console.log('data', data);
      this.toursLocation = data[1];
      this.nearestTours = this.ticketService.transformData(data[0],data[1]);
    });



    //params
    const routeIdParam = this.route.snapshot.paramMap.get('id'); //for route
    const queryIdParam = this.route.snapshot.queryParamMap.get('id'); //for queryParams
    const paramValueId = routeIdParam || queryIdParam;
    if(paramValueId) {
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log('this.ticket', this.ticket)
    }

  }

  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    //setCardNumber
    this.userForm.controls["cardNumber"].setValue(this.user?.cardNumber);
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((any) => {
      this.initSearchTour();
    });
  }

  ngOnDestroy(): void {
    this.searchTicketSub.unsubscribe();
  }

  initSearchTour():void {

    //определяем рандомное число
    const type = Math.floor(Math.random() * this.searchTypes.length);

    //блок проверяет, завершен ли запрос на сервер. если не завершен,
    // вызывается метод unsubscribe и предыдщий запрос будет отменен
    // и сформирован новый запрос (метод unsubscribe отменяет запрос)
    if (this.ticketRestSub && !this.searchTicketSub.closed) {
      this.ticketRestSub.unsubscribe();
    }
    //записываем результат запроса на сервер
    this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
    });
  }

  //запись данных из формы личной информации
  initTour(): void {
    //получаем данные
    const userData = this.userForm.getRawValue();
    //инфо о туре + личная
    const postData = {...this.ticket, ...userData};
    this.ticketService.sendTourData(postData).subscribe()
    // console.log('postData', postData)
    // console.log('   this.userForm.getRawValue()', this.userForm.getRawValue())
  }

  onSubmit(): void {}

  selectDate(ev: Event): void {}

}
