import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Torneos from './pages/Torneos';
import Crear from './pages/Crear';
import CanchasDisponibles from './pages/CanchasDisponibles';
import Perfil from './pages/Perfil';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/torneos" element={<Torneos />} />
            <Route path="/crear" element={<Crear />} />
            <Route path="/canchas" element={<CanchasDisponibles />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </Layout>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
