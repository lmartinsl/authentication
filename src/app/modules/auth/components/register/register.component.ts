import { AuthService } from '../../services/auth.service';
import { User } from './../../../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;
  public states: Array<{ value: string, label: string }>

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.states = [
      { value: 'AC', label: 'Acre' },
      { value: 'AL', label: 'Alagoas' },
      { value: 'AP', label: 'Amapá' },
      { value: 'AM', label: 'Amazonas' },
      { value: 'BA', label: 'Bahia' },
      { value: 'CE', label: 'Ceará' },
      { value: 'DF', label: 'Distrito Federal' },
      { value: 'ES', label: 'Espírito Santo' },
      { value: 'GO', label: 'Goías' },
      { value: 'MA', label: 'Maranhão' },
      { value: 'MT', label: 'Mato Grosso' },
      { value: 'MS', label: 'Mato Grosso do Sul' },
      { value: 'MG', label: 'Minas Gerais' },
      { value: 'PA', label: 'Pará' },
      { value: 'PB', label: 'Paraíba' },
      { value: 'PR', label: 'Paraná' },
      { value: 'PE', label: 'Pernambuco' },
      { value: 'PI', label: 'Piauí' },
      { value: 'RJ', label: 'Rio de Janeiro' },
      { value: 'RN', label: 'Rio Grande do Norte' },
      { value: 'RS', label: 'Rio Grande do Sul' },
      { value: 'RO', label: 'Rondônia' },
      { value: 'RR', label: 'Roraíma' },
      { value: 'SC', label: 'Santa Catarina' },
      { value: 'SP', label: 'São Paulo' },
      { value: 'SE', label: 'Sergipe' },
      { value: 'TO', label: 'Tocantins' },
    ];

    this.createForm();
  }

  private createForm(): void {

    const { required, email, minLength } = Validators

    this.formRegister = this.fb.group({
      'firstname': ['', [required]],
      'lastname': ['', [required]],
      'address': ['', [required]],
      'city': ['', [required]],
      'state': ['', [required]],
      'phone': ['', [required]],
      'mobilephone': ['', [required]],
      'email': ['', [required, email]],
      'password1': ['', [required, minLength(6)]],
      'password2': ['', [required, minLength(6)]],
    }, { validator: this.matchingPasswords })
  }

  public matchingPasswords(group: FormGroup): any {
    if (group) {

      const { ...control } = group.controls

      if (control.password1.value === control.password2.value) {
        return null // OK
      }
    }

    return { matching: false } // NOT OK
  }

  public save(): void {
    console.log(this.formRegister.value)

    const form = this.formRegister.value
    let user: User = {
      ...form,
      password: form.password1
    }

    this.authService.register(user)
      .subscribe(
        (u: User) => {
          this.snackBar.open(
            'Successfuly registered. Use your credentials to sing in!',
            'OK',
            { duration: 2000 }
          )
          this.router.navigateByUrl('/auth/login')
        },
        (err) => {

          console.log(err)

          this.snackBar.open(err.message, 'OK', { duration: 2000 })
        }
      )
  }

}
