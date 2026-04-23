import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonButton, IonSpinner, IonItem, IonInput, IonModal, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mantenimientos',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonSpinner,
    IonItem, IonInput, IonModal, IonIcon],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button [defaultHref]="'/vehiculos/'+vid"></ion-back-button></ion-buttons>
    <ion-title>Mantenimientos</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="abrirModal()"><ion-icon slot="icon-only" name="add-outline"></ion-icon></ion-button>
    </ion-buttons>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngFor="let m of lista" class="mant-card">
      <div class="mant-tipo">{{ m.tipo }}</div>
      <div class="mant-fecha">📅 {{ m.fecha }}</div>
      <div class="mant-costo">RD$ {{ m.costo | number }}</div>
      <div class="mant-piezas" *ngIf="m.piezas">🔩 {{ m.piezas }}</div>
      <div class="mant-fotos" *ngIf="m.fotos?.length">
        <img *ngFor="let f of m.fotos" [src]="f" class="mant-foto"/>
      </div>
    </div>

    <!-- Modal nuevo -->
    <ion-modal [isOpen]="modalAbierto" (didDismiss)="modalAbierto=false">
      <ng-template>
        <ion-header><ion-toolbar color="primary">
          <ion-title>Nuevo Mantenimiento</ion-title>
          <ion-buttons slot="end">
            <ion-button (click)="modalAbierto=false">Cerrar</ion-button>
          </ion-buttons>
        </ion-toolbar></ion-header>
        <ion-content class="page-bg" style="--padding-top:16px">
          <div class="form-wrap">
            <ion-item class="inp"><ion-input [(ngModel)]="form.tipo" placeholder="Tipo *"></ion-input></ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.costo" placeholder="Costo RD$ *" type="number"></ion-input></ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.piezas" placeholder="Piezas (opcional)"></ion-input></ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.fecha" placeholder="Fecha *" type="date"></ion-input></ion-item>
            <div class="error-msg" *ngIf="error">{{ error }}</div>
            <ion-button expand="block" class="btn-main" (click)="guardar()" [disabled]="guardando">
              <ion-spinner *ngIf="guardando" name="crescent"></ion-spinner>
              <span *ngIf="!guardando">Guardar</span>
            </ion-button>
          </div>
        </ion-content>
      </ng-template>
    </ion-modal>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .mant-card { background:#1a1a2e; margin:8px 12px; border-radius:14px; padding:14px;
      border-left:3px solid #4fc3f7; }
    .mant-tipo { color:#fff; font-weight:700; font-size:15px; }
    .mant-fecha { color:#aaa; font-size:12px; margin-top:4px; }
    .mant-costo { color:#4fc3f7; font-weight:700; font-size:16px; margin-top:4px; }
    .mant-piezas { color:#ccc; font-size:12px; margin-top:4px; }
    .mant-fotos { display:flex; gap:6px; margin-top:8px; overflow-x:auto; }
    .mant-foto { width:72px; height:72px; object-fit:cover; border-radius:8px; flex-shrink:0; }
    .form-wrap { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .inp { --background:#1a1a2e; --color:#fff; --border-radius:12px; border-radius:12px; }
    .btn-main { --border-radius:12px; font-weight:700; }
    .error-msg { color:#ff6b6b; font-size:13px; }
  `]
})
export class MantenimientosPage implements OnInit {
  lista: any[] = [];
  vid = '';
  cargando = true;
  modalAbierto = false;
  guardando = false;
  error = '';
  form = { tipo:'', costo:'', piezas:'', fecha:'' };

  constructor(private route: ActivatedRoute, private api: ApiService) {
    addIcons({ addOutline });
  }

  async ngOnInit() {
    this.vid = this.route.snapshot.paramMap.get('vid') || '';
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    try {
      const res = await this.api.getAuth('mantenimientos', { vehiculo_id: this.vid });
      if (res?.success) this.lista = res.data;
    } catch {}
    this.cargando = false;
  }

  abrirModal() { this.form = { tipo:'', costo:'', piezas:'', fecha:'' }; this.error=''; this.modalAbierto=true; }

  async guardar() {
    if (!this.form.tipo || !this.form.costo || !this.form.fecha) { this.error='Tipo, costo y fecha requeridos'; return; }
    this.guardando = true;
    try {
      const res = await this.api.postAuth('mantenimientos', { ...this.form, vehiculo_id: this.vid });
      if (res?.success) { this.modalAbierto=false; await this.cargar(); }
      else this.error = res?.message || 'Error';
    } catch { this.error='Error de conexión'; }
    this.guardando = false;
  }
}