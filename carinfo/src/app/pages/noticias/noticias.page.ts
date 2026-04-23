import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonSpinner, IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonSpinner, IonImg],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Noticias</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <ion-card *ngFor="let n of noticias" class="noticia-card" (click)="ver(n.id)">
      <img [src]="n.imagen" class="noticia-img" onerror="this.src='assets/car-bg.jpg'"/>
      <ion-card-header>
        <ion-card-title class="noticia-titulo">{{ n.titulo }}</ion-card-title>
        <ion-card-subtitle class="noticia-fecha">{{ n.fecha }}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content class="noticia-resumen">{{ n.resumen }}</ion-card-content>
    </ion-card>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .noticia-card { --background: #1a1a2e; border-radius:14px; margin:12px; cursor:pointer; }
    .noticia-img { width:100%; height:180px; object-fit:cover; border-radius:14px 14px 0 0; }
    .noticia-titulo { color:#fff; font-size:15px; font-weight:700; }
    .noticia-fecha { color:#4fc3f7; font-size:12px; }
    .noticia-resumen { color:#aaa; font-size:13px; }
  `]
})
export class NoticiasPage implements OnInit {
  noticias: any[] = [];
  cargando = true;

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() {
  try {
    const res = await this.api.getAuth('noticias');
    if (res?.success) this.noticias = res.data;
  } catch(e) { console.error(e); }
  this.cargando = false;
}

  ver(id: number) { this.router.navigate(['/noticias', id]); }
}