import { Injectable } from '@angular/core';
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class TicketsStorageService {
  private ticketStorage: ITour[]

  constructor() { }

  setStorage(data: ITour[]): void {
    this.ticketStorage = data;
  }
  getStorage(): ITour[] {
    return this.ticketStorage;
  }
}


/** Определить 2 публичных метода и 1 приватное свойство
setStorage(data: ITour[]): void {
  // запись данных в this.ticketStorage
}
getStorage(): ITour[] {
  // возвращает в this.ticketStorage
}
 */
