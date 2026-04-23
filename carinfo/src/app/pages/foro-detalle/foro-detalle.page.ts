import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonSpinner, IonItem, IonInput, IonButton, IonTextarea
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-foro-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonSpinner, IonItem,
    IonInput, IonButton, IonTextarea],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/foro"></ion-back-button></ion-buttons>
    <ion-title>Tema</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngIf="tema" class="tema-header">
      <h2 class="tema-titulo">{{ tema.titulo }}</h2>
      <p class="tema-desc">{{ tema.descripcion }}</p>
      <div class="tema-meta">por {{ tema.autor }} · {{ tema.fecha }}</div>
    </div>

    <div class="resp-titulo">Respuestas ({{ respuestas.length }})</div>

    <div *ngFor="let r of respuestas" class="resp-card">
      <div class="resp-autor">{{ r.autor }}</div>
      <div class="resp-contenido">{{ r.contenido }}</div>
      <div class="resp-fecha">{{ r.fecha }}</div>
    </div>

    <!-- Responder si está logueado -->
    <div *ngIf="auth.logueado()" class="responder-box">
      <ion-item class="input-item">
        <ion-textarea [(ngModel)]="nuevaResp" placeholder="Escribe tu respuesta..."
          rows="3" autoGrow="true"></ion-textarea>
      </ion-item>
      <ion-button expand="block" (click)="responder()" [disabled]="enviando">
        <ion-spinner *ngIf="enviando" name="crescent"></ion-spinner>
        <span *ngIf="!enviando">Responder</span>
      </ion-button>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .tema-header { background:#1a1a2e; padding:16px; margin:12px; border-radius:14px; }
    .tema-titulo { color:#fff; font-size:18px; font-weight:800; margin:0 0 8px; }
    .tema-desc { color:#ccc; font-size:14px; margin:0 0 8px; }
    .tema-meta { color:#4fc3f7; font-size:12px; }
    .resp-titulo { color:#4fc3f7; font-size:13px; font-weight:700;
      text-transform:uppercase; padding:12px 16px 4px; letter-spacing:1px; }
    .resp-card { background:#111827; margin:6px 12px; border-radius:10px; padding:12px;
      border-left:3px solid #4fc3f7; }
    .resp-autor { color:#4fc3f7; font-weight:700; font-size:13px; }
    .resp-contenido { color:#ddd; font-size:14px; margin:6px 0; }
    .resp-fecha { color:#666; font-size:11px; }
    .responder-box { padding:12px 12px 32px; }
    .input-item { --background:#1a1a2e; --color:#fff; --border-radius:12px;
      border-radius:12px; margin-bottom:10px; }
  `]
})
export class ForoDetallePage implements OnInit {
  tema: any = null;
  respuestas: any[] = [];
  nuevaResp = '';
  cargando = true;
  enviando = false;
  private id = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    try {
      const res = await this.api.get('publico/foro/detalle', { id: this.id });
      if (res?.success) {
        this.tema = res.data.tema;
        this.respuestas = res.data.respuestas || [];
      }
    } catch {}
    this.cargando = false;
  }

  async responder() {
    if (!this.nuevaResp.trim()) return;
    this.enviando = true;
    try {
      const res = await this.api.postAuth('foro/responder',
        { tema_id: this.id, contenido: this.nuevaResp });
      if (res?.success) {
        this.nuevaResp = '';
        await this.ngOnInit();
      }
    } catch {}
    this.enviando = false;
  }
}