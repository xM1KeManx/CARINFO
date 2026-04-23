import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonSearchbar, IonSpinner, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonSearchbar, IonSpinner,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Catálogo</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div class="search-row">
      <ion-searchbar [(ngModel)]="marca" placeholder="Marca" (ionChange)="buscar()"
        class="search-input"></ion-searchbar>
      <ion-searchbar [(ngModel)]="modelo" placeholder="Modelo" (ionChange)="buscar()"
        class="search-input"></ion-searchbar>
    </div>

    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div class="catalogo-grid">
      <div *ngFor="let v of vehiculos" class="cat-card" (click)="ver(v.id)">
        <img [src]="v.imagen" class="cat-img" onerror="this.src='assets/car-bg.jpg'"/>
        <div class="cat-info">
          <div class="cat-nombre">{{ v.marca }} {{ v.modelo }}</div>
          <div class="cat-anio">{{ v.anio }}</div>
          <div class="cat-precio">RD$ {{ v.precio | number }}</div>
          <div class="cat-desc">{{ v.descripcion }}</div>
        </div>
      </div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .search-row { display:flex; gap:4px; padding:8px 8px 0; }
    .search-input { flex:1; --background:#1a1a2e; --color:#fff; --border-radius:10px; }
    .catalogo-grid { padding:8px 12px 24px; display:flex; flex-direction:column; gap:12px; }
    .cat-card { background:#1a1a2e; border-radius:14px; overflow:hidden; cursor:pointer;
      display:flex; gap:0; flex-direction:column; }
    .cat-img { width:100%; height:160px; object-fit:cover; }
    .cat-info { padding:12px; }
    .cat-nombre { color:#fff; font-weight:700; font-size:15px; }
    .cat-anio { color:#aaa; font-size:12px; }
    .cat-precio { color:#4fc3f7; font-weight:700; font-size:16px; margin:4px 0; }
    .cat-desc { color:#888; font-size:12px; }
  `]
})
export class CatalogoPage implements OnInit {
  vehiculos: any[] = [];
  cargando = true;
  marca = '';
  modelo = '';

  constructor(private api: ApiService, private router: Router) {}

  async ngOnInit() { await this.buscar(); }

  async buscar() {
  this.cargando = true;
  try {
    const res = await this.api.getAuth('catalogo', { marca: this.marca, modelo: this.modelo });
    if (res?.success) this.vehiculos = res.data;
  } catch(e) { console.error(e); }
  this.cargando = false;
  }

  ver(id: number) { this.router.navigate(['/catalogo', id]); }
}