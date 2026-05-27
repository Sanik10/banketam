import { useState, useEffect } from 'react';

// Используем изображения из папки public
const images = [
    "/1671649122_idei-club-p-veranda-.jpg",
    "/1686219637_en-idei-club-p-t.jpg",
    "/339037.jpeg",
    "/1686676944_elles-top-p-letnyaya-ploshcha.jpg"
];

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Автопереключение каждые 3 секунды
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[200px] overflow-hidden mb-6 glow-hover">
            <img 
                src={images[currentIndex]} 
                alt="Праздничное помещение" 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out hover:scale-105"
            />
            
            {/* Индикаторы */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex ? 'bg-[#DAA520] scale-150 animate-pulse' : 'bg-white/50 hover:bg-white/75 hover:scale-125'
                        }`}
                        aria-label={`Перейти к слайду ${index + 1}`}
                    />
                ))}
            </div>

            {/* Кнопки навигации появляются при наведении */}
            <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#DAA520]/80 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-hover"
            >
                &#10094;
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#DAA520]/80 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-hover"
            >
                &#10095;
            </button>
        </div>
    );
}