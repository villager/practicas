'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, User, ShieldCheck, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [role, setRole] = useState<'estudiante' | 'admin'>('estudiante');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(role === 'estudiante' ? '/estudiante' : '/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-blue-600 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Portal de Prácticas</h1>
          <p className="text-blue-100 mt-1 text-sm">Sistema de Gestión y Seguimiento</p>
        </div>

        <div className="p-8">
          <div className="flex p-1 bg-slate-100 rounded-lg mb-6">
            <button type="button" onClick={() => setRole('estudiante')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${role === 'estudiante' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <User className="w-4 h-4" /> Alumno
            </button>
            <button type="button" onClick={() => setRole('admin')} className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${role === 'admin' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
              <ShieldCheck className="w-4 h-4" /> Administrativo
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{role === 'estudiante' ? 'Matrícula' : 'Correo Institucional'}</label>
              <input type={role === 'estudiante' ? 'text' : 'email'} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder={role === 'estudiante' ? 'Ej. 1678902' : 'admin@institucion.edu'} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
              <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md">
              <LogIn className="w-5 h-5" /> Ingresar al Portal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}