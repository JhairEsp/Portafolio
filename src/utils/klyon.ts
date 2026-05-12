/**
 * KLYON CONNECT
 * Compatible con React + Vite
 */

const KLYON_CONFIG = {
  url: 'https://klyon-manage.vercel.app/api/status',

  // 🔐 Credenciales
  projectId: 'c39a863f-eab5-44d6-a719-375ea1f72ee6',
  apiKey: '3b01cb78bee3d4e60e16c327d19530f2779569a0d0fa8f18'
};

// ==========================
// 📊 MÉTRICAS
// ==========================
let metrics = {
  sessions: 0,
  sales: 0,
  errors: 0
};

// Evitar múltiples bloqueos
let isSuspended = false;

// ==========================
// 👤 CONTAR SESIÓN
// ==========================
if (!sessionStorage.getItem('k_s')) {
  metrics.sessions = 1;
  sessionStorage.setItem('k_s', '1');
}

// ==========================
// ❌ CAPTURAR ERRORES
// ==========================
window.addEventListener('error', () => {
  metrics.errors++;
});

// ==========================
// 🔒 PANTALLA DE BLOQUEO
// ==========================
const showSuspendedScreen = () => {
  if (isSuspended) return;

  isSuspended = true;

  // Detener sync
  clearInterval(klyonInterval);

  // Detener scroll
  document.body.style.overflow = 'hidden';

  // Limpiar React
  const root = document.getElementById('root');

  if (root) {
    root.innerHTML = `
      <div style="
        position:fixed;
        inset:0;
        width:100%;
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#020617;
        color:white;
        font-family:Inter,sans-serif;
        text-align:center;
        padding:20px;
        z-index:999999;
      ">
        <div style="
          max-width:500px;
          padding:40px;
          border-radius:28px;
          background:rgba(15,23,42,0.95);
          border:1px solid rgba(255,255,255,0.08);
          box-shadow:0 0 50px rgba(139,92,246,0.25);
          backdrop-filter:blur(12px);
        ">
          <div style="
            width:80px;
            height:80px;
            margin:0 auto 24px;
            border-radius:50%;
            background:rgba(139,92,246,0.15);
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:38px;
          ">
            🔒
          </div>

          <h1 style="
            margin:0 0 16px;
            font-size:42px;
            font-weight:900;
            color:#8B5CF6;
            letter-spacing:-1px;
          ">
            SITIO SUSPENDIDO
          </h1>

          <p style="
            margin:0;
            font-size:18px;
            line-height:1.7;
            color:rgba(255,255,255,0.7);
          ">
            Este proyecto ha sido desactivado temporalmente.
            <br />
            Contacta al administrador.
          </p>
        </div>
      </div>
    `;
  }

  // Intentar detener cargas pendientes
  try {
    window.stop();
  } catch (e) {
    console.warn('No se pudo detener window.stop()');
  }

  // Desactivar interacción
  document.body.innerHTML += `
    <style>
      * {
        pointer-events: none !important;
        user-select: none !important;
      }
    </style>
  `;
};

// ==========================
// 🔄 SINCRONIZACIÓN
// ==========================
const syncWithKlyon = async () => {
  try {
    const response = await fetch(KLYON_CONFIG.url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: KLYON_CONFIG.projectId,
        apiKey: KLYON_CONFIG.apiKey,
        sessions: metrics.sessions,
        sales: metrics.sales,
        errors: metrics.errors
      })
    });

    if (!response.ok) return;

    const data = await response.json();

    // ==========================
    // 🔒 BLOQUEO REMOTO
    // ==========================
    if (data.status === 'suspended') {
      showSuspendedScreen();
      return;
    }

    // ==========================
    // ⚠ ALERTA REMOTA
    // ==========================
    if (
      data.config &&
      data.config.show_popup &&
      !sessionStorage.getItem('k_a')
    ) {
      alert(data.config.message || 'Aviso importante');
      sessionStorage.setItem('k_a', '1');
    }

    // ==========================
    // 🧹 LIMPIAR MÉTRICAS
    // ==========================
    metrics.sessions = 0;
    metrics.sales = 0;
    metrics.errors = 0;

  } catch (e) {
    console.warn('Klyon offline temporalmente');
  }
};

// ==========================
// 🚀 INICIO
// ==========================
syncWithKlyon();

// Sync automático
const klyonInterval = setInterval(syncWithKlyon, 60000);

// ==========================
// 💰 FUNCIÓN GLOBAL
// ==========================
(window as any).reportKlyonSale = (amount = 1) => {
  metrics.sales += amount;
  syncWithKlyon();
};

export {};