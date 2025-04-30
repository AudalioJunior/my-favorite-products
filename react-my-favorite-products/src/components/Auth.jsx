import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Register from './Register';
import '../styles/Auth.css';

export default function Auth() {
  // <-- aqui
  const [mode, setMode] = useState('login');

  return (
    <div className="auth-page">
      <div className="tabs">
        <button
          className={mode === 'login' ? 'active' : ''}
          onClick={() => setMode('login')}
        >
          Login
        </button>
        <button
          className={mode === 'register' ? 'active' : ''}
          onClick={() => setMode('register')}
        >
          Cadastrar
        </button>
        <motion.div
          className="underline"
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{ left: mode === 'login' ? '0%' : '50%' }}
        />
      </div>

      <div className="form-wrapper">
        <AnimatePresence exitBeforeEnter>
          {mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Login />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Register />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
