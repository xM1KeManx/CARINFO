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
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonSpinner,
    IonItem, IonInput, IonModal, IonIcon],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button [defaultHref]="'/vehiculos/'+vid"></ion-back-button></ion-buttons>
    <ion-title>Ingresos</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="abrirModal()"><ion-icon slot="icon-only" name="add-outline"></ion-icon></ion-button>
    </ion-buttons>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngFor="let i of lista" class="ing-card">
      <div class="ing-concepto">{{ i.concepto }}</div>
      <div class="ing-monto">+ RD$ {{ i.monto | number }}</div>
      <div class="ing-fecha">{{ i.fecha }}</div>
    </div>

    <ion-modal [isOpen]="modalAbierto" (didDismiss)="modalAbierto=false">
      <ng-template>
        <ion-header><ion-toolbar color="primary">
          <ion-title>Nuevo Ingreso</ion-title>
          <ion-buttons slot="end"><ion-button (click)="modalAbierto=false">Cerrar</ion-button></ion-buttons>
        </ion-toolbar></ion-header>
        <ion-content class="page-bg" style="--padding-top:16px">
          <div class="form-wrap">
            <ion-item class="inp"><ion-input [(ngModel)]="form.concepto" placeholder="Concepto *"></ion-input></ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.monto" placeholder="Monto RD$ *" type="number"></ion-input></ion-item>
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
    .page-bg { --background:#0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .ing-card { background:#1a1a2e; margin:8px 12px; border-radius:14px; padding:14px;
      border-left:3px solid #4caf50; }
    .ing-concepto { color:#fff; font-weight:600; font-size:14px; }
    .ing-monto { color:#4caf50; font-weight:700; font-size:16px; margin-top:4px; }
    .ing-fecha { color:#666; font-size:11px; margin-top:2px; }
    .form-wrap { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .inp { --background:#1a1a2e; --color:#fff; --border-radius:12px; border-radius:12px; }
    .btn-main { --border-radius:12px; font-weight:700; }
    .error-msg { color:#ff6b6b; font-size:13px; }
  `]
})
export class IngresosPage implements OnInit {
  lista: any[] = [];
  vid = '';
  cargando = true;
  modalAbierto = false;
  guardando = false;
  error = '';
  form = { concepto:'', monto:'', fecha:'' };

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
      const res = await this.api.getAuth('ingresos', { vehiculo_id: this.vid });
      if (res?.success) this.lista = res.data;
    } catch {}
    this.cargando = false;
  }

  abrirModal() { this.form = { concepto:'', monto:'', fecha:'' }; this.error=''; this.modalAbierto=true; }

  async guardar() {
    if (!this.form.concepto || !this.form.monto || !this.form.fecha) { this.error='Todos los campos son requeridos'; return; }
    this.guardando = true;
    try {
      const res = await this.api.postAuth('ingresos', { ...this.form, vehiculo_id: this.vid });
      if (res?.success) { this.modalAbierto=false; await this.cargar(); }
      else this.error = res?.message || 'Error';
    } catch { this.error='Error de conexión'; }
    this.guardando = false;
  }
}