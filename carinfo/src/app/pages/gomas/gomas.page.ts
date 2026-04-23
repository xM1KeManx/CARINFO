import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonButton, IonSpinner, IonItem, IonInput, IonModal, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-gomas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonSpinner,
    IonItem, IonInput, IonModal, IonSelect, IonSelectOption],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button [defaultHref]="'/vehiculos/'+vid"></ion-back-button></ion-buttons>
    <ion-title>Estado de Gomas</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div class="gomas-grid">
      <div *ngFor="let g of gomas" class="goma-card" [class]="'estado-'+g.estado">
        <div class="goma-pos">{{ g.posicion }}</div>
        <div class="goma-eje">Eje {{ g.eje }}</div>
        <div class="goma-estado">{{ g.estado }}</div>
        <div class="goma-btns">
          <ion-button size="small" fill="outline" (click)="abrirCambio(g)">Cambiar</ion-button>
          <ion-button size="small" fill="outline" color="warning" (click)="abrirPinchazo(g)">Pinchazo</ion-button>
        </div>
      </div>
    </div>

    <!-- Modal cambiar estado -->
    <ion-modal [isOpen]="modalCambio" (didDismiss)="modalCambio=false">
      <ng-template>
        <ion-header><ion-toolbar color="primary">
          <ion-title>Cambiar Estado</ion-title>
          <ion-buttons slot="end"><ion-button (click)="modalCambio=false">Cerrar</ion-button></ion-buttons>
        </ion-toolbar></ion-header>
        <ion-content class="page-bg" style="--padding-top:16px">
          <div class="form-wrap">
            <ion-item class="inp">
              <ion-select [(ngModel)]="nuevoEstado" placeholder="Nuevo estado">
                <ion-select-option value="buena">Buena</ion-select-option>
                <ion-select-option value="regular">Regular</ion-select-option>
                <ion-select-option value="mala">Mala</ion-select-option>
                <ion-select-option value="reemplazada">Reemplazada</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-button expand="block" class="btn-main" (click)="cambiarEstado()" [disabled]="guardando">
              <ion-spinner *ngIf="guardando" name="crescent"></ion-spinner>
              <span *ngIf="!guardando">Actualizar</span>
            </ion-button>
          </div>
        </ion-content>
      </ng-template>
    </ion-modal>

    <!-- Modal pinchazo -->
    <ion-modal [isOpen]="modalPinchazo" (didDismiss)="modalPinchazo=false">
      <ng-template>
        <ion-header><ion-toolbar color="primary">
          <ion-title>Registrar Pinchazo</ion-title>
          <ion-buttons slot="end"><ion-button (click)="modalPinchazo=false">Cerrar</ion-button></ion-buttons>
        </ion-toolbar></ion-header>
        <ion-content class="page-bg" style="--padding-top:16px">
          <div class="form-wrap">
            <ion-item class="inp">
              <ion-input [(ngModel)]="descPinchazo" placeholder="Descripción"></ion-input>
            </ion-item>
            <ion-button expand="block" class="btn-main" (click)="registrarPinchazo()" [disabled]="guardando">
              <ion-spinner *ngIf="guardando" name="crescent"></ion-spinner>
              <span *ngIf="!guardando">Registrar</span>
            </ion-button>
          </div>
        </ion-content>
      </ng-template>
    </ion-modal>
  </ion-content>`,
  styles: [`
    .page-bg { --background:#0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .gomas-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:12px; }
    .goma-card { background:#1a1a2e; border-radius:14px; padding:14px; text-align:center; }
    .goma-card.estado-buena { border-top:3px solid #4caf50; }
    .goma-card.estado-regular { border-top:3px solid #ff9800; }
    .goma-card.estado-mala { border-top:3px solid #f44336; }
    .goma-card.estado-reemplazada { border-top:3px solid #9c27b0; }
    .goma-pos { color:#fff; font-weight:800; font-size:15px; }
    .goma-eje { color:#aaa; font-size:11px; }
    .goma-estado { color:#4fc3f7; font-weight:600; font-size:13px; margin:6px 0; text-transform:capitalize; }
    .goma-btns { display:flex; flex-direction:column; gap:4px; margin-top:8px; }
    .form-wrap { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .inp { --background:#1a1a2e; --color:#fff; --border-radius:12px; border-radius:12px; }
    .btn-main { --border-radius:12px; font-weight:700; }
  `]
})
export class GomasPage implements OnInit {
  gomas: any[] = [];
  vid = '';
  cargando = true;
  modalCambio = false;
  modalPinchazo = false;
  guardando = false;
  gomaSeleccionada: any = null;
  nuevoEstado = '';
  descPinchazo = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  async ngOnInit() {
    this.vid = this.route.snapshot.paramMap.get('vid') || '';
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    try {
      const res = await this.api.getAuth('gomas', { vehiculo_id: this.vid });
      if (res?.success) this.gomas = res.data;
    } catch {}
    this.cargando = false;
  }

  abrirCambio(g: any) { this.gomaSeleccionada=g; this.nuevoEstado=g.estado; this.modalCambio=true; }
  abrirPinchazo(g: any) { this.gomaSeleccionada=g; this.descPinchazo=''; this.modalPinchazo=true; }

  async cambiarEstado() {
    this.guardando = true;
    try {
      const res = await this.api.postAuth('gomas/actualizar', { goma_id: this.gomaSeleccionada.id, estado: this.nuevoEstado });
      if (res?.success) { this.modalCambio=false; await this.cargar(); }
    } catch {}
    this.guardando = false;
  }

  async registrarPinchazo() {
    this.guardando = true;
    try {
      const res = await this.api.postAuth('gomas/pinchazos', { goma_id: this.gomaSeleccionada.id, descripcion: this.descPinchazo });
      if (res?.success) { this.modalPinchazo=false; await this.cargar(); }
    } catch {}
    this.guardando = false;
  }
}