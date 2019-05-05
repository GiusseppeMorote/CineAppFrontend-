import { MenuService } from './../../_service/menu.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import '../../login-animation.js';
import { LoginService } from 'src/app/_service/login.service.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;
  mensaje: string = "";
  error: string = "";

  constructor(
    private _loginService: LoginService, 
    private _menuService: MenuService, 
    private router: Router) { }

  ngOnInit() {
  }

  iniciarSesion() {
    this._loginService.login(this.usuario, this.clave).subscribe(data => {
      if (data) {
        const helper = new JwtHelperService();

        let token = JSON.stringify(data);
        sessionStorage.setItem(environment.TOKEN_NAME, token);

        let tk = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME));
        const decodedToken = helper.decodeToken(tk.access_token);

        this._menuService.listarPorUsuario(decodedToken.user_name).subscribe(data => {
          this._menuService.menuCambio.next(data);
        });

        this.router.navigate(['pelicula']);

      }
    });
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

}