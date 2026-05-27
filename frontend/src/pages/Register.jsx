import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $host from '../api/axios';

export default function Register() {
    const [formData, setFormData] = useState({
        login: '', password: '', full_name: '', phone: '', email: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        <div className="flex-1 flex flex-col justify-center px-5 py-6">
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(218,165,32,0.15)] border border-[#DAA520]/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#006400]"></div>

                <div className="text-center mb-6 mt-2">
                    <h2 className="text-2xl font-bold text-[#006400] tracking-tight">Регистрация</h2>
                    <p className="text-xs text-[#DAA520] font-bold uppercase tracking-widest mt-1">Новый гость</p>
                </div>
                
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    {error && <div className="text-[#DC143C] text-xs text-center bg-[#DC143C]/5 py-2 px-3 rounded-lg border border-[#DC143C]/20">{error}</div>}
                    
                    <div className="grid grid-cols-2 gap-3">
                        <input name="login" type="text" placeholder="Логин (от 6 симв.)" required
                            className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400]"
                            value={formData.login} onChange={handleChange} />
                        <input name="password" type="password" placeholder="Пароль (от 8 симв.)" required
                            className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400]"
                            value={formData.password} onChange={handleChange} />
                    </div>
                    
                    <input name="full_name" type="text" placeholder="Ваше полное имя" required
                        className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400]"
                        value={formData.full_name} onChange={handleChange} />
                    
                    <input name="phone" type="tel" placeholder="+7 (999) 000-00-00" required
                        className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400]"
                        value={formData.phone} onChange={handleChange} />
                    
                    <input name="email" type="email" placeholder="E-mail адрес" required
                        className="w-full bg-[#FFFDD0]/30 border border-[#DAA520]/40 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400]"
                        value={formData.email} onChange={handleChange} />
                    
                    <button type="submit" className="w-full bg-[#006400] text-[#FFFDD0] font-bold py-3.5 rounded-xl shadow-lg shadow-[#006400]/30 hover:bg-[#004d00] active:scale-[0.98] transition-all mt-2 text-sm uppercase tracking-wide">
                        Стать гостем
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-[#DAA520] text-sm font-medium hover:text-[#006400] transition-colors border-b border-transparent hover:border-[#006400] pb-0.5">
                        Уже есть аккаунт? Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}