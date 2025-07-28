# ⚽ Pickup Soccer App

Una aplicación móvil moderna para organizar partidos de fútbol amateur en Lima, Perú. Conecta jugadores, facilita la reserva de canchas y gestiona torneos de manera intuitiva.

## 🚀 Características Principales

### 📱 **Experiencia Móvil Optimizada**
- **Diseño responsive** inspirado en FIFA Mobile, Strava y Meetup
- **Navegación intuitiva** con barra inferior
- **Interfaz moderna** con Tailwind CSS y animaciones fluidas

### 🏠 **Home - Partidos Cercanos**
- **Geolocalización** para encontrar partidos cerca de ti
- **Filtros inteligentes** por distrito y fecha (solo fechas futuras)
- **Información detallada** de cada partido con precio por jugador
- **Modal interactivo** para ver jugadores inscritos por equipos

### 🏆 **Torneos**
- **Torneos disponibles** con información completa
- **Filtros avanzados** por ubicación y fecha
- **Detalles de premios** y cuotas de inscripción

### ➕ **Crear Partido/Torneo**
- **Flujo guiado** de 8 pasos intuitivos
- **Validación en tiempo real** con indicadores visuales
- **Opciones de formato**: 6vs6, 7vs7, 8vs8, 11vs11
- **Configuración de equipos** (chalecos o colores)
- **Métodos de pago**: Transferencia bancaria y Yape/Plin

### 📊 **Historial**
- **Partidos y torneos** en los que has participado
- **Estadísticas detalladas** de rendimiento
- **Resultados y ubicaciones** de eventos pasados

### 👤 **Perfil**
- **Información personal** y estadísticas FIFA-style
- **Rating promedio** basado en habilidades
- **Partidos activos** y próximos eventos
- **Configuración** de notificaciones y privacidad

## 🛠️ Stack Tecnológico

### **Frontend**
- **React 18** - Framework principal
- **React Router DOM** - Navegación y rutas
- **Tailwind CSS** - Estilos y responsive design
- **Lucide React** - Iconografía consistente
- **Framer Motion** - Animaciones fluidas
- **React Hot Toast** - Notificaciones

### **Backend & Servicios**
- **Supabase** - Base de datos y autenticación
- **Geolocalización** - API nativa del navegador
- **Stripe/PayPal** - Procesamiento de pagos (simulado)

### **Herramientas de Desarrollo**
- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **PostCSS** - Procesamiento de CSS

## 📦 Instalación y Configuración

### **Prerrequisitos**
- Node.js >= 16.0.0
- npm >= 8.0.0

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/scplasenciac/pickupsoccer.git
cd pickupsoccer
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**

#### **Desarrollo**
```bash
# Copiar archivo de desarrollo
cp env.development .env

# Editar .env con tus credenciales
REACT_APP_SUPABASE_URL=tu_url_de_supabase_dev
REACT_APP_SUPABASE_ANON_KEY=tu_clave_anonima_dev
REACT_APP_STRIPE_PUBLISHABLE_KEY=tu_clave_stripe_test
REACT_APP_GOOGLE_MAPS_API_KEY=tu_clave_google_maps
```

#### **Producción**
```bash
# Copiar archivo de producción
cp env.production .env

# Editar .env con tus credenciales de producción
REACT_APP_SUPABASE_URL=tu_url_de_supabase_prod
REACT_APP_SUPABASE_ANON_KEY=tu_clave_anonima_prod
REACT_APP_STRIPE_PUBLISHABLE_KEY=tu_clave_stripe_live
REACT_APP_GOOGLE_MAPS_API_KEY=tu_clave_google_maps_prod
```

### **4. Ejecutar la Aplicación**

#### **Desarrollo**
```bash
npm run dev
# o
npm start
```

#### **Producción**
```bash
npm run build:prod
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia con variables de desarrollo
npm start            # Inicia la aplicación

# Construcción
npm run build:dev    # Build para desarrollo
npm run build:prod   # Build para producción
npm run build        # Build estándar

# Calidad de Código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de linting
npm run format       # Formatear código con Prettier

# Testing
npm test             # Ejecutar tests
npm run analyze      # Analizar bundle
```

## 🗄️ Configuración de Supabase

### **Tablas Requeridas**

#### **1. users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  age INTEGER,
  position VARCHAR,
  team VARCHAR,
  location VARCHAR,
  stats JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **2. partidos**
```sql
CREATE TABLE partidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  max_players INTEGER NOT NULL,
  current_players INTEGER DEFAULT 0,
  price DECIMAL(10,2) NOT NULL,
  type VARCHAR DEFAULT 'público',
  chalecos BOOLEAN DEFAULT false,
  equipo_a_color VARCHAR DEFAULT 'blanco',
  equipo_b_color VARCHAR DEFAULT 'oscuro',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **3. torneos**
```sql
CREATE TABLE torneos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_teams INTEGER NOT NULL,
  current_teams INTEGER DEFAULT 0,
  prize DECIMAL(10,2),
  entry_fee DECIMAL(10,2),
  status VARCHAR DEFAULT 'inscripciones',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **4. reservas**
```sql
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partido_id UUID REFERENCES partidos(id),
  user_id UUID REFERENCES users(id),
  position VARCHAR NOT NULL,
  team VARCHAR NOT NULL,
  payment_status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **5. payments**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  partido_id UUID REFERENCES partidos(id),
  amount DECIMAL(10,2) NOT NULL,
  method VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  transaction_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Configuración para GitHub

### **1. Inicializar Git**
```bash
git init
git add .
git commit -m "Initial commit: Pickup Soccer App"
```

### **2. Crear Repositorio en GitHub**
- Ve a GitHub y crea un nuevo repositorio
- No inicialices con README, .gitignore o license

### **3. Conectar y Subir**
```bash
git remote add origin https://github.com/scplasenciac/pickupsoccer.git
git branch -M main
git push -u origin main
```

### **4. Configurar GitHub Actions (Opcional)**
Crea `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build for production
      run: npm run build:prod
      env:
        REACT_APP_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
        REACT_APP_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
        REACT_APP_STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
        
    - name: Deploy to hosting service
      # Configurar según tu servicio de hosting
```

## 🔒 Seguridad

### **Variables de Entorno**
- **Nunca** subir archivos `.env` al repositorio
- Usar **GitHub Secrets** para variables de producción
- **Rotar claves** regularmente

### **Validación de Datos**
- **Validación del lado cliente** con React Hook Form
- **Validación del lado servidor** en Supabase
- **Sanitización** de inputs de usuario

## 📊 Analytics y Monitoreo

### **Métricas Recomendadas**
- **Usuarios activos** diarios/mensuales
- **Partidos creados** por semana
- **Tasa de conversión** de reservas
- **Tiempo de sesión** promedio

### **Herramientas Sugeridas**
- **Google Analytics** para métricas web
- **Supabase Analytics** para base de datos
- **Sentry** para monitoreo de errores

## 🤝 Contribución

### **1. Fork el Proyecto**
### **2. Crear Rama de Feature**
```bash
git checkout -b feature/nueva-funcionalidad
```
### **3. Commit Cambios**
```bash
git commit -m "feat: agregar nueva funcionalidad"
```
### **4. Push a la Rama**
```bash
git push origin feature/nueva-funcionalidad
```
### **5. Abrir Pull Request**

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

- **Issues**: [GitHub Issues](https://github.com/scplasenciac/pickupsoccer/issues)
- **Documentación**: [Wiki del Proyecto](https://github.com/scplasenciac/pickupsoccer/wiki)
- **Email**: tu-email@example.com

## 🚧 Funcionalidades Pendientes

- [ ] **Autenticación de usuarios** con Supabase Auth
- [ ] **Notificaciones push** para recordatorios
- [ ] **Integración de mapas** con Google Maps API
- [ ] **Chat en tiempo real** entre jugadores
- [ ] **Sistema de calificaciones** y reviews
- [ ] **Modo offline** con Service Workers
- [ ] **PWA** (Progressive Web App)
- [ ] **Sistema de equipos** y ligas
- [ ] **Estadísticas avanzadas** con gráficos
- [ ] **Modo torneo** con brackets automáticos

---

**Desarrollado con ❤️ para la comunidad de fútbol amateur de Lima**
