import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsInfoRoutingModule } from './tickets-info-routing.module';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {CalendarModule} from "primeng/calendar";
import {CarouselModule} from "primeng/carousel";
import {PaginatorModule} from "primeng/paginator";


@NgModule({
  declarations: [
    TicketItemComponent
  ],
    imports: [
        CommonModule,
        TicketsInfoRoutingModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        CalendarModule,
        CarouselModule,
        PaginatorModule
    ]
})
export class TicketsInfoModule { }
