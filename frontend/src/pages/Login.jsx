import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $host from '../api/axios';

export default function Login() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await $host.post('/auth/login', { login, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate(data.role === 'ADMIN' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка авторизации');
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(218,165,32,0.15)] border border-[#DAA520]/30 relative overflow-hidden">
                {/* Декоративная полоса сверху */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#DAA520]"></div>
                
                <h2 className="text-3xl font-bold text-center mb-1 text-[#006400] tracking-tight mt-2">Вход</h2>
                <p className="text-center text-xs text-[#DAA520] font-bold uppercase tracking-widest mb-8">Банкетам.Нет</p>
                
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    {error && <div className="text-[#DC143C] text-sm text-center bg-[#DC143C]/5 py-2 px-3 rounded-lg border border-[#DC143C]/20">{error}</div>}
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#006400] uppercase tracking-wide ml-1">Логин</label>
                        <input 
                            type="text" required
                            className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:bg-white transition-all text-[#006400] font-medium"
                            value={login} onChange={e => setLogin(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-[#006400] uppercase tracking-wide ml-1">Пароль</label>
                        <input 
                            type="password" required
                            className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] focus:bg-white transition-all text-[#006400] font-medium"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="w-full bg-[#DAA520] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#DAA520]/30 hover:bg-[#C8B61D] active:scale-[0.98] transition-all mt-2 text-sm uppercase tracking-wide">
                        Войти в кабинет
                    </button>
                </form>

                <div className="text-center mt-8">
                    <Link to="/register" className="text-[#006400] text-sm font-medium hover:text-[#DAA520] transition-colors border-b border-transparent hover:border-[#DAA520] pb-0.5">
                        Создать новый аккаунт
                    </Link>
                </div>
            </div>
        </div>
    );
}