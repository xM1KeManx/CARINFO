import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Acerca De</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div class="app-info">
      <img src="assets/icon/icon.png" class="app-logo"/>
      <h1 class="app-nombre">CarInfo</h1>
      <p class="app-desc">App de Información Automotriz — ITLA 2026</p>
    </div>

    <div class="equipo-titulo">Equipo de Desarrollo</div>

    <div *ngFor="let m of equipo" class="miembro-card">
      <img [src]="m.foto" class="miembro-foto" onerror="this.src='assets/avatar.png'"/>
      <div class="miembro-info">
        <div class="miembro-nombre">{{ m.nombre }}</div>
        <div class="miembro-matricula">{{ m.matricula }}</div>
        <div class="miembro-links">
          <a [href]="'tel:'+m.telefono" class="link-btn">📞 Llamar</a>
          <a [href]="m.telegram" target="_blank" class="link-btn">💬 Telegram</a>
          <a [href]="'mailto:'+m.correo" class="link-btn">📧 Correo</a>
        </div>
      </div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .app-info { text-align:center; padding:28px 16px 12px; }
    .app-logo { width:80px; height:80px; border-radius:18px; }
    .app-nombre { color:#4fc3f7; font-size:26px; font-weight:800; margin:8px 0 0; }
    .app-desc { color:#aaa; font-size:13px; margin:4px 0; }
    .equipo-titulo { color:#4fc3f7; font-size:13px; font-weight:700;
      text-transform:uppercase; letter-spacing:1px; padding:16px 16px 8px; }
    .miembro-card { display:flex; gap:14px; background:#1a1a2e; margin:8px 12px;
      border-radius:14px; padding:14px; align-items:center; }
    .miembro-foto { width:68px; height:68px; border-radius:50%; object-fit:cover;
      border:2px solid #4fc3f7; flex-shrink:0; }
    .miembro-info { flex:1; }
    .miembro-nombre { color:#fff; font-weight:700; font-size:15px; }
    .miembro-matricula { color:#4fc3f7; font-size:12px; margin:2px 0 8px; }
    .miembro-links { display:flex; flex-wrap:wrap; gap:6px; }
    .link-btn { background:#0d2137; color:#4fc3f7; padding:4px 10px; border-radius:20px;
      font-size:11px; text-decoration:none; }
  `]
})
export class AcercaPage {
  equipo = [
    {
      nombre: 'Michael Sosa',
      matricula: '20232024',
      foto: 'assets/icon/avatar.png',
      telefono: '+18093012519',
      telegram: 'https://t.me/',
      correo: '20232024@itla.edu.do'
    }
    // Agrega más integrantes si los hay
  ];
}