import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/tickets.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {debounceTime, fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[] = [];
  ticketsCopy: ITour[];
  isActive: boolean = false;
  loadCountBlock = false;
  defaultDate: string;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;


//Subscription
  tourUnsubscriber: Subscription;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketService,
              private router: Router,
              private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
    //1 вар
    this.tourUnsubscriber = this.ticketService.ticketType$.subscribe((data:ITourTypeSelect) => {
    console.log('data', data)

    let ticketType: string;
    switch (data.value) {
    case "single":
    this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
    break;
    case "multi":
    this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
    break;
    case "all":
    this.tickets = [...this.ticketsCopy];
    break;
      }

    if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      setTimeout(() => {
        this.blockDirective.updateItems();
        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });

  // второй вариант this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {
    // console.log('data', data)  });

    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      }
    )
  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup');
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((any) => {
        if(this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) => {
            const nameToLower = typeof (el?.name) === "string" ? el.name.toLowerCase(): '';
            return nameToLower.includes(this.ticketSearchValue.toLowerCase());
          })
        } else {
          this.tickets = [...this.ticketsCopy];
        }
    });
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean) {
    this.isActive = true;
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'backgroundColour: grey')
    this.blockDirective.initStyle(0);
  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe();
  }

  findTours($event: Event): void { }
}

/**
 * for queryParamMap - если использовать этот метод, то надо в ticket routing
 * заменить path:'ticket/:id' на
 * path:'ticket
 * this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
 *
 * */
