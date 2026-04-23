import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonButton, IonSpinner, IonItem, IonInput,
  IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, constructOutline, flameOutline,
  ellipseOutline, cashOutline, trendingUpOutline } from 'ionicons/icons';

@Component({
  selector: 'app-vehiculo-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonButton, IonSpinner,
    IonItem, IonInput, IonIcon, IonLabel],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/vehiculos"></ion-back-button></ion-buttons>
    <ion-title>{{ esNuevo ? 'Nuevo Vehículo' : vehiculo?.marca+' '+vehiculo?.modelo }}</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <!-- FORMULARIO NUEVO -->
    <div *ngIf="esNuevo" class="form-wrap">
      <ion-item class="inp"><ion-input [(ngModel)]="form.placa" placeholder="Placa *"></ion-input></ion-item>
      <ion-item class="inp"><ion-input [(ngModel)]="form.chasis" placeholder="Chasis"></ion-input></ion-item>
      <ion-item class="inp"><ion-input [(ngModel)]="form.marca" placeholder="Marca *"></ion-input></ion-item>
      <ion-item class="inp"><ion-input [(ngModel)]="form.modelo" placeholder="Modelo *"></ion-input></ion-item>
      <ion-item class="inp"><ion-input [(ngModel)]="form.anio" placeholder="Año *" type="number"></ion-input></ion-item>
      <ion-item class="inp"><ion-input [(ngModel)]="form.cantidadRuedas" placeholder="Ruedas" type="number"></ion-input></ion-item>

      <div class="foto-sel" (click)="selFoto()">
        <img *ngIf="fotoPreview" [src]="fotoPreview" class="foto-prev"/>
        <div *ngIf="!fotoPreview" class="foto-placeholder">
          <ion-icon name="camera-outline"></ion-icon><span>Agregar foto</span>
        </div>
      </div>

      <div class="error-msg" *ngIf="error">{{ error }}</div>

      <ion-button expand="block" class="btn-main" (click)="guardar()" [disabled]="guardando">
        <ion-spinner *ngIf="guardando" name="crescent"></ion-spinner>
        <span *ngIf="!guardando">Guardar</span>
      </ion-button>
      <input type="file" #fileInput accept="image/*" style="display:none" (change)="onFoto($event)"/>
    </div>

    <!-- DETALLE EXISTENTE -->
    <div *ngIf="!esNuevo && vehiculo">
      <div class="veh-hero">
        <img [src]="vehiculo.fotoUrl || 'assets/car-bg.jpg'" class="veh-hero-img"
          onerror="this.src='assets/car-bg.jpg'"/>
        <div class="veh-hero-info">
          <h2>{{ vehiculo.marca }} {{ vehiculo.modelo }}</h2>
          <p>{{ vehiculo.placa }} · {{ vehiculo.anio }}</p>
        </div>
      </div>

      <!-- Resumen financiero -->
      <div class="seccion">Resumen Financiero</div>
      <div class="finanzas-grid">
        <div class="fin-card">
          <div class="fin-label">Mantenimientos</div>
          <div class="fin-val">RD$ {{ resumen?.totalMantenimientos | number:'1.0-0' }}</div>
        </div>
        <div class="fin-card">
          <div class="fin-label">Combustible</div>
          <div class="fin-val">RD$ {{ resumen?.totalCombustible | number:'1.0-0' }}</div>
        </div>
        <div class="fin-card">
          <div class="fin-label">Gastos</div>
          <div class="fin-val red">RD$ {{ resumen?.totalGastos | number:'1.0-0' }}</div>
        </div>
        <div class="fin-card">
          <div class="fin-label">Ingresos</div>
          <div class="fin-val green">RD$ {{ resumen?.totalIngresos | number:'1.0-0' }}</div>
        </div>
        <div class="fin-card wide">
          <div class="fin-label">Balance</div>
          <div class="fin-val" [class.green]="resumen?.balance>=0" [class.red]="resumen?.balance<0">
            RD$ {{ resumen?.balance | number:'1.0-0' }}
          </div>
        </div>
      </div>

      <!-- Accesos rápidos -->
      <div class="seccion">Gestionar</div>
      <div class="accesos-grid">
        <div class="acc-btn" (click)="ir('/mantenimientos/'+id)">
          <ion-icon name="construct-outline"></ion-icon><span>Mantenimientos</span>
        </div>
        <div class="acc-btn" (click)="ir('/combustible/'+id)">
          <ion-icon name="flame-outline"></ion-icon><span>Combustible</span>
        </div>
        <div class="acc-btn" (click)="ir('/gomas/'+id)">
          <ion-icon name="ellipse-outline"></ion-icon><span>Gomas</span>
        </div>
        <div class="acc-btn" (click)="ir('/gastos/'+id)">
          <ion-icon name="cash-outline"></ion-icon><span>Gastos</span>
        </div>
        <div class="acc-btn" (click)="ir('/ingresos/'+id)">
          <ion-icon name="trending-up-outline"></ion-icon><span>Ingresos</span>
        </div>
      </div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .form-wrap { padding:16px; display:flex; flex-direction:column; gap:10px; }
    .inp { --background:#1a1a2e; --color:#fff; --border-radius:12px; border-radius:12px; }
    .foto-sel { background:#1a1a2e; border-radius:14px; height:140px; display:flex;
      align-items:center; justify-content:center; cursor:pointer; overflow:hidden; }
    .foto-prev { width:100%; height:140px; object-fit:cover; }
    .foto-placeholder { display:flex; flex-direction:column; align-items:center;
      gap:8px; color:#4fc3f7; font-size:13px; }
    .foto-placeholder ion-icon { font-size:36px; }
    .btn-main { --border-radius:12px; font-weight:700; }
    .error-msg { color:#ff6b6b; font-size:13px; padding:0 4px; }
    .veh-hero { position:relative; }
    .veh-hero-img { width:100%; height:200px; object-fit:cover; }
    .veh-hero-info { position:absolute; bottom:0; left:0; right:0;
      background:linear-gradient(transparent,rgba(0,0,0,.8)); padding:16px; }
    .veh-hero-info h2 { color:#fff; margin:0; font-size:20px; font-weight:800; }
    .veh-hero-info p { color:#4fc3f7; margin:4px 0 0; font-size:13px; }
    .seccion { color:#4fc3f7; font-size:13px; font-weight:700;
      text-transform:uppercase; letter-spacing:1px; padding:16px 16px 8px; }
    .finanzas-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px; }
    .fin-card { background:#1a1a2e; border-radius:12px; padding:12px; }
    .fin-card.wide { grid-column:span 2; }
    .fin-label { color:#aaa; font-size:11px; text-transform:uppercase; }
    .fin-val { color:#fff; font-weight:700; font-size:16px; margin-top:4px; }
    .fin-val.green { color:#4caf50; }
    .fin-val.red { color:#f44336; }
    .accesos-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; padding:0 12px 32px; }
    .acc-btn { background:#1a1a2e; border-radius:14px; padding:16px 8px;
      display:flex; flex-direction:column; align-items:center; gap:8px;
      cursor:pointer; color:#ccc; font-size:11px; text-align:center; }
    .acc-btn ion-icon { font-size:26px; color:#4fc3f7; }
  `]
})
export class VehiculoDetallePage implements OnInit {
  vehiculo: any = null;
  resumen: any = null;
  esNuevo = false;
  cargando = true;
  guardando = false;
  error = '';
  id = '';
  fotoPreview: any = null;
  fotoFile: File | null = null;
  form = { placa:'', chasis:'', marca:'', modelo:'', anio:'', cantidadRuedas:4 };

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {
    addIcons({ cameraOutline, constructOutline, flameOutline,
      ellipseOutline, cashOutline, trendingUpOutline });
  }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.esNuevo = this.id === 'nuevo';
    if (!this.esNuevo) {
      try {
        const res = await this.api.getAuth('vehiculos/detalle', { id: this.id });
        if (res?.success) {
          this.vehiculo = res.data.vehiculo;
          this.resumen  = res.data.resumen;
        }
      } catch {}
    }
    this.cargando = false;
  }

  selFoto() { (document.querySelector('input[type=file]') as HTMLInputElement)?.click(); }

  onFoto(e: any) {
    this.fotoFile = e.target.files[0];
    if (this.fotoFile) {
      const reader = new FileReader();
      reader.onload = (ev: any) => this.fotoPreview = ev.target.result;
      reader.readAsDataURL(this.fotoFile);
    }
  }

  async guardar() {
    if (!this.form.placa || !this.form.marca || !this.form.modelo || !this.form.anio) {
      this.error = 'Placa, marca, modelo y año son requeridos'; return;
    }
    this.guardando = true;
    try {
      const archivos = this.fotoFile ? [{ campo: 'foto', file: this.fotoFile }] : [];
      const res = await this.api.postMultipart('vehiculos', this.form, archivos);
      if (res?.success) this.router.navigate(['/vehiculos']);
      else this.error = res?.message || 'Error al guardar';
    } catch { this.error = 'Error de conexión'; }
    this.guardando = false;
  }

  ir(ruta: string) { this.router.navigate([ruta]); }
}