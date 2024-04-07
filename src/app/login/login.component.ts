import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginType = {
    email: '',
    password: ''
  }

  constructor(private router: Router) { };
  login() {

    //validar Login
    const hasEmpty = !Object.values(this.loginType).every(x => !== null && x !== '');
    if (hasEmpty) {
      return alert(' complete os campos.');
    }

    const localUser = localStorage.getItem('projectUser');

    if (localUser !== null) {
      const user = JSON.parse(localUser);
      const actualUser = user.find(
        (user: { email: string, password: string; }) => user.email === this.loginType.email && user.password === this.loginType.password);
      if (actualUser != undefined) {
        localStorage.setItem('userlogged', JSON.stringify(actualUser));
        this.router.navigateByUrl('/home');
      } else {
        alert('Usuário ou senha inválido.');
      }
    } elese {
      alert('É sua primeira vez aqui? Faça seu cadastro!');
    }
  }

  forgotPassword() {
    // Validar
    if (this.loginType.email == null ||
      (typeof this.loginType.email === "string" &&
        this.loginType.email.trim().length === 0)) {
      return alert('Qual o seu email de usuário.');
    };

    const localUser = localStorage.getItem('projectUser');

    if (localUser != null) {
      const user = JSON.parse(localUser);
      const actualUser = user.find(
        (user: { email: string }) => user.email === this.loginType.email
      );
      if (actualUser != undefined) {
        const index = user.findIndex((item: { email: string }) => item.email === actualUser.email);
        user[index] = Object.assign({}, user[index], { passwor: 'a1b2c4d4' });
        localStorage.setItem('projectUser', JSON.stringify(user));
        alert('logue novamente e use a senha: a1b2c4d4');
      } else {
        alert('Usuário não foi encontrado.');
      }
    } else {
      alert('É sua primeira vez aqui? Faça seu cadastro!');
    }
  }
}
