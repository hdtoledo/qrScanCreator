import React from 'react';
import {
  Link2,
  AlignLeft,
  Mail,
  PhoneCall,
  MessageSquare,
  Contact,
  MessageCircle,
  Wifi,
  FileText,
  Smartphone,
  Images,
  PlayCircle,
  Share2,
  Calendar,
  Barcode,
} from 'lucide-react';
import {
  QRType,
  setActiveType,
  setContentLoading,
} from '../store/qrSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

interface TypeOption {
  id: QRType;
  label: string;
  icon: React.FC<{ className?: string }>;
}

const QR_TYPE_OPTIONS: TypeOption[] = [
  { id: 'link', label: 'Enlace', icon: Link2 },
  { id: 'text', label: 'Texto', icon: AlignLeft },
  { id: 'email', label: 'E-mail', icon: Mail },
  { id: 'call', label: 'Llamada', icon: PhoneCall },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'vcard', label: 'V-card', icon: Contact },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'wifi', label: 'WI-FI', icon: Wifi },
  { id: 'pdf', label: 'PDF', icon: FileText },
  { id: 'app', label: 'Aplicación', icon: Smartphone },
  { id: 'images', label: 'Imágenes', icon: Images },
  { id: 'video', label: 'Vídeo', icon: PlayCircle },
  { id: 'social', label: 'Redes sociales', icon: Share2 },
  { id: 'event', label: 'Evento', icon: Calendar },
  { id: 'barcode', label: 'Código 2D', icon: Barcode },
];

export const QRTypeSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeType = useAppSelector((state) => state.qr.activeType);

  const handleSelectType = (type: QRType) => {
    if (type === activeType) return;
    dispatch(setContentLoading(true));
    dispatch(setActiveType(type));
    setTimeout(() => {
      dispatch(setContentLoading(false));
    }, 240);
  };

  return (
    <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-slate-100">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 sm:gap-2">
        {QR_TYPE_OPTIONS.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectType(item.id)}
              className={`flex items-center justify-center gap-2 py-2.5 px-2 rounded-md text-xs sm:text-[13px] font-medium transition-all cursor-pointer border ${
                isActive
                  ? 'bg-[#e6f7f1] border-[#00b27a] text-[#00a870] shadow-[0_1px_2px_rgba(0,178,122,0.08)]'
                  : 'bg-white border-transparent text-[#1e293b] hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-[#00a870]' : 'text-[#1e293b]'
                }`}
              />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

