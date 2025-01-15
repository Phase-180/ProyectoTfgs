import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { Message } from 'primeng/api';

import { MessagesModule } from 'primeng/messages';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    CalendarModule,
    DividerModule,
    MessagesModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  messages: any[] | undefined;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly router: Router = inject(Router);
  private readonly authService: AuthService = inject(AuthService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly _form: FormGroup;

  constructor() {
    this._form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      remail: ['', [Validators.required, Validators.email]],
      bornDate: ['', [Validators.required]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      cif: ['', [Validators.required, Validators.minLength(9)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      repassword: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit() {
    this.messages = [
      {
        severity: 'info',
        detail: 'Nombre',
        validate: () => this.isValidRequired('name'),
      },
      {
        severity: 'info',
        detail: 'Apellido',
        validate: () => this.isValidRequired('surname'),
      },
      {
        severity: 'info',
        detail: 'DNI',
        validate: () => this.isValidRequired('cif'),
      },
      {
        severity: 'info',
        detail: 'Fecha Nacimiento',
        validate: () => this.isValidRequired('bornDate'),
      },
      {
        severity: 'info',
        detail: 'Direccion',
        validate: () => this.isValidRequired('address'),
      },
      {
        severity: 'info',
        detail: 'Movil',
        validate: () => this.isValidRequired('phone'),
      },
      {
        severity: 'info',
        detail: 'Email',
        validate: () => this.isValidRequired('email'),
      },

      {
        severity: 'info',
        detail: 'Repetir Email',
        validate: () => this.isValidRequired('remail'),
      },
      {
        severity: 'info',
        detail: 'Contraseña',
        validate: () => this.isValidRequired('password'),
      },
      {
        severity: 'info',
        detail: 'Repetir contraseña',
        validate: () => this.isValidRequired('repassword'),
      },
    ];
  }

  onRegister() {
    this.cdr.markForCheck();
    if (this.form.invalid) {
      this.markAllAsTouched();
      return;
    }
    if (this._form.value['password'] != this._form.value['repassword']) return;
    const { name, surname, address, email, cif, phone, bornDate, password } =
      this.form.value;
    this.authService
      .register(name, surname, address, email, cif, phone, bornDate, password)
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/');
        },
        error: () => {},
        complete: () => {},
      });
  }
  private markAllAsTouched() {
    Object.values(this._form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  validatePassword() {
    return this._form.value['password'] != this._form.value['repassword'];
  }

  get form(): FormGroup {
    return this._form;
  }

  get registerFormControl() {
    return this._form.controls;
  }

  isValidRequired(field: string) {
    return this._form.get(field)?.valid;
  }
}
