import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonContent, IonItem, IonInput, IonButton, IonSpinner,
  IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonNote
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput,
    IonButton, IonSpinner, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonNote],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Iniciar Sesión</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-content">
    <div class="form-card">
      <img src="assets/icon/icon.png" class="logo"/>
      <h2>CarInfo</h2>

      <ion-item class="input-item">
        <ion-input [(ngModel)]="matricula" placeholder="Matrícula ITLA" type="text"></ion-input>
      </ion-item>
      <ion-item class="input-item">
        <ion-input [(ngModel)]="contrasena" placeholder="Contraseña" type="password"></ion-input>
      </ion-item>

      <ion-note color="danger" *ngIf="error">{{ error }}</ion-note>

      <ion-button expand="block" class="btn-main" (click)="entrar()" [disabled]="cargando">
        <ion-spinner *ngIf="cargando" name="crescent"></ion-spinner>
        <span *ngIf="!cargando">Entrar</span>
      </ion-button>

      <ion-button expand="block" fill="clear" (click)="olvidar()">Olvidé mi contraseña</ion-button>
      <ion-button expand="block" fill="clear" routerLink="/registro">Crear cuenta</ion-button>
    </div>
  </ion-content>`,
  styles: [`
    .page-content { --background: #0a0a0f; }
    .form-card { padding: 40px 24px; max-width: 400px; margin: 0 auto;
      display: flex; flex-direction: column; align-items: center; color: #fff; }
    .logo { width: 80px; height: 80px; border-radius: 18px; margin-bottom: 8px; }
    h2 { font-size: 26px; font-weight: 800; color: #4fc3f7; margin: 0 0 24px; }
    .input-item { --background: #1a1a2e; --color: #fff; --border-radius: 12px;
      --padding-start: 16px; border-radius: 12px; margin-bottom: 14px; width: 100%; }
    .btn-main { --border-radius: 12px; margin-top: 8px; font-weight: 700; width: 100%; }
    ion-note { display: block; margin: 0 0 12px 4px; font-size: 13px; align-self: flex-start; }
  `]
})
export class LoginPage {
  matricula = '';
  contrasena = '';
  cargando   = false;
  error      = '';

  constructor(private auth: AuthService, private router: Router) {}

  async entrar() {
    this.error = '';
    if (!this.matricula || !this.contrasena) { this.error = 'Completa todos los campos'; return; }
    this.cargando = true;
    try {
      const res = await this.auth.login(this.matricula.trim(), this.contrasena);
      if (res?.success) this.router.navigate(['/home']);
      else this.error = res?.message || 'Credenciales incorrectas';
    } catch { this.error = 'Error de conexión'; }
    this.cargando = false;
  }

  async olvidar() {
    if (!this.matricula) { this.error = 'Escribe tu matrícula primero'; return; }
    try {
      const res = await this.auth.olvidar(this.matricula.trim());
      this.error = res?.message || 'Se envió una contraseña temporal';
    } catch { this.error = 'Error de conexión'; }
  }
}