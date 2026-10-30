import React, { useEffect } from 'react';
import { ContentSection } from './components/ContentSection';
import { DesignSection } from './components/DesignSection';
import { QRPreviewSection } from './components/QRPreviewSection';
import { QRTypeSelector } from './components/QRTypeSelector';
import {
  ContentFormSkeleton,
  DesignSectionSkeleton,
  TypeGridSkeleton,
} from './components/Skeletons';
import { setInitialLoading } from './store/qrSlice';
import { useAppDispatch, useAppSelector } from './store/store';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isInitialLoading = useAppSelector(
    (state) => state.qr.ui.isInitialLoading
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setInitialLoading(false));
    }, 600);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#eef2f6] py-3 sm:py-7 px-2 sm:px-5 flex items-start justify-center">
      <main className="w-full max-w-[1140px] bg-[#f4f7f9] rounded-xl shadow-[0_4px_24px_rgba(15,23,42,0.07)] border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Configuration Column */}
        <div className="lg:col-span-8 p-4 sm:p-6 md:p-7 space-y-6 bg-[#f4f7f9]">
          {isInitialLoading ? <TypeGridSkeleton /> : <QRTypeSelector />}

          {isInitialLoading ? (
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-[#1e293b] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="text-[15px] font-medium text-[#1e293b]">
                  Completa el contenido
                </h2>
              </div>
              <ContentFormSkeleton />
            </div>
          ) : (
            <ContentSection />
          )}

          {isInitialLoading ? (
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-[#1e293b] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="text-[15px] font-medium text-[#1e293b]">
                  Diseña tu código QR
                </h2>
              </div>
              <DesignSectionSkeleton />
            </div>
          ) : (
            <DesignSection />
          )}
        </div>

        {/* Right Preview & Download Column */}
        <div className="lg:col-span-4 bg-white border-t lg:border-t-0 lg:border-l border-slate-200/80 p-6 sm:p-8 flex flex-col items-center justify-start lg:sticky lg:top-0">
          <QRPreviewSection />
        </div>
      </main>
    </div>
  );
};

export default App;

