'use client';
import React, { useState } from 'react';
import { conocimientos } from '@/lib/mockData';
import { 
  CheckCircle, AlertTriangle, Clock, Calendar, 
  UploadCloud, ChevronRight, BookOpen, MessageSquare, X 
} from 'lucide-react';

export default function EstudianteDashboard() {
  const [entregas, setEntregas] = useState([
    { id: 1, titulo: 'Avance Mensual 2 - Corregido.pdf', fecha: '10 Nov 2026, 10:45 AM', estado: 'En Revisión', feedback: null },
    { id: 2, titulo: 'Avance Mensual 1.pdf', fecha: '15 Oct 2026, 09:00 AM', estado: 'Aprobado', feedback: 'Excelente desglose de actividades. Continúa con este formato.' }
  ]);
  
  const [cita, setCita] = useState('Jueves, 12 Nov 2026 - 11:30 AM');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCitaModal, setShowCitaModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newCitaDate, setNewCitaDate] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName) return;
    setEntregas([{ id: Date.now(), titulo: newFileName, fecha: new Date().toLocaleString('es-MX'), estado: 'En Revisión', feedback: null }, ...entregas]);
    setShowUploadModal(false);
    setNewFileName('');
  };

  const handleReprogramar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCitaDate) return;
    setCita(new Date(newCitaDate).toLocaleString('es-MX', { dateStyle: 'full', timeStyle: 'short' }));
    setShowCitaModal(false);
  };

  return (
    <>
      {/* Modals */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Subir Nuevo Avance</h3>
              <button onClick={() => setShowUploadModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-700" /></button>
            </div>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del Archivo / Descripción</label>
                <input type="text" required value={newFileName} onChange={e => setNewFileName(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Ej. Avance Mensual 3.pdf" />
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                <p className="text-sm font-medium text-slate-600">Haz clic o arrastra un archivo PDF aquí</p>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 shadow-md">Subir Documento</button>
            </form>
          </div>
        </div>
      )}

      {showCitaModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Reprogramar Cita Física</h3>
              <button onClick={() => setShowCitaModal(false)}><X className="w-5 h-5 text-slate-400 hover:text-slate-700" /></button>
            </div>
            <form onSubmit={handleReprogramar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Selecciona nueva fecha y hora</label>
                <input type="datetime-local" required value={newCitaDate} onChange={e => setNewCitaDate(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2 outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 shadow-md">Confirmar Reprogramación</button>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Mi Panel</h2>
        <div className="px-4 py-2 bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg font-bold flex items-center gap-2 text-sm shadow-sm">
          <Clock className="w-4 h-4" /> 4 días para vencimiento
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" /> Estatus del Trámite
            </h2>
            <div className="flex items-center justify-between relative px-2 md:px-6">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-100 -z-10"></div>
              {['Recepción', 'Revisión', 'Observaciones', 'Aprobado'].map((paso, index) => (
                <div key={paso} className="flex flex-col items-center bg-white px-2">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 
                    ${index === 2 ? 'border-yellow-400 bg-yellow-50 text-yellow-600 shadow-md shadow-yellow-100' : 
                      index < 2 ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100' : 'border-slate-200 bg-white text-slate-400'}`}>
                    {index < 2 ? <CheckCircle className="w-5 h-5 md:w-6 md:h-6" /> : index + 1}
                  </div>
                  <span className={`mt-3 text-xs md:text-sm font-bold text-center ${index === 2 ? 'text-yellow-700' : index < 2 ? 'text-blue-900' : 'text-slate-500'}`}>{paso}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 shrink-0" />
                <div>
                  <h3 className="text-yellow-800 font-bold text-sm">Corrección requerida</h3>
                  <p className="text-yellow-700 text-sm mt-1">El documento carece del sello de la empresa en la página 3. Adjunta la versión corregida.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2"><UploadCloud className="w-5 h-5 text-blue-600" /> Historial de Entregas</h2>
              <button onClick={() => setShowUploadModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm">+ Nuevo Adjunto</button>
            </div>
            <div className="space-y-4">
              {entregas.map((entrega) => (
                <div key={entrega.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50 hover:bg-white transition-colors shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800">{entrega.titulo}</h4>
                      <p className="text-xs text-slate-500 mt-1">Enviado: {entrega.fecha}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${entrega.estado === 'Aprobado' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}`}>{entrega.estado}</span>
                  </div>
                  {entrega.feedback && (
                    <div className="mt-3 text-sm text-slate-700 bg-blue-50/50 border border-blue-100 p-3 rounded-lg flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <p>{entrega.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-blue-600" /> Revisión Física</h2>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-5 rounded-xl border border-blue-100 mb-4 shadow-inner">
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">Cita Confirmada</p>
              <p className="text-lg font-black text-slate-800 capitalize leading-tight">{cita}</p>
              <p className="text-sm font-medium text-slate-600 mt-2 flex items-center gap-2"><BookOpen className="w-4 h-4"/> Cubículo Admin 4</p>
            </div>
            <button onClick={() => setShowCitaModal(true)} className="w-full border-2 border-slate-200 hover:border-blue-600 hover:text-blue-700 text-slate-600 font-bold py-2 rounded-lg transition-all text-sm">Reprogramar</button>
          </section>

          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" /> Base de Conocimientos</h2>
            <ul className="space-y-2">
              {conocimientos.map((item) => (
                <li key={item.id}>
                  <button onClick={() => alert(`Descargando documento: ${item.title}`)} className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-100 hover:border-blue-200 transition-all group">
                    <span className="text-sm text-slate-700 group-hover:text-blue-700 font-semibold text-left">{item.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}