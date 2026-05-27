import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $host from '../api/axios';

export default function CreateBooking() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        room_type: 'Зал', event_date: '', payment_method: 'Наличные'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await $host.post('/booking', formData);
            navigate('/dashboard');
        } catch (err) { setError(err.response?.data?.message || 'Ошибка'); }
    };

    return (
        <div className="p-5 flex flex-col h-full pb-10">
            <div className="flex items-center mb-6 border-b border-[#DAA520]/20 pb-4 mt-2">
                <button onClick={() => navigate('/dashboard')} className="text-2xl mr-3 font-light text-[#DAA520] hover:text-[#006400] transition-colors">
                    &larr;
                </button>
                <div>
                    <h2 className="text-xl font-bold text-[#006400]">Оформление</h2>
                    <p className="text-[10px] text-[#DAA520] uppercase tracking-widest font-bold">Новая заявка</p>
                </div>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-[0_8px_30px_rgb(218,165,32,0.1)] border border-[#DAA520]/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-[#006400]"></div>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
                    {error && <div className="text-[#DC143C] text-sm text-center bg-[#DC143C]/5 py-2 rounded-lg border border-[#DC143C]/20">{error}</div>}
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-[#006400] uppercase tracking-widest ml-1">Помещение</label>
                        <select name="room_type" value={formData.room_type} onChange={handleChange}
                            className="bg-[#FFFDD0]/30 border border-[#DAA520]/40 p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400] font-medium appearance-none">
                            <option value="Зал">Зал</option>
                            <option value="Ресторан">Ресторан</option>
                            <option value="Летняя веранда">Летняя веранда</option>
                            <option value="Закрытая веранда">Закрытая веранда</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-[#006400] uppercase tracking-widest ml-1">Дата банкета</label>
                        <input type="date" name="event_date" value={formData.event_date} onChange={handleChange} required
                            className="bg-[#FFFDD0]/30 border border-[#DAA520]/40 p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400] font-medium" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-[#006400] uppercase tracking-widest ml-1">Оплата</label>
                        <select name="payment_method" value={formData.payment_method} onChange={handleChange}
                            className="bg-[#FFFDD0]/30 border border-[#DAA520]/40 p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400] font-medium appearance-none">
                            <option value="Наличные">Наличные</option>
                            <option value="Банковская карта">Банковская карта</option>
                            <option value="Перевод">Перевод на счет</option>
                        </select>
                    </div>

                    <button type="submit" className="bg-[#DAA520] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#DAA520]/20 hover:bg-[#C8B61D] active:scale-[0.98] transition-all mt-2 text-xs uppercase tracking-widest">
                        Отправить запрос
                    </button>
                </form>
            </div>
        </div>
    );
}
