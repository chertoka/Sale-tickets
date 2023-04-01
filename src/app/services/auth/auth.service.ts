import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";
import {find} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersStorage: IUser[] = [];

  constructor() { }
  //Существует ли пользователь (проверяем по логину и паролю)
  checkUser (user: IUser): boolean{
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);
    const isUserLocalStorage = localStorage.getItem('userLogin:' +`${user.login}`);
    let userInStore: IUser = <IUser>{};
    if (isUserLocalStorage){
      userInStore = JSON.parse(isUserLocalStorage);
    }
    if (isUserExists) {
      return isUserExists.psw === user.psw
    }
//Если есть пользователь в localStorage, проверяем корректность пароля
    else
    if(userInStore){
      return userInStore.psw === user.psw
    }
    return false;
  }

  /**
  checkUser(user: IUser): boolean {
const isUserExists = this.usersStorage.find((el) => el.login === user.login);
//const isUserLocalStorage = localStorage.getItem('userLogin:' + ${user.login});
if(isUserExists) {
return isUserExists.psw === user.psw;
  }
return false;
 }
 */
  //Добавление пользователя
  setUser (user: IUser): void{
    const isUserExits = this.usersStorage.find((el) => el.login === user.login);
    if(!isUserExits && user?.login){
      this.usersStorage.push(user);
    }
  }
 /**
 setUser(user: IUser): void {
   const isUserExists = this.usersStorage.find((el) => el.login === user.login);
   if(!isUserExists && user?.login) {
     this.usersStorage.push(user);
   }
 }
  */
 //Существует ли пользователь (логин)
  isUserExists(user: IUser): boolean {
    const isUserExists = this.usersStorage.find((el) => el.login === user.login);

    return !!isUserExists;
  }
}

