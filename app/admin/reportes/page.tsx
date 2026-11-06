import React from 'react';
import { FileSpreadsheet, Download, Filter } from 'lucide-react';

export default function AdminReportes() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Reportes SIASE</h1>
        <p className="text-slate-500 mt-1">Generación de sábanas de datos para sistema central</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Reporte de Alumnos Aprobados</h2>
          <p className="text-slate-500 text-sm mb-6">Genera un archivo Excel (.xlsx) con los estudiantes que han completado el 100% de sus entregas para subir la calificación final al SIASE.</p>
          <div className="flex gap-2">
             <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 shadow-sm">
               <Download className="w-4 h-4" /> Exportar Excel
             </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Filter className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Reporte Personalizado</h2>
          <p className="text-slate-500 text-sm mb-6">Filtra por plan de estudios, carrera o estatus específico para generar un reporte analítico de la generación actual.</p>
          <div className="flex gap-2">
            <select className="border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 flex-1">
              <option>Todos los planes</option>
              <option>Plan 2020</option>
              <option>Plan 401</option>
            </select>
             <button className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm">
               Generar
             </button>
          </div>
        </div>
      </div>
    </>
  );
}