'use client';
import React, { useState } from 'react';
import { initialStudents } from '@/lib/mockData';
import { Search, Filter, Eye, X, FileSignature, AlertTriangle, Calendar } from 'lucide-react';

export default function AdminExpedientes() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.id.includes(searchTerm)
  );

  const handleUpdateStatus = (newPhase: string) => {
    if (!selectedStudent) return;
    setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, phase: newPhase } : s));
    alert(`Estatus de ${selectedStudent.name} actualizado a: ${newPhase}`);
    setSelectedStudent(null);
    setFeedbackText('');
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Expedientes Activos</h1>
        <p className="text-slate-500 mt-1">Ing. Roberto Sánchez - Revisor Asignado</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><FileSignature className="w-6 h-6" /></div>
          <div><p className="text-slate-500 text-sm font-semibold">Pendientes</p><p className="text-2xl font-black">{students.filter(s => s.phase === 'En Revisión').length}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600"><Calendar className="w-6 h-6" /></div>
          <div><p className="text-slate-500 text-sm font-semibold">Citas Hoy</p><p className="text-2xl font-black">3</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600"><AlertTriangle className="w-6 h-6" /></div>
          <div><p className="text-slate-500 text-sm font-semibold">Críticos</p><p className="text-2xl font-black">{students.filter(s => s.daysLeft <= 2).length}</p></div>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative flex-1 sm:w-80 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar matrícula o nombre..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 flex items-center gap-2 text-sm font-medium w-full sm:w-auto justify-center">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[600px]">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Matrícula</th>
                <th className="px-6 py-4">Estudiante</th>
                <th className="px-6 py-4">Fase Actual</th>
                <th className="px-6 py-4">Vencimiento</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{student.id}</td>
                  <td className="px-6 py-4"><p className="font-bold text-slate-800">{student.name}</p><p className="text-xs text-slate-500">{student.program}</p></td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${student.phase === 'Aprobado' ? 'bg-green-50 text-green-700 border-green-200' : student.phase === 'Observaciones' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : student.phase === 'En Revisión' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                      {student.phase}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${student.status === 'danger' ? 'bg-red-500' : student.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <span className={`font-semibold ${student.status === 'danger' ? 'text-red-600' : ''}`}>{student.daysLeft} días</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => setSelectedStudent(student)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-semibold text-sm inline-flex items-center gap-2 transition-colors">
                      <Eye className="w-4 h-4" /> Revisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 p-4 flex justify-between items-center text-white rounded-t-xl">
              <div>
                <h3 className="text-lg font-bold">Revisión de Expediente</h3>
                <p className="text-sm text-slate-300">{selectedStudent.name} - {selectedStudent.id}</p>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="hover:bg-slate-800 p-2 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="mb-6">
                <h4 className="font-bold text-slate-700 mb-2 border-b pb-2">Documentos Entregados ({selectedStudent.docs})</h4>
                {selectedStudent.docs > 0 ? (
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100">
                    <div className="flex items-center gap-3">
                      <FileSignature className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Ultimo_Avance_Firmado.pdf</span>
                    </div>
                    <span className="text-xs text-blue-500 font-bold underline">Descargar</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No hay documentos subidos aún.</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block font-bold text-slate-700 mb-2">Añadir Retroalimentación / Observaciones</label>
                <textarea rows={4} value={feedbackText} onChange={e => setFeedbackText(e.target.value)} placeholder="Escribe aquí las correcciones necesarias..." className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t flex justify-end gap-3 rounded-b-xl">
              <button onClick={() => setSelectedStudent(null)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium">Cancelar</button>
              <button onClick={() => handleUpdateStatus('Observaciones')} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium">Requerir Corrección</button>
              <button onClick={() => handleUpdateStatus('Aprobado')} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">Aprobar Avance</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}