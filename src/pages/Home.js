import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Clock, Filter } from 'lucide-react';
import PartidoDetalle from '../components/PartidoDetalle';

// Simular datos de partidos (fuera del componente para evitar re-renders)
const mockPartidos = [
  {
    id: 1,
    title: 'Partido Amistoso',
    location: 'La Diez - Miraflores',
    date: '2024-01-15',
    time: '19:00',
    players: 12,
    maxPlayers: 14,
    distance: 2.5,
    price: 180,
    type: 'público',
    chalecos: true,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 2,
    title: 'Fútbol 7 vs 7',
    location: 'SportPoint - San Isidro',
    date: '2024-01-16',
    time: '20:00',
    players: 10,
    maxPlayers: 14,
    distance: 1.8,
    price: 180,
    type: 'público',
    chalecos: false,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 3,
    title: 'Partido Competitivo',
    location: 'Deporcentro - Surco',
    date: '2024-01-18',
    time: '18:30',
    players: 16,
    maxPlayers: 16,
    distance: 3.2,
    price: 180,
    type: 'público',
    chalecos: true,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 4,
    title: 'Fútbol 11 vs 11',
    location: 'La Once - San Borja',
    date: '2024-01-20',
    time: '21:00',
    players: 18,
    maxPlayers: 22,
    distance: 4.1,
    price: 180,
    type: 'público',
    chalecos: false,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 5,
    title: 'Partido Casual',
    location: 'SportPoint - Surquillo',
    date: '2024-01-22',
    time: '19:30',
    players: 8,
    maxPlayers: 12,
    distance: 1.5,
    price: 180,
    type: 'público',
    chalecos: true,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 6,
    title: 'Torneo Amistoso',
    location: 'La Diez - San Isidro',
    date: '2024-01-25',
    time: '20:30',
    players: 14,
    maxPlayers: 14,
    distance: 2.8,
    price: 180,
    type: 'público',
    chalecos: false,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 7,
    title: 'Fútbol 8 vs 8',
    location: 'Deporcentro - Miraflores',
    date: '2024-01-28',
    time: '18:00',
    players: 12,
    maxPlayers: 16,
    distance: 2.1,
    price: 180,
    type: 'público',
    chalecos: true,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 8,
    title: 'Partido Nocturno',
    location: 'La Once - Surco',
    date: '2024-01-30',
    time: '22:00',
    players: 10,
    maxPlayers: 14,
    distance: 3.5,
    price: 180,
    type: 'público',
    chalecos: false,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 9,
    title: 'Fútbol 6 vs 6',
    location: 'SportPoint - San Borja',
    date: '2024-02-02',
    time: '19:00',
    players: 8,
    maxPlayers: 12,
    distance: 1.9,
    price: 180,
    type: 'público',
    chalecos: true,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  },
  {
    id: 10,
    title: 'Partido de Fin de Semana',
    location: 'La Diez - Surquillo',
    date: '2024-02-05',
    time: '16:00',
    players: 20,
    maxPlayers: 22,
    distance: 2.3,
    price: 180,
    type: 'público',
    chalecos: false,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  }
];

const Home = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [partidos, setPartidos] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState(null);

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

  // Obtener la fecha máxima (un mes desde hoy) en formato YYYY-MM-DD
  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1);
    const year = maxDate.getFullYear();
    const month = String(maxDate.getMonth() + 1).padStart(2, '0');
    const day = String(maxDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Ubicación obtenida:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error obteniendo ubicación:', error);
        }
      );
    }

    setPartidos(mockPartidos);
  }, []);

  const handleFilter = () => {
    let filteredPartidos = [...mockPartidos];

    // Filtrar por distrito
    if (selectedDistrict) {
      filteredPartidos = filteredPartidos.filter(partido => 
        partido.location.toLowerCase().includes(selectedDistrict.toLowerCase())
      );
    }

    // Filtrar por fecha
    if (selectedDate) {
      filteredPartidos = filteredPartidos.filter(partido => 
        partido.date === selectedDate
      );
    }

    // Si no hay resultados, mostrar todos los partidos
    if (filteredPartidos.length === 0) {
      filteredPartidos = mockPartidos;
    }

    // Limitar a máximo 3 partidos activos
    filteredPartidos = filteredPartidos.slice(0, 3);

    setPartidos(filteredPartidos);
    console.log('Filtrando por:', { selectedDistrict, selectedDate });
    console.log('Resultados encontrados:', filteredPartidos.length);
  };

  const handleJoinPartido = (position, team) => {
    console.log('Uniéndose al partido como:', position, 'en el equipo:', team);
    // Aquí iría la lógica de pago y registro
    setSelectedPartido(null);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Partidos Cercanos
        </h1>
        <p className="text-gray-600">
          Encuentra partidos cerca de ti
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
              Fecha
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getTodayDate()}
              max={getMaxDate()}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selecciona una fecha entre hoy y un mes
            </p>
          </div>

          <button
            onClick={handleFilter}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* Lista de Partidos */}
      <div className="space-y-4">
        {partidos.map(partido => (
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
                <span>{partido.players}/{partido.maxPlayers}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{partido.distance} km</span> de distancia
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="font-bold text-green-600">S/ {Math.round(partido.price / partido.maxPlayers)}</div>
                  <div className="text-xs text-gray-500">por jugador</div>
                </div>
                <button 
                  onClick={() => setSelectedPartido(partido)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Unirse
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalle del partido */}
      {selectedPartido && (
        <PartidoDetalle
          partido={selectedPartido}
          onClose={() => setSelectedPartido(null)}
          onJoin={handleJoinPartido}
        />
      )}
    </div>
  );
};

export default Home; 