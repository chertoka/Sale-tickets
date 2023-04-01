import { Component, OnDestroy, OnInit } from '@angular/core';

import {AuthService} from "../../services/auth/auth.service";
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }
  isTabCaching: boolean = false;
  userName = 'Some name';


  ngOnInit():void {
    //this.someObj = this.obj;
  }

  }
