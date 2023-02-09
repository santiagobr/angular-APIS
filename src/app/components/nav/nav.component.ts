import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import { StoreService } from '../../services/store.service';
import { User } from './../../models/user.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  token = '';
  profile: User | null = null;
  constructor(
    private storeService: StoreService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this._authService
      .login('santiago@email.com', '1702')
      .pipe(
        switchMap((token) => {
          this.token = token.access_token;

          return this._authService.profile(token.access_token);
        })
      )
      .subscribe((user) => {
        this.profile = user;
      });
  }

  getProfile() {
    this._authService.profile(this.token).subscribe((user) => {
      this.profile = user;
    });
  }
}
