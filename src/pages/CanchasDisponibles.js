import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Globe, Navigation } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';

const CanchasDisponibles = () => {
  const { location, loading, calculateDistance } = useGeolocation();
  const [selectedRadius, setSelectedRadius] = useState(10); // Radio en km
  const [filteredCanchas, setFilteredCanchas] = useState([]);

  // Datos de las canchas
  const canchas = [
    {
      id: 1,
      name: 'La Diez',
      location: 'Miraflores',
      address: 'Av. Arequipa 1234, Miraflores',
      coordinates: { lat: -12.1194, lng: -77.0344 },
      hours: 'Lunes a Domingo: 8:00 - 23:00',
      contact: {
        whatsapp: '+51 999 123 456',
        website: 'https://ladez.com.pe',
        phone: '+51 1 234 5678'
      },
      price: 'S/ 180 por hora',
      features: ['Fútbol 7', 'Fútbol 8', 'Chalecos incluidos', 'Estacionamiento']
    },
    {
      id: 2,
      name: 'La Once',
      location: 'San Isidro',
      address: 'Av. Javier Prado 567, San Isidro',
      coordinates: { lat: -12.0984, lng: -77.0365 },
      hours: 'Lunes a Domingo: 7:00 - 22:00',
      contact: {
        whatsapp: '+51 999 234 567',
        website: 'https://laonce.com.pe',
        phone: '+51 1 345 6789'
      },
      price: 'S/ 180 por hora',
      features: ['Fútbol 7', 'Fútbol 8', 'Chalecos incluidos', 'Vestuarios']
    },
    {
      id: 3,
      name: 'La Bombonera',
      location: 'Surco',
      address: 'Av. Primavera 890, Surco',
      coordinates: { lat: -12.1456, lng: -76.9876 },
      hours: 'Lunes a Domingo: 9:00 - 21:00',
      contact: {
        whatsapp: '+51 999 345 678',
        website: 'https://labombonera.com.pe',
        phone: '+51 1 456 7890'
      },
      price: 'S/ 160 por hora',
      features: ['Fútbol 5', 'Fútbol 7', 'Chalecos incluidos', 'Cafetería']
    },
    {
      id: 4,
      name: 'SportPoint',
      location: 'San Borja',
      address: 'Av. Aviación 234, San Borja',
      coordinates: { lat: -12.1234, lng: -77.0123 },
      hours: 'Lunes a Domingo: 8:00 - 22:00',
      contact: {
        whatsapp: '+51 999 456 789',
        website: 'https://sportpoint.com.pe',
        phone: '+51 1 567 8901'
      },
      price: 'S/ 170 por hora',
      features: ['Fútbol 6', 'Fútbol 7', 'Chalecos incluidos', 'Gimnasio']
    },
    {
      id: 5,
      name: 'Deporcentro Casuarinas',
      location: 'Surco',
      address: 'Av. La Encalada 456, Surco',
      coordinates: { lat: -12.1678, lng: -76.9456 },
      hours: 'Lunes a Domingo: 7:00 - 23:00',
      contact: {
        whatsapp: '+51 999 567 890',
        website: 'https://deporcentrocasuarinas.com.pe',
        phone: '+51 1 678 9012'
      },
      price: 'S/ 190 por hora',
      features: ['Fútbol 7', 'Fútbol 8', 'Chalecos incluidos', 'Piscina', 'Tennis']
    }
  ];

  useEffect(() => {
    if (location) {
      filterCanchasByDistance();
    }
  }, [location, selectedRadius]);

  const filterCanchasByDistance = () => {
    if (!location) return;

    const canchasWithDistance = canchas.map(cancha => ({
      ...cancha,
      distance: calculateDistance(
        location.lat,
        location.lng,
        cancha.coordinates.lat,
        cancha.coordinates.lng
      )
    }));

    const filtered = canchasWithDistance
      .filter(cancha => cancha.distance <= selectedRadius)
      .sort((a, b) => a.distance - b.distance);

    setFilteredCanchas(filtered);
  };

  const handleWhatsApp = (phone) => {
    const message = encodeURIComponent('Hola, me gustaría hacer una reserva de cancha.');
    window.open(`https://wa.me/${phone.replace(/\s/g, '')}?text=${message}`, '_blank');
  };

  const handleWebsite = (url) => {
    window.open(url, '_blank');
  };

  const handleNavigation = (coordinates) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Obteniendo tu ubicación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Canchas Disponibles
        </h1>
        <p className="text-gray-600">
          Encuentra canchas cerca de ti
        </p>
      </div>

      {/* Filtro de radio */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <Navigation size={20} className="text-green-600" />
          <h3 className="font-semibold text-gray-900">Radio de búsqueda</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="20"
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-700 min-w-[60px]">
              {selectedRadius} km
            </span>
          </div>
          
          {location && (
            <p className="text-xs text-gray-500">
              Buscando canchas en un radio de {selectedRadius} km desde tu ubicación
            </p>
          )}
        </div>
      </div>

      {/* Lista de canchas */}
      <div className="space-y-4">
        {filteredCanchas.length > 0 ? (
          filteredCanchas.map(cancha => (
            <div key={cancha.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              {/* Header de la cancha */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{cancha.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                    <MapPin size={16} />
                    <span>{cancha.location}</span>
                    {cancha.distance && (
                      <span className="text-green-600 font-medium">
                        • {cancha.distance.toFixed(1)} km
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">{cancha.price}</div>
                  <div className="text-xs text-gray-500">por hora</div>
                </div>
              </div>

              {/* Dirección */}
              <div className="mb-3">
                <p className="text-sm text-gray-700">{cancha.address}</p>
              </div>

              {/* Horarios */}
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                <Clock size={16} />
                <span>{cancha.hours}</span>
              </div>

              {/* Características */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {cancha.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones de contacto */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleWhatsApp(cancha.contact.whatsapp)}
                  className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleWebsite(cancha.contact.website)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Globe size={16} />
                  Web
                </button>
                <button
                  onClick={() => handleNavigation(cancha.coordinates)}
                  className="bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <Navigation size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPin size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="mb-2">No se encontraron canchas en el radio seleccionado</p>
            <p className="text-sm">Intenta aumentar el radio de búsqueda</p>
          </div>
        )}
      </div>

      {/* Información adicional */}
      {filteredCanchas.length > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Información importante</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Las reservas se realizan directamente con cada cancha</li>
            <li>• Los precios pueden variar según el horario y día</li>
            <li>• Se recomienda reservar con anticipación</li>
            <li>• Algunas canchas requieren depósito para confirmar</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CanchasDisponibles; 