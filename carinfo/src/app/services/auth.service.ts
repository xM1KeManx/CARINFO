import { Injectable, signal } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Signal reactivo — toda la app lo usa para saber si hay sesión
  logueado = signal<boolean>(false);
  usuario  = signal<any>(null);

  constructor(
    private storage: Storage,
    private api: ApiService,
    private router: Router
  ) {}

  async init() {
    await this.storage.create();
    const token = await this.storage.get('token');
    const user  = await this.storage.get('usuario');
    if (token) {
      this.logueado.set(true);
      this.usuario.set(user);
    }
  }

  // ── Registro ──────────────────────────────────────────────────
  async registro(matricula: string) {
    return this.api.post('auth/registro', { matricula });
  }

  // ── Activar cuenta ────────────────────────────────────────────
  async activar(token: string, contrasena: string) {
    const res = await this.api.post('auth/activar', { token, contrasena });
    if (res?.success) await this._guardarSesion(res.data);
    return res;
  }

  // ── Login ─────────────────────────────────────────────────────
  async login(matricula: string, contrasena: string) {
    const res = await this.api.post('auth/login', { matricula, contrasena });
    if (res?.success) await this._guardarSesion(res.data);
    return res;
  }

  // ── Olvidar contraseña ────────────────────────────────────────
  async olvidar(matricula: string) {
    return this.api.post('auth/olvidar', { matricula });
  }

  // ── Logout ────────────────────────────────────────────────────
  async logout() {
    await this.storage.remove('token');
    await this.storage.remove('refreshToken');
    await this.storage.remove('usuario');
    this.logueado.set(false);
    this.usuario.set(null);
    this.router.navigate(['/home']);
  }

  async getToken(): Promise<string | null> {
    return this.storage.get('token');
  }

  private async _guardarSesion(data: any) {
    await this.storage.set('token', data.token);
    await this.storage.set('refreshToken', data.refreshToken);
    await this.storage.set('usuario', data);
    this.logueado.set(true);
    this.usuario.set(data);
  }
}