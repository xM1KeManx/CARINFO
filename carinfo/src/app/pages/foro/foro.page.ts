import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonSpinner, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonSpinner, IonButton, IonIcon],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Foro</ion-title>
    <ion-buttons slot="end" *ngIf="auth.logueado()">
      <ion-button (click)="ir('/mis-temas')">
        <ion-icon slot="icon-only" name="add-outline"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngFor="let t of temas" class="tema-card" (click)="ver(t.id)">
      <img [src]="t.vehiculoFoto || 'assets/car-bg.jpg'" class="tema-img"
        onerror="this.src='assets/car-bg.jpg'"/>
      <div class="tema-body">
        <div class="tema-titulo">{{ t.titulo }}</div>
        <div class="tema-autor">por {{ t.autor }} · {{ t.fecha }}</div>
        <div class="tema-respuestas">💬 {{ t.respuestas }} respuestas</div>
      </div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .tema-card { display:flex; gap:12px; background:#1a1a2e; margin:10px 12px;
      border-radius:14px; overflow:hidden; cursor:pointer; align-items:center; padding:10px; }
    .tema-img { width:64px; height:64px; object-fit:cover; border-radius:10px; flex-shrink:0; }
    .tema-body { flex:1; }
    .tema-titulo { color:#fff; font-weight:700; font-size:14px; margin-bottom:4px; }
    .tema-autor { color:#aaa; font-size:11px; }
    .tema-respuestas { color:#4fc3f7; font-size:12px; margin-top:4px; }
  `]
})
export class ForoPage implements OnInit {
  temas: any[] = [];
  cargando = true;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private router: Router
  ) { addIcons({ addOutline }); }

  async ngOnInit() {
    try {
      const res = await this.api.get('publico/foro');
      if (res?.success) this.temas = res.data;
    } catch {}
    this.cargando = false;
  }

  ver(id: number) { this.router.navigate(['/foro', id]); }
  ir(ruta: string) { this.router.navigate([ruta]); }
}