import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateBooking from './pages/CreateBooking';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-['Oswald']">
        
        {/* 
          ИСПРАВЛЕНО: 100% Непрозрачный фон (bg-[#FFFDD0]), 
          мощная тень (shadow-md) и золотая рамка снизу. 
          Контент больше никогда не просветит! 
        */}
        <header className="bg-[#FFFDD0] border-b-4 border-[#DAA520] shadow-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-center sm:justify-start gap-4">
            <img src="/icon_banket.png" alt="Logo" className="h-12 w-auto object-contain drop-shadow-md" />
            <span className="text-3xl font-bold text-[#5C4033] uppercase tracking-widest drop-shadow-sm mt-1">
              Банкетам.Нет
            </span>
          </div>
        </header>

        <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-8 flex flex-col relative">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-booking" element={<CreateBooking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
