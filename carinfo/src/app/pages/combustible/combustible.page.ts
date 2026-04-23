import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonButton, IonSpinner, IonItem, IonInput, IonModal, IonIcon, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-combustible',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonSpinner,
    IonItem, IonInput, IonModal, IonIcon, IonSelect, IonSelectOption],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button [defaultHref]="'/vehiculos/'+vid"></ion-back-button></ion-buttons>
    <ion-title>Combustible y Aceite</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="abrirModal()"><ion-icon slot="icon-only" name="add-outline"></ion-icon></ion-button>
    </ion-buttons>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngFor="let c of lista" class="comb-card">
      <div class="comb-tipo" [class.aceite]="c.tipo==='aceite'">
        {{ c.tipo === 'combustible' ? '⛽' : '🛢️' }} {{ c.tipo | titlecase }}
      </div>
      <div class="comb-cant">{{ c.cantidad }} {{ c.unidad }}</div>
      <div class="comb-monto">RD$ {{ c.monto | number }}</div>
      <div class="comb-fecha">{{ c.fecha }}</div>
    </div>

    <ion-modal [isOpen]="modalAbierto" (didDismiss)="modalAbierto=false">
      <ng-template>
        <ion-header><ion-toolbar color="primary">
          <ion-title>Nuevo Registro</ion-title>
          <ion-buttons slot="end"><ion-button (click)="modalAbierto=false">Cerrar</ion-button></ion-buttons>
        </ion-toolbar></ion-header>
        <ion-content class="page-bg" style="--padding-top:16px">
          <div class="form-wrap">
            <ion-item class="inp">
              <ion-select [(ngModel)]="form.tipo" placeholder="Tipo *">
                <ion-select-option value="combustible">Combustible</ion-select-option>
                <ion-select-option value="aceite">Aceite</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.cantidad" placeholder="Cantidad *" type="number"></ion-input></ion-item>
            <ion-item class="inp">
              <ion-select [(ngModel)]="form.unidad" placeholder="Unidad *">
                <ion-select-option value="galones">Galones</ion-select-option>
                <ion-select-option value="litros">Litros</ion-select-option>
                <ion-select-option value="qt">Qt</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.monto" placeholder="Monto RD$ *" type="number"></ion-input></ion-item>
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
    .comb-card { background:#1a1a2e; margin:8px 12px; border-radius:14px; padding:14px;
      border-left:3px solid #4fc3f7; }
    .comb-tipo { color:#fff; font-weight:700; font-size:15px; }
    .comb-tipo.aceite { color:#ffb74d; }
    .comb-cant { color:#aaa; font-size:13px; margin-top:4px; }
    .comb-monto { color:#4fc3f7; font-weight:700; font-size:16px; }
    .comb-fecha { color:#666; font-size:11px; margin-top:2px; }
    .form-wrap { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .inp { --background:#1a1a2e; --color:#fff; --border-radius:12px; border-radius:12px; }
    .btn-main { --border-radius:12px; font-weight:700; }
    .error-msg { color:#ff6b6b; font-size:13px; }
  `]
})
export class CombustiblePage implements OnInit {
  lista: any[] = [];
  vid = '';
  cargando = true;
  modalAbierto = false;
  guardando = false;
  error = '';
  form = { tipo:'', cantidad:'', unidad:'galones', monto:'' };

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
      const res = await this.api.getAuth('combustibles', { vehiculo_id: this.vid });
      if (res?.success) this.lista = res.data;
    } catch {}
    this.cargando = false;
  }

  abrirModal() { this.form = { tipo:'', cantidad:'', unidad:'galones', monto:'' }; this.error=''; this.modalAbierto=true; }

  async guardar() {
    if (!this.form.tipo || !this.form.cantidad || !this.form.monto) { this.error='Completa todos los campos'; return; }
    this.guardando = true;
    try {
      const res = await this.api.postAuth('combustibles', { ...this.form, vehiculo_id: this.vid });
      if (res?.success) { this.modalAbierto=false; await this.cargar(); }
      else this.error = res?.message || 'Error';
    } catch { this.error='Error de conexión'; }
    this.guardando = false;
  }
}