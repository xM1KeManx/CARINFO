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
  selector: 'app-activar',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput,
    IonButton, IonSpinner, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonNote],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/registro"></ion-back-button></ion-buttons>
    <ion-title>Activar Cuenta</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-content">
    <div class="form-card">
      <h2>Establece tu contraseña</h2>
      <p class="sub">Mínimo 6 caracteres</p>

      <ion-item class="input-item">
        <ion-input [(ngModel)]="contrasena" type="password"
          placeholder="Nueva contraseña"></ion-input>
      </ion-item>
      <ion-item class="input-item">
        <ion-input [(ngModel)]="confirmar" type="password"
          placeholder="Confirmar contraseña"></ion-input>
      </ion-item>

      <ion-note color="danger" *ngIf="error">{{ error }}</ion-note>

      <ion-button expand="block" class="btn-main" (click)="activar()" [disabled]="cargando">
        <ion-spinner *ngIf="cargando" name="crescent"></ion-spinner>
        <span *ngIf="!cargando">Activar cuenta</span>
      </ion-button>
    </div>
  </ion-content>`,
  styles: [`
    .page-content { --background: #0a0a0f; }
    .form-card { padding: 40px 24px; max-width: 400px; margin: 0 auto; color: #fff; }
    h2 { font-size: 24px; font-weight: 800; color: #4fc3f7; }
    .sub { color: #aaa; font-size: 14px; margin-bottom: 24px; }
    .input-item { --background: #1a1a2e; --color: #fff; --border-radius: 12px;
      --padding-start: 16px; border-radius: 12px; margin-bottom: 16px; }
    .btn-main { --border-radius: 12px; margin-top: 8px; font-weight: 700; }
    ion-note { display: block; margin: 0 0 12px 4px; font-size: 13px; }
  `]
})
export class ActivarPage {
  contrasena = '';
  confirmar  = '';
  tokenTemp  = '';
  cargando   = false;
  error      = '';

  constructor(private auth: AuthService, private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.tokenTemp = nav?.extras?.state?.['token'] || '';
  }

  async activar() {
    this.error = '';
    if (this.contrasena.length < 6) { this.error = 'Mínimo 6 caracteres'; return; }
    if (this.contrasena !== this.confirmar) { this.error = 'Las contraseñas no coinciden'; return; }
    this.cargando = true;
    try {
      const res = await this.auth.activar(this.tokenTemp, this.contrasena);
      if (res?.success) this.router.navigate(['/home']);
      else this.error = res?.message || 'Error al activar';
    } catch { this.error = 'Error de conexión'; }
    this.cargando = false;
  }
}