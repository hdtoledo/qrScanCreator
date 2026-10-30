import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QRType =
  | 'link'
  | 'text'
  | 'email'
  | 'call'
  | 'sms'
  | 'vcard'
  | 'whatsapp'
  | 'wifi'
  | 'pdf'
  | 'app'
  | 'images'
  | 'video'
  | 'social'
  | 'event'
  | 'barcode';

export type DesignTab = 'marco' | 'forma' | 'logo';

export type FrameStyle =
  | 'none'
  | 'frame-bottom-icon'
  | 'frame-bottom-solid'
  | 'frame-bottom-pill'
  | 'frame-circle'
  | 'frame-phone'
  | 'frame-clipboard'
  | 'frame-stand'
  | 'frame-bag';

export type DotStyle =
  | 'square'
  | 'rounded'
  | 'bars-h'
  | 'fluid'
  | 'diamond'
  | 'extra-rounded'
  | 'leaf'
  | 'dots';

export type CornerStyle =
  | 'square'
  | 'rounded'
  | 'circle'
  | 'leaf-tl'
  | 'leaf-diag'
  | 'leaf-br'
  | 'square-circle'
  | 'rounded-tl';

export type LogoPreset =
  | 'none'
  | 'link'
  | 'location'
  | 'email'
  | 'whatsapp'
  | 'wifi'
  | 'vcard'
  | 'paypal'
  | 'bitcoin'
  | 'scan-me-box'
  | 'scan-me-text'
  | 'qr-tray'
  | 'menu-box'
  | 'restaurant';

export interface QRContentState {
  link: { url: string };
  text: { text: string };
  email: { email: string; subject: string; body: string };
  call: { phone: string };
  sms: { phone: string; message: string };
  vcard: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    jobTitle: string;
    website: string;
    address: string;
  };
  whatsapp: { phone: string; message: string };
  wifi: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
  };
  pdf: { url: string; title: string; description: string };
  app: { appName: string; iosUrl: string; androidUrl: string };
  images: { imageUrl: string; galleryTitle: string };
  video: { videoUrl: string; title: string };
  social: { platform: string; username: string; profileUrl: string };
  event: {
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  };
  barcode: { code: string; format: string };
}

export interface QRDesignState {
  activeTab: DesignTab;
  frame: {
    style: FrameStyle;
    phrase: string;
    font: string;
    color: string;
  };
  shape: {
    dotStyle: DotStyle;
    bgColor: string;
    transparentBg: boolean;
    fgColor: string;
    gradient: boolean;
    gradientColor: string;
    cornerStyle: CornerStyle;
    cornerColor: string;
  };
  logo: {
    preset: LogoPreset;
    customLogoDataUrl: string | null;
    customLogoName: string;
  };
}

export interface QRState {
  activeType: QRType;
  content: QRContentState;
  design: QRDesignState;
  ui: {
    isInitialLoading: boolean;
    isContentLoading: boolean;
    isDesignTabLoading: boolean;
  };
}

const initialState: QRState = {
  activeType: 'link',
  content: {
    link: { url: '' },
    text: { text: '' },
    email: {
      email: '',
      subject: '',
      body: '',
    },
    call: { phone: '' },
    sms: { phone: '', message: '' },
    vcard: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      company: '',
      jobTitle: '',
      website: '',
      address: '',
    },
    whatsapp: {
      phone: '',
      message: '',
    },
    wifi: {
      ssid: '',
      password: '',
      encryption: 'WPA',
      hidden: false,
    },
    pdf: {
      url: '',
      title: '',
      description: '',
    },
    app: {
      appName: '',
      iosUrl: '',
      androidUrl: '',
    },
    images: {
      imageUrl: '',
      galleryTitle: '',
    },
    video: {
      videoUrl: '',
      title: '',
    },
    social: {
      platform: 'Instagram',
      username: '',
      profileUrl: '',
    },
    event: {
      title: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    },
    barcode: {
      code: '',
      format: 'EAN-13 / QR-2D',
    },
  },
  design: {
    activeTab: 'marco',
    frame: {
      style: 'frame-bottom-solid',
      phrase: '',
      font: 'Sans-Serif',
      color: '#000000',
    },
    shape: {
      dotStyle: 'square',
      bgColor: '#FFFFFF',
      transparentBg: false,
      fgColor: '#000000',
      gradient: false,
      gradientColor: '#00b27a',
      cornerStyle: 'square',
      cornerColor: '#000000',
    },
    logo: {
      preset: 'none',
      customLogoDataUrl: null,
      customLogoName: '',
    },
  },
  ui: {
    isInitialLoading: true,
    isContentLoading: false,
    isDesignTabLoading: false,
  },
};

export const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setActiveType: (state, action: PayloadAction<QRType>) => {
      state.activeType = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<DesignTab>) => {
      state.design.activeTab = action.payload;
    },
    setInitialLoading: (state, action: PayloadAction<boolean>) => {
      state.ui.isInitialLoading = action.payload;
    },
    setContentLoading: (state, action: PayloadAction<boolean>) => {
      state.ui.isContentLoading = action.payload;
    },
    setDesignTabLoading: (state, action: PayloadAction<boolean>) => {
      state.ui.isDesignTabLoading = action.payload;
    },
    updateLinkContent: (state, action: PayloadAction<string>) => {
      state.content.link.url = action.payload;
    },
    updateTextContent: (state, action: PayloadAction<string>) => {
      state.content.text.text = action.payload;
    },
    updateEmailContent: (
      state,
      action: PayloadAction<Partial<QRContentState['email']>>
    ) => {
      state.content.email = { ...state.content.email, ...action.payload };
    },
    updateCallContent: (state, action: PayloadAction<string>) => {
      state.content.call.phone = action.payload;
    },
    updateSmsContent: (
      state,
      action: PayloadAction<Partial<QRContentState['sms']>>
    ) => {
      state.content.sms = { ...state.content.sms, ...action.payload };
    },
    updateVCardContent: (
      state,
      action: PayloadAction<Partial<QRContentState['vcard']>>
    ) => {
      state.content.vcard = { ...state.content.vcard, ...action.payload };
    },
    updateWhatsappContent: (
      state,
      action: PayloadAction<Partial<QRContentState['whatsapp']>>
    ) => {
      state.content.whatsapp = { ...state.content.whatsapp, ...action.payload };
    },
    updateWifiContent: (
      state,
      action: PayloadAction<Partial<QRContentState['wifi']>>
    ) => {
      state.content.wifi = { ...state.content.wifi, ...action.payload };
    },
    updatePdfContent: (
      state,
      action: PayloadAction<Partial<QRContentState['pdf']>>
    ) => {
      state.content.pdf = { ...state.content.pdf, ...action.payload };
    },
    updateAppContent: (
      state,
      action: PayloadAction<Partial<QRContentState['app']>>
    ) => {
      state.content.app = { ...state.content.app, ...action.payload };
    },
    updateImagesContent: (
      state,
      action: PayloadAction<Partial<QRContentState['images']>>
    ) => {
      state.content.images = { ...state.content.images, ...action.payload };
    },
    updateVideoContent: (
      state,
      action: PayloadAction<Partial<QRContentState['video']>>
    ) => {
      state.content.video = { ...state.content.video, ...action.payload };
    },
    updateSocialContent: (
      state,
      action: PayloadAction<Partial<QRContentState['social']>>
    ) => {
      state.content.social = { ...state.content.social, ...action.payload };
    },
    updateEventContent: (
      state,
      action: PayloadAction<Partial<QRContentState['event']>>
    ) => {
      state.content.event = { ...state.content.event, ...action.payload };
    },
    updateBarcodeContent: (
      state,
      action: PayloadAction<Partial<QRContentState['barcode']>>
    ) => {
      state.content.barcode = { ...state.content.barcode, ...action.payload };
    },
    // Frame reducers
    setFrameStyle: (state, action: PayloadAction<FrameStyle>) => {
      state.design.frame.style = action.payload;
    },
    setFramePhrase: (state, action: PayloadAction<string>) => {
      state.design.frame.phrase = action.payload;
    },
    setFrameFont: (state, action: PayloadAction<string>) => {
      state.design.frame.font = action.payload;
    },
    setFrameColor: (state, action: PayloadAction<string>) => {
      state.design.frame.color = action.payload;
    },
    // Shape reducers
    setDotStyle: (state, action: PayloadAction<DotStyle>) => {
      state.design.shape.dotStyle = action.payload;
    },
    setBgColor: (state, action: PayloadAction<string>) => {
      state.design.shape.bgColor = action.payload;
    },
    setTransparentBg: (state, action: PayloadAction<boolean>) => {
      state.design.shape.transparentBg = action.payload;
    },
    setFgColor: (state, action: PayloadAction<string>) => {
      state.design.shape.fgColor = action.payload;
    },
    setGradient: (state, action: PayloadAction<boolean>) => {
      state.design.shape.gradient = action.payload;
    },
    setGradientColor: (state, action: PayloadAction<string>) => {
      state.design.shape.gradientColor = action.payload;
    },
    setCornerStyle: (state, action: PayloadAction<CornerStyle>) => {
      state.design.shape.cornerStyle = action.payload;
    },
    setCornerColor: (state, action: PayloadAction<string>) => {
      state.design.shape.cornerColor = action.payload;
    },
    // Logo reducers
    setLogoPreset: (state, action: PayloadAction<LogoPreset>) => {
      state.design.logo.preset = action.payload;
      if (action.payload !== 'none') {
        state.design.logo.customLogoDataUrl = null;
        state.design.logo.customLogoName = '';
      }
    },
    setCustomLogo: (
      state,
      action: PayloadAction<{ dataUrl: string | null; name: string }>
    ) => {
      state.design.logo.customLogoDataUrl = action.payload.dataUrl;
      state.design.logo.customLogoName = action.payload.name;
      if (action.payload.dataUrl) {
        state.design.logo.preset = 'none';
      }
    },
  },
});

export const {
  setActiveType,
  setActiveTab,
  setInitialLoading,
  setContentLoading,
  setDesignTabLoading,
  updateLinkContent,
  updateTextContent,
  updateEmailContent,
  updateCallContent,
  updateSmsContent,
  updateVCardContent,
  updateWhatsappContent,
  updateWifiContent,
  updatePdfContent,
  updateAppContent,
  updateImagesContent,
  updateVideoContent,
  updateSocialContent,
  updateEventContent,
  updateBarcodeContent,
  setFrameStyle,
  setFramePhrase,
  setFrameFont,
  setFrameColor,
  setDotStyle,
  setBgColor,
  setTransparentBg,
  setFgColor,
  setGradient,
  setGradientColor,
  setCornerStyle,
  setCornerColor,
  setLogoPreset,
  setCustomLogo,
} = qrSlice.actions;

export function selectQRValue(state: { qr: QRState }): string {
  const { activeType, content } = state.qr;
  switch (activeType) {
    case 'link':
      return content.link.url.trim() || 'https://ejemplo.com';
    case 'text':
      return content.text.text.trim() || 'Texto de ejemplo';
    case 'email': {
      const { email, subject, body } = content.email;
      return `mailto:${email || 'correo@ejemplo.com'}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
    case 'call':
      return `tel:${content.call.phone.trim() || '+34600000000'}`;
    case 'sms':
      return `smsto:${content.sms.phone.trim() || '+34600000000'}:${content.sms.message}`;
    case 'vcard': {
      const v = content.vcard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName}`,
        `FN:${v.firstName} ${v.lastName}`,
        `ORG:${v.company}`,
        `TITLE:${v.jobTitle}`,
        `TEL:${v.phone}`,
        `EMAIL:${v.email}`,
        `URL:${v.website}`,
        `ADR:;;${v.address}`,
        'END:VCARD',
      ].join('\n');
    }
    case 'whatsapp': {
      const cleanPhone = content.whatsapp.phone.replace(/[^\d]/g, '') || '34600000000';
      return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(content.whatsapp.message)}`;
    }
    case 'wifi': {
      const w = content.wifi;
      return `WIFI:T:${w.encryption};S:${w.ssid || 'RedWiFi'};P:${w.password};H:${w.hidden ? 'true' : 'false'};;`;
    }
    case 'pdf':
      return content.pdf.url.trim() || 'https://ejemplo.com/documento.pdf';
    case 'app':
      return content.app.androidUrl.trim() || content.app.iosUrl.trim() || 'https://play.google.com';
    case 'images':
      return content.images.imageUrl.trim() || 'https://ejemplo.com/galeria';
    case 'video':
      return content.video.videoUrl.trim() || 'https://youtube.com';
    case 'social':
      return content.social.profileUrl.trim() || 'https://instagram.com';
    case 'event': {
      const e = content.event;
      const formatDt = (s: string) => s.replace(/[-:]/g, '') + '00';
      return [
        'BEGIN:VEVENT',
        `SUMMARY:${e.title || 'Evento'}`,
        `LOCATION:${e.location}`,
        `DTSTART:${formatDt(e.startDate)}`,
        `DTEND:${formatDt(e.endDate)}`,
        `DESCRIPTION:${e.description}`,
        'END:VEVENT',
      ].join('\n');
    }
    case 'barcode':
      return content.barcode.code.trim() || '7501031311309';
    default:
      return 'https://ejemplo.com';
  }
}

export default qrSlice.reducer;

