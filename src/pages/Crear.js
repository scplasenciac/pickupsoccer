import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Globe, Lock, Trophy } from 'lucide-react';
import { useMyPartidos } from '../hooks/useMyPartidos';
import { useNavigate } from 'react-router-dom';

const Crear = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    players: '',
    isPrivate: false
  });
  const [error, setError] = useState('');
  
  const { crearPartido, getPartidoActivo } = useMyPartidos();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Limpiar error al cambiar datos
  };

  const nextStep = () => {
    if (currentStep < 3 && canProceedToNextStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== '';
      case 2:
        return formData.players !== '';
      case 3:
        return true; // Tipo público/privado siempre es válido
      default:
        return false;
    }
  };

  const handleCreatePartido = () => {
    console.log('=== INICIANDO CREACIÓN DE PARTIDO ===');
    console.log('FormData actual:', formData);
    
    try {
      // Verificar si ya hay un partido activo
      const partidoActivo = getPartidoActivo();
      console.log('Partido activo encontrado:', partidoActivo);
      
      if (partidoActivo) {
        setError('Ya tienes un partido activo. Solo puedes crear un partido a la vez.');
        return;
      }

      // Crear el partido
      console.log('Llamando a crearPartido con datos:', formData);
      const nuevoPartido = crearPartido(formData);
      console.log('Partido creado exitosamente:', nuevoPartido);
      
      // Mostrar mensaje de éxito y redirigir
      alert('Partido creado exitosamente. Debes adjuntar el comprobante de pago para confirmarlo.');
      console.log('Redirigiendo a Home...');
      navigate('/');
    } catch (error) {
      console.error('Error al crear partido:', error);
      setError(error.message);
    }
  };

  // Si se selecciona torneo, mostrar mensaje de funcionalidad futura
  if (formData.type === 'torneo') {
    return (
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Crear Torneo
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
              La creación de torneos estará disponible muy pronto
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Funcionalidades que vendrán:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Configuración de torneos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Sistema de inscripciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Gestión de equipos</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Calendario de partidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Tabla de posiciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Sistema de premios</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                handleInputChange('type', '');
                setCurrentStep(1);
              }}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Crear Partido en su lugar
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">¿Qué quieres crear?</h2>
            <p className="text-sm text-gray-600">Selecciona el tipo de evento que quieres organizar</p>
            <div className="space-y-4">
              <button
                onClick={() => handleInputChange('type', 'partido')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.type === 'partido'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900">Partido</h3>
                <p className="text-gray-600 text-sm">Organiza un partido casual con amigos o desconocidos</p>
              </button>
              <button
                onClick={() => handleInputChange('type', 'torneo')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.type === 'torneo'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Trophy size={20} className="text-yellow-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Torneo</h3>
                    <p className="text-gray-600 text-sm">Crea un torneo competitivo con múltiples equipos</p>
                    <p className="text-xs text-yellow-600 mt-1">Próximamente disponible</p>
                  </div>
                </div>
              </button>
            </div>
            {formData.type && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Has seleccionado: <strong>{formData.type === 'partido' ? 'Partido' : 'Torneo'}</strong>
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Número de jugadores</h2>
            <p className="text-sm text-gray-600">Define cuántos jugadores participarán</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad de jugadores <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.players}
                onChange={(e) => handleInputChange('players', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecciona</option>
                <option value="14">7 vs 7 (14 jugadores)</option>
                <option value="16">8 vs 8 (16 jugadores)</option>
              </select>
            </div>
            {formData.players && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Jugadores seleccionados: <strong>{formData.players}</strong>
                </p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Tipo de partido</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleInputChange('isPrivate', false)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  !formData.isPrivate
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Público</h3>
                    <p className="text-gray-600 text-sm">Cualquier jugador puede unirse</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleInputChange('isPrivate', true)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.isPrivate
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Privado</h3>
                    <p className="text-gray-600 text-sm">Solo por invitación</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Crear {formData.type === 'torneo' ? 'Torneo' : 'Partido'}
        </h1>
        <p className="text-gray-600">
          Paso {currentStep} de 3
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <ArrowLeft size={16} />
          Anterior
        </button>
        
        <button
          onClick={currentStep === 3 ? handleCreatePartido : nextStep}
          disabled={currentStep === 3 ? !canProceedToNextStep() : !canProceedToNextStep()}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
            currentStep === 3
              ? 'bg-green-600 text-white'
              : canProceedToNextStep()
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentStep === 3 ? 'Crear Partido' : 'Siguiente'}
          {currentStep !== 3 && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Crear; 