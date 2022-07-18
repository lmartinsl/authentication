import { User } from './../../../../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {

    const { required, email, minLength } = Validators

    this.loginForm = this.fb.group({
      'email': ['', [required, email]],
      'password': ['', [required, minLength(6)]]
    })
  }

  public onSubmit(): void {
    const credentials = this.loginForm.value

    this.loading = true

    this.authService.login(credentials)
      .subscribe(
        (user: User) => {
          console.log(user)
          this.snackBar.open(`Logged in successfuly. Welcome, ${user.firstname}!`, 'OK!', { duration: 2000 })
          this.router.navigateByUrl('/')
          this.loading = false
        },
        (err) => {
          console.log(err)
          this.snackBar.open('Login Error.', 'Puts!', { duration: 2000 })
          this.loading = false
        }
      )
  }

}
