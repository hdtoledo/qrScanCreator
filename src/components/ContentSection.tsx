import React from 'react';
import {
  updateAppContent,
  updateBarcodeContent,
  updateCallContent,
  updateEmailContent,
  updateEventContent,
  updateImagesContent,
  updateLinkContent,
  updatePdfContent,
  updateSmsContent,
  updateSocialContent,
  updateTextContent,
  updateVCardContent,
  updateVideoContent,
  updateWhatsappContent,
  updateWifiContent,
} from '../store/qrSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { ContentFormSkeleton } from './Skeletons';

const inputClasses =
  'w-full bg-white rounded-lg px-4 py-3 text-[13.5px] text-slate-700 placeholder:text-slate-400 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#00b27a] focus:ring-1 focus:ring-[#00b27a] transition-colors';

const labelClasses = 'block text-xs font-medium text-[#334155] mb-2';

export const ContentSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeType, content, ui } = useAppSelector((state) => state.qr);

  const renderFormByType = () => {
    switch (activeType) {
      case 'link':
        return (
          <div>
            <label className={labelClasses}>Introduce tu sitio web</label>
            <input
              type="url"
              value={content.link.url}
              onChange={(e) => dispatch(updateLinkContent(e.target.value))}
              placeholder="https://www.tusitioweb.com"
              className={inputClasses}
            />
          </div>
        );

      case 'text':
        return (
          <div>
            <label className={labelClasses}>Introduce tu texto</label>
            <textarea
              rows={3}
              value={content.text.text}
              onChange={(e) => dispatch(updateTextContent(e.target.value))}
              placeholder="Escribe aquí el texto o mensaje que quieras mostrar..."
              className={inputClasses}
            />
          </div>
        );

      case 'email':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Correo electrónico</label>
              <input
                type="email"
                value={content.email.email}
                onChange={(e) =>
                  dispatch(updateEmailContent({ email: e.target.value }))
                }
                placeholder="contacto@ejemplo.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Asunto</label>
              <input
                type="text"
                value={content.email.subject}
                onChange={(e) =>
                  dispatch(updateEmailContent({ subject: e.target.value }))
                }
                placeholder="Asunto del correo"
                className={inputClasses}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClasses}>Mensaje</label>
              <textarea
                rows={2}
                value={content.email.body}
                onChange={(e) =>
                  dispatch(updateEmailContent({ body: e.target.value }))
                }
                placeholder="Escribe el cuerpo del mensaje..."
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'call':
        return (
          <div>
            <label className={labelClasses}>Número de teléfono</label>
            <input
              type="tel"
              value={content.call.phone}
              onChange={(e) => dispatch(updateCallContent(e.target.value))}
              placeholder="+34 600 000 000"
              className={inputClasses}
            />
          </div>
        );

      case 'sms':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Número de teléfono</label>
              <input
                type="tel"
                value={content.sms.phone}
                onChange={(e) =>
                  dispatch(updateSmsContent({ phone: e.target.value }))
                }
                placeholder="+34 600 000 000"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Mensaje SMS</label>
              <input
                type="text"
                value={content.sms.message}
                onChange={(e) =>
                  dispatch(updateSmsContent({ message: e.target.value }))
                }
                placeholder="Escribe tu mensaje SMS..."
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Nombre</label>
              <input
                type="text"
                value={content.vcard.firstName}
                onChange={(e) =>
                  dispatch(updateVCardContent({ firstName: e.target.value }))
                }
                placeholder="Juan"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Apellidos</label>
              <input
                type="text"
                value={content.vcard.lastName}
                onChange={(e) =>
                  dispatch(updateVCardContent({ lastName: e.target.value }))
                }
                placeholder="Pérez"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Teléfono</label>
              <input
                type="tel"
                value={content.vcard.phone}
                onChange={(e) =>
                  dispatch(updateVCardContent({ phone: e.target.value }))
                }
                placeholder="+34 600 123 456"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>E-mail</label>
              <input
                type="email"
                value={content.vcard.email}
                onChange={(e) =>
                  dispatch(updateVCardContent({ email: e.target.value }))
                }
                placeholder="juan@empresa.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Empresa</label>
              <input
                type="text"
                value={content.vcard.company}
                onChange={(e) =>
                  dispatch(updateVCardContent({ company: e.target.value }))
                }
                placeholder="Mi Empresa S.A."
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Cargo</label>
              <input
                type="text"
                value={content.vcard.jobTitle}
                onChange={(e) =>
                  dispatch(updateVCardContent({ jobTitle: e.target.value }))
                }
                placeholder="Director"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Sitio web</label>
              <input
                type="url"
                value={content.vcard.website}
                onChange={(e) =>
                  dispatch(updateVCardContent({ website: e.target.value }))
                }
                placeholder="https://www.miempresa.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Dirección</label>
              <input
                type="text"
                value={content.vcard.address}
                onChange={(e) =>
                  dispatch(updateVCardContent({ address: e.target.value }))
                }
                placeholder="Calle Principal 123"
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Número de WhatsApp</label>
              <input
                type="tel"
                value={content.whatsapp.phone}
                onChange={(e) =>
                  dispatch(updateWhatsappContent({ phone: e.target.value }))
                }
                placeholder="+34 600 000 000"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Mensaje predeterminado</label>
              <input
                type="text"
                value={content.whatsapp.message}
                onChange={(e) =>
                  dispatch(updateWhatsappContent({ message: e.target.value }))
                }
                placeholder="¡Hola! Quiero más información..."
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className={labelClasses}>Nombre de la red (SSID)</label>
              <input
                type="text"
                value={content.wifi.ssid}
                onChange={(e) =>
                  dispatch(updateWifiContent({ ssid: e.target.value }))
                }
                placeholder="MiRedWiFi"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Contraseña</label>
              <input
                type="text"
                value={content.wifi.password}
                onChange={(e) =>
                  dispatch(updateWifiContent({ password: e.target.value }))
                }
                placeholder="Contraseña Wi-Fi"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Seguridad</label>
              <select
                value={content.wifi.encryption}
                onChange={(e) =>
                  dispatch(
                    updateWifiContent({
                      encryption: e.target.value as 'WPA' | 'WEP' | 'nopass',
                    })
                  )
                }
                className={inputClasses}
              >
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Sin contraseña</option>
              </select>
            </div>
          </div>
        );

      case 'pdf':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className={labelClasses}>Enlace al archivo PDF</label>
              <input
                type="url"
                value={content.pdf.url}
                onChange={(e) =>
                  dispatch(updatePdfContent({ url: e.target.value }))
                }
                placeholder="https://ejemplo.com/catalogo.pdf"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Título del documento</label>
              <input
                type="text"
                value={content.pdf.title}
                onChange={(e) =>
                  dispatch(updatePdfContent({ title: e.target.value }))
                }
                placeholder="Catálogo 2026"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Descripción</label>
              <input
                type="text"
                value={content.pdf.description}
                onChange={(e) =>
                  dispatch(updatePdfContent({ description: e.target.value }))
                }
                placeholder="Descripción breve"
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'app':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className={labelClasses}>Nombre de la App</label>
              <input
                type="text"
                value={content.app.appName}
                onChange={(e) =>
                  dispatch(updateAppContent({ appName: e.target.value }))
                }
                placeholder="Mi Aplicación"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Enlace Google Play (Android)</label>
              <input
                type="url"
                value={content.app.androidUrl}
                onChange={(e) =>
                  dispatch(updateAppContent({ androidUrl: e.target.value }))
                }
                placeholder="https://play.google.com/store/..."
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Enlace App Store (iOS)</label>
              <input
                type="url"
                value={content.app.iosUrl}
                onChange={(e) =>
                  dispatch(updateAppContent({ iosUrl: e.target.value }))
                }
                placeholder="https://apps.apple.com/..."
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'images':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>URL de la imagen o galería</label>
              <input
                type="url"
                value={content.images.imageUrl}
                onChange={(e) =>
                  dispatch(updateImagesContent({ imageUrl: e.target.value }))
                }
                placeholder="https://ejemplo.com/imagen.jpg"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Título de la galería</label>
              <input
                type="text"
                value={content.images.galleryTitle}
                onChange={(e) =>
                  dispatch(
                    updateImagesContent({ galleryTitle: e.target.value })
                  )
                }
                placeholder="Mi Galería"
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Enlace del vídeo (YouTube, Vimeo, etc.)</label>
              <input
                type="url"
                value={content.video.videoUrl}
                onChange={(e) =>
                  dispatch(updateVideoContent({ videoUrl: e.target.value }))
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Título del vídeo</label>
              <input
                type="text"
                value={content.video.title}
                onChange={(e) =>
                  dispatch(updateVideoContent({ title: e.target.value }))
                }
                placeholder="Vídeo oficial"
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className={labelClasses}>Red social</label>
              <select
                value={content.social.platform}
                onChange={(e) =>
                  dispatch(updateSocialContent({ platform: e.target.value }))
                }
                className={inputClasses}
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Facebook">Facebook</option>
                <option value="X / Twitter">X / Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="YouTube">YouTube</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Usuario</label>
              <input
                type="text"
                value={content.social.username}
                onChange={(e) =>
                  dispatch(updateSocialContent({ username: e.target.value }))
                }
                placeholder="@tu_usuario"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>URL del perfil</label>
              <input
                type="url"
                value={content.social.profileUrl}
                onChange={(e) =>
                  dispatch(updateSocialContent({ profileUrl: e.target.value }))
                }
                placeholder="https://www.instagram.com/tu_usuario"
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'event':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Nombre del evento</label>
              <input
                type="text"
                value={content.event.title}
                onChange={(e) =>
                  dispatch(updateEventContent({ title: e.target.value }))
                }
                placeholder="Concierto en Vivo"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Ubicación</label>
              <input
                type="text"
                value={content.event.location}
                onChange={(e) =>
                  dispatch(updateEventContent({ location: e.target.value }))
                }
                placeholder="Auditorio Nacional"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Inicio del evento</label>
              <input
                type="datetime-local"
                value={content.event.startDate}
                onChange={(e) =>
                  dispatch(updateEventContent({ startDate: e.target.value }))
                }
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Fin del evento</label>
              <input
                type="datetime-local"
                value={content.event.endDate}
                onChange={(e) =>
                  dispatch(updateEventContent({ endDate: e.target.value }))
                }
                className={inputClasses}
              />
            </div>
          </div>
        );

      case 'barcode':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className={labelClasses}>Código / Serial 2D</label>
              <input
                type="text"
                value={content.barcode.code}
                onChange={(e) =>
                  dispatch(updateBarcodeContent({ code: e.target.value }))
                }
                placeholder="7501031311309"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Formato de codificación</label>
              <select
                value={content.barcode.format}
                onChange={(e) =>
                  dispatch(updateBarcodeContent({ format: e.target.value }))
                }
                className={inputClasses}
              >
                <option value="EAN-13 / QR-2D">EAN-13 / QR-2D</option>
                <option value="DataMatrix 2D">DataMatrix 2D</option>
                <option value="UPC-A">UPC-A</option>
                <option value="Code-128">Code-128</option>
              </select>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="space-y-3.5">
      <div className="flex items-center gap-2.5">
        <span className="w-6 h-6 rounded bg-[#1e293b] text-white text-xs font-bold flex items-center justify-center shrink-0">
          1
        </span>
        <h2 className="text-[15px] font-medium text-[#1e293b]">
          Completa el contenido
        </h2>
      </div>

      {ui.isContentLoading ? <ContentFormSkeleton /> : renderFormByType()}
    </section>
  );
};

