import React, { useState } from 'react';
import { Trophy, MapPin, Calendar, Users, Award, Filter } from 'lucide-react';

const Torneos = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const districts = [
    'Surco', 'San Borja', 'San Isidro', 'Miraflores', 'Surquillo'
  ];

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Simular datos de torneos
  const mockTorneos = [
    {
      id: 1,
      title: 'Torneo de Verano 2024',
      location: 'La Diez - Miraflores',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      teams: 8,
      maxTeams: 16,
      prize: 'S/ 2000',
      entryFee: 150,
      status: 'inscripciones'
    },
    {
      id: 2,
      title: 'Copa Amistad',
      location: 'SportPoint - San Isidro',
      startDate: '2024-01-25',
      endDate: '2024-03-25',
      teams: 12,
      maxTeams: 12,
      prize: 'S/ 1500',
      entryFee: 100,
      status: 'completo'
    }
  ];

  const handleFilter = () => {
    console.log('Filtrando torneos por:', { selectedDistrict, selectedDate });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Torneos Disponibles
        </h1>
        <p className="text-gray-600">
          Participa en los mejores torneos de Lima
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-green-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distrito
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todos los distritos</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de inicio
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min={getTodayDate()}
            />
          </div>

          <button
            onClick={handleFilter}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Lista de Torneos */}
      <div className="space-y-4">
        {mockTorneos.map(torneo => (
          <div key={torneo.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                <h3 className="font-semibold text-gray-900">{torneo.title}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                torneo.status === 'inscripciones' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {torneo.status === 'inscripciones' ? 'Inscripciones Abiertas' : 'Completo'}
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
                <span>{torneo.teams}/{torneo.maxTeams} equipos</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-yellow-600">
                <Award size={16} />
                <span className="font-medium">Premio: {torneo.prize}</span>
              </div>
              <div className="text-sm text-gray-600">
                Inscripción: <span className="font-medium">S/ {torneo.entryFee}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Ver Detalles
              </button>
              {torneo.status === 'inscripciones' && (
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Inscribirse
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Torneos; 