import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import $host from '../api/axios';
import Slider from '../components/Slider';

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [reviewText, setReviewText] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await $host.get('/booking/mine');
            setBookings(data);
        } catch (e) {
            console.error('Ошибка загрузки заявок');
        }
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
            alert("Отзыв успешно отправлен!");
            setReviewText({ ...reviewText, [bookingId]: '' });
            setTimeout(fetchBookings, 300);
        } catch (e) {
            alert(e.response?.data?.message || "Ошибка отправки отзыва");
        }
    };

    const getStatusStyle = (status) => {
        if (status === 'Банкет назначен') return 'bg-[#FFDAB9] text-[#DAA520] border-[#DAA520]/40';
        if (status === 'Банкет завершен') return 'bg-green-50 text-green-700 border-green-200';
        return 'bg-slate-50 text-slate-600 border-slate-200';
    };

    return (
        <div className="p-5 flex flex-col h-full pb-10 bg-gradient-to-b from-[#FFFDD0] to-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-[#DC143C] tracking-tight">Кабинет</h2>
                    <p className="text-xs text-[#006400]">Управление бронированиями</p>
                </div>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl text-sm font-medium active:scale-95 transition-transform shadow-sm border border-red-100">
                    Выйти
                </button>
            </div>

            <Slider />

            <div className="flex justify-between items-end mb-4 mt-4">
                <h3 className="font-bold text-lg text-[#DC143C] pulse">Мои бронирования</h3>
                <Link to="/create-booking" className="bg-[#DAA520] text-white text-sm font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-[#C8B61D] active:scale-95 transition-all glow-hover">
                    + Новое
                </Link>
            </div>

            {bookings.length === 0 ? (
                <div className="text-center text-slate-400 mt-10 bg-slate-50 py-12 rounded-2xl border border-slate-200 text-sm italic">
                    У вас пока нет заявок. Начните с нового бронирования!
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {bookings.map((booking, index) => (
                        <div key={booking.id} className="booking-item bg-white p-5 rounded-2xl shadow-md border border-[#DAA520]/20 hover:shadow-lg transition-shadow duration-300" style={{animationDelay: `${index * 100}ms`}}>
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-lg text-[#DC143C]">{booking.room_type}</span>
                                <span className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border font-bold ${getStatusStyle(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                            
                            <div className="flex flex-col gap-2 mb-4">
                                <div className="text-sm flex justify-between border-b border-dashed border-[#DAA520]/30 pb-1.5">
                                    <span className="text-[#006400] font-medium">Дата:</span>
                                    <span className="font-semibold text-slate-800">{booking.event_date}</span>
                                </div>
                                <div className="text-sm flex justify-between">
                                    <span className="text-[#006400] font-medium">Оплата:</span>
                                    <span className="font-semibold text-slate-800">{booking.payment_method}</span>
                                </div>
                            </div>
                            
                            {booking.reviews && booking.reviews.length > 0 ? (
                                <div className="mt-3 bg-[#FFFDD0] text-[#006400] p-4 rounded-xl border border-[#DAA520]/40 text-sm">
                                    <span className="font-bold">Ваш отзыв:</span> "{booking.reviews[0].text}"
                                </div>
                            ) : (
                                booking.status !== 'Новая' && (
                                    <div className="mt-3 bg-[#FFFDD0] p-4 rounded-xl border border-[#DAA520]/40">
                                        <p className="text-xs font-medium text-[#006400] mb-2">Оставить отзыв:</p>
                                        <div className="flex gap-2">
                                            <input 
                                                type="text" placeholder="Всё было великолепно!..."
                                                className="flex-1 bg-white border border-[#DAA520]/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#DAA520]"
                                                value={reviewText[booking.id] || ''}
                                                onChange={(e) => setReviewText({...reviewText, [booking.id]: e.target.value})}
                                            />
                                            <button 
                                                onClick={() => submitReview(booking.id)}
                                                className="bg-[#DAA520] text-white text-sm font-semibold px-4 py-2 rounded-lg active:scale-95 transition-transform shadow-sm hover:bg-[#C8B61D]"
                                            >
                                                Отправить
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}