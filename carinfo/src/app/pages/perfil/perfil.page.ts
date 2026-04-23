import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonButton, IonSpinner, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonButton, IonSpinner, IonIcon],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Mi Perfil</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngIf="perfil" class="perfil-wrap">
      <div class="foto-wrap">
        <img [src]="perfil.fotoUrl || 'assets/avatar.png'" class="perfil-foto"
          onerror="this.src='assets/avatar.png'"/>
        <ion-button fill="clear" class="btn-camara" (click)="cambiarFoto()">
          <ion-icon name="camera-outline"></ion-icon>
        </ion-button>
      </div>

      <h2 class="perfil-nombre">{{ perfil.nombre }} {{ perfil.apellido }}</h2>
      <div class="perfil-chip">{{ perfil.rol }}</div>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Matrícula</div>
          <div class="info-val">{{ perfil.matricula }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Correo</div>
          <div class="info-val">{{ perfil.correo }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Grupo</div>
          <div class="info-val">{{ perfil.grupo || 'N/A' }}</div>
        </div>
      </div>

      <ion-button expand="block" color="danger" fill="outline"
        class="btn-logout" (click)="auth.logout()">
        Cerrar Sesión
      </ion-button>
    </div>

    <input type="file" #fileInput accept="image/*" style="display:none"
      (change)="subirFoto($event)"/>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .perfil-wrap { display:flex; flex-direction:column; align-items:center; padding:32px 20px; }
    .foto-wrap { position:relative; margin-bottom:16px; }
    .perfil-foto { width:110px; height:110px; border-radius:50%; object-fit:cover;
      border:3px solid #4fc3f7; }
    .btn-camara { position:absolute; bottom:0; right:-8px; --color:#4fc3f7;
      background:#1a1a2e; border-radius:50%; width:36px; height:36px; }
    .perfil-nombre { color:#fff; font-size:22px; font-weight:800; margin:0 0 6px; }
    .perfil-chip { background:#0d2137; color:#4fc3f7; border:1px solid #4fc3f7;
      padding:4px 14px; border-radius:20px; font-size:12px; margin-bottom:24px; }
    .info-grid { width:100%; display:flex; flex-direction:column; gap:10px; margin-bottom:24px; }
    .info-item { background:#1a1a2e; border-radius:12px; padding:12px 16px; width:100%; }
    .info-label { color:#aaa; font-size:11px; text-transform:uppercase; letter-spacing:1px; }
    .info-val { color:#fff; font-weight:600; font-size:15px; margin-top:2px; }
    .btn-logout { --border-radius:12px; width:100%; }
  `]
})
export class PerfilPage implements OnInit {
  perfil: any = null;
  cargando = true;

  constructor(public auth: AuthService, private api: ApiService) {
    addIcons({ cameraOutline });
  }

  async ngOnInit() {
    try {
      const res = await this.api.getAuth('perfil');
      if (res?.success) this.perfil = res.data;
    } catch {}
    this.cargando = false;
  }

  cambiarFoto() {
    const input = document.querySelector('input[type=file]') as HTMLInputElement;
    input?.click();
  }

  async subirFoto(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    try {
      const res = await this.api.postMultipart('perfil/foto', {}, [{ campo: 'foto', file }]);
      if (res?.success) await this.ngOnInit();
    } catch {}
  }
}