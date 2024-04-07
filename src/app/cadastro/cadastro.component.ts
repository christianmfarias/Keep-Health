import { Component } from '@angular/core';
import {FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators,} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  cadastroForm: FormGroup | any;

  constructor(private router: Router) {
    this.cadastroForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      if (
        this.cadastroForm.value.password ===
        this.cadastroForm.value.confirmPassword
      ) {
        localStorage.setItem(
          this.cadastroForm.value.email,
          this.cadastroForm.value.password,
        );
        alert('Usuário foi cadastrado!');
      } else {
        alert('As senhas incorretas!');
      }
    } else {
      alert('Preencha os campos corretos, por favor!');
    }
  }

  VoltarLogin() {
    this.router.navigate(['/login']);
  }
}