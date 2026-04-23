import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';

export const BASE_URL = 'https://taller-itla.ia3x.com/api';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient, private storage: Storage) {}

  // ── Headers con token ──────────────────────────────────────────
  private async authHeaders(): Promise<HttpHeaders> {
    const token = await this.storage.get('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ── GET público ────────────────────────────────────────────────
  get(endpoint: string, params: any = {}) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(k => { if (params[k] != null) httpParams = httpParams.set(k, params[k]); });
    return firstValueFrom(this.http.get<any>(`${BASE_URL}/${endpoint}`, { params: httpParams }));
  }

  // ── GET con auth ───────────────────────────────────────────────
  async getAuth(endpoint: string, params: any = {}) {
    const headers = await this.authHeaders();
    let httpParams = new HttpParams();
    Object.keys(params).forEach(k => { if (params[k] != null) httpParams = httpParams.set(k, params[k]); });
    return firstValueFrom(this.http.get<any>(`${BASE_URL}/${endpoint}`, { headers, params: httpParams }));
  }

  // ── POST público (datax form-encoded) ─────────────────────────
  post(endpoint: string, datos: any) {
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify(datos));
    return firstValueFrom(this.http.post<any>(`${BASE_URL}/${endpoint}`, body.toString(), {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }));
  }

  // ── POST con auth (datax form-encoded) ────────────────────────
  async postAuth(endpoint: string, datos: any) {
    const headers = await this.authHeaders();
    const body = new URLSearchParams();
    body.set('datax', JSON.stringify(datos));
    return firstValueFrom(this.http.post<any>(`${BASE_URL}/${endpoint}`, body.toString(), {
      headers: headers.set('Content-Type', 'application/x-www-form-urlencoded')
    }));
  }

  // ── POST multipart con auth (para fotos) ──────────────────────
  async postMultipart(endpoint: string, datos: any, archivos: { campo: string; file: File }[] = []) {
    const headers = await this.authHeaders();
    const fd = new FormData();
    fd.append('datax', JSON.stringify(datos));
    archivos.forEach(a => fd.append(a.campo, a.file));
    return firstValueFrom(this.http.post<any>(`${BASE_URL}/${endpoint}`, fd, { headers }));
  }
}