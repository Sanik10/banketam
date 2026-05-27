import { useState, useEffect } from 'react';

const images = [
    "/1671649122_idei-club-p-veranda-.jpg",
    "/1686219637_en-idei-club-p-t.jpg",
    "/339037.jpeg",
    "/1686676944_elles-top-p-letnyaya-ploshcha.jpg"
];

export default function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

    useEffect(() => {
        const interval = setInterval(() => { nextSlide(); }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (

        <div className="group relative w-full h-[250px] sm:h-[400px] overflow-hidden mb-6 glow-hover rounded-2xl border-2 border-[#DAA520]/20 bg-white shadow-md">
            
            <img 
                src={images[currentIndex]} 
                alt="Праздничное помещение" 
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${
                            index === currentIndex ? 'bg-[#DAA520] scale-150 animate-pulse' : 'bg-white/70 hover:bg-white hover:scale-125'
                        }`}
                        aria-label={`Перейти к слайду ${index + 1}`}
                    />
                ))}
            </div>

            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#DAA520]/90 hover:bg-[#DAA520] text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-hover z-10 text-lg"
            >
                &#10094;
            </button>
            
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#DAA520]/90 hover:bg-[#DAA520] text-white w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg scale-hover z-10 text-lg"
            >
                &#10095;
            </button>
        </div>
    );
}