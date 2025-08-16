import { useState, useEffect } from 'react';

export const useMyPartidos = () => {
  const [misPartidos, setMisPartidos] = useState([]);

  // Cargar partidos desde localStorage al inicializar
  useEffect(() => {
    console.log('=== INICIALIZANDO HOOK ===');
    const savedPartidos = localStorage.getItem('misPartidos');
    console.log('Valor raw de localStorage:', savedPartidos);
    
    if (savedPartidos) {
      try {
        const parsedPartidos = JSON.parse(savedPartidos);
        console.log('Partidos parseados exitosamente:', parsedPartidos);
        setMisPartidos(parsedPartidos);
      } catch (error) {
        console.error('Error al parsear partidos:', error);
        setMisPartidos([]);
      }
    } else {
      console.log('No hay partidos guardados en localStorage');
      setMisPartidos([]);
    }
  }, []);

  // Guardar partidos en localStorage cuando cambien
  useEffect(() => {
    console.log('=== GUARDANDO EN LOCALSTORAGE ===');
    console.log('Partidos a guardar:', misPartidos);
    const jsonString = JSON.stringify(misPartidos);
    console.log('JSON string a guardar:', jsonString);
    localStorage.setItem('misPartidos', jsonString);
    console.log('Guardado exitoso');
  }, [misPartidos]);

  const crearPartido = (partidoData) => {
    console.log('=== CREANDO PARTIDO ===');
    console.log('Datos recibidos:', partidoData);
    console.log('Estado actual de misPartidos:', misPartidos);
    
    // Verificar que no haya más de un partido activo
    const partidosActivos = misPartidos.filter(p => p.status !== 'cancelado');
    console.log('Partidos activos actuales:', partidosActivos);
    
    if (partidosActivos.length >= 1) {
      throw new Error('Ya tienes un partido activo. Solo puedes crear un partido a la vez.');
    }

    const nuevoPartido = {
      id: `my-${Date.now()}`,
      title: `Mi Partido - Fútbol ${partidoData.players > 14 ? '8' : '7'}`,
      players: parseInt(partidoData.players),
      maxPlayers: parseInt(partidoData.players),
      type: partidoData.isPrivate ? 'privado' : 'público',
      equipoAColor: 'blanco', // Asignado automáticamente
      equipoBColor: 'oscuro', // Asignado automáticamente
      status: 'pendiente',
      paymentProof: null,
      createdAt: new Date().toISOString().split('T')[0],
      // Campos para detalles del partido (se llenarán después)
      fecha: '',
      hora: '',
      cancha: '',
      detallesCompletados: false
    };

    console.log('Nuevo partido creado:', nuevoPartido);
    
    setMisPartidos(prev => {
      const newPartidos = [...prev, nuevoPartido];
      console.log('Estado anterior:', prev);
      console.log('Nuevo estado:', newPartidos);
      return newPartidos;
    });
    
    return nuevoPartido;
  };

  const actualizarDetallesPartido = (partidoId, detalles) => {
    console.log('=== ACTUALIZANDO DETALLES DEL PARTIDO ===');
    console.log('Partido ID:', partidoId);
    console.log('Detalles:', detalles);
    
    setMisPartidos(prev => 
      prev.map(partido => 
        partido.id === partidoId 
          ? { 
              ...partido, 
              ...detalles,
              detallesCompletados: true
            }
          : partido
      )
    );
  };

  const eliminarPartido = (partidoId) => {
    console.log('=== ELIMINANDO PARTIDO ===');
    console.log('Partido ID:', partidoId);
    
    const partido = misPartidos.find(p => p.id === partidoId);
    if (partido && partido.detallesCompletados) {
      throw new Error('No puedes eliminar un partido que ya tiene detalles completados.');
    }
    
    setMisPartidos(prev => prev.filter(partido => partido.id !== partidoId));
  };

  const actualizarPartido = (partidoId, updates) => {
    setMisPartidos(prev => 
      prev.map(partido => 
        partido.id === partidoId 
          ? { ...partido, ...updates }
          : partido
      )
    );
  };

  const cancelarPartido = (partidoId) => {
    setMisPartidos(prev => 
      prev.map(partido => 
        partido.id === partidoId 
          ? { ...partido, status: 'cancelado' }
          : partido
      )
    );
  };

  const adjuntarComprobante = (partidoId, fileName) => {
    setMisPartidos(prev => 
      prev.map(partido => 
        partido.id === partidoId 
          ? { 
              ...partido, 
              paymentProof: fileName, 
              status: 'confirmado',
              confirmedAt: new Date().toISOString().split('T')[0]
            }
          : partido
      )
    );
  };

  const getPartidosActivos = () => {
    const activos = misPartidos.filter(partido => partido.status !== 'cancelado');
    console.log('=== OBTENIENDO PARTIDOS ACTIVOS ===');
    console.log('Todos los partidos:', misPartidos);
    console.log('Partidos activos filtrados:', activos);
    return activos;
  };

  const getPartidoActivo = () => {
    const activos = getPartidosActivos();
    return activos.length > 0 ? activos[0] : null;
  };

  return {
    misPartidos,
    crearPartido,
    actualizarPartido,
    actualizarDetallesPartido,
    eliminarPartido,
    cancelarPartido,
    adjuntarComprobante,
    getPartidosActivos,
    getPartidoActivo
  };
}; 