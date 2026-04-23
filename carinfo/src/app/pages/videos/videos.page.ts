import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonSpinner
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar,
    IonTitle, IonButtons, IonBackButton, IonSpinner],
  template: `
  <ion-header><ion-toolbar color="primary">
    <ion-buttons slot="start"><ion-back-button defaultHref="/home"></ion-back-button></ion-buttons>
    <ion-title>Videos Educativos</ion-title>
  </ion-toolbar></ion-header>

  <ion-content class="page-bg">
    <div *ngIf="cargando" class="centro"><ion-spinner name="crescent" color="primary"></ion-spinner></div>

    <div class="videos-grid">
      <div *ngFor="let v of videos" class="video-card" (click)="abrirVideo(v.url)">
        <div class="thumb-wrap">
          <img [src]="'https://img.youtube.com/vi/'+v.youtubeId+'/hqdefault.jpg'" class="thumb"/>
          <div class="play-btn">▶</div>
        </div>
        <div class="video-info">
          <div class="video-titulo">{{ v.titulo }}</div>
          <div class="video-cat">{{ v.categoria }}</div>
          <div class="video-desc">{{ v.descripcion }}</div>
        </div>
      </div>
    </div>
  </ion-content>`,
  styles: [`
    .page-bg { --background: #0a0a0f; }
    .centro { display:flex; justify-content:center; padding:60px; }
    .videos-grid { padding:12px; display:flex; flex-direction:column; gap:12px; }
    .video-card { background:#1a1a2e; border-radius:14px; overflow:hidden; cursor:pointer; }
    .thumb-wrap { position:relative; }
    .thumb { width:100%; height:180px; object-fit:cover; display:block; }
    .play-btn { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
      background:rgba(0,0,0,.6); color:#fff; font-size:28px; width:56px; height:56px;
      border-radius:50%; display:flex; align-items:center; justify-content:center; }
    .video-info { padding:12px; }
    .video-titulo { color:#fff; font-weight:700; font-size:14px; margin-bottom:4px; }
    .video-cat { color:#4fc3f7; font-size:11px; text-transform:uppercase;
      letter-spacing:1px; margin-bottom:6px; }
    .video-desc { color:#aaa; font-size:12px; }
  `]
})
export class VideosPage implements OnInit {
  videos: any[] = [];
  cargando = true;

  constructor(private api: ApiService) {}

  async ngOnInit() {
  try {
    const res = await this.api.getAuth('videos');
    if (res?.success) this.videos = res.data;
  } catch(e) { console.error(e); }
  this.cargando = false;
}

  abrirVideo(url: string) { window.open(url, '_system'); }
}