import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $host from '../api/axios';

export default function Admin() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [filterStatus, setFilterStatus] = useState('Все');
    const [sortOrder, setSortOrder] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            const { data } = await $host.get('/booking/all');
            setBookings(data);
        } catch (e) { alert('Ошибка загрузки'); }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await $host.put(`/booking/${id}/status`, { status: newStatus });
            alert(`Статус заявки №${id} изменен на "${newStatus}"`);
            fetchBookings();
        } catch (e) { alert('Ошибка'); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    const getStatusStyle = (status) => {
        if (status === 'Банкет назначен') return 'bg-[#FFFDD0] text-[#DAA520] border-[#DAA520]/50';
        if (status === 'Банкет завершен') return 'bg-[#006400]/5 text-[#006400] border-[#006400]/30';
        return 'bg-white text-[#DC143C] border-[#DC143C]/40';
    };

    let filteredBookings = bookings;
    if (filterStatus !== 'Все') filteredBookings = bookings.filter(b => b.status === filterStatus);
    filteredBookings.sort((a, b) => sortOrder === 'newest' ? b.id - a.id : a.id - b.id);

    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="p-5 flex flex-col h-full pb-10">
            <div className="flex justify-between items-end mb-5 border-b border-[#DAA520]/20 pb-3 mt-2">
                <div>
                    <h2 className="text-2xl font-bold text-[#006400] tracking-tight">Управление</h2>
                    <p className="text-[10px] text-[#DAA520] uppercase tracking-widest font-bold mt-1">Панель админа</p>
                </div>
                <button onClick={handleLogout} className="text-[10px] font-bold text-[#DC143C] hover:text-[#006400] uppercase tracking-widest transition-colors pb-1">
                    Выйти
                </button>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#DAA520]/30 mb-5 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#006400] uppercase tracking-widest">Статус</span>
                    <select className="border border-[#DAA520]/40 p-2 rounded-xl bg-[#FFFDD0]/30 text-xs font-medium text-[#006400] focus:outline-none"
                        value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
                        <option value="Все">Все заявки</option>
                        <option value="Новая">Новые</option>
                        <option value="Банкет назначен">Назначенные</option>
                        <option value="Банкет завершен">Завершенные</option>
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#006400] uppercase tracking-widest">Сортировка</span>
                    <select className="border border-[#DAA520]/40 p-2 rounded-xl bg-[#FFFDD0]/30 text-xs font-medium text-[#006400] focus:outline-none"
                        value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Сначала новые</option>
                        <option value="oldest">Сначала старые</option>
                    </select>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
                {currentItems.length === 0 ? (
                    <div className="text-center text-[#DAA520] font-medium mt-10 bg-white py-10 rounded-2xl border border-[#DAA520]/20 text-sm">
                        Нет заявок
                    </div>
                ) : (
                    currentItems.map((booking) => (
                        <div key={booking.id} className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgb(218,165,32,0.08)] border border-[#DAA520]/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#DAA520]"></div>
                            
                            <div className="flex justify-between items-start mb-4 pl-1.5">
                                <div>
                                    <span className="font-bold text-lg text-[#006400]">#{booking.id}</span>
                                    <p className="text-[10px] text-[#DAA520] font-bold uppercase tracking-widest mt-0.5">
                                        {booking.user?.full_name}
                                    </p>
                                </div>
                                <span className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-bold ${getStatusStyle(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>
                            
                            <div className="bg-[#FFFDD0]/30 p-3 rounded-xl border border-[#DAA520]/10 mb-3 ml-1.5">
                                <div className="text-xs flex justify-between mb-2 border-b border-[#DAA520]/10 pb-1.5">
                                    <span className="text-[#DAA520] font-semibold uppercase tracking-wide">Зал</span>
                                    <span className="font-bold text-[#006400]">{booking.room_type}</span>
                                </div>
                                <div className="text-xs flex justify-between mb-2 border-b border-[#DAA520]/10 pb-1.5">
                                    <span className="text-[#DAA520] font-semibold uppercase tracking-wide">Дата</span>
                                    <span className="font-bold text-[#006400]">{booking.event_date}</span>
                                </div>
                                <div className="text-xs flex justify-between">
                                    <span className="text-[#DAA520] font-semibold uppercase tracking-wide">Тел</span>
                                    <span className="font-bold text-[#006400]">{booking.user?.phone}</span>
                                </div>
                            </div>

                            {booking.reviews && booking.reviews.length > 0 && (
                                <div className="mt-3 bg-[#006400]/5 p-3 rounded-xl border border-[#006400]/10 text-xs text-[#006400] italic ml-1.5">
                                    <span className="font-bold uppercase tracking-widest not-italic block mb-1 text-[10px]">Отзыв:</span> "{booking.reviews[0].text}"
                                </div>
                            )}
                            
                            <div className="flex gap-2 mt-4 ml-1.5">
                                {booking.status === 'Новая' && (
                                    <button onClick={() => updateStatus(booking.id, 'Банкет назначен')} className="flex-1 bg-[#DAA520] text-white text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl shadow-md active:scale-95 transition-all">
                                        Назначить
                                    </button>
                                )}
                                {booking.status === 'Банкет назначен' && (
                                    <button onClick={() => updateStatus(booking.id, 'Банкет завершен')} className="flex-1 bg-[#006400] text-[#FFFDD0] text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl shadow-md active:scale-95 transition-all">
                                        Завершить
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
                        className="px-4 py-2.5 bg-white border border-[#DAA520]/40 text-[#006400] font-bold text-[10px] uppercase tracking-widest rounded-xl disabled:opacity-40">
                        Назад
                    </button>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#DAA520]">{currentPage} / {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
                        className="px-4 py-2.5 bg-white border border-[#DAA520]/40 text-[#006400] font-bold text-[10px] uppercase tracking-widest rounded-xl disabled:opacity-40">
                        Вперед
                    </button>
                </div>
            )}
        </div>
    );
}
