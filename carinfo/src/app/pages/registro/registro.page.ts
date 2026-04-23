import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  IonContent, IonItem, IonInput, IonButton,
  IonSpinner, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonNote
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonItem, IonInput,
    IonButton, IonSpinner, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonNote],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Registro</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-content">
    <div class="form-card">
      <h2>Crear cuenta</h2>
      <p class="sub">Ingresa tu matrícula del ITLA</p>

      <ion-item class="input-item">
        <ion-input [(ngModel)]="matricula" placeholder="Ej: 20232024"
          type="text" maxlength="20"></ion-input>
      </ion-item>

      <ion-note color="danger" *ngIf="error">{{ error }}</ion-note>

      <ion-button expand="block" class="btn-main" (click)="registrar()" [disabled]="cargando">
        <ion-spinner *ngIf="cargando" name="crescent"></ion-spinner>
        <span *ngIf="!cargando">Continuar</span>
      </ion-button>

      <ion-button expand="block" fill="clear" routerLink="/login">Ya tengo cuenta</ion-button>
    </div>
  </ion-content>`,
  styles: [`
    .page-content { --background: #0a0a0f; }
    .form-card { padding: 40px 24px; max-width: 400px; margin: 0 auto; color: #fff; }
    h2 { font-size: 24px; font-weight: 800; color: #4fc3f7; margin-bottom: 4px; }
    .sub { color: #aaa; font-size: 14px; margin-bottom: 24px; }
    .input-item { --background: #1a1a2e; --color: #fff; --border-radius: 12px;
      --padding-start: 16px; border-radius: 12px; margin-bottom: 16px; }
    .btn-main { --border-radius: 12px; margin-top: 8px; font-weight: 700; }
    ion-note { display: block; margin: 0 0 12px 4px; font-size: 13px; }
  `]
})
export class RegistroPage {
  matricula = '';
  cargando = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  async registrar() {
    this.error = '';
    if (!this.matricula.trim()) { this.error = 'Ingresa tu matrícula'; return; }
    this.cargando = true;
    try {
      const res = await this.auth.registro(this.matricula.trim());
      if (res?.success) {
        this.router.navigate(['/activar'], { state: { token: res.data.token } });
      } else {
        this.error = res?.message || 'Error al registrar';
      }
    } catch { this.error = 'Error de conexión'; }
    this.cargando = false;
  }
}