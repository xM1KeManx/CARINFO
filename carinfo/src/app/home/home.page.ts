import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {
  IonContent, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  carOutline, newspaperOutline, videocamOutline,
  storefrontOutline, chatbubblesOutline, personOutline,
  informationCircleOutline, logInOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  logueado = false;
  usuario: any = null;

  slides = [
    { img: 'assets/slide1.jpg', msg: '🚗 Cuida tu vehículo, cuida tu inversión' },
    { img: 'assets/slide2.jpg', msg: '🔧 Registra cada mantenimiento a tiempo' },
    { img: 'assets/slide3.jpg', msg: '⛽ Controla tu gasto de combustible' },
    { img: 'assets/slide4.jpg', msg: '🛞 Monitorea el estado de tus gomas' },
  ];

  menus = [
    { label: 'Noticias',  icon: 'newspaper-outline',      ruta: '/noticias' },
    { label: 'Videos',    icon: 'videocam-outline',        ruta: '/videos' },
    { label: 'Catálogo',  icon: 'storefront-outline',      ruta: '/catalogo' },
    { label: 'Foro',      icon: 'chatbubbles-outline',     ruta: '/foro' },
    { label: 'Acerca De', icon: 'information-circle-outline', ruta: '/acerca' },
  ];

  menusAuth = [
    { label: 'Mis Vehículos', icon: 'car-outline',      ruta: '/vehiculos' },
    { label: 'Mi Perfil',     icon: 'person-outline',   ruta: '/perfil' },
  ];

  constructor(public auth: AuthService, private router: Router) {
    addIcons({ carOutline, newspaperOutline, videocamOutline,
      storefrontOutline, chatbubblesOutline, personOutline,
      informationCircleOutline, logInOutline });
  }

  slideActivo = 0;

  ngOnInit() {
    this.logueado = this.auth.logueado();
    this.usuario  = this.auth.usuario();
  }

  ir(ruta: string) { this.router.navigate([ruta]); }

  async cerrar() { await this.auth.logout(); this.logueado = false; }
}