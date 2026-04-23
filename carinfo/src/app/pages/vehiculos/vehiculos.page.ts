import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonButton, IonIcon, IonSpinner,
  IonSearchbar, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, carOutline } from 'ionicons/icons';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonIcon, IonSpinner,
    IonSearchbar, IonFab, IonFabButton],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Mis Vehículos</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <ion-searchbar [(ngModel)]="busqueda" placeholder="Buscar por marca..."
      (ionChange)="cargar()" class="search-bar"></ion-searchbar>

    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngIf="!cargando && vehiculos.length===0" class="vacio">
      <ion-icon name="car-outline" class="vacio-icon"></ion-icon>
      <p>No tienes vehículos registrados</p>
    </div>

    <div *ngFor="let v of vehiculos" class="veh-card" (click)="ver(v.id)">
      <img [src]="v.fotoUrl || 'assets/car-bg.jpg'" class="veh-img"
        onerror="this.src='assets/car-bg.jpg'"/>
      <div class="veh-info">
        <div class="veh-nombre">{{ v.marca }} {{ v.modelo }}</div>
        <div class="veh-placa">🔖 {{ v.placa }}</div>
        <div class="veh-anio">📅 {{ v.anio }}</div>
      </div>
    </div>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button color="primary" (click)="nuevo()">
        <ion-icon name="add-outline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .search-bar { --background:#1a1a2e; --color:#fff; --border-radius:12px; padding:8px; }
    .vacio { text-align:center; padding:60px 20px; color:#aaa; }
    .vacio-icon { font-size:64px; color:#333; display:block; margin-bottom:12px; }
    .veh-card { display:flex; gap:12px; background:#1a1a2e; margin:8px 12px;
      border-radius:14px; overflow:hidden; cursor:pointer; align-items:center; }
    .veh-img { width:90px; height:80px; object-fit:cover; flex-shrink:0; }
    .veh-info { padding:8px; }
    .veh-nombre { color:#fff; font-weight:700; font-size:15px; }
    .veh-placa { color:#4fc3f7; font-size:12px; margin-top:4px; }
    .veh-anio { color:#aaa; font-size:12px; }
  `]
})
export class VehiculosPage implements OnInit {
  vehiculos: any[] = [];
  busqueda = '';
  cargando = true;

  constructor(private api: ApiService, private router: Router) {
    addIcons({ addOutline, carOutline });
  }

  async ngOnInit() { await this.cargar(); }

  async cargar() {
    this.cargando = true;
    try {
      const res = await this.api.getAuth('vehiculos', { marca: this.busqueda });
      if (res?.success) this.vehiculos = res.data;
    } catch {}
    this.cargando = false;
  }

  ver(id: number) { this.router.navigate(['/vehiculos', id]); }
  nuevo() { this.router.navigate(['/vehiculo-detalle', 'nuevo']); }
}