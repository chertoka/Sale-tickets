import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {TicketRestService} from "../rest/ticket-rest.service";
import {ITour} from "../../models/tours";


@Injectable({
  providedIn: 'root'
})
export class TicketsService {

    constructor(private ticketServiceRest: TicketRestService) {  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets();
  }
}
