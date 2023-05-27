import {Component, OnInit, OnDestroy, Input, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {UserService} from "../../../services/user/user.service";
import {IUser} from "../../../models/users";
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() menuType: IMenuType;
  items: MenuItem[];
  time: Date;
  user: IUser | null;
  private settingsActive = false; //true?
  private timerInterval: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.items = this.initMenuItems();

    this.items = [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']

      },
      {
        label: 'Выйти',
        routerLink: ['/auth']

      },
      {
        label: 'Настройки',
        routerLink: ['settings'], //было ['/settings']
        visible: this.settingsActive
      },
    ];

    this.timerInterval = window.setInterval(() => {
      this.time = new Date();
    }, 1000);

    // запись пользователя
    this.user = this.userService.getUser()
  }


  ngOnChanges(ev: SimpleChanges): void {
    if (ev['menuType']) {
      this.settingsActive = this.menuType?.type === "extended";
      this.items = this.initMenuItems();
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval);
    }
  }

  private initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },

      {
        label: 'Настройки',
        routerLink: ['settings'], // было ['/settings']
        visible: this.settingsActive
      },

      {
        label: 'Выйти',
        routerLink: ['/auth'],
        command: () => {
          this.userService.removeUser();
        }
      },

    ];
  }
}


