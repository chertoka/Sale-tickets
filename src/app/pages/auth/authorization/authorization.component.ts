import {Component, OnDestroy, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy, OnChanges {

@Input() inputProp = 'active';
  @Input() inputObj: any;
  loginText = 'Логин';
  pswText = 'Пароль';
  psw: string;
  login: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;


  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
  }

  ngOnDestroy(): void {
    console.log('destroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    // если мы хотим обработать предыдущее значение
    if (changes['inputProp']){
      const preValue = changes['inputProp'].previousValue;
      console.log('prevValue', preValue)
      // выполнить что-то при первичном изменении св-ва
      if (changes['inputProp'].firstChange){
        console.log('first changes')
      }
    }
    console.log(this.inputProp);

  }

  vipStatusSelected(): void {}

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login,
      cardNumber: this.cardNumber
    }
    if(!this.authService.checkUser(authUser)) {
      this.messageService.add({severity: 'Error', summary: 'Проверьте введенные данные'});

    } else {
      this.userService.setUser(authUser); //передать ваш объект с пользователем
      this.router.navigate(['tickets/tickets-list']);
    }

  }

}
