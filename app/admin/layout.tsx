'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Users, Calendar, FileSignature, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: 'Expedientes', path: '/admin', icon: Users },
    { name: 'Agenda de Citas', path: '/admin/agenda', icon: Calendar },
    { name: 'Reportes SIASE', path: '/admin/reportes', icon: FileSignature },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-black text-white tracking-tight">Admin<span className="text-blue-500">Prácticas</span></h2>
          <p className="text-slate-400 text-xs mt-1">Coordinación General</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                <Icon className="w-5 h-5" /> {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => router.push('/')} className="flex items-center gap-3 text-slate-400 hover:text-red-400 w-full px-4 py-2 font-medium transition-colors">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <header className="mb-8 flex justify-between items-start md:hidden">
          <h2 className="text-xl font-bold text-slate-900">AdminPrácticas</h2>
          <button onClick={() => router.push('/')} className="text-slate-600"><LogOut className="w-5 h-5"/></button>
        </header>
        {children}
      </main>
    </div>
  );
}