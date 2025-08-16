import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Clock, Filter, Upload, CheckCircle, AlertCircle, Trash2, Edit } from 'lucide-react';
import PartidoDetalle from '../components/PartidoDetalle';
import { useMyPartidos } from '../hooks/useMyPartidos';

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
  const [selectedCancha, setSelectedCancha] = useState('');
  const [partidos, setPartidos] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMyPartido, setSelectedMyPartido] = useState(null);
  const [paymentFile, setPaymentFile] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsForm, setDetailsForm] = useState({
    fecha: '',
    hora: '',
    cancha: '',
    jugadores: '',
    tipo: 'público'
  });

  const { 
    misPartidos, 
    crearPartido, 
    adjuntarComprobante, 
    actualizarDetallesPartido, 
    eliminarPartido,
    getPartidosConfirmados 
  } = useMyPartidos();

  const districts = [
    'Surco', 'San Borja', 'San Isidro', 'Miraflores', 'Surquillo'
  ];

  const canchas = [
    'La Diez', 'La Once', 'La Bombonera', 'SportPoint', 'Deporcentro Casuarinas'
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

    // Combinar partidos mock con partidos confirmados del usuario
    const partidosConfirmados = getPartidosConfirmados();
    const partidosCombinados = [...mockPartidos];
    
    // Agregar partidos confirmados del usuario a la lista
    partidosConfirmados.forEach(partido => {
      const partidoParaLista = {
        id: partido.id,
        title: partido.title,
        location: partido.cancha,
        date: partido.fecha,
        time: partido.hora,
        players: partido.players,
        maxPlayers: partido.maxPlayers,
        distance: 0.5, // Distancia cercana ya que es del usuario
        price: 180, // Precio estándar
        type: partido.type,
        chalecos: false,
        equipoAColor: partido.equipoAColor,
        equipoBColor: partido.equipoBColor,
        isMyPartido: true // Marca para identificar que es del usuario
      };
      partidosCombinados.unshift(partidoParaLista); // Agregar al inicio
    });

    setPartidos(partidosCombinados);
  }, [misPartidos]); // Dependencia en misPartidos para actualizar cuando cambien

  const handleFilter = () => {
    // Obtener partidos confirmados del usuario
    const partidosConfirmados = getPartidosConfirmados();
    const partidosCombinados = [...mockPartidos];
    
    // Agregar partidos confirmados del usuario a la lista
    partidosConfirmados.forEach(partido => {
      const partidoParaLista = {
        id: partido.id,
        title: partido.title,
        location: partido.cancha,
        date: partido.fecha,
        time: partido.hora,
        players: partido.players,
        maxPlayers: partido.maxPlayers,
        distance: 0.5,
        price: 180,
        type: partido.type,
        chalecos: false,
        equipoAColor: partido.equipoAColor,
        equipoBColor: partido.equipoBColor,
        isMyPartido: true
      };
      partidosCombinados.unshift(partidoParaLista);
    });

    let filteredPartidos = [...partidosCombinados];

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

    // Filtrar por cancha
    if (selectedCancha) {
      filteredPartidos = filteredPartidos.filter(partido => 
        partido.location.toLowerCase().includes(selectedCancha.toLowerCase())
      );
    }

    // Si no hay resultados, mostrar todos los partidos
    if (filteredPartidos.length === 0) {
      filteredPartidos = partidosCombinados;
    }

    // Limitar a máximo 3 partidos activos
    filteredPartidos = filteredPartidos.slice(0, 3);

    setPartidos(filteredPartidos);
    console.log('Filtrando por:', { selectedDistrict, selectedDate, selectedCancha });
    console.log('Resultados encontrados:', filteredPartidos.length);
  };

  const handleJoinPartido = (position, team) => {
    console.log('Uniéndose al partido como:', position, 'en el equipo:', team);
    // Aquí iría la lógica de pago y registro
    setSelectedPartido(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPaymentFile(file);
    }
  };

  const handleSubmitPayment = () => {
    if (paymentFile && selectedMyPartido) {
      // Aquí se enviaría el archivo al servidor
      console.log('Enviando comprobante:', paymentFile.name);
      
      // Actualizar el estado del partido usando el hook
      adjuntarComprobante(selectedMyPartido.id, paymentFile.name);
      
      setShowPaymentModal(false);
      setSelectedMyPartido(null);
      setPaymentFile(null);
      alert('Comprobante enviado exitosamente. Tu partido será confirmado pronto.');
    }
  };

  const handleDetailsSubmit = () => {
    if (detailsForm.fecha && detailsForm.hora && detailsForm.cancha && detailsForm.jugadores && selectedMyPartido) {
      actualizarDetallesPartido(selectedMyPartido.id, detailsForm);
      setShowDetailsModal(false);
      setSelectedMyPartido(null);
      setDetailsForm({ fecha: '', hora: '', cancha: '', jugadores: '', tipo: 'público' });
      alert('Detalles del partido actualizados exitosamente.');
    }
  };

  const handleDeletePartido = (partido) => {
    try {
      eliminarPartido(partido.id);
      alert('Partido eliminado exitosamente.');
    } catch (error) {
      alert(error.message);
    }
  };

  const renderMisPartidos = () => {
    const partidosActivos = misPartidos.filter(p => p.status !== 'cancelado');
    console.log('=== RENDERIZANDO MIS PARTIDOS ===');
    console.log('Total de partidos:', misPartidos.length);
    console.log('Partidos activos:', partidosActivos.length);
    console.log('Todos los partidos:', misPartidos);
    console.log('Partidos activos filtrados:', partidosActivos);
    
    if (partidosActivos.length === 0) {
      return (
        <div className="text-center py-6 text-gray-500">
          <Users size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No has creado ningún partido aún</p>
          <p className="text-sm">Crea tu primer partido desde el botón &quot;+&quot;</p>
          
          {/* Botón de prueba para debugging */}
          <button
            onClick={() => {
              console.log('=== PRUEBA DE LOCALSTORAGE ===');
              console.log('localStorage actual:', localStorage.getItem('misPartidos'));
              console.log('Estado actual de misPartidos:', misPartidos);
              
              // Crear un partido de prueba
              const partidoPrueba = {
                id: `test-${Date.now()}`,
                title: 'Partido de Prueba',
                players: 14,
                maxPlayers: 14,
                type: 'público',
                equipoAColor: 'blanco',
                equipoBColor: 'oscuro',
                status: 'pendiente',
                paymentProof: null,
                createdAt: new Date().toISOString().split('T')[0]
              };
              
              console.log('Creando partido de prueba:', partidoPrueba);
              crearPartido(partidoPrueba);
            }}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Crear Partido
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {partidosActivos.map(partido => (
          <div key={partido.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{partido.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Users size={16} />
                  <span>{partido.players}/{partido.maxPlayers} jugadores</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  partido.type === 'público' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {partido.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  partido.status === 'confirmado' 
                    ? 'bg-green-100 text-green-800' 
                    : partido.status === 'pendiente'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {partido.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Creado: {partido.createdAt}</span>
              </div>
            </div>

            {/* Detalles del partido si están completados */}
            {partido.detallesCompletados && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Detalles del partido</span>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-blue-700">
                  <div><strong>Fecha:</strong> {partido.fecha}</div>
                  <div><strong>Hora:</strong> {partido.hora}</div>
                  <div><strong>Cancha:</strong> {partido.cancha}</div>
                  <div><strong>Jugadores:</strong> {partido.players === 14 ? '7 vs 7' : '8 vs 8'} ({partido.players} total)</div>
                  <div><strong>Tipo:</strong> {partido.type}</div>
                </div>
              </div>
            )}

            {partido.status === 'pendiente' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Pendiente de confirmación</span>
                </div>
                
                {!partido.detallesCompletados && (
                  <p className="text-xs text-yellow-700 mb-3">
                    Primero debes completar los detalles del partido (fecha, hora y cancha).
                  </p>
                )}
                
                {partido.detallesCompletados && (
                  <p className="text-xs text-yellow-700 mb-3">
                    Para confirmar tu partido, debes adjuntar el comprobante de pago de la cancha.
                  </p>
                )}

                <div className="flex gap-2">
                  {!partido.detallesCompletados && (
                    <button
                      onClick={() => {
                        setSelectedMyPartido(partido);
                        setShowDetailsModal(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Completar Detalles
                    </button>
                  )}
                  
                  {partido.detallesCompletados && (
                    <button
                      onClick={() => {
                        setSelectedMyPartido(partido);
                        setShowPaymentModal(true);
                      }}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors flex items-center gap-2"
                    >
                      <Upload size={16} />
                      Adjuntar Comprobante
                    </button>
                  )}
                </div>
              </div>
            )}

            {partido.status === 'confirmado' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-green-800">Partido confirmado</span>
                </div>
                {partido.paymentProof && (
                  <p className="text-xs text-green-700 mt-1">
                    Comprobante: {partido.paymentProof}
                  </p>
                )}
                {partido.confirmedAt && (
                  <p className="text-xs text-green-700">
                    Confirmado: {partido.confirmedAt}
                  </p>
                )}
                <p className="text-xs text-green-700 mt-1">
                  ✅ Tu partido ya aparece en la lista de &quot;Partidos Cercanos&quot;
                </p>
              </div>
            )}

            {/* Botones de acción - Solo mostrar si NO tiene comprobante adjunto */}
            {!partido.paymentProof && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex gap-2">
                  {/* Botón de editar detalles - Solo si tiene detalles completados */}
                  {partido.detallesCompletados && (
                    <button
                      onClick={() => {
                        setSelectedMyPartido(partido);
                        setDetailsForm({
                          fecha: partido.fecha,
                          hora: partido.hora,
                          cancha: partido.cancha,
                          jugadores: partido.players,
                          tipo: partido.type
                        });
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Edit size={16} />
                      Editar Detalles
                    </button>
                  )}
                  
                  {/* Botón de eliminar */}
                  <button
                    onClick={() => handleDeletePartido(partido)}
                    className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Eliminar partido
                  </button>
                </div>
              </div>
            )}

            {/* Mensaje cuando ya no se puede editar/eliminar */}
            {partido.paymentProof && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  ℹ️ Este partido ya no se puede editar ni eliminar porque tiene el comprobante de pago adjunto.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Inicio
        </h1>
        <p className="text-gray-600">
          Gestiona tus partidos y encuentra otros
        </p>
      </div>

      {/* Mis Partidos */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Mis Partidos</h2>
          <span className="text-sm text-gray-500">
            {misPartidos.filter(p => p.status !== 'cancelado').length}/1 partido creado
          </span>
        </div>
        {renderMisPartidos()}
      </div>

      {/* Separador */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* Partidos Cercanos */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Partidos Cercanos
        </h2>
        <p className="text-gray-600 text-sm">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cancha
            </label>
            <select
              value={selectedCancha}
              onChange={(e) => setSelectedCancha(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Todas las canchas</option>
              {canchas.map(cancha => (
                <option key={cancha} value={cancha}>{cancha}</option>
              ))}
            </select>
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
                  {partido.isMyPartido && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      Mi partido
                    </span>
                  )}
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
                {!partido.isMyPartido ? (
                  <button 
                    onClick={() => setSelectedPartido(partido)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Unirse
                  </button>
                ) : (
                  <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                    Confirmado
                  </div>
                )}
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

      {/* Modal de adjuntar comprobante */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Adjuntar Comprobante de Pago
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona el archivo
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceptados: JPG, PNG, PDF
                </p>
              </div>

              {paymentFile && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ Archivo seleccionado: <strong>{paymentFile.name}</strong>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedMyPartido(null);
                  setPaymentFile(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitPayment}
                disabled={!paymentFile}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  paymentFile
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del partido */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detalles del Partido
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={detailsForm.fecha}
                  onChange={(e) => setDetailsForm(prev => ({ ...prev, fecha: e.target.value }))}
                  min={getTodayDate()}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hora <span className="text-red-500">*</span>
                </label>
                <select
                  value={detailsForm.hora}
                  onChange={(e) => setDetailsForm(prev => ({ ...prev, hora: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecciona una hora</option>
                  <option value="07:00">7:00 AM</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="22:00">10:00 PM</option>
                  <option value="23:00">11:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancha <span className="text-red-500">*</span>
                </label>
                <select
                  value={detailsForm.cancha}
                  onChange={(e) => setDetailsForm(prev => ({ ...prev, cancha: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecciona una cancha</option>
                  <option value="La Diez">La Diez</option>
                  <option value="La Once">La Once</option>
                  <option value="La Bombonera">La Bombonera</option>
                  <option value="SportPoint">SportPoint</option>
                  <option value="Deporcentro Casuarinas">Deporcentro Casuarinas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Jugadores <span className="text-red-500">*</span>
                </label>
                <select
                  value={detailsForm.jugadores}
                  onChange={(e) => setDetailsForm(prev => ({ ...prev, jugadores: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecciona el formato</option>
                  <option value="14">7 vs 7 (14 jugadores)</option>
                  <option value="16">8 vs 8 (16 jugadores)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Partido <span className="text-red-500">*</span>
                </label>
                <select
                  value={detailsForm.tipo}
                  onChange={(e) => setDetailsForm(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="público">Público</option>
                  <option value="privado">Privado</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedMyPartido(null);
                  setDetailsForm({ fecha: '', hora: '', cancha: '', jugadores: '', tipo: 'público' });
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDetailsSubmit}
                disabled={!detailsForm.fecha || !detailsForm.hora || !detailsForm.cancha || !detailsForm.jugadores}
                className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                  detailsForm.fecha && detailsForm.hora && detailsForm.cancha && detailsForm.jugadores
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 