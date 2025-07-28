import React, { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, Award, Clock } from 'lucide-react';

const Historial = () => {
  const [activeTab, setActiveTab] = useState('partidos');

  // Simular datos de historial
  const mockHistorial = {
    partidos: [
      {
        id: 1,
        title: 'Partido Amistoso',
        location: 'La Diez - Miraflores',
        date: '2024-01-10',
        time: '19:00',
        result: 'Victoria 3-2',
        players: 14,
        type: 'público',
        status: 'completado'
      },
      {
        id: 2,
        title: 'Fútbol 5',
        location: 'SportPoint - San Isidro',
        date: '2024-01-08',
        time: '20:00',
        result: 'Empate 2-2',
        players: 10,
        type: 'privado',
        status: 'completado'
      }
    ],
    torneos: [
      {
        id: 1,
        title: 'Torneo de Verano 2023',
        location: 'La Diez - Miraflores',
        startDate: '2023-12-01',
        endDate: '2023-12-15',
        position: '3er lugar',
        prize: 'S/ 500',
        teams: 8,
        status: 'finalizado'
      },
      {
        id: 2,
        title: 'Copa Amistad',
        location: 'SportPoint - San Isidro',
        startDate: '2023-11-01',
        endDate: '2023-11-30',
        position: 'Campeón',
        prize: 'S/ 1000',
        teams: 12,
        status: 'finalizado'
      }
    ]
  };

  const renderPartido = (partido) => (
    <div key={partido.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{partido.title}</h3>
          <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
            <MapPin size={16} />
            <span>{partido.location}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          partido.type === 'público' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {partido.type}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{partido.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} />
          <span>{partido.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{partido.players} jugadores</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium text-gray-900">Resultado: </span>
          <span className={`font-bold ${
            partido.result.includes('Victoria') ? 'text-green-600' :
            partido.result.includes('Empate') ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {partido.result}
          </span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {partido.status}
        </span>
      </div>
    </div>
  );

  const renderTorneo = (torneo) => (
    <div key={torneo.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={20} className="text-yellow-500" />
          <h3 className="font-semibold text-gray-900">{torneo.title}</h3>
        </div>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {torneo.status}
        </span>
      </div>

      <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
        <MapPin size={16} />
        <span>{torneo.location}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{torneo.startDate} - {torneo.endDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{torneo.teams} equipos</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-yellow-600">
          <Award size={16} />
          <span className="font-medium">{torneo.position}</span>
        </div>
        <div className="text-sm text-gray-600">
          Premio: <span className="font-medium">{torneo.prize}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Mi Historial
        </h1>
        <p className="text-gray-600">
          Tus partidos y torneos anteriores
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('partidos')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'partidos'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Partidos
        </button>
        <button
          onClick={() => setActiveTab('torneos')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
            activeTab === 'torneos'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Torneos
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'partidos' ? (
          mockHistorial.partidos.length > 0 ? (
            mockHistorial.partidos.map(renderPartido)
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No tienes partidos en tu historial</p>
            </div>
          )
        ) : (
          mockHistorial.torneos.length > 0 ? (
            mockHistorial.torneos.map(renderTorneo)
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Trophy size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No tienes torneos en tu historial</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Historial; 