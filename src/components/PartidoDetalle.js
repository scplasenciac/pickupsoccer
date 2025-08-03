import React, { useState } from 'react';
import { MapPin, Calendar, Clock, User, Shield, Zap, Target, Shirt } from 'lucide-react';

const PartidoDetalle = ({ partido, onClose, onJoin }) => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [activeTab, setActiveTab] = useState('A');

  // Simular jugadores inscritos con sus posiciones
  const jugadoresInscritos = {
    A: {
      arqueros: [
        { id: 1, name: 'Carlos López', position: 'Arquero', team: 'A' }
      ],
      defensas: [
        { id: 3, name: 'Juan Pérez', position: 'Defensa', team: 'A' },
        { id: 4, name: 'Roberto Silva', position: 'Defensa', team: 'A' }
      ],
      mediocampistas: [
        { id: 7, name: 'Andrés Rodríguez', position: 'Mediocampista', team: 'A' },
        { id: 8, name: 'Fernando Castro', position: 'Mediocampista', team: 'A' }
      ],
      delanteros: [
        { id: 11, name: 'Pedro Mendoza', position: 'Delantero', team: 'A' }
      ]
    },
    B: {
      arqueros: [
        { id: 2, name: 'Miguel Torres', position: 'Arquero', team: 'B' }
      ],
      defensas: [
        { id: 5, name: 'Luis García', position: 'Defensa', team: 'B' },
        { id: 6, name: 'Diego Morales', position: 'Defensa', team: 'B' }
      ],
      mediocampistas: [
        { id: 9, name: 'Ricardo Vargas', position: 'Mediocampista', team: 'B' },
        { id: 10, name: 'Oscar Ruiz', position: 'Mediocampista', team: 'B' }
      ],
      delanteros: [
        { id: 12, name: 'Hugo Flores', position: 'Delantero', team: 'B' }
      ]
    }
  };

  const positions = [
    { id: 'arquero', label: 'Arquero', icon: Shield, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'defensa', label: 'Defensa', icon: Shield, color: 'bg-blue-100 text-blue-800' },
    { id: 'mediocampista', label: 'Mediocampista', icon: Zap, color: 'bg-green-100 text-green-800' },
    { id: 'delantero', label: 'Delantero', icon: Target, color: 'bg-red-100 text-red-800' }
  ];

  const getPositionCount = (position) => {
    let count = 0;
    Object.values(jugadoresInscritos).forEach(equipo => {
      count += equipo[position + 's']?.length || 0;
    });
    return count;
  };

  const getTotalPlayers = () => {
    let total = 0;
    Object.values(jugadoresInscritos).forEach(equipo => {
      Object.values(equipo).forEach(positions => {
        total += positions.length;
      });
    });
    return total;
  };

  const getCostoPorJugador = () => {
    const totalPlayers = getTotalPlayers();
    return totalPlayers > 0 ? Math.ceil(partido.price / totalPlayers) : partido.price;
  };

  const getMaxPositionCount = (position) => {
    const totalPlayers = partido.maxPlayers;
    switch (position) {
      case 'arquero':
        return 2; // Siempre 2 arqueros
      case 'defensa':
        return Math.floor(totalPlayers * 0.3); // 30% defensas
      case 'mediocampista':
        return Math.floor(totalPlayers * 0.4); // 40% mediocampistas
      case 'delantero':
        return Math.floor(totalPlayers * 0.3); // 30% delanteros
      default:
        return 0;
    }
  };

  const renderEquipo = (equipo, letraEquipo) => {
    const jugadores = jugadoresInscritos[letraEquipo];
    const colorEquipo = letraEquipo === 'A' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
    
    return (
      <div className="space-y-4">
        {/* Arqueros */}
        {jugadores.arqueros.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Shield size={16} className="text-yellow-600" />
              Arqueros
            </h4>
            <div className="space-y-2">
              {jugadores.arqueros.map(jugador => (
                <div key={jugador.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{jugador.name}</div>
                      <div className="text-sm text-gray-600">{jugador.position}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorEquipo}`}>
                    Equipo {jugador.team}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Defensas */}
        {jugadores.defensas.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Shield size={16} className="text-blue-600" />
              Defensas
            </h4>
            <div className="space-y-2">
              {jugadores.defensas.map(jugador => (
                <div key={jugador.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{jugador.name}</div>
                      <div className="text-sm text-gray-600">{jugador.position}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorEquipo}`}>
                    Equipo {jugador.team}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mediocampistas */}
        {jugadores.mediocampistas.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Zap size={16} className="text-green-600" />
              Mediocampistas
            </h4>
            <div className="space-y-2">
              {jugadores.mediocampistas.map(jugador => (
                <div key={jugador.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{jugador.name}</div>
                      <div className="text-sm text-gray-600">{jugador.position}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorEquipo}`}>
                    Equipo {jugador.team}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delanteros */}
        {jugadores.delanteros.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Target size={16} className="text-red-600" />
              Delanteros
            </h4>
            <div className="space-y-2">
              {jugadores.delanteros.map(jugador => (
                <div key={jugador.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-600" />
                    <div>
                      <div className="font-medium text-gray-900">{jugador.name}</div>
                      <div className="text-sm text-gray-600">{jugador.position}</div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorEquipo}`}>
                    Equipo {jugador.team}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">{partido.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Información del partido */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
              <MapPin size={16} />
              <span>{partido.location}</span>
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
            </div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-bold text-green-600">
                  S/ {getCostoPorJugador()} por jugador
                </div>
                <div className="text-sm text-gray-600">
                  {getTotalPlayers()} jugadores inscritos
                </div>
              </div>
              <span className="text-sm text-gray-600">
                {partido.players}/{partido.maxPlayers} jugadores
              </span>
            </div>
            
            {/* Información de chalecos y colores */}
            <div className="space-y-2 text-sm">
              {partido.chalecos ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Shirt size={16} />
                  <span>Chalecos incluidos</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Equipo A:</span>
                    <span className="font-medium">{partido.equipoAColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Equipo B:</span>
                    <span className="font-medium">{partido.equipoBColor}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs para equipos */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Jugadores Inscritos</h3>
            
            <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
              <button
                onClick={() => setActiveTab('A')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === 'A'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Equipo A
              </button>
              <button
                onClick={() => setActiveTab('B')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  activeTab === 'B'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Equipo B
              </button>
            </div>

            {/* Contenido de la pestaña activa */}
            <div className="p-4">
              {renderEquipo(jugadoresInscritos[activeTab], activeTab)}
            </div>
          </div>

          {/* Unirse al partido */}
          <div className="p-4 pb-8 border-t border-gray-200">
            {/* Selección de posición */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Seleccionar posición:</h4>
              <div className="grid grid-cols-2 gap-2">
                {positions.map(position => {
                  const Icon = position.icon;
                  const currentCount = getPositionCount(position.id);
                  const maxCount = getMaxPositionCount(position.id);
                  const isAvailable = currentCount < maxCount;
                  
                  return (
                    <button
                      key={position.id}
                      onClick={() => setSelectedPosition(position.id)}
                      disabled={!isAvailable}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        selectedPosition === position.id
                          ? 'border-green-500 bg-green-50'
                          : isAvailable
                          ? 'border-gray-200 hover:border-green-300'
                          : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <Icon size={20} className="mx-auto mb-1 text-gray-600" />
                      <div className="font-medium text-sm">{position.label}</div>
                      <div className="text-xs text-gray-500">
                        {currentCount}/{maxCount}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => onJoin(selectedPosition, activeTab)}
              disabled={!selectedPosition}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                selectedPosition
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Unirse como {selectedPosition ? positions.find(p => p.id === selectedPosition)?.label : 'jugador'} - Equipo {activeTab}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartidoDetalle; 