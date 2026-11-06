'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, BookOpen, Clock } from 'lucide-react';

export default function EstudianteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white"><BookOpen className="w-5 h-5"/></div>
            <h1 className="font-bold text-lg hidden sm:block text-slate-900">Portal de Prácticas</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block mr-4 border-r border-slate-200 pr-4">
              <p className="text-sm font-bold text-slate-800">1678902</p>
              <p className="text-xs text-slate-500">Ing. en Software</p>
            </div>
            <button onClick={() => router.push('/')} className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors text-sm font-medium">
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}