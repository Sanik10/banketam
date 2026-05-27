import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $host from '../api/axios';
import Slider from '../components/Slider';

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [reviewText, setReviewText] = useState({});
    const navigate = useNavigate();

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await $host.get('/booking/mine');
            setBookings(data);
        } catch (e) { console.error(e); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const submitReview = async (bookingId) => {
        try {
            if (!reviewText[bookingId]) return;
            await $host.post('/review', { bookingId, text: reviewText[bookingId] });
            setReviewText({ ...reviewText, [bookingId]: '' });
            setTimeout(fetchBookings, 300);
        } catch (e) { alert(e.response?.data?.message || "Ошибка"); }
    };

    const getStatusStyle = (status) => {
        if (status === 'Банкет назначен') return 'bg-[#FFFDD0] text-[#DAA520] border-[#DAA520]/50';
        if (status === 'Банкет завершен') return 'bg-[#006400]/5 text-[#006400] border-[#006400]/30';
        return 'bg-white text-[#DC143C] border-[#DC143C]/40';
    };

    return (
        <div className="p-5 flex flex-col h-full pb-10">
            <div className="flex justify-between items-end mb-6 mt-2">
                <div>
                    <h2 className="text-2xl font-bold text-[#006400] tracking-tight">Кабинет</h2>
                    <p className="text-[10px] text-[#DAA520] uppercase tracking-widest font-bold mt-1">Гость</p>
                </div>
                <button onClick={handleLogout} className="text-[10px] font-bold text-[#DC143C] hover:text-[#006400] uppercase tracking-wider transition-colors pb-1">
                    Выйти
                </button>
            </div>

            <Slider />

            <div className="flex justify-between items-center mb-4 mt-4 border-b border-[#DAA520]/20 pb-3">
                <h3 className="font-bold text-base text-[#006400] uppercase tracking-wide">Бронирования</h3>
                <Link to="/create-booking" className="bg-[#DAA520] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg shadow-md active:scale-[0.98] transition-all">
                    + Новое
                </Link>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center text-[#DAA520] font-medium mt-10 bg-white py-12 rounded-2xl border border-[#DAA520]/20 shadow-sm text-sm">
                    У вас пока нет заявок.
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(218,165,32,0.08)] border border-[#DAA520]/20 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#006400]"></div>
                            
                            <div className="flex justify-between items-center mb-4 pl-2">
                                <span className="font-bold text-lg text-[#006400]">{booking.room_type}</span>
                                <span className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${getStatusStyle(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-2 mb-4 bg-[#FFFDD0]/30 p-3 rounded-xl border border-[#DAA520]/10 ml-2">
                                <div className="text-sm flex justify-between border-b border-[#DAA520]/10 pb-1.5">
                                    <span className="text-[#DAA520] font-semibold text-xs uppercase tracking-wide">Дата</span>
                                    <span className="font-bold text-[#006400]">{booking.event_date}</span>
                                </div>
                                <div className="text-sm flex justify-between pt-0.5">
                                    <span className="text-[#DAA520] font-semibold text-xs uppercase tracking-wide">Оплата</span>
                                    <span className="font-bold text-[#006400]">{booking.payment_method}</span>
                                </div>
                            </div>
                            
                            <div className="ml-2">
                                {booking.reviews && booking.reviews.length > 0 ? (
                                    <div className="mt-3 bg-[#006400]/5 p-3 rounded-xl border border-[#006400]/10 italic">
                                        <span className="font-bold text-[#006400] not-italic text-[10px] uppercase tracking-widest block mb-1">Ваш отзыв:</span> 
                                        <span className="text-sm text-[#006400]">"{booking.reviews[0].text}"</span>
                                    </div>
                                ) : (
                                    booking.status !== 'Новая' && (
                                        <div className="mt-3">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-[#DAA520] mb-2 ml-1">Оставить отзыв</p>
                                            <div className="flex gap-2">
                                                <input 
                                                    type="text" placeholder="Поделитесь впечатлениями..."
                                                    className="flex-1 bg-[#FFFDD0]/20 border border-[#DAA520]/40 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#DAA520] text-[#006400]"
                                                    value={reviewText[booking.id] || ''}
                                                    onChange={(e) => setReviewText({...reviewText, [booking.id]: e.target.value})}
                                                />
                                                <button 
                                                    onClick={() => submitReview(booking.id)}
                                                    className="bg-[#006400] text-[#FFFDD0] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl active:scale-95 shadow-md"
                                                >
                                                    Отправить
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}