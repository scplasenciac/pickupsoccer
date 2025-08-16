import React from 'react';
import { Trophy, Clock, Users, Star } from 'lucide-react';

const Torneos = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Torneos
        </h1>
        <p className="text-gray-600">
          Funcionalidad próximamente disponible
        </p>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 text-center mb-6">
        <div className="mb-6">
          <Trophy size={64} className="text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Próximamente!
          </h2>
          <p className="text-gray-600 mb-4">
            Estamos trabajando en una experiencia increíble para los torneos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Users size={32} className="text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Torneos Competitivos</h3>
            <p className="text-sm text-gray-600">
              Participa en torneos organizados con premios y clasificaciones
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Clock size={32} className="text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Ligas Temporadas</h3>
            <p className="text-sm text-gray-600">
              Únete a ligas de temporada con partidos regulares
            </p>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <Star size={32} className="text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Sistema de Rankings</h3>
            <p className="text-sm text-gray-600">
              Compite y sube en el ranking de jugadores
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Funcionalidades que vendrán:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Creación de torneos personalizados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Sistema de inscripciones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Gestión de equipos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Calendario de partidos</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Tabla de posiciones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Sistema de premios</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Estadísticas detalladas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Notificaciones automáticas</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
            Notificarme cuando esté disponible
          </button>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-center text-gray-500">
          <Trophy size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">Torneos no disponibles aún</p>
          <p className="text-sm">
            Mientras tanto, puedes crear partidos individuales o explorar las canchas disponibles
          </p>
        </div>
      </div>
    </div>
  );
};

export default Torneos; 