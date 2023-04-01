import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[]; //ITours[]?
  isActive: boolean = false;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;

  constructor(private ticketService: TicketsService,
              private router: Router,
              private ticketStorage: TicketsStorageService) { }

  ngOnInit(): void {
      this.ticketService.getTickets().subscribe(
      (data) => {
      this.tickets = data;
      this.ticketStorage.setStorage(data);
      //this.blockDirective.initStyle(0);
      }
    )
  }

  ngAfterViewInit() { }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean) {
    this.isActive = true;
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'backgroundColour: grey')
    this.blockDirective.initStyle(0);
  }
}

/**
 * for queryParamMap - если использовать этот метод, то надо в ticket routing
 * заменить path:'ticket/:id' на
 * path:'ticket
 * this.router.navigate([`/tickets/ticket`], {queryParams:{id:item.id}})
 *
 * */
