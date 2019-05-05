import { Component } from '@angular/core';
import { Menu } from './_model/menu';
import { LoginService } from './_service/login.service';
import { MenuService } from './_service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menus: Menu[];

  constructor(
    public _loginService: LoginService, 
    private _menuService: MenuService
    ) {

  }

  ngOnInit() {
    this._menuService.menuCambio.subscribe(data => {
      this.menus = data;
    });
  }
}
