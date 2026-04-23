# 🚗 CarInfo — App de Información Automotriz

![Ionic](https://img.shields.io/badge/Ionic-7-blue?logo=ionic)
![Angular](https://img.shields.io/badge/Angular-17-red?logo=angular)
![Capacitor](https://img.shields.io/badge/Capacitor-5-green?logo=capacitor)
![Android](https://img.shields.io/badge/Platform-Android-brightgreen?logo=android)

> Proyecto Final — Aplicaciones Móviles — ITLA 2026

---

## 📱 Descripción

CarInfo es una aplicación móvil para Android que permite gestionar de manera integral la información de vehículos: mantenimientos, combustible, gomas, gastos, ingresos, noticias automotrices, foro comunitario, videos educativos y catálogo de vehículos.

---

## 👤 Desarrollador

| Campo | Detalle |
|---|---|
| 👤 Nombre | Michael Emmanuel Sosa Arias |
| 🎓 Matrícula | 20232024 |
| 📧 Correo | 20232024@itla.edu.do |
| 👥 Grupo | grupo-2 |

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Ionic | 7+ | Framework principal |
| Angular | 17+ Standalone | Frontend y routing |
| Capacitor | 5+ | Compilación nativa Android |
| TypeScript | 5.x | Lenguaje principal |
| @ionic/storage-angular | 4.x | Persistencia de tokens JWT |
| Angular HttpClient | Built-in | Consumo de la API REST |
| API REST FastAPI ITLA | — | Backend de datos |

---

## 📦 Módulos

### 🔓 Públicos (sin login)

| # | Módulo | Descripción |
|---|---|---|
| 1 | Inicio / Dashboard | Slider de imágenes y acceso rápido a secciones |
| 2 | Registro y Activación | Registro con matrícula ITLA + activación con contraseña |
| 3 | Noticias Automotrices | Noticias del mundo automotriz dominicano |
| 4 | Videos Educativos | Galería de videos de YouTube sobre mantenimiento |
| 5 | Catálogo de Vehículos | Búsqueda con galería y especificaciones técnicas |
| 6 | Foro Comunitario | Lectura de temas y respuestas |
| 7 | Acerca De | Información del equipo de desarrollo |

### 🔒 Con Login (autenticados)

| # | Módulo | Descripción |
|---|---|---|
| 8 | Iniciar Sesión | Login con matrícula + recuperar contraseña |
| 9 | Mi Perfil | Ver/editar perfil y cambiar foto |
| 10 | Mis Vehículos | Registrar vehículos y ver resumen financiero |
| 11 | Mantenimientos | Registro con tipo, costo, piezas y hasta 5 fotos |
| 12 | Combustible y Aceite | Control de cargas y cambios de aceite |
| 13 | Estado de Gomas | Actualizar estado y registrar pinchazos |
| 14 | Gastos e Ingresos | Control financiero por vehículo |
| 15 | Foro — Participar | Crear temas y responder |

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/xM1KeManx/CARINFO.git
cd CARINFO/carinfo

# Instalar dependencias
npm install

# Ejecutar en navegador
ionic serve

# Compilar para Android
ionic build
npx cap sync android
npx cap open android
```

---

## 📁 Estructura

```
src/
├── app/
│   ├── guards/           # authGuard
│   ├── services/         # ApiService, AuthService
│   ├── pages/            # 15 módulos
│   │   ├── registro/
│   │   ├── activar/
│   │   ├── login/
│   │   ├── noticias/
│   │   ├── noticia-detalle/
│   │   ├── videos/
│   │   ├── catalogo/
│   │   ├── catalogo-detalle/
│   │   ├── foro/
│   │   ├── foro-detalle/
│   │   ├── acerca/
│   │   ├── perfil/
│   │   ├── vehiculos/
│   │   ├── vehiculo-detalle/
│   │   ├── mantenimientos/
│   │   ├── combustible/
│   │   ├── gomas/
│   │   ├── gastos/
│   │   ├── ingresos/
│   │   └── mis-temas/
│   ├── home/
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.ts
└── assets/
```

---

## 🔗 API

```
Base URL: https://taller-itla.ia3x.com/api/
Swagger:  https://taller-itla.ia3x.com/api/swagger/
```

> Todos los POST envían datos en campo `datax` via `form-encoded`. Las fotos van como `multipart/form-data`.

---

## 📲 Descarga

| Recurso | Enlace |
|---|---|
| 📦 APK | [Descargar APK](https://drive.google.com/file/d/1PmCJob2oJynzShOnA_9Qm9AI0xKFzIVx/view?usp=sharing) |
| 🎥 Video demo | [Ver video](https://drive.google.com/file/d/1n8_XLBL_xbmaV3MQa1s3_d6NxzxaTNqx/view?usp=sharing) |

---

## 📄 Licencia

Proyecto académico — ITLA 2026 — Todos los derechos reservados.****
