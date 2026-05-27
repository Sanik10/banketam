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
            <div className="bg-gradient-to-b from-[#FFFDD0] to-white p-6 rounded-3xl shadow-lg border border-[#DAA520]/30">
                <h2 className="text-3xl font-bold text-center mb-2 text-[#DC143C] tracking-tight bounce">Добро пожаловать</h2>
                <p className="text-center text-sm text-[#006400] mb-8 pulse">Войдите, чтобы продолжить</p>
                
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200">{error}</div>}
                    
                    <div className="relative">
                        <input 
                            type="text" placeholder="Логин" required
                            className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                            value={login} onChange={e => setLogin(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DAA520] text-lg">@</span>
                    </div>
                    <div className="relative">
                        <input 
                            type="password" placeholder="Пароль" required
                            className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                            value={password} onChange={e => setPassword(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DAA520] text-lg">•••</span>
                    </div>
                    
                    <button type="submit" className="w-full bg-[#DAA520] text-white font-semibold py-3 rounded-xl shadow-md hover:bg-[#C8B61D] active:scale-98 transition-all mt-2">
                        Войти
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link to="/register" className="text-[#DAA520] text-sm font-medium hover:text-[#C8B61D] transition-colors">
                        Создать новый аккаунт
                    </Link>
                </div>
            </div>
        </div>
    );
}