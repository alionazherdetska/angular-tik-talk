import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  isPasswordVisible = signal<boolean>(false);
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit() {
    console.log(this.isPasswordVisible());
    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value).subscribe((response) => {
        this.router.navigate(['']);
      });
    }
  }
}
