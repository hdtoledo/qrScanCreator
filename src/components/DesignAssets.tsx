import React from 'react';
import { CornerStyle, DotStyle, FrameStyle, LogoPreset } from '../store/qrSlice';

export const MiniQRPattern: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm10-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm8-12h2v2h-2V5zm-2 4h2v2h-2V9zm4 0h2v2h-2V9zm-4 4h2v2h-2v-2zm6 0h2v2h-2v-2zm-4 2h2v2h-2v-2zm-2 2h2v4h-2v-4zm6 0h4v2h-4v-2zm2 2h2v2h-2v-2z" />
  </svg>
);

export const FramePreviewIcon: React.FC<{ style: FrameStyle }> = ({ style }) => {
  switch (style) {
    case 'none':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2c3338]" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case 'frame-bottom-icon':
      return (
        <div className="w-8 h-10 border border-slate-800 rounded-[3px] flex flex-col justify-between overflow-hidden bg-white">
          <div className="flex-1 flex items-center justify-center p-0.5 text-slate-800">
            <MiniQRPattern className="w-5 h-5" />
          </div>
          <div className="bg-slate-900 text-white text-[4px] font-bold py-[2px] px-0.5 flex items-center justify-center gap-0.5 leading-none">
            <span className="w-1.5 h-1.5 rounded-full border border-white inline-block" />
            <span>SCAN ME</span>
          </div>
        </div>
      );
    case 'frame-bottom-solid':
      return (
        <div className="w-8 h-10 border-2 border-slate-900 rounded-[4px] flex flex-col justify-between overflow-hidden bg-white">
          <div className="flex-1 flex items-center justify-center p-0.5 text-slate-800">
            <MiniQRPattern className="w-5 h-5" />
          </div>
          <div className="bg-slate-900 text-white text-[4.5px] font-bold py-[2px] text-center leading-none tracking-wider">
            SCAN ME
          </div>
        </div>
      );
    case 'frame-bottom-pill':
      return (
        <div className="w-8 h-10 flex flex-col items-center justify-between">
          <div className="w-7 h-7 border border-slate-800 rounded-[3px] flex items-center justify-center bg-white text-slate-800">
            <MiniQRPattern className="w-5 h-5" />
          </div>
          <div className="w-8 bg-slate-900 text-white text-[4px] font-bold py-[2px] rounded-sm text-center leading-none">
            SCAN ME
          </div>
        </div>
      );
    case 'frame-circle':
      return (
        <div className="w-9 h-10 flex flex-col items-center justify-between">
          <div className="w-7 h-7 rounded-full border border-slate-800 flex items-center justify-center bg-slate-900 text-white overflow-hidden">
            <MiniQRPattern className="w-5 h-5" />
          </div>
          <div className="text-slate-700 text-[4px] font-bold leading-none">
            SCAN ME
          </div>
        </div>
      );
    case 'frame-phone':
      return (
        <div className="w-7 h-10 border-2 border-slate-900 rounded-[4px] flex flex-col justify-between overflow-hidden bg-white">
          <div className="bg-slate-900 h-1.5 w-full flex items-center justify-center">
            <div className="w-2 h-[1px] bg-white rounded-full" />
          </div>
          <div className="flex-1 flex items-center justify-center text-slate-800">
            <MiniQRPattern className="w-4.5 h-4.5" />
          </div>
          <div className="bg-slate-900 text-white text-[3.8px] font-bold py-[2px] text-center leading-none">
            SCAN ME
          </div>
        </div>
      );
    case 'frame-clipboard':
      return (
        <div className="w-8 h-10 flex flex-col items-center justify-end relative">
          <div className="w-3.5 h-1.5 bg-slate-900 rounded-t-sm z-10 -mb-[1px]" />
          <div className="w-7.5 h-8.5 border border-slate-900 rounded-[3px] flex flex-col justify-between overflow-hidden bg-white">
            <div className="flex-1 flex items-center justify-center text-slate-800">
              <MiniQRPattern className="w-4.5 h-4.5" />
            </div>
            <div className="bg-slate-900 text-white text-[4px] font-bold py-[2px] text-center leading-none">
              SCAN ME
            </div>
          </div>
        </div>
      );
    case 'frame-stand':
      return (
        <div className="w-8 h-10 flex flex-col items-center justify-between">
          <div className="w-7 h-7 border border-slate-800 rounded-[2px] flex items-center justify-center bg-white text-slate-800">
            <MiniQRPattern className="w-5 h-5" />
          </div>
          <div className="w-1.5 h-1 bg-slate-800" />
          <div className="w-6 bg-slate-900 text-white text-[3.8px] font-bold py-[1.5px] rounded-t-sm text-center leading-none">
            SCAN ME
          </div>
        </div>
      );
    case 'frame-bag':
      return (
        <div className="w-8 h-10 flex flex-col items-center justify-end">
          <div className="w-3 h-1.5 border border-b-0 border-slate-900 rounded-t-full" />
          <div className="w-7 h-8 border border-slate-900 rounded-[2px] flex flex-col justify-between overflow-hidden bg-white">
            <div className="flex-1 flex items-center justify-center text-slate-800">
              <MiniQRPattern className="w-4.5 h-4.5" />
            </div>
            <div className="bg-slate-900 text-white text-[3.8px] font-bold py-[1.5px] text-center leading-none">
              SCAN ME
            </div>
          </div>
        </div>
      );
  }
};

export const DotStyleIcon: React.FC<{ style: DotStyle }> = ({ style }) => {
  switch (style) {
    case 'square':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <rect x="4" y="4" width="11" height="5" />
          <rect x="4" y="4" width="5" height="11" />
          <rect x="10" y="10" width="5" height="5" />
          <rect x="20" y="4" width="6" height="6" />
          <rect x="26" y="10" width="6" height="6" />
          <rect x="15" y="15" width="6" height="6" />
          <rect x="4" y="20" width="6" height="6" />
          <rect x="10" y="26" width="6" height="6" />
          <rect x="21" y="21" width="11" height="5" />
          <rect x="21" y="26" width="5" height="6" />
        </svg>
      );
    case 'rounded':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <rect x="5" y="5" width="5" height="12" rx="2.5" />
          <path d="M14 5h10a2.5 2.5 0 0 1 0 5h-5v5a2.5 2.5 0 0 1-5 0V5z" />
          <circle cx="28" cy="20" r="3" />
          <path d="M8 22h8a3 3 0 0 1 3 3v6h-5v-4H8a2.5 2.5 0 0 1 0-5z" />
          <circle cx="23" cy="28" r="3" />
        </svg>
      );
    case 'bars-h':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <rect x="6" y="5" width="14" height="3.5" rx="1.75" />
          <rect x="12" y="10" width="10" height="3.5" rx="1.75" />
          <rect x="10" y="15" width="16" height="3.5" rx="1.75" />
          <rect x="4" y="20" width="8" height="3.5" rx="1.75" />
          <rect x="15" y="20" width="14" height="3.5" rx="1.75" />
          <rect x="8" y="25" width="12" height="3.5" rx="1.75" />
          <rect x="24" y="25" width="7" height="3.5" rx="1.75" />
          <rect x="6" y="30" width="10" height="3.5" rx="1.75" />
          <rect x="20" y="30" width="9" height="3.5" rx="1.75" />
        </svg>
      );
    case 'fluid':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <path d="M6 6h12a3 3 0 0 1 0 6h-6v6a3 3 0 0 1-6 0V6z" />
          <path d="M22 8l6 6-4 4-6-6 4-4z" />
          <path d="M8 24l6-6 6 6-6 6-6-6z" />
          <path d="M18 26h10a3 3 0 0 1 0 6H18a3 3 0 0 1 0-6z" />
          <circle cx="29" cy="20" r="2.8" />
        </svg>
      );
    case 'diamond':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <path d="M6 6h10l-3 5h5l-6 6v-5H6V6z" />
          <polygon points="24,5 29,10 24,15 19,10" />
          <polygon points="29,14 33,18 29,22 25,18" />
          <polygon points="10,20 15,25 10,30 5,25" />
          <path d="M18 22l5-5 5 5-5 5h7v5H16l2-5z" />
        </svg>
      );
    case 'extra-rounded':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <path d="M6 8a4 4 0 0 1 4-4h8a3 3 0 0 1 0 6h-5v5a3 3 0 0 1-6 0V8z" />
          <circle cx="24" cy="11" r="3.5" />
          <circle cx="19" cy="19" r="4" />
          <circle cx="28" cy="21" r="3" />
          <path d="M8 24a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v4h5a3 3 0 0 1 0 6H14a3 3 0 0 1-3-3v-4H8a3 3 0 0 1 0-3z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <path d="M5 5h6v10a3 3 0 0 1-6 0V5z" />
          <path d="M15 5h8a4 4 0 0 1 4 4v5h-6V9h-6V5z" />
          <path d="M8 20h10v10H8a3 3 0 0 1-3-3v-7h3z" />
          <path d="M22 18l7 4-3 4-7-4 3-4z" />
          <path d="M23 26l8 2-1 4-8-2 1-4z" />
        </svg>
      );
    case 'dots':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-black" fill="currentColor">
          <circle cx="8" cy="8" r="2.8" />
          <circle cx="15" cy="8" r="2.8" />
          <circle cx="23" cy="8" r="2.8" />
          <circle cx="8" cy="15" r="2.8" />
          <circle cx="15" cy="15" r="2.8" />
          <circle cx="29" cy="15" r="2.8" />
          <circle cx="8" cy="22" r="2.8" />
          <circle cx="22" cy="22" r="2.8" />
          <circle cx="29" cy="22" r="2.8" />
          <circle cx="15" cy="29" r="2.8" />
          <circle cx="22" cy="29" r="2.8" />
          <circle cx="29" cy="29" r="2.8" />
        </svg>
      );
  }
};

export const CornerStyleIcon: React.FC<{ style: CornerStyle }> = ({ style }) => {
  switch (style) {
    case 'square':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <rect x="6" y="6" width="24" height="24" />
        </svg>
      );
    case 'rounded':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <rect x="6" y="6" width="24" height="24" rx="6" />
        </svg>
      );
    case 'circle':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <circle cx="18" cy="18" r="12" />
        </svg>
      );
    case 'leaf-tl':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M6 6h14a10 10 0 0 1 10 10v4a10 10 0 0 1-10 10h-4A10 10 0 0 1 6 20V6z" />
        </svg>
      );
    case 'leaf-diag':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M6 6h14a10 10 0 0 1 10 10v14H16A10 10 0 0 1 6 20V6z" />
        </svg>
      );
    case 'leaf-br':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M16 6h4a10 10 0 0 1 10 10v14H16A10 10 0 0 1 6 20v-4A10 10 0 0 1 16 6z" />
        </svg>
      );
    case 'square-circle':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4h28v28H4V4zm14 5a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"
            fill="currentColor"
          />
        </svg>
      );
    case 'rounded-tl':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8 text-[#1e293b]" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M6 6h18a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V6z" />
        </svg>
      );
  }
};

export const LogoPresetIcon: React.FC<{ preset: LogoPreset; size?: 'sm' | 'lg' }> = ({
  preset,
  size = 'sm',
}) => {
  const cls = size === 'lg' ? 'w-11 h-11' : 'w-8 h-8';
  const wideCls = size === 'lg' ? 'w-14 h-11' : 'w-11 h-8';

  switch (preset) {
    case 'none':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2c3338]" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case 'link':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <circle cx="20" cy="20" r="18" fill="#8b3dff" />
          <path
            d="M17 23l6-6M15 19l-2 2a4 4 0 0 0 5.6 5.6l2-2M25 21l2-2a4 4 0 0 0-5.6-5.6l-2 2"
            stroke="#fff"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
    case 'location':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <circle cx="20" cy="20" r="18" fill="#e53935" />
          <path
            d="M20 10a6 6 0 0 0-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 0 0-6-6zm0 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            fill="#fff"
          />
          <ellipse cx="20" cy="27" rx="7" ry="2.2" stroke="#fff" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <circle cx="20" cy="20" r="18" fill="#fbbc04" />
          <rect x="11" y="14" width="18" height="12" rx="1.5" fill="#fff" />
          <path d="M11 15l9 6 9-6" stroke="#fbbc04" strokeWidth="1.8" fill="none" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <path
            d="M20 4a16 16 0 0 0-13.8 24l-2 7.2 7.4-1.9A16 16 0 1 0 20 4z"
            fill="#4caf50"
          />
          <path
            d="M16 13c-.5 0-1.3.5-1.5 1.5-.3 1.2.4 3.5 2.5 5.6 2.1 2.1 4.4 2.8 5.6 2.5 1-.2 1.5-1 1.5-1.5l-2.2-1.5-1.3 1c-1-.4-2.1-1.5-2.5-2.5l1-1.3L17.5 13H16z"
            fill="#fff"
          />
        </svg>
      );
    case 'wifi':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <circle cx="20" cy="20" r="18" fill="#039be5" />
          <path
            d="M11 17a13 13 0 0 1 18 0M14 21a8.5 8.5 0 0 1 12 0M17.5 24.5a4 4 0 0 1 5 0"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="20" cy="28" r="1.8" fill="#fff" />
        </svg>
      );
    case 'vcard':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <circle cx="20" cy="20" r="18" fill="#01579b" />
          <rect x="11" y="14" width="18" height="13" rx="1.5" fill="#fff" />
          <rect x="18" y="11" width="4" height="4" rx="1" fill="#01579b" stroke="#fff" strokeWidth="1.2" />
          <circle cx="16" cy="20" r="2" fill="#01579b" />
          <path d="M13 24c0-1.5 1.5-2.2 3-2.2s3 .7 3 2.2" fill="#01579b" />
          <line x1="21" y1="19" x2="26" y2="19" stroke="#01579b" strokeWidth="1.5" />
          <line x1="21" y1="22.5" x2="26" y2="22.5" stroke="#01579b" strokeWidth="1.5" />
        </svg>
      );
    case 'paypal':
      return (
        <svg viewBox="0 0 48 40" className={cls}>
          <path
            d="M18 8h8c4 0 6 2 5.5 5.5-.6 4-3.2 6-6.8 6H22l-1.2 7.5h-4L18 8z"
            fill="#003087"
          />
          <path
            d="M21 12h7c3.5 0 5 1.8 4.5 5-.5 3.5-2.8 5.2-6 5.2h-2.2l-1 6.8h-3.5L21 12z"
            fill="#0070ba"
            opacity="0.85"
          />
          <text x="24" y="36" textAnchor="middle" fill="#003087" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">
            PayPal
          </text>
        </svg>
      );
    case 'bitcoin':
      return (
        <svg viewBox="0 0 40 40" className={cls}>
          <circle cx="20" cy="20" r="18" fill="#f7931a" />
          <text
            x="20"
            y="27"
            textAnchor="middle"
            fill="#fff"
            fontSize="21"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            ₿
          </text>
        </svg>
      );
    case 'scan-me-box':
      return (
        <svg viewBox="0 0 48 36" className={wideCls} fill="none" stroke="#000">
          <path d="M8 10V5h6M34 5h6v5M40 26v5h-6M14 31H8v-5" strokeWidth="2.2" />
          <text x="24" y="15" textAnchor="middle" fill="#000" stroke="none" fontSize="7.5" fontWeight="800">
            SCAN
          </text>
          <text x="24" y="26.5" textAnchor="middle" fill="#000" stroke="none" fontSize="11.5" fontWeight="800">
            ME
          </text>
        </svg>
      );
    case 'scan-me-text':
      return (
        <svg viewBox="0 0 48 36" className={wideCls}>
          <text x="24" y="14" textAnchor="middle" fill="#000" fontSize="9.5" fontWeight="900">
            SCAN
          </text>
          <text x="24" y="29" textAnchor="middle" fill="#000" fontSize="15" fontWeight="900">
            ME
          </text>
        </svg>
      );
    case 'qr-tray':
      return (
        <svg viewBox="0 0 48 36" className={wideCls} fill="none" stroke="#000" strokeWidth="1.8">
          <path d="M12 8V4h4M32 4h4v4M12 28v4h4M32 32h4v-4" />
          <rect x="17" y="8" width="5" height="5" />
          <rect x="26" y="8" width="5" height="5" />
          <path d="M18 16h12M14 20h20l-2 7H16l-2-7z" />
        </svg>
      );
    case 'menu-box':
      return (
        <svg viewBox="0 0 48 36" className={wideCls} fill="none" stroke="#000" strokeWidth="2">
          <path d="M10 11V6h5M33 6h5v5M38 25v5h-5M15 30h-5v-5" />
          <text x="24" y="21" textAnchor="middle" fill="#000" stroke="none" fontSize="7.5" fontWeight="800">
            -MENU-
          </text>
        </svg>
      );
    case 'restaurant':
      return (
        <svg viewBox="0 0 48 36" className={wideCls} fill="none" stroke="#000" strokeWidth="2">
          <path d="M15 12V8h4M29 8h4v4M33 24v4h-4M19 28h-4v-4" />
          <path d="M10 9v18M10 9c2 0 2.5 3 2.5 5s-2.5 2-2.5 2" />
          <path d="M38 9v6m-2-6v5a2 2 0 0 0 4 0V9m-2 6v12" />
        </svg>
      );
  }
};

