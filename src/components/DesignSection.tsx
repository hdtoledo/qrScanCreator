import React, { useRef } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
  CornerStyle,
  DesignTab,
  DotStyle,
  FrameStyle,
  LogoPreset,
  setActiveTab,
  setBgColor,
  setCornerColor,
  setCornerStyle,
  setCustomLogo,
  setDesignTabLoading,
  setDotStyle,
  setFgColor,
  setFrameColor,
  setFrameFont,
  setFramePhrase,
  setFrameStyle,
  setGradient,
  setGradientColor,
  setLogoPreset,
  setTransparentBg,
} from '../store/qrSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  CornerStyleIcon,
  DotStyleIcon,
  FramePreviewIcon,
  LogoPresetIcon,
} from './DesignAssets';
import { DesignSectionSkeleton } from './Skeletons';

const FRAME_STYLES: FrameStyle[] = [
  'none',
  'frame-bottom-icon',
  'frame-bottom-solid',
  'frame-bottom-pill',
  'frame-circle',
  'frame-phone',
  'frame-clipboard',
  'frame-stand',
  'frame-bag',
];

const DOT_STYLES: DotStyle[] = [
  'square',
  'rounded',
  'bars-h',
  'fluid',
  'diamond',
  'extra-rounded',
  'leaf',
  'dots',
];

const CORNER_STYLES: CornerStyle[] = [
  'square',
  'rounded',
  'circle',
  'leaf-tl',
  'leaf-diag',
  'leaf-br',
  'square-circle',
  'rounded-tl',
];

const LOGO_ROW_1: LogoPreset[] = [
  'none',
  'link',
  'location',
  'email',
  'whatsapp',
  'wifi',
  'vcard',
  'paypal',
  'bitcoin',
];

const LOGO_ROW_2: LogoPreset[] = [
  'scan-me-box',
  'scan-me-text',
  'qr-tray',
  'menu-box',
  'restaurant',
];

export const DesignSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { design, ui } = useAppSelector((state) => state.qr);
  const { activeTab, frame, shape, logo } = design;

  const frameScrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (tab: DesignTab) => {
    if (tab === activeTab) return;
    dispatch(setDesignTabLoading(true));
    dispatch(setActiveTab(tab));
    setTimeout(() => {
      dispatch(setDesignTabLoading(false));
    }, 220);
  };

  const scrollFrames = (dir: 'left' | 'right') => {
    if (!frameScrollRef.current) return;
    frameScrollRef.current.scrollBy({
      left: dir === 'left' ? -150 : 150,
      behavior: 'smooth',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        dispatch(
          setCustomLogo({
            dataUrl: reader.result,
            name: file.name,
          })
        );
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="space-y-3.5">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <span className="w-6 h-6 rounded bg-[#1e293b] text-white text-xs font-bold flex items-center justify-center shrink-0">
          2
        </span>
        <h2 className="text-[15px] font-medium text-[#1e293b]">
          Diseña tu código QR
        </h2>
      </div>

      {/* Tabs Navigation */}
      <div>
        <div className="flex items-center">
          {(
            [
              { id: 'marco', label: 'Marco' },
              { id: 'forma', label: 'Forma' },
              { id: 'logo', label: 'Logo' },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-2.5 text-[13.5px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#00a870] rounded-t-lg border-t border-x border-slate-100 relative z-10'
                    : 'text-[#334155] hover:text-[#00a870]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        {ui.isDesignTabLoading ? (
          <DesignSectionSkeleton />
        ) : (
          <div className="bg-white rounded-b-lg rounded-tr-lg p-5 sm:p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            {/* TAB 1: MARCO */}
            {activeTab === 'marco' && (
              <div className="space-y-5">
                {/* Frame selector list */}
                <div>
                  <div
                    ref={frameScrollRef}
                    className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar"
                  >
                    {FRAME_STYLES.map((style) => {
                      const isSelected = frame.style === style;
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => dispatch(setFrameStyle(style))}
                          className={`w-14 h-14 sm:w-[58px] sm:h-[58px] shrink-0 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e8f3ff] border-[#6aa9ff] shadow-[0_0_0_1px_rgba(106,169,255,0.3)]'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <FramePreviewIcon style={style} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom scrollbar bar matching Screenshot 1 */}
                  <div className="flex items-center gap-1.5 mt-1 select-none">
                    <button
                      type="button"
                      onClick={() => scrollFrames('left')}
                      className="text-slate-500 hover:text-slate-700 text-[9px] leading-none px-0.5 cursor-pointer"
                      aria-label="Desplazar izquierda"
                    >
                      ◀
                    </button>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden flex items-center px-0.5">
                      <div className="w-2/5 h-2 bg-[#7c7f82] rounded-full" />
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollFrames('right')}
                      className="text-slate-500 hover:text-slate-700 text-[9px] leading-none px-0.5 cursor-pointer"
                      aria-label="Desplazar derecha"
                    >
                      ▶
                    </button>
                  </div>
                </div>

                {/* Frase del marco & Fuente de la frase */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#334155] mb-2">
                      Frase del marco
                    </label>
                    <input
                      type="text"
                      value={frame.phrase}
                      maxLength={24}
                      disabled={frame.style === 'none'}
                      onChange={(e) => dispatch(setFramePhrase(e.target.value))}
                      placeholder="SCAN ME"
                      className="w-full bg-white rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-600 placeholder:text-slate-400 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#00b27a] disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#334155] mb-2">
                      Fuente de la frase
                    </label>
                    <div className="relative">
                      <select
                        value={frame.font}
                        disabled={frame.style === 'none'}
                        onChange={(e) => dispatch(setFrameFont(e.target.value))}
                        className="w-full appearance-none bg-white rounded-lg px-3.5 py-2.5 pr-9 text-[13.5px] text-slate-500 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#00b27a] disabled:opacity-50 cursor-pointer"
                      >
                        <option value="Sans-Serif">Sans-Serif</option>
                        <option value="Serif">Serif</option>
                        <option value="Monospace">Monospace</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Impact">Impact</option>
                      </select>
                      <ChevronsUpDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Color del marco */}
                <div>
                  <label className="block text-xs font-medium text-[#334155] mb-2">
                    Color del marco
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={frame.color}
                      disabled={frame.style === 'none'}
                      onChange={(e) => dispatch(setFrameColor(e.target.value))}
                      placeholder="#000000"
                      className="flex-1 bg-white rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-500 border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:outline-none focus:border-[#00b27a] uppercase disabled:opacity-50"
                    />
                    <label className="w-28 sm:w-36 h-[42px] bg-white rounded-lg border border-slate-200/80 p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer flex items-center justify-center shrink-0">
                      <input
                        type="color"
                        value={
                          /^#[0-9A-Fa-f]{6}$/.test(frame.color)
                            ? frame.color
                            : '#000000'
                        }
                        disabled={frame.style === 'none'}
                        onChange={(e) =>
                          dispatch(setFrameColor(e.target.value.toUpperCase()))
                        }
                        className="sr-only"
                      />
                      <span
                        className="w-full h-full rounded-[2px] block border border-slate-200"
                        style={{ backgroundColor: frame.color || '#000000' }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: FORMA */}
            {activeTab === 'forma' && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-[13.5px] font-medium text-[#1e293b]">
                    Forma y color
                  </h3>
                </div>

                {/* Estilo de la forma */}
                <div className="space-y-3">
                  <h4 className="text-[13px] font-medium text-[#1e293b]">
                    Estilo de la forma
                  </h4>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                    {DOT_STYLES.map((style) => {
                      const isSelected = shape.dotStyle === style;
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => dispatch(setDotStyle(style))}
                          className={`h-13 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e8f3ff] border-[#6aa9ff] shadow-[0_0_0_1px_rgba(106,169,255,0.3)]'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <DotStyleIcon style={style} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color de fondo & Color de la forma */}
                <div className="bg-[#f4f7f9] rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Color de fondo */}
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-[#334155]">
                      Color de fondo
                    </label>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="text"
                        value={shape.bgColor}
                        disabled={shape.transparentBg}
                        onChange={(e) => dispatch(setBgColor(e.target.value))}
                        placeholder="#FFFFFF"
                        className="flex-1 bg-white rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-400 border border-slate-200/70 focus:outline-none focus:border-[#00b27a] uppercase disabled:opacity-50"
                      />
                      <label className="w-16 h-[42px] bg-white rounded-md border border-slate-200/80 p-1.5 cursor-pointer flex items-center justify-center shrink-0">
                        <input
                          type="color"
                          value={
                            /^#[0-9A-Fa-f]{6}$/.test(shape.bgColor)
                              ? shape.bgColor
                              : '#FFFFFF'
                          }
                          disabled={shape.transparentBg}
                          onChange={(e) =>
                            dispatch(setBgColor(e.target.value.toUpperCase()))
                          }
                          className="sr-only"
                        />
                        <span
                          className="w-full h-full block border border-slate-400"
                          style={{
                            backgroundColor: shape.transparentBg
                              ? 'transparent'
                              : shape.bgColor || '#FFFFFF',
                          }}
                        />
                      </label>
                    </div>

                    {/* Toggle Fondo transparente */}
                    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none pt-0.5">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={shape.transparentBg}
                        onClick={() =>
                          dispatch(setTransparentBg(!shape.transparentBg))
                        }
                        className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                          shape.transparentBg ? 'bg-[#00b27a]' : 'bg-white border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full transition-transform absolute top-0.5 ${
                            shape.transparentBg
                              ? 'translate-x-4 bg-white left-0.5'
                              : 'translate-x-0 bg-[#94a3b8] left-0.5'
                          }`}
                        />
                      </button>
                      <span className="text-xs font-medium text-[#1e293b]">
                        Fondo transparente
                      </span>
                    </label>
                  </div>

                  {/* Color de la forma */}
                  <div className="space-y-3">
                    <label className="block text-xs font-medium text-[#334155]">
                      Color de la forma
                    </label>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="text"
                        value={shape.fgColor}
                        onChange={(e) => dispatch(setFgColor(e.target.value))}
                        placeholder="#000000"
                        className="flex-1 bg-white rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-400 border border-slate-200/70 focus:outline-none focus:border-[#00b27a] uppercase"
                      />
                      <label className="w-16 h-[42px] bg-white rounded-md border border-slate-200/80 p-1.5 cursor-pointer flex items-center justify-center shrink-0">
                        <input
                          type="color"
                          value={
                            /^#[0-9A-Fa-f]{6}$/.test(shape.fgColor)
                              ? shape.fgColor
                              : '#000000'
                          }
                          onChange={(e) =>
                            dispatch(setFgColor(e.target.value.toUpperCase()))
                          }
                          className="sr-only"
                        />
                        <span
                          className="w-full h-full block border border-slate-300"
                          style={{ backgroundColor: shape.fgColor || '#000000' }}
                        />
                      </label>
                    </div>

                    {/* Toggle Degradado */}
                    <div className="flex items-center justify-between pt-0.5">
                      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={shape.gradient}
                          onClick={() => dispatch(setGradient(!shape.gradient))}
                          className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                            shape.gradient
                              ? 'bg-[#00b27a]'
                              : 'bg-white border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full transition-transform absolute top-0.5 ${
                              shape.gradient
                                ? 'translate-x-4 bg-white left-0.5'
                                : 'translate-x-0 bg-[#94a3b8] left-0.5'
                            }`}
                          />
                        </button>
                        <span className="text-xs font-medium text-[#1e293b]">
                          Degradado
                        </span>
                      </label>

                      {shape.gradient && (
                        <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                          <span>Color 2:</span>
                          <input
                            type="color"
                            value={shape.gradientColor}
                            onChange={(e) =>
                              dispatch(
                                setGradientColor(e.target.value.toUpperCase())
                              )
                            }
                            className="w-6 h-6 rounded border border-slate-300 cursor-pointer"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <h4 className="text-[13px] font-medium text-[#1e293b]">
                    Estilo del borde
                  </h4>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                    {CORNER_STYLES.map((style) => {
                      const isSelected = shape.cornerStyle === style;
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => dispatch(setCornerStyle(style))}
                          className={`h-13 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e8f3ff] border-[#6aa9ff] shadow-[0_0_0_1px_rgba(106,169,255,0.3)]'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <CornerStyleIcon style={style} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Color del borde */}
                <div className="bg-[#f4f7f9] rounded-lg p-4">
                  <label className="block text-xs font-medium text-[#334155] mb-2">
                    Color del borde
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={shape.cornerColor}
                      onChange={(e) => dispatch(setCornerColor(e.target.value))}
                      placeholder="#000000"
                      className="flex-1 bg-white rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-400 border border-slate-200/70 focus:outline-none focus:border-[#00b27a] uppercase"
                    />
                    <label className="w-28 sm:w-36 h-[42px] bg-white rounded-md border border-slate-200/80 p-1.5 cursor-pointer flex items-center justify-center shrink-0">
                      <input
                        type="color"
                        value={
                          /^#[0-9A-Fa-f]{6}$/.test(shape.cornerColor)
                            ? shape.cornerColor
                            : '#000000'
                        }
                        onChange={(e) =>
                          dispatch(setCornerColor(e.target.value.toUpperCase()))
                        }
                        className="sr-only"
                      />
                      <span
                        className="w-full h-full block border border-slate-300"
                        style={{
                          backgroundColor: shape.cornerColor || '#000000',
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LOGO */}
            {activeTab === 'logo' && (
              <div className="space-y-5">
                {/* Subir logo */}
                <div>
                  <label className="block text-[13px] font-medium text-[#1e293b] mb-2.5">
                    Subir logo
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center w-full rounded-lg border border-slate-200/80 overflow-hidden bg-white cursor-pointer hover:border-slate-300 transition-colors"
                  >
                    <div className="flex-1 px-4 py-2.5 text-[13.5px] text-slate-400 truncate">
                      {logo.customLogoName || 'Seleccionar archivo'}
                    </div>
                    <button
                      type="button"
                      className="bg-[#f4f7f9] hover:bg-slate-200/70 text-[#64748b] text-[13.5px] font-normal px-5 py-2.5 border-l border-slate-200/80 transition-colors cursor-pointer"
                    >
                      Browse
                    </button>
                  </div>
                </div>

                {/* O elige de aquí */}
                <div className="space-y-3">
                  <label className="block text-[13px] font-medium text-[#1e293b]">
                    O elige de aquí
                  </label>

                  {/* Row 1: 9 square logo buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5">
                    {LOGO_ROW_1.map((preset) => {
                      const isSelected =
                        !logo.customLogoDataUrl && logo.preset === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => dispatch(setLogoPreset(preset))}
                          className={`h-14 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e8f3ff] border-[#6aa9ff] shadow-[0_0_0_1px_rgba(106,169,255,0.3)]'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <LogoPresetIcon preset={preset} />
                        </button>
                      );
                    })}
                  </div>

                  {/* Row 2: 5 wide rectangular logo buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {LOGO_ROW_2.map((preset) => {
                      const isSelected =
                        !logo.customLogoDataUrl && logo.preset === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => dispatch(setLogoPreset(preset))}
                          className={`h-14 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#e8f3ff] border-[#6aa9ff] shadow-[0_0_0_1px_rgba(106,169,255,0.3)]'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <LogoPresetIcon preset={preset} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

