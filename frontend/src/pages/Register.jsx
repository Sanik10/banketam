import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $host from '../api/axios';

export default function Register() {
    const [formData, setFormData] = useState({
        login: '', password: '', full_name: '', phone: '', email: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data } = await $host.post('/auth/register', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="flex-1 flex flex-col justify-center px-6 pb-20">
            <div className="bg-gradient-to-b from-[#FFFDD0] to-white p-6 rounded-3xl shadow-lg border border-[#DAA520]/30">
                <h2 className="text-3xl font-bold text-center mb-2 text-[#DC143C] tracking-tight bounce">Регистрация</h2>
                <p className="text-center text-sm text-[#006400] mb-8 pulse">Создайте аккаунт для бронирования</p>
                
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200">{error}</div>}
                    
                    <div className="relative">
                        <input name="login" type="text" placeholder="Логин" required
                            className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                            value={formData.login} onChange={handleChange} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DAA520]">👤</span>
                    </div>
                    <div className="relative">
                        <input name="password" type="password" placeholder="Пароль" required
                            className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                            value={formData.password} onChange={handleChange} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DAA520]">🔒</span>
                    </div>
                    <input name="full_name" type="text" placeholder="ФИО" required
                        className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                        value={formData.full_name} onChange={handleChange} />
                    <input name="phone" type="tel" placeholder="Телефон" required
                        className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                        value={formData.phone} onChange={handleChange} />
                    <input name="email" type="email" placeholder="E-mail" required
                        className="w-full bg-[#FFFDD0] border border-[#DAA520]/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520] transition-all"
                        value={formData.email} onChange={handleChange} />
                    
                    <button type="submit" className="w-full bg-[#DAA520] text-white font-semibold py-3 rounded-xl shadow-md hover:bg-[#C8B61D] active:scale-98 transition-all mt-2">
                        Зарегистрироваться
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-[#DAA520] text-sm font-medium hover:text-[#C8B61D] transition-colors">
                        Уже есть аккаунт? Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}