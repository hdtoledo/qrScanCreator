# 📱 QR Scan Creator — Generador de Códigos QR Gratuito

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.6-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![License](https://img.shields.io/badge/Licencia-MIT-00b27a?style=for-the-badge)

**Aplicación web moderna, 100% gratuita y de código abierto para crear, diseñar y descargar códigos QR personalizados sin límites ni marcas de agua.**

Desarrollado por **[hdtoledo](https://github.com/hdtoledo)** · Libre para uso personal, educativo y comercial bajo licencia **MIT**.

</div>

---

## ✨ Descripción General

**QR Scan Creator** es una herramienta web de generación y personalización avanzada de códigos QR construida con las últimas tecnologías del ecosistema React. Está diseñada con una interfaz intuitiva en 3 pasos (**Contenido → Diseño → Descarga**), estados reactivos centralizados con **Redux Toolkit (RTK)**, carga progresiva tipo **Skeleton** y renderizado vectorial en tiempo real.

> 💡 **100% Gratuito y Abierto:** Cualquier persona puede usar, modificar, distribuir o integrar esta aplicación de forma totalmente gratuita sin registros, suscripciones ni restricciones.

---

## 🚀 Características Principales

### 1. 15 Tipos de Contenido QR
Soporte nativo para múltiples formatos y protocolos estándar de códigos QR:
- 🔗 **Enlace (URL)**: Sitios web, landing pages y portafolios.
- 📝 **Texto**: Notas, códigos promocionales o mensajes en texto plano.
- ✉️ **E-mail**: Dirección de correo con asunto y cuerpo preconfigurados (`mailto:`).
- 📞 **Llamada**: Marcación telefónica directa (`tel:`).
- 💬 **SMS**: Número telefónico y mensaje de texto predefinido (`smsto:`).
- 🪪 **V-card**: Tarjeta de contacto digital (Nombre, Apellidos, Teléfono, E-mail, Empresa, Cargo, Web y Dirección en formato `VCARD 3.0`).
- 🟢 **WhatsApp**: Enlace directo a chat con mensaje predeterminado (`wa.me`).
- 📶 **WI-FI**: Conexión automática a redes inalámbricas (`WPA/WPA2/WPA3`, `WEP` o abiertas).
- 📄 **PDF**: Enlace a catálogos, menús o documentos descargables.
- 📱 **Aplicación**: Enlaces a tiendas de aplicaciones (Google Play Store y Apple App Store).
- 🖼️ **Imágenes**: Galerías fotográficas o recursos visuales.
- ▶️ **Vídeo**: Enlaces a YouTube, Vimeo o contenido multimedia.
- 🌐 **Redes Sociales**: Perfiles de Instagram, TikTok, Facebook, X/Twitter, LinkedIn o YouTube.
- 📅 **Evento**: Eventos de calendario con fecha/hora de inicio, fin y ubicación (`VEVENT`).
-  barcode **Código 2D**: Codificación de seriales y estándares `EAN-13 / QR-2D`, `DataMatrix 2D`, `UPC-A` y `Code-128`.

### 2. Estudio de Diseño Personalizable
- **🖼️ Marcos (`Marco`)**:
  - **9 estilos de marcos** (sin marco, banner inferior sólido, banner con icono, píldora flotante, insignia circular, mockup de smartphone, portapapeles, pedestal y bolsa/etiqueta).
  - Frase del marco personalizable (ej. `SCAN ME`), selector de tipografía (`Sans-Serif`, `Serif`, `Monospace`, `Georgia`, `Impact`) y selector de color hexadecimal/visual.
- **🎨 Forma y Color (`Forma`)**:
  - **8 estilos de módulos (puntos)**: Cuadrado clásico, redondeado, barras horizontales, fluido, diamante, extra-redondeado, hoja orgánica y puntos circulares.
  - **8 estilos de bordes (esquinas localizadoras)**: Cuadrado, redondeado, circular, gota/hoja en distintas orientaciones y combinado.
  - **Control total de color**: Color de fondo, opción de **Fondo transparente**, color de la forma, opción de **Degradado** bitono y color personalizado para los bordes.
- **🏷️ Logotipos (`Logo`)**:
  - **Subida de logo propio**: Carga cualquier imagen local (`PNG`, `JPG`, `SVG`, `WEBP`) directamente desde el navegador.
  - **14 logos e insignias predefinidas**: Enlace, Ubicación, Correo, WhatsApp, Wi-Fi, V-Card, PayPal, Bitcoin, insignias `SCAN ME`, lector QR y etiquetas de `MENU` / Restaurante.

### 3. Experiencia de Usuario (UI/UX)
- ⚡ **Skeleton Loading**: Componentes de carga tipo *Skeleton* al iniciar la aplicación y al alternar entre tipos de contenido o pestañas de diseño.
- 📐 **Full Responsive**: Diseño adaptable desde pantallas móviles hasta monitores de escritorio.
- 📥 **Exportación en Alta Definición**: Generación con nivel de corrección de errores alto (`Level H`) y descarga instantánea en **PNG de alta resolución (3x)**.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
| :--- | :--- | :--- |
| **React** | `^19.0.0` | Biblioteca principal para la construcción de la interfaz de usuario |
| **Vite** | `^6.2.0` | Entorno de desarrollo ultrarrápido y empaquetador de producción |
| **TypeScript** | `~5.7.2` | Tipado estático para mayor robustez y mantenibilidad |
| **Tailwind CSS** | `^4.0.9` | Framework CSS utility-first para diseño moderno y responsivo |
| **Redux Toolkit (RTK)** | `^2.6.0` | Gestión de estado global predecible y centralizado (`@reduxjs/toolkit` + `react-redux`) |
| **Lucide React** | `^1.16.0` | Iconografía limpia y consistente (`lucide-react`) |
| **QRCode** | `^1.5.4` | Motor matemático para el cálculo de la matriz del código QR |

---

## 📂 Estructura del Proyecto

```text
qrScan/
├── public/
├── src/
│   ├── components/
│   │   ├── ContentSection.tsx     # Paso 1: Formularios dinámicos según el tipo de QR
│   │   ├── DesignAssets.tsx       # Iconos vectoriales de marcos, formas, bordes y logos
│   │   ├── DesignSection.tsx      # Paso 2: Pestañas de personalización (Marco, Forma, Logo)
│   │   ├── QRPreviewSection.tsx   # Paso 3: Renderizador SVG en tiempo real y descarga PNG
│   │   ├── QRTypeSelector.tsx     # Selector superior de los 15 tipos de códigos QR
│   │   └── Skeletons.tsx          # Componentes Skeleton para estados de carga
│   ├── store/
│   │   ├── qrSlice.ts             # Slice de Redux Toolkit con estado, acciones y selectores
│   │   └── store.ts               # Configuración del Store y hooks tipados
│   ├── App.tsx                    # Layout principal responsivo de la aplicación
│   ├── index.css                  # Estilos globales e integración de Tailwind CSS v4
│   ├── main.tsx                   # Punto de entrada de React + Provider de Redux
│   └── vite-env.d.ts              # Declaraciones de tipos para Vite
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Instalación y Uso Local

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/hdtoledo/qrScanCreator.git
cd qrScanCreator
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en `http://localhost:5173`.

### 4. Compilar para producción
```bash
npm run build
npm run preview
```

---

## 🤝 Contribuciones y Uso Libre

Este proyecto ha sido creado con el objetivo de ofrecer una herramienta **totalmente gratuita, sin publicidad intrusiva ni cobros ocultos** para toda la comunidad.

- ¿Quieres añadir nuevos estilos de marcos, plantillas o formatos de exportación? ¡Los *Pull Requests* y *Issues* son bienvenidos!
- Puedes hacer *fork* del repositorio y desplegarlo libremente en **Vercel**, **Netlify**, **GitHub Pages** o tu propio servidor.

---

## 📄 Licencia

Este proyecto está distribuido bajo la **Licencia MIT**. Esto significa que cualquier persona es libre de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software de forma totalmente gratuita. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

<div align="center">

Hecho con ❤️ por **hdtoledo**

</div>

