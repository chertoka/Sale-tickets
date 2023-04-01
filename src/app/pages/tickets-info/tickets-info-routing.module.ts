import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from "path";
import {TicketItemComponent} from "./ticket-item/ticket-item.component";

const routes: Routes = [
  {
    path: '',
    component: TicketItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsInfoRoutingModule { }
