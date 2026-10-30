import React from 'react';

export const TypeGridSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-slate-100 animate-pulse">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="h-11 rounded-md bg-slate-100 flex items-center justify-center gap-2 px-3"
          >
            <div className="w-4 h-4 rounded bg-slate-200" />
            <div className="w-16 h-3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ContentFormSkeleton: React.FC = () => {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 w-40 bg-slate-200 rounded" />
      <div className="bg-white rounded-lg p-3.5 border border-slate-100 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="h-5 w-2/3 bg-slate-100 rounded" />
      </div>
    </div>
  );
};

export const DesignSectionSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-b-lg rounded-tr-lg p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] space-y-6 animate-pulse">
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 shrink-0 rounded-lg bg-slate-100 border border-slate-200/60"
          />
        ))}
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-3.5 w-28 bg-slate-200 rounded" />
          <div className="h-11 bg-slate-100 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
          <div className="h-11 bg-slate-100 rounded-lg" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3.5 w-28 bg-slate-200 rounded" />
        <div className="flex gap-3">
          <div className="h-11 flex-1 bg-slate-100 rounded-lg" />
          <div className="h-11 w-32 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const QRPreviewSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full animate-pulse">
      <div className="w-[260px] h-[300px] bg-slate-100 rounded-2xl border border-slate-200/70 flex flex-col items-center justify-between p-5 mb-5">
        <div className="w-full aspect-square bg-slate-200 rounded-lg" />
        <div className="w-32 h-5 bg-slate-200 rounded mt-3" />
      </div>
      <div className="w-full max-w-[260px] h-12 bg-emerald-200/70 rounded-lg" />
    </div>
  );
};

