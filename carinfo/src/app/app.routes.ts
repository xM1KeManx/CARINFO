import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Públicas
  { path: 'home',       loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'registro',   loadComponent: () => import('./pages/registro/registro.page').then(m => m.RegistroPage) },
  { path: 'activar',    loadComponent: () => import('./pages/activar/activar.page').then(m => m.ActivarPage) },
  { path: 'login',      loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'noticias',   loadComponent: () => import('./pages/noticias/noticias.page').then(m => m.NoticiasPage) },
  { path: 'noticias/:id', loadComponent: () => import('./pages/noticia-detalle/noticia-detalle.page').then(m => m.NoticiaDetallePage) },
  { path: 'videos',     loadComponent: () => import('./pages/videos/videos.page').then(m => m.VideosPage) },
  { path: 'catalogo',   loadComponent: () => import('./pages/catalogo/catalogo.page').then(m => m.CatalogoPage) },
  { path: 'catalogo/:id', loadComponent: () => import('./pages/catalogo-detalle/catalogo-detalle.page').then(m => m.CatalogoDetallePage) },
  { path: 'foro',       loadComponent: () => import('./pages/foro/foro.page').then(m => m.ForoPage) },
  { path: 'foro/:id',   loadComponent: () => import('./pages/foro-detalle/foro-detalle.page').then(m => m.ForoDetallePage) },
  { path: 'acerca',     loadComponent: () => import('./pages/acerca/acerca.page').then(m => m.AcercaPage) },

  // Con login (authGuard)
  { path: 'perfil',        canActivate: [authGuard], loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage) },
  { path: 'vehiculos',     canActivate: [authGuard], loadComponent: () => import('./pages/vehiculos/vehiculos.page').then(m => m.VehiculosPage) },
  { path: 'vehiculo-detalle/:id', canActivate: [authGuard], loadComponent: () => import('./pages/vehiculo-detalle/vehiculo-detalle.page').then(m => m.VehiculoDetallePage) },
  { path: 'mantenimientos/:vid', canActivate: [authGuard], loadComponent: () => import('./pages/mantenimientos/mantenimientos.page').then(m => m.MantenimientosPage) },
  { path: 'combustible/:vid',    canActivate: [authGuard], loadComponent: () => import('./pages/combustible/combustible.page').then(m => m.CombustiblePage) },
  { path: 'gomas/:vid',          canActivate: [authGuard], loadComponent: () => import('./pages/gomas/gomas.page').then(m => m.GomasPage) },
  { path: 'gastos/:vid',         canActivate: [authGuard], loadComponent: () => import('./pages/gastos/gastos.page').then(m => m.GastosPage) },
  { path: 'ingresos/:vid',       canActivate: [authGuard], loadComponent: () => import('./pages/ingresos/ingresos.page').then(m => m.IngresosPage) },
  { path: 'mis-temas',           canActivate: [authGuard], loadComponent: () => import('./pages/mis-temas/mis-temas.page').then(m => m.MisTemasPage) },

  { path: '**', redirectTo: 'home' },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'activar',
    loadComponent: () => import('./pages/activar/activar.page').then( m => m.ActivarPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'noticias',
    loadComponent: () => import('./pages/noticias/noticias.page').then( m => m.NoticiasPage)
  },
  {
    path: 'noticia-detalle',
    loadComponent: () => import('./pages/noticia-detalle/noticia-detalle.page').then( m => m.NoticiaDetallePage)
  },
  {
    path: 'videos',
    loadComponent: () => import('./pages/videos/videos.page').then( m => m.VideosPage)
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalogo/catalogo.page').then( m => m.CatalogoPage)
  },
  {
    path: 'catalogo-detalle',
    loadComponent: () => import('./pages/catalogo-detalle/catalogo-detalle.page').then( m => m.CatalogoDetallePage)
  },
  {
    path: 'foro',
    loadComponent: () => import('./pages/foro/foro.page').then( m => m.ForoPage)
  },
  {
    path: 'foro-detalle',
    loadComponent: () => import('./pages/foro-detalle/foro-detalle.page').then( m => m.ForoDetallePage)
  },
  {
    path: 'acerca',
    loadComponent: () => import('./pages/acerca/acerca.page').then( m => m.AcercaPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'vehiculos',
    loadComponent: () => import('./pages/vehiculos/vehiculos.page').then( m => m.VehiculosPage)
  },
  {
    path: 'vehiculo-detalle',
    loadComponent: () => import('./pages/vehiculo-detalle/vehiculo-detalle.page').then( m => m.VehiculoDetallePage)
  },
  {
    path: 'mantenimientos',
    loadComponent: () => import('./pages/mantenimientos/mantenimientos.page').then( m => m.MantenimientosPage)
  },
  {
    path: 'combustible',
    loadComponent: () => import('./pages/combustible/combustible.page').then( m => m.CombustiblePage)
  },
  {
    path: 'gomas',
    loadComponent: () => import('./pages/gomas/gomas.page').then( m => m.GomasPage)
  },
  {
    path: 'gastos',
    loadComponent: () => import('./pages/gastos/gastos.page').then( m => m.GastosPage)
  },
  {
    path: 'ingresos',
    loadComponent: () => import('./pages/ingresos/ingresos.page').then( m => m.IngresosPage)
  },
  {
    path: 'mis-temas',
    loadComponent: () => import('./pages/mis-temas/mis-temas.page').then( m => m.MisTemasPage)
  },
];