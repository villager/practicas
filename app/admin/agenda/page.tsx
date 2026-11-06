import React from 'react';
import { agendaCitas } from '@/lib/mockData';
import { Calendar as CalendarIcon, Clock, MapPin, CheckCircle } from 'lucide-react';

export default function AdminAgenda() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Agenda de Citas Físicas</h1>
        <p className="text-slate-500 mt-1">Revisiones presenciales programadas</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold flex items-center gap-2 text-slate-800"><CalendarIcon className="w-5 h-5 text-blue-600"/> Próximas Citas</h2>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">+ Bloquear Horario</button>
        </div>
        <div className="p-0">
          {agendaCitas.map((cita, i) => (
            <div key={cita.id} className={`p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${i !== agendaCitas.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{cita.student}</h3>
                <p className="text-sm text-slate-500">Matrícula: {cita.matricula}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{cita.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{cita.location}</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-slate-300 hover:bg-green-50 hover:text-green-700 hover:border-green-300 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all">
                <CheckCircle className="w-4 h-4" /> Marcar como Atendido
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}