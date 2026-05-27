import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $host from '../api/axios';

export default function CreateBooking() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        room_type: 'Зал',
        event_date: '',
        payment_method: 'Наличные'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await $host.post('/booking', formData);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при создании заявки');
        }
    };

    return (
        <div className="p-5 flex flex-col h-full bg-gradient-to-b from-[#FFFDD0] to-white">
            <div className="flex items-center mb-6 pb-4 border-b border-[#DAA520]/30">
                <button onClick={() => navigate('/dashboard')} className="text-2xl mr-3 font-bold text-[#DC143C] hover:text-[#B2002C] transition-colors">
                    &larr;
                </button>
                <h2 className="text-2xl font-bold text-[#DC143C] bounce">Оформление заявки</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {error && <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-200">{error}</div>}
                
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#006400]">Выберите помещение:</label>
                    <select 
                        name="room_type" 
                        value={formData.room_type} 
                        onChange={handleChange}
                        className="border border-[#DAA520]/50 p-3 rounded-xl bg-[#FFFDD0] focus:outline-none focus:ring-2 focus:ring-[#DAA520] text-gray-800"
                    >
                        <option value="Зал">Зал</option>
                        <option value="Ресторан">Ресторан</option>
                        <option value="Летняя веранда">Летняя веранда</option>
                        <option value="Закрытая веранда">Закрытая веранда</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#006400]">Дата банкета:</label>
                    <input 
                        type="date" 
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleChange}
                        required
                        className="border border-[#DAA520]/50 p-3 rounded-xl bg-[#FFFDD0] focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                    />
                    <span className="text-xs text-[#006400]/70">Укажите желаемую дату мероприятия</span>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#006400]">Способ оплаты:</label>
                    <select 
                        name="payment_method" 
                        value={formData.payment_method} 
                        onChange={handleChange}
                        className="border border-[#DAA520]/50 p-3 rounded-xl bg-[#FFFDD0] focus:outline-none focus:ring-2 focus:ring-[#DAA520] text-gray-800"
                    >
                        <option value="Наличные">Наличные</option>
                        <option value="Банковская карта">Банковская карта</option>
                        <option value="Перевод">Перевод на счет</option>
                    </select>
                </div>

                <button type="submit" className="bg-[#DAA520] text-white p-4 rounded-2xl mt-4 font-semibold text-lg hover:bg-[#C8B61D] active:scale-95 transition-all shadow-md">
                    Отправить на согласование
                </button>
            </form>
        </div>
    );
}