import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsInfoRoutingModule } from './tickets-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';


@NgModule({
  declarations: [
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    TicketsInfoRoutingModule
  ]
})
export class TicketsInfoModule { }
