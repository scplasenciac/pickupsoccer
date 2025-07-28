import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Lock, Globe, CreditCard, Shirt } from 'lucide-react';

const Crear = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    venue: '',
    players: '',
    isPrivate: false,
    paymentMethod: '',
    chalecos: false,
    equipoAColor: 'blanco',
    equipoBColor: 'oscuro'
  });

  const venues = [
    { id: 'la-diez', name: 'La Diez', location: 'Miraflores', price: 180, chalecos: true },
    { id: 'la-once', name: 'La Once', location: 'San Isidro', price: 180, chalecos: true },
    { id: 'sportpoint', name: 'SportPoint', location: 'Surco', price: 180, chalecos: false },
    { id: 'deporcentro', name: 'Deporcentro', location: 'La Molina', price: 180, chalecos: false }
  ];

  const timeSlots = [
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 8 && canProceedToNextStep()) {
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
        return formData.date !== '';
      case 3:
        return formData.players !== '';
      case 4:
        return formData.time !== '';
      case 5:
        return formData.venue !== '';
      case 6:
        return true; // Configuración de equipos siempre es válida
      case 7:
        return true; // Tipo público/privado siempre es válido
      case 8:
        return formData.paymentMethod !== '' && (formData.paymentMethod === 'transferencia' || formData.paymentMethod === 'yape');
      default:
        return false;
    }
  };

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
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <h3 className="font-semibold text-gray-900">Torneo</h3>
                <p className="text-gray-600 text-sm">Crea un torneo competitivo con múltiples equipos</p>
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
            <h2 className="text-xl font-semibold text-gray-900">Selecciona la fecha</h2>
            <p className="text-sm text-gray-600">Elige la fecha para tu evento</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min={getTodayDate()}
              />
            </div>
            {formData.date && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ Fecha seleccionada: <strong>{formData.date}</strong>
                </p>
              </div>
            )}
          </div>
        );

      case 3:
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
                <option value="12">6 vs 6 (12 jugadores)</option>
                <option value="14">7 vs 7 (14 jugadores)</option>
                <option value="16">8 vs 8 (16 jugadores)</option>
                <option value="22">11 vs 11 (22 jugadores)</option>
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

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Horarios disponibles</h2>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => handleInputChange('time', time)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    formData.time === time
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Selecciona la cancha</h2>
            <div className="space-y-3">
              {venues.map(venue => (
                <button
                  key={venue.id}
                  onClick={() => handleInputChange('venue', venue.id)}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.venue === venue.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={20} className="text-green-600" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                      <p className="text-gray-600 text-sm">{venue.location}</p>
                      <p className="text-green-600 font-medium">S/ {venue.price} por hora</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Configuración de equipos</h2>
            
            {/* Chalecos */}
            {venues.find(v => v.id === formData.venue)?.chalecos && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shirt size={20} className="text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Chalecos incluidos</h3>
                    <p className="text-gray-600 text-sm">La cancha proporciona chalecos</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chalecos"
                    checked={formData.chalecos}
                    onChange={(e) => handleInputChange('chalecos', e.target.checked)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="chalecos" className="text-sm text-gray-700">
                    Usar chalecos de la cancha
                  </label>
                </div>
              </div>
            )}

            {/* Colores de equipos */}
            {!formData.chalecos && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Colores de equipos</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipo A
                  </label>
                  <select
                    value={formData.equipoAColor}
                    onChange={(e) => handleInputChange('equipoAColor', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="blanco">Blanco</option>
                    <option value="oscuro">Color oscuro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipo B
                  </label>
                  <select
                    value={formData.equipoBColor}
                    onChange={(e) => handleInputChange('equipoBColor', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="oscuro">Color oscuro</option>
                    <option value="blanco">Blanco</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        );

      case 7:
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

      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Método de pago</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleInputChange('paymentMethod', 'transferencia')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.paymentMethod === 'transferencia'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Transferencia bancaria</h3>
                    <p className="text-gray-600 text-sm">Pago directo a la cuenta bancaria</p>
                  </div>
                </div>
              </button>
              <button
                onClick={() => handleInputChange('paymentMethod', 'yape')}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  formData.paymentMethod === 'yape'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard size={20} className="text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Yape/Plin</h3>
                    <p className="text-gray-600 text-sm">Pago rápido con billetera digital</p>
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
          Paso {currentStep} de 8
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 8) * 100}%` }}
          ></div>
        </div>
      </div>

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
          onClick={nextStep}
          disabled={currentStep === 8 || !canProceedToNextStep()}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
            currentStep === 8
              ? 'bg-green-600 text-white'
              : canProceedToNextStep()
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentStep === 8 ? 'Generar Partido' : 'Siguiente'}
          {currentStep !== 8 && <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Crear; 