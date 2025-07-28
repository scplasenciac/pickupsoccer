import React, { useState } from 'react';
import { User, MapPin, Calendar, Users, Trophy, Settings } from 'lucide-react';

const Perfil = () => {
  const [user] = useState({
    name: 'Carlos Rodríguez',
    age: 28,
    position: 'Mediocampista',
    team: 'Los Tigres',
    location: 'Miraflores, Lima',
    stats: {
      pace: 85,
      shooting: 78,
      passing: 82,
      dribbling: 80,
      defending: 75,
      physical: 83
    },
    totalMatches: 45,
    wins: 28,
    draws: 8,
    losses: 9,
    winRate: 62
  });

  const [activePartidos] = useState([
    {
      id: 1,
      title: 'Partido Amistoso',
      location: 'La Diez - Miraflores',
      date: '2024-01-15',
      time: '19:00',
      players: 8,
      maxPlayers: 14
    },
    {
      id: 2,
      title: 'Torneo de Verano 2024',
      location: 'SportPoint - San Isidro',
      date: '2024-01-20',
      time: '20:00',
      teams: 8,
      maxTeams: 16
    }
  ]);

  const renderStatBar = (label, value, color = 'green') => (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            color === 'green' ? 'bg-green-500' :
            color === 'blue' ? 'bg-blue-500' :
            color === 'yellow' ? 'bg-yellow-500' :
            color === 'red' ? 'bg-red-500' :
            color === 'purple' ? 'bg-purple-500' :
            'bg-orange-500'
          }`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Mi Perfil
        </h1>
        <p className="text-gray-600">
          Gestiona tu información y estadísticas
        </p>
      </div>

      {/* Información Básica */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User size={24} className="text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.age} años • {user.position}</p>
            <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
              <MapPin size={16} />
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl text-green-600">{user.totalMatches}</div>
            <div className="text-gray-600">Partidos</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="font-bold text-2xl text-green-600">{user.winRate}%</div>
            <div className="text-gray-600">Victorias</div>
          </div>
        </div>
      </div>

      {/* Estadísticas FIFA */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Estadísticas FIFA</h3>
        </div>
        
        <div className="space-y-2">
          {renderStatBar('Velocidad', user.stats.pace, 'green')}
          {renderStatBar('Disparo', user.stats.shooting, 'blue')}
          {renderStatBar('Pase', user.stats.passing, 'yellow')}
          {renderStatBar('Regate', user.stats.dribbling, 'purple')}
          {renderStatBar('Defensa', user.stats.defending, 'red')}
          {renderStatBar('Físico', user.stats.physical, 'orange')}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {Math.round(Object.values(user.stats).reduce((a, b) => a + b, 0) / 6)}
            </div>
            <div className="text-gray-600">Rating Promedio</div>
          </div>
        </div>
      </div>

      {/* Partidos Activos */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-green-600" />
          <h3 className="font-semibold text-gray-900">Partidos Activos</h3>
        </div>
        
        <div className="space-y-3">
          {activePartidos.map(partido => (
            <div key={partido.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{partido.title}</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Activo
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                <MapPin size={16} />
                <span>{partido.location}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{partido.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{partido.players || partido.teams}/{partido.maxPlayers || partido.maxTeams}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuración */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Configuración</h3>
        </div>
        
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Editar Perfil</div>
            <div className="text-sm text-gray-600">Modifica tu información personal</div>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Notificaciones</div>
            <div className="text-sm text-gray-600">Gestiona tus notificaciones</div>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="font-medium text-gray-900">Privacidad</div>
            <div className="text-sm text-gray-600">Configura tu privacidad</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil; 