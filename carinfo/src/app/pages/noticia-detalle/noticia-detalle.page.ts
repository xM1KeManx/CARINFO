import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonSpinner
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonSpinner],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/noticias"></ion-back-button></ion-buttons>
    <ion-title>{{ noticia?.titulo || 'Noticia' }}</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>
    <div *ngIf="noticia" class="detalle-wrap">
      <img [src]="noticia.imagen" class="det-img" onerror="this.src='assets/car-bg.jpg'"/>
      <div class="det-fecha">{{ noticia.fecha }}</div>
      <h1 class="det-titulo">{{ noticia.titulo }}</h1>
      <div class="det-html" [innerHTML]="htmlSeguro"></div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .detalle-wrap { padding: 0 0 32px; }
    .det-img { width:100%; height:220px; object-fit:cover; }
    .det-fecha { color:#4fc3f7; font-size:12px; padding:12px 16px 0; }
    .det-titulo { color:#fff; font-size:20px; font-weight:800; padding:8px 16px; margin:0; }
    .det-html { color:#ccc; font-size:14px; line-height:1.7; padding:8px 16px; }
    .det-html img { max-width:100%; border-radius:8px; }
  `]
})
export class NoticiaDetallePage implements OnInit {
  noticia: any = null;
  htmlSeguro: SafeHtml = '';
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    try {
      const res = await this.api.get('noticias/detalle', { id });
      if (res?.success) {
        this.noticia = res.data;
        this.htmlSeguro = this.sanitizer.bypassSecurityTrustHtml(res.data.contenido || '');
      }
    } catch {}
    this.cargando = false;
  }
}