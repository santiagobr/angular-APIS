import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from './services/users/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  /**
   *
   */
  constructor(
    private _authService: AuthService,
    private _usersService: UsersService
  ) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this._usersService
      .create({
        name: 'Santiago',
        email: 'santiago@email.com',
        password: '1702',
      })
      .subscribe((rta) => {
        console.log('====================================');
        console.log(rta);
        console.log('====================================');
      });
  }

  login() {
    this._authService.login('santiago@email.com', '1702').subscribe((rta) => {
      console.log('====================================');
      console.log(rta.access_token);
      console.log('====================================');
    });
  }
}
