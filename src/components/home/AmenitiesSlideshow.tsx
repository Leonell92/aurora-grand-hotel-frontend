import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import amenityExterior from "@/assets/amenity-exterior.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenitySpa from "@/assets/amenity-spa.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import amenityTennis from "@/assets/amenity-tennis.jpg";
import amenityBasketball from "@/assets/amenity-basketball.jpg";

const amenities = [
    {
        id: 1,
        title: "Luxury Hotel Exterior",
        image: amenityExterior,
        description: "Modern architecture with elegant entrance",
    },
    {
        id: 2,
        title: "Infinity Pool",
        image: amenityPool,
        description: "Rooftop pool with stunning city views",
    },
    {
        id: 3,
        title: "Premium Spa",
        image: amenitySpa,
        description: "Relax in our world-class wellness center",
    },
    {
        id: 4,
        title: "State-of-the-Art Gym",
        image: amenityGym,
        description: "Fully equipped fitness center",
    },
    {
        id: 5,
        title: "Tennis Court",
        image: amenityTennis,
        description: "Professional tennis facilities",
    },
    {
        id: 6,
        title: "Basketball Court",
        image: amenityBasketball,
        description: "Outdoor basketball court",
    },
];

export function AmenitiesSlideshow() {
    const [api, setApi] = useState<any>();

    useEffect(() => {
        if (!api) return;

        // Auto-play plugin
        const autoplay = Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        });

        api.plugins().autoplay = autoplay;
    }, [api]);

    return (
        <div className="w-full max-w-6xl mx-auto mb-12 px-4 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                    }),
                ]}
                className="w-full"
                setApi={setApi}
            >
                <CarouselContent>
                    {amenities.map((amenity) => (
                        <CarouselItem key={amenity.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-2">
                                <div className="relative group overflow-hidden rounded-lg shadow-2xl">
                                    <img
                                        src={amenity.image}
                                        alt={amenity.title}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <h3 className="text-xl font-serif font-semibold mb-2">
                                                {amenity.title}
                                            </h3>
                                            <p className="text-sm text-white/90">
                                                {amenity.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
                <CarouselNext className="right-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
            </Carousel>
        </div>
    );
}
