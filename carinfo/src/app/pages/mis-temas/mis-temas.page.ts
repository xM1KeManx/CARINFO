import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonButton, IonSpinner, IonItem, IonInput, IonModal, IonIcon,
  IonSelect, IonSelectOption, IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mis-temas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonSpinner,
    IonItem, IonInput, IonModal, IonIcon, IonSelect, IonSelectOption, IonTextarea],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/foro"></ion-back-button></ion-buttons>
    <ion-title>Mis Temas</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="abrirModal()"><ion-icon slot="icon-only" name="add-outline"></ion-icon></ion-button>
    </ion-buttons>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div *ngFor="let t of temas" class="tema-card" (click)="router.navigate(['/foro',t.id])">
      <div class="tema-titulo">{{ t.titulo }}</div>
      <div class="tema-meta">{{ t.fecha }} · 💬 {{ t.respuestas }}</div>
    </div>

    <ion-modal [isOpen]="modalAbierto" (didDismiss)="modalAbierto=false">
      <ng-template>
        <ion-header><ion-toolbar color="primary">
          <ion-title>Nuevo Tema</ion-title>
          <ion-buttons slot="end"><ion-button (click)="modalAbierto=false">Cerrar</ion-button></ion-buttons>
        </ion-toolbar></ion-header>
        <ion-content class="page-bg" style="--padding-top:16px">
          <div class="form-wrap">
            <ion-item class="inp">
              <ion-select [(ngModel)]="form.vehiculo_id" placeholder="Vehículo *">
                <ion-select-option *ngFor="let v of vehiculos" [value]="v.id">{{ v.marca }} {{ v.modelo }}</ion-select-option>
              </ion-select>
            </ion-item>
            <ion-item class="inp"><ion-input [(ngModel)]="form.titulo" placeholder="Título *"></ion-input></ion-item>
            <ion-item class="inp">
              <ion-textarea [(ngModel)]="form.descripcion" placeholder="Descripción *" rows="4"></ion-textarea>
            </ion-item>
            <div class="error-msg" *ngIf="error">{{ error }}</div>
            <ion-button expand="block" class="btn-main" (click)="guardar()" [disabled]="guardando">
              <ion-spinner *ngIf="guardando" name="crescent"></ion-spinner>
              <span *ngIf="!guardando">Publicar</span>
            </ion-button>
          </div>
        </ion-content>
      </ng-template>
    </ion-modal>
  </ion-content>`,
  styles: [`
    .page-bg { --background:#0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .tema-card { background:#1a1a2e; margin:8px 12px; border-radius:14px;
      padding:14px; cursor:pointer; border-left:3px solid #4fc3f7; }
    .tema-titulo { color:#fff; font-weight:700; font-size:14px; }
    .tema-meta { color:#aaa; font-size:12px; margin-top:4px; }
    .form-wrap { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .inp { --background:#1a1a2e; --color:#fff; --border-radius:12px; border-radius:12px; }
    .btn-main { --border-radius:12px; font-weight:700; }
    .error-msg { color:#ff6b6b; font-size:13px; }
  `]
})
export class MisTemasPage implements OnInit {
  temas: any[] = [];
  vehiculos: any[] = [];
  cargando = true;
  modalAbierto = false;
  guardando = false;
  error = '';
  form = { vehiculo_id:'', titulo:'', descripcion:'' };

  constructor(private api: ApiService, public router: Router) {
    addIcons({ addOutline });
  }

  async ngOnInit() {
    this.cargando = true;
    try {
      const [t, v] = await Promise.all([
        this.api.getAuth('foro/mis-temas'),
        this.api.getAuth('vehiculos')
      ]);
      if (t?.success) this.temas = t.data;
      if (v?.success) this.vehiculos = v.data;
    } catch {}
    this.cargando = false;
  }

  abrirModal() { this.form = { vehiculo_id:'', titulo:'', descripcion:'' }; this.error=''; this.modalAbierto=true; }

  async guardar() {
    if (!this.form.vehiculo_id || !this.form.titulo || !this.form.descripcion) { this.error='Todos los campos requeridos'; return; }
    this.guardando = true;
    try {
      const res = await this.api.postAuth('foro/crear', this.form);
      if (res?.success) { this.modalAbierto=false; await this.ngOnInit(); }
      else this.error = res?.message || 'Error';
    } catch { this.error='Error de conexión'; }
    this.guardando = false;
  }
}