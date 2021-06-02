import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginForm } from 'src/app/model/login-form';
import { LoginService } from 'src/app/service/login.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { DangKyForm } from 'src/app/model/dangky';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
   loginForm: LoginForm;
   dangKyForm :  DangKyForm;
   keepLogin: boolean | undefined;

  constructor(private loginService: LoginService,
              private router: Router,
              private jwtService: JwtHelperService) {
    this.loginForm = new LoginForm();
    this.dangKyForm = new DangKyForm();
    this.keepLogin = false;
  }


  ngOnInit(): void {
  }

  public dangky() : void{
    this.loginService.dangky(this.dangKyForm).subscribe(
      data => {
        alert("Đăng Ký Thành Công")
      },
      (error: any) => {
        alert("Đăng ký thất bại, là mẹ thành công")}
    )
  }

  public login(): void {
    //console.log(this.loginForm);
    this.loginService.login(this.loginForm).subscribe(
      data => {
        const token = data.token;
        const username = this.jwtService.decodeToken(token).sub;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', this.jwtService.decodeToken(token).admin_account);
        this.router.navigate(['home']).then(() => window.location.reload());
      },
        (error: any) => {
        console.log(error);
      }
    );
  }
}
