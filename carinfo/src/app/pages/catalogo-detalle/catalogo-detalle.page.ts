import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonSpinner, IonChip
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-catalogo-detalle',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonSpinner, IonChip],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/catalogo"></ion-back-button></ion-buttons>
    <ion-title>{{ v?.marca }} {{ v?.modelo }}</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>
    <div *ngIf="v">
      <div class="galeria">
        <img *ngFor="let img of v.imagenes" [src]="img" class="gal-img"
          onerror="this.src='assets/car-bg.jpg'"/>
      </div>
      <div class="det-body">
        <h1 class="det-nombre">{{ v.marca }} {{ v.modelo }} {{ v.anio }}</h1>
        <div class="det-precio">RD$ {{ v.precio | number }}</div>
        <p class="det-desc">{{ v.descripcion }}</p>
        <div class="specs-titulo">Especificaciones</div>
        <div class="specs-grid">
          <div *ngFor="let s of specs" class="spec-item">
            <div class="spec-label">{{ s.label }}</div>
            <div class="spec-val">{{ s.val }}</div>
          </div>
        </div>
      </div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .galeria { display:flex; overflow-x:auto; gap:8px; padding:12px; }
    .gal-img { width:280px; height:180px; object-fit:cover; border-radius:12px; flex-shrink:0; }
    .det-body { padding:16px; }
    .det-nombre { color:#fff; font-size:22px; font-weight:800; margin:0 0 4px; }
    .det-precio { color:#4fc3f7; font-size:20px; font-weight:700; margin-bottom:12px; }
    .det-desc { color:#aaa; font-size:14px; line-height:1.6; }
    .specs-titulo { color:#4fc3f7; font-size:13px; font-weight:700;
      text-transform:uppercase; letter-spacing:1px; margin:16px 0 8px; }
    .specs-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .spec-item { background:#1a1a2e; border-radius:10px; padding:10px; }
    .spec-label { color:#aaa; font-size:11px; text-transform:uppercase; }
    .spec-val { color:#fff; font-weight:600; font-size:14px; }
  `]
})
export class CatalogoDetallePage implements OnInit {
  v: any = null;
  specs: any[] = [];
  cargando = true;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    try {
      const res = await this.api.get('catalogo/detalle', { id });
      if (res?.success) {
        this.v = res.data;
        this.specs = Object.entries(res.data.especificaciones || {})
          .map(([label, val]) => ({ label, val }));
      }
    } catch {}
    this.cargando = false;
  }
}