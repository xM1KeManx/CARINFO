CarInfo — App de Información Automotriz
📱 Descripción
CarInfo es una aplicación móvil para Android desarrollada como proyecto final de Aplicaciones Móviles en el ITLA (Trimestre 1-2026). Permite gestionar de manera integral la información de vehículos: mantenimientos, combustible, gomas, gastos, ingresos, noticias automotrices, foro comunitario, videos educativos y catálogo de vehículos.

👤 Desarrollador
CampoDetalleNombreMichael Emmanuel Sosa AriasMatrícula20232024Correo20232024@itla.edu.doGrupogrupo-2

🛠️ Tecnologías
TecnologíaUsoIonic 7 + Angular 17Framework principal (Standalone)Capacitor 5Compilación nativa AndroidTypeScriptLenguaje principal@ionic/storage-angularPersistencia de tokens JWTAngular HttpClientConsumo de la API RESTAPI REST FastAPI (ITLA)Backend de datos

📦 Módulos
Públicos (sin login)

Inicio / Dashboard — Slider de imágenes y acceso rápido
Registro y Activación — Registro con matrícula ITLA
Noticias Automotrices — Noticias del mundo automotriz dominicano
Videos Educativos — Galería de videos de YouTube
Catálogo de Vehículos — Búsqueda con galería y especificaciones
Foro Comunitario — Solo lectura sin login
Acerca De — Info del equipo de desarrollo

Con login (autenticados)

Iniciar Sesión — Login + recuperar contraseña
Mi Perfil — Ver y editar perfil, cambiar foto
Mis Vehículos — Registrar vehículos y ver resumen financiero
Mantenimientos — Registro con hasta 5 fotos
Combustible y Aceite — Control de cargas y cambios
Estado de Gomas — Actualizar estado y registrar pinchazos
Gastos e Ingresos — Control financiero por vehículo
Foro - Participar — Crear temas y responder


🚀 Instalación y ejecución
bash# Clonar el repositorio
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

📁 Estructura del proyecto
src/
├── app/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── services/
│   │   ├── api.service.ts
│   │   └── auth.service.ts
│   ├── pages/
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

🔗 API Base
https://taller-itla.ia3x.com/api/
Documentación Swagger: https://taller-itla.ia3x.com/api/swagger/
Todos los endpoints POST envían datos JSON en un campo datax via form-encoded. Los archivos se envían como multipart/form-data.

📲 Descarga

APK: Descargar APK
Video demo: Ver en Drive


📄 Licencia
Proyecto académico — ITLA 2026 — Todos los derechos reservados.
