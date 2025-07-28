import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Servicios para partidos
export const partidosService = {
  async getPartidos(filters = {}) {
    let query = supabase
      .from('partidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.district) {
      query = query.eq('district', filters.district);
    }

    if (filters.date) {
      query = query.eq('date', filters.date);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error('Error obteniendo partidos: ' + error.message);
    }

    return data;
  },

  async createPartido(partidoData) {
    const { data, error } = await supabase
      .from('partidos')
      .insert([partidoData])
      .select();

    if (error) {
      throw new Error('Error creando partido: ' + error.message);
    }

    return data[0];
  },

  async updatePartido(id, updates) {
    const { data, error } = await supabase
      .from('partidos')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      throw new Error('Error actualizando partido: ' + error.message);
    }

    return data[0];
  },

  async deletePartido(id) {
    const { error } = await supabase
      .from('partidos')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error('Error eliminando partido: ' + error.message);
    }

    return true;
  }
};

// Servicios para torneos
export const torneosService = {
  async getTorneos(filters = {}) {
    let query = supabase
      .from('torneos')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.district) {
      query = query.eq('district', filters.district);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    
    if (error) {
      throw new Error('Error obteniendo torneos: ' + error.message);
    }

    return data;
  },

  async createTorneo(torneoData) {
    const { data, error } = await supabase
      .from('torneos')
      .insert([torneoData])
      .select();

    if (error) {
      throw new Error('Error creando torneo: ' + error.message);
    }

    return data[0];
  },

  async updateTorneo(id, updates) {
    const { data, error } = await supabase
      .from('torneos')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      throw new Error('Error actualizando torneo: ' + error.message);
    }

    return data[0];
  }
};

// Servicios para usuarios
export const usersService = {
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error('Error obteniendo usuario: ' + error.message);
    }

    return user;
  },

  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select();

    if (error) {
      throw new Error('Error actualizando perfil: ' + error.message);
    }

    return data[0];
  },

  async getUserStats(userId) {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error('Error obteniendo estadísticas: ' + error.message);
    }

    return data;
  }
};

// Servicios para reservas
export const reservasService = {
  async createReserva(reservaData) {
    const { data, error } = await supabase
      .from('reservas')
      .insert([reservaData])
      .select();

    if (error) {
      throw new Error('Error creando reserva: ' + error.message);
    }

    return data[0];
  },

  async getReservasByUser(userId) {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('Error obteniendo reservas: ' + error.message);
    }

    return data;
  },

  async cancelReserva(id) {
    const { error } = await supabase
      .from('reservas')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (error) {
      throw new Error('Error cancelando reserva: ' + error.message);
    }

    return true;
  }
};

// Servicios para pagos
export const paymentsService = {
  async createPayment(paymentData) {
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select();

    if (error) {
      throw new Error('Error creando pago: ' + error.message);
    }

    return data[0];
  },

  async updatePaymentStatus(paymentId, status) {
    const { data, error } = await supabase
      .from('payments')
      .update({ status })
      .eq('id', paymentId)
      .select();

    if (error) {
      throw new Error('Error actualizando estado de pago: ' + error.message);
    }

    return data[0];
  }
}; 