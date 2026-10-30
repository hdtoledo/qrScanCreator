import React, { useMemo, useRef } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';
import {
  CornerStyle,
  DotStyle,
  LogoPreset,
  selectQRValue,
} from '../store/qrSlice';
import { useAppSelector } from '../store/store';
import { QRPreviewSkeleton } from './Skeletons';

function isFinderPattern(row: number, col: number, size: number): boolean {
  if (row < 7 && col < 7) return true;
  if (row < 7 && col >= size - 7) return true;
  if (row >= size - 7 && col < 7) return true;
  return false;
}

function renderCornerFinderSVG(
  x: number,
  y: number,
  style: CornerStyle,
  color: string,
  key: string
) {
  // Finder is 7x7 modules
  switch (style) {
    case 'square':
      return (
        <g key={key} fill={color}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={`M${x},${y} h7 v7 h-7 z M${x + 1},${y + 1} v5 h5 v-5 z`}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} />
        </g>
      );
    case 'rounded':
      return (
        <g key={key} fill={color}>
          <rect
            x={x + 0.5}
            y={y + 0.5}
            width={6}
            height={6}
            rx={1.6}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.7} />
        </g>
      );
    case 'circle':
      return (
        <g key={key} fill={color}>
          <circle
            cx={x + 3.5}
            cy={y + 3.5}
            r={3}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <circle cx={x + 3.5} cy={y + 3.5} r={1.5} />
        </g>
      );
    case 'leaf-tl':
      return (
        <g key={key} fill={color}>
          <path
            d={`M${x + 0.5},${y + 0.5} h3.5 a2.5,2.5 0 0 1 2.5,2.5 v1 a2.5,2.5 0 0 1 -2.5,2.5 h-1 a2.5,2.5 0 0 1 -2.5,-2.5 z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.8} />
        </g>
      );
    case 'leaf-diag':
      return (
        <g key={key} fill={color}>
          <path
            d={`M${x + 0.5},${y + 0.5} h3.5 a2.5,2.5 0 0 1 2.5,2.5 v3.5 h-3.5 a2.5,2.5 0 0 1 -2.5,-2.5 z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <path
            d={`M${x + 2},${y + 2} h1.8 a1.2,1.2 0 0 1 1.2,1.2 v1.8 h-1.8 a1.2,1.2 0 0 1 -1.2,-1.2 z`}
          />
        </g>
      );
    case 'leaf-br':
      return (
        <g key={key} fill={color}>
          <path
            d={`M${x + 3},${y + 0.5} h1 a2.5,2.5 0 0 1 2.5,2.5 v3.5 h-3.5 a2.5,2.5 0 0 1 -2.5,-2.5 v-1 a2.5,2.5 0 0 1 2.5,-2.5 z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.8} />
        </g>
      );
    case 'square-circle':
      return (
        <g key={key} fill={color}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={`M${x},${y} h7 v7 h-7 z M${x + 3.5},${y + 1.2} a2.3,2.3 0 1 0 0,4.6 a2.3,2.3 0 1 0 0,-4.6 z`}
          />
          <circle cx={x + 3.5} cy={y + 3.5} r={1.3} />
        </g>
      );
    case 'rounded-tl':
      return (
        <g key={key} fill={color}>
          <path
            d={`M${x + 0.5},${y + 0.5} h4.5 a1.5,1.5 0 0 1 1.5,1.5 v3 a1.5,1.5 0 0 1 -1.5,1.5 h-3 a1.5,1.5 0 0 1 -1.5,-1.5 z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.5} />
        </g>
      );
  }
}

function renderDataModuleSVG(
  r: number,
  c: number,
  dotStyle: DotStyle,
  getModule: (row: number, col: number) => boolean
) {
  const key = `${r}-${c}`;
  switch (dotStyle) {
    case 'square':
      return <rect key={key} x={c} y={r} width={1.03} height={1.03} />;
    case 'dots':
      return <circle key={key} cx={c + 0.5} cy={r + 0.5} r={0.44} />;
    case 'rounded':
      return (
        <rect
          key={key}
          x={c + 0.04}
          y={r + 0.04}
          width={0.92}
          height={0.92}
          rx={0.32}
        />
      );
    case 'extra-rounded':
      return (
        <rect
          key={key}
          x={c + 0.02}
          y={r + 0.02}
          width={0.96}
          height={0.96}
          rx={0.46}
        />
      );
    case 'bars-h': {
      const hasLeft = getModule(r, c - 1);
      const hasRight = getModule(r, c + 1);
      const x = hasLeft ? c - 0.05 : c + 0.08;
      const w = (hasLeft ? 0.05 : -0.08) + 1 + (hasRight ? 0.05 : -0.08);
      return (
        <rect
          key={key}
          x={x}
          y={r + 0.14}
          width={Math.max(0.7, w)}
          height={0.72}
          rx={hasLeft && hasRight ? 0 : 0.35}
        />
      );
    }
    case 'diamond':
      return (
        <polygon
          key={key}
          points={`${c + 0.5},${r + 0.02} ${c + 0.98},${r + 0.5} ${c + 0.5},${r + 0.98} ${c + 0.02},${r + 0.5}`}
        />
      );
    case 'fluid': {
      return (
        <rect
          key={key}
          x={c + 0.02}
          y={r + 0.02}
          width={0.96}
          height={0.96}
          rx={0.25}
        />
      );
    }
    case 'leaf':
      return (
        <path
          key={key}
          d={`M${c + 0.05},${r + 0.05} h0.55 a0.35,0.35 0 0 1 0.35,0.35 v0.55 h-0.55 a0.35,0.35 0 0 1 -0.35,-0.35 z`}
        />
      );
  }
}

function renderCenterLogoSVG(
  preset: LogoPreset,
  customLogoDataUrl: string | null,
  size: number,
  bgColor: string
) {
  if (!customLogoDataUrl && preset === 'none') return null;
  const logoBoxSize = size * 0.24;
  const start = (size - logoBoxSize) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const r = logoBoxSize / 2;

  if (customLogoDataUrl) {
    return (
      <g>
        <rect
          x={start - 0.6}
          y={start - 0.6}
          width={logoBoxSize + 1.2}
          height={logoBoxSize + 1.2}
          rx={1.5}
          fill={bgColor}
        />
        <image
          href={customLogoDataUrl}
          x={start}
          y={start}
          width={logoBoxSize}
          height={logoBoxSize}
          preserveAspectRatio="xMidYMid contain"
        />
      </g>
    );
  }

  return (
    <g>
      <rect
        x={start - 0.5}
        y={start - 0.5}
        width={logoBoxSize + 1}
        height={logoBoxSize + 1}
        rx={1.5}
        fill={bgColor}
      />
      {preset === 'link' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#8b3dff" />
          <path
            d={`M${cx - r * 0.35},${cy + r * 0.35} L${cx + r * 0.35},${cy - r * 0.35}`}
            stroke="#fff"
            strokeWidth={r * 0.22}
            strokeLinecap="round"
          />
          <circle
            cx={cx - r * 0.25}
            cy={cy + r * 0.25}
            r={r * 0.3}
            fill="none"
            stroke="#fff"
            strokeWidth={r * 0.18}
          />
          <circle
            cx={cx + r * 0.25}
            cy={cy - r * 0.25}
            r={r * 0.3}
            fill="none"
            stroke="#fff"
            strokeWidth={r * 0.18}
          />
        </g>
      )}
      {preset === 'location' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#e53935" />
          <circle cx={cx} cy={cy - r * 0.15} r={r * 0.35} fill="#fff" />
          <polygon
            points={`${cx - r * 0.3},${cy - r * 0.05} ${cx + r * 0.3},${cy - r * 0.05} ${cx},${cy + r * 0.55}`}
            fill="#fff"
          />
          <circle cx={cx} cy={cy - r * 0.15} r={r * 0.14} fill="#e53935" />
        </g>
      )}
      {preset === 'email' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#fbbc04" />
          <rect
            x={cx - r * 0.52}
            y={cy - r * 0.36}
            width={r * 1.04}
            height={r * 0.72}
            rx={r * 0.1}
            fill="#fff"
          />
          <path
            d={`M${cx - r * 0.5},${cy - r * 0.32} L${cx},${cy + r * 0.08} L${cx + r * 0.5},${cy - r * 0.32}`}
            fill="none"
            stroke="#fbbc04"
            strokeWidth={r * 0.12}
          />
        </g>
      )}
      {preset === 'whatsapp' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#4caf50" />
          <path
            d={`M${cx - r * 0.35},${cy - r * 0.35} C${cx - r * 0.5},${cy} ${cx},${cy + r * 0.5} ${cx + r * 0.38},${cy + r * 0.32}`}
            fill="none"
            stroke="#fff"
            strokeWidth={r * 0.24}
            strokeLinecap="round"
          />
        </g>
      )}
      {preset === 'wifi' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#039be5" />
          <path
            d={`M${cx - r * 0.5},${cy - r * 0.15} A${r * 0.65},${r * 0.65} 0 0 1 ${cx + r * 0.5},${cy - r * 0.15}`}
            fill="none"
            stroke="#fff"
            strokeWidth={r * 0.15}
            strokeLinecap="round"
          />
          <path
            d={`M${cx - r * 0.3},${cy + r * 0.1} A${r * 0.4},${r * 0.4} 0 0 1 ${cx + r * 0.3},${cy + r * 0.1}`}
            fill="none"
            stroke="#fff"
            strokeWidth={r * 0.15}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={cy + r * 0.36} r={r * 0.11} fill="#fff" />
        </g>
      )}
      {preset === 'vcard' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#01579b" />
          <rect
            x={cx - r * 0.5}
            y={cy - r * 0.35}
            width={r}
            height={r * 0.7}
            rx={r * 0.08}
            fill="#fff"
          />
          <circle cx={cx - r * 0.2} cy={cy} r={r * 0.14} fill="#01579b" />
        </g>
      )}
      {preset === 'paypal' && (
        <g>
          <text
            x={cx}
            y={cy + r * 0.15}
            textAnchor="middle"
            fill="#003087"
            fontSize={r * 0.95}
            fontWeight="900"
            fontFamily="sans-serif"
          >
            P
          </text>
          <text
            x={cx}
            y={cy + r * 0.65}
            textAnchor="middle"
            fill="#0070ba"
            fontSize={r * 0.36}
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            PayPal
          </text>
        </g>
      )}
      {preset === 'bitcoin' && (
        <g>
          <circle cx={cx} cy={cy} r={r * 0.92} fill="#f7931a" />
          <text
            x={cx}
            y={cy + r * 0.38}
            textAnchor="middle"
            fill="#fff"
            fontSize={r * 1.15}
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            ₿
          </text>
        </g>
      )}
      {(preset === 'scan-me-box' || preset === 'scan-me-text') && (
        <g>
          <text
            x={cx}
            y={cy - r * 0.1}
            textAnchor="middle"
            fill="#000"
            fontSize={r * 0.48}
            fontWeight="900"
            fontFamily="sans-serif"
          >
            SCAN
          </text>
          <text
            x={cx}
            y={cy + r * 0.55}
            textAnchor="middle"
            fill="#000"
            fontSize={r * 0.72}
            fontWeight="900"
            fontFamily="sans-serif"
          >
            ME
          </text>
        </g>
      )}
      {preset === 'qr-tray' && (
        <g>
          <rect
            x={cx - r * 0.55}
            y={cy - r * 0.55}
            width={r * 1.1}
            height={r * 1.1}
            fill="none"
            stroke="#000"
            strokeWidth={r * 0.14}
          />
          <text
            x={cx}
            y={cy + r * 0.18}
            textAnchor="middle"
            fill="#000"
            fontSize={r * 0.55}
            fontWeight="900"
          >
            QR
          </text>
        </g>
      )}
      {preset === 'menu-box' && (
        <g>
          <text
            x={cx}
            y={cy + r * 0.16}
            textAnchor="middle"
            fill="#000"
            fontSize={r * 0.45}
            fontWeight="900"
            fontFamily="sans-serif"
          >
            -MENU-
          </text>
        </g>
      )}
      {preset === 'restaurant' && (
        <g>
          <text
            x={cx}
            y={cy + r * 0.25}
            textAnchor="middle"
            fill="#000"
            fontSize={r * 0.85}
            fontWeight="bold"
          >
            🍴
          </text>
        </g>
      )}
    </g>
  );
}

export const QRPreviewSection: React.FC = () => {
  const qrValue = useAppSelector(selectQRValue);
  const { design, ui } = useAppSelector((state) => state.qr);
  const { frame, shape, logo } = design;
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const matrix = useMemo(() => {
    try {
      const qr = QRCode.create(qrValue || 'https://ejemplo.com', {
        errorCorrectionLevel: 'H',
      });
      const size = qr.modules.size;
      const data = qr.modules.data;
      const grid: boolean[][] = [];
      for (let r = 0; r < size; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < size; c++) {
          row.push(Boolean(data[r * size + c]));
        }
        grid.push(row);
      }
      return { size, grid };
    } catch {
      return { size: 21, grid: Array.from({ length: 21 }, () => Array(21).fill(false)) };
    }
  }, [qrValue]);

  const hasCenterLogo = Boolean(logo.customLogoDataUrl || logo.preset !== 'none');

  const isInsideCenterLogoZone = (r: number, c: number, size: number) => {
    if (!hasCenterLogo) return false;
    const center = size / 2;
    const halfSpan = size * 0.13;
    return (
      r >= center - halfSpan &&
      r <= center + halfSpan &&
      c >= center - halfSpan &&
      c <= center + halfSpan
    );
  };

  const getFontFamily = (fontName: string) => {
    switch (fontName) {
      case 'Serif':
        return 'Georgia, Times New Roman, serif';
      case 'Monospace':
        return 'Courier New, monospace';
      case 'Georgia':
        return 'Georgia, serif';
      case 'Impact':
        return 'Impact, Arial Black, sans-serif';
      default:
        return 'Inter, Arial, Helvetica, sans-serif';
    }
  };

  const handleDownloadQR = () => {
    if (!svgContainerRef.current) return;
    const svgEl = svgContainerRef.current.querySelector('svg');
    if (!svgEl) return;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgEl);
    if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      svgString = svgString.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }

    const svgBlob = new Blob([svgString], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = 3;
      canvas.width = (svgEl.viewBox.baseVal.width || 300) * scale;
      canvas.height = (svgEl.viewBox.baseVal.height || 340) * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = pngUrl;
        a.download = `codigo-qr-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const renderQRCoreGroup = (offsetX: number, offsetY: number, boxSize: number) => {
    const { size, grid } = matrix;
    const pad = 2;
    const totalModules = size + pad * 2;
    const scale = boxSize / totalModules;

    const getModule = (r: number, c: number) => {
      if (r < 0 || c < 0 || r >= size || c >= size) return false;
      if (isFinderPattern(r, c, size)) return false;
      if (isInsideCenterLogoZone(r, c, size)) return false;
      return grid[r][c];
    };

    const fillRef = shape.gradient ? 'url(#qr-dot-gradient)' : shape.fgColor || '#000000';
    const cornerColor = shape.cornerColor || '#000000';
    const bgFill = shape.transparentBg ? 'none' : shape.bgColor || '#FFFFFF';

    return (
      <g transform={`translate(${offsetX}, ${offsetY})`}>
        <rect
          x={0}
          y={0}
          width={boxSize}
          height={boxSize}
          rx={10}
          fill={bgFill}
        />
        <g transform={`scale(${scale}) translate(${pad}, ${pad})`}>
          {shape.gradient && (
            <defs>
              <linearGradient id="qr-dot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={shape.fgColor || '#000000'} />
                <stop offset="100%" stopColor={shape.gradientColor || '#00b27a'} />
              </linearGradient>
            </defs>
          )}

          {/* 3 Finder Patterns */}
          {renderCornerFinderSVG(0, 0, shape.cornerStyle, cornerColor, 'tl')}
          {renderCornerFinderSVG(size - 7, 0, shape.cornerStyle, cornerColor, 'tr')}
          {renderCornerFinderSVG(0, size - 7, shape.cornerStyle, cornerColor, 'bl')}

          {/* Data Modules */}
          <g fill={fillRef}>
            {grid.map((row, r) =>
              row.map((val, c) => {
                if (!val) return null;
                if (isFinderPattern(r, c, size)) return null;
                if (isInsideCenterLogoZone(r, c, size)) return null;
                return renderDataModuleSVG(r, c, shape.dotStyle, getModule);
              })
            )}
          </g>

          {/* Center Logo */}
          {renderCenterLogoSVG(
            logo.preset,
            logo.customLogoDataUrl,
            size,
            shape.transparentBg ? '#FFFFFF' : shape.bgColor || '#FFFFFF'
          )}
        </g>
      </g>
    );
  };

  const renderFramedSVG = () => {
    const fColor = frame.color || '#000000';
    const phrase = frame.phrase || 'SCAN ME';
    const fontFamily = getFontFamily(frame.font);

    switch (frame.style) {
      case 'none':
        return (
          <svg viewBox="0 0 260 260" className="w-full max-w-[245px] h-auto">
            {renderQRCoreGroup(10, 10, 240)}
          </svg>
        );

      case 'frame-bottom-solid':
        return (
          <svg viewBox="0 0 260 310" className="w-full max-w-[245px] h-auto">
            <rect
              x="12"
              y="8"
              width="236"
              height="294"
              rx="18"
              fill={fColor}
            />
            {renderQRCoreGroup(22, 18, 216)}
            <text
              x="130"
              y="281"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="29"
              fontFamily={fontFamily}
              letterSpacing="0.5"
            >
              {phrase}
            </text>
          </svg>
        );

      case 'frame-bottom-icon':
        return (
          <svg viewBox="0 0 260 310" className="w-full max-w-[245px] h-auto">
            <rect
              x="12"
              y="8"
              width="236"
              height="294"
              rx="16"
              fill={fColor}
            />
            {renderQRCoreGroup(20, 16, 220)}
            <g transform="translate(46, 258)">
              <circle cx="14" cy="14" r="11" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
              <rect x="9.5" y="9.5" width="9" height="9" fill="#FFFFFF" rx="1" />
              <text
                x="98"
                y="22"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="23"
                fontFamily={fontFamily}
                fontWeight="600"
              >
                {phrase}
              </text>
            </g>
          </svg>
        );

      case 'frame-bottom-pill':
        return (
          <svg viewBox="0 0 260 315" className="w-full max-w-[245px] h-auto">
            <rect
              x="16"
              y="10"
              width="228"
              height="228"
              rx="16"
              fill="none"
              stroke={fColor}
              strokeWidth="8"
            />
            {renderQRCoreGroup(24, 18, 212)}
            <rect
              x="16"
              y="252"
              width="228"
              height="50"
              rx="12"
              fill={fColor}
            />
            <text
              x="130"
              y="285"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="25"
              fontFamily={fontFamily}
            >
              {phrase}
            </text>
          </svg>
        );

      case 'frame-circle':
        return (
          <svg viewBox="0 0 260 315" className="w-full max-w-[245px] h-auto">
            <circle
              cx="130"
              cy="126"
              r="114"
              fill={shape.transparentBg ? '#FFFFFF' : shape.bgColor || '#FFFFFF'}
              stroke={fColor}
              strokeWidth="8"
            />
            {renderQRCoreGroup(42, 38, 176)}
            <rect
              x="35"
              y="255"
              width="190"
              height="46"
              rx="23"
              fill={fColor}
            />
            <text
              x="130"
              y="286"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="23"
              fontFamily={fontFamily}
            >
              {phrase}
            </text>
          </svg>
        );

      case 'frame-phone':
        return (
          <svg viewBox="0 0 260 330" className="w-full max-w-[245px] h-auto">
            <rect
              x="18"
              y="6"
              width="224"
              height="318"
              rx="26"
              fill={fColor}
            />
            <rect x="105" y="17" width="50" height="5" rx="2.5" fill="#FFFFFF" opacity="0.8" />
            {renderQRCoreGroup(28, 32, 204)}
            <text
              x="130"
              y="292"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="25"
              fontFamily={fontFamily}
            >
              {phrase}
            </text>
          </svg>
        );

      case 'frame-clipboard':
        return (
          <svg viewBox="0 0 260 325" className="w-full max-w-[245px] h-auto">
            <rect x="85" y="4" width="90" height="22" rx="6" fill={fColor} />
            <circle cx="130" cy="13" r="4" fill="#FFFFFF" />
            <rect
              x="14"
              y="20"
              width="232"
              height="296"
              rx="16"
              fill={fColor}
            />
            {renderQRCoreGroup(24, 30, 212)}
            <text
              x="130"
              y="292"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="26"
              fontFamily={fontFamily}
            >
              {phrase}
            </text>
          </svg>
        );

      case 'frame-stand':
        return (
          <svg viewBox="0 0 260 320" className="w-full max-w-[245px] h-auto">
            <rect
              x="16"
              y="8"
              width="228"
              height="228"
              rx="14"
              fill={fColor}
            />
            {renderQRCoreGroup(26, 18, 208)}
            <rect x="112" y="236" width="36" height="20" fill={fColor} />
            <path d="M30 256 h200 l12 48 H18 z" fill={fColor} />
            <text
              x="130"
              y="289"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="24"
              fontFamily={fontFamily}
            >
              {phrase}
            </text>
          </svg>
        );

      case 'frame-bag':
        return (
          <svg viewBox="0 0 260 330" className="w-full max-w-[245px] h-auto">
            <path
              d="M92 32 A38 28 0 0 1 168 32"
              fill="none"
              stroke={fColor}
              strokeWidth="8"
            />
            <rect
              x="14"
              y="30"
              width="232"
              height="290"
              rx="14"
              fill={fColor}
            />
            {renderQRCoreGroup(24, 40, 212)}
            <text
              x="130"
              y="296"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="26"
              fontFamily={fontFamily}
            >
              {phrase}
            </text>
          </svg>
        );
    }
  };

  return (
    <aside className="flex flex-col items-center w-full">
      {/* Header 3 Descargar código QR */}
      <div className="flex items-center justify-center gap-2.5 mb-5">
        <span className="w-6 h-6 rounded bg-[#1e293b] text-white text-xs font-bold flex items-center justify-center shrink-0">
          3
        </span>
        <h2 className="text-[15px] font-medium text-[#1e293b]">
          Descargar código QR
        </h2>
      </div>

      {ui.isInitialLoading ? (
        <QRPreviewSkeleton />
      ) : (
        <>
          {/* QR Card Wrapper matching Screenshot 1 */}
          <div
            ref={svgContainerRef}
            className="w-full max-w-[265px] bg-white rounded-xl border border-slate-100 p-2.5 flex items-center justify-center mb-4"
          >
            {renderFramedSVG()}
          </div>

          {/* Green Download Button */}
          <button
            type="button"
            onClick={handleDownloadQR}
            className="w-full max-w-[265px] bg-[#00b27a] hover:bg-[#009e6c] active:scale-[0.99] text-white text-[14px] font-medium py-3 px-5 rounded-lg flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Descargar código QR</span>
          </button>
        </>
      )}
    </aside>
  );
};

