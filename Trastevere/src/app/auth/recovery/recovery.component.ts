import { ChangeDetectionStrategy, Component, inject,OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/api';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,MessagesModule,],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecoveryComponent implements OnInit  {
  messages: Message[] = []  ;

  ngOnInit(){
    this.messages = [
    ];
}
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly _form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });


 reset(){
  this.messages = [
    { severity: 'success', summary: 'Enviado', detail: 'Si el mail introducido existe, recibiras un mail para cambiar tu contraseña.' },
  ];


 
 }

  get form(): FormGroup {
    return this._form;
  }
}
