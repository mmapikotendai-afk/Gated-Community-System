import { useMemo } from 'react';
import { BedDouble, Wifi, Car, Coffee, Tv, Wind, Shield, Trees } from 'lucide-react';

const locations = [
    "Avondale", "Avondale West", "Alexandra Park", "The Avenues", "Belvedere", "Belgravia",
    "Borrowdale", "Borrowdale Brooke", "Borrowdale West", "Braeside", "Budiriro", "Chisipite",
    "Chizhanje", "Cranborne", "Dzivarasekwa", "Eastlea", "Epworth", "Glen Lorne", "Glen Norah",
    "Glen View", "Greendale", "Greystone Park", "Gunhill", "Hatcliffe", "Hatfield", "Highlands",
    "Hopley", "Kambuzuma", "Kensington", "Lewisam", "Mabelreign", "Marlborough", "Mbare",
    "Milton Park", "Monavale", "Mount Pleasant", "Msasa Park", "Newlands", "Northwood",
    "Palm Springs", "Prospect", "Quinnington", "Rhodesville", "Rietfontein", "Runniville",
    "Saturday Retreat", "Shawasha Hills", "Strathaven", "Tafara", "Tynwald", "Vainona",
    "Waterfalls", "Westgate", "Westlea", "Helensvale", "Hogerty Hill", "Luna", "Philadelphia",
    "Rolf Valley", "Umwinsdale"
];

const images = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-6ad4c727dd2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const BnBBooking = () => {
    const whatsappNumber = "263771640916";

    const bnbs = useMemo(() => {
        return locations.map((loc, index) => {
            let price = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
            let rooms = Math.floor(Math.random() * 5) + 1;
            let image = images[index % images.length];

            // Overrides
            if (loc === "Borrowdale") {
                price = 230;
                image = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            } else if (loc === "Helensvale") {
                image = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            } else if (loc === "Shawasha Hills") {
                image = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            } else if (loc === "Alexandra Park") {
                image = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }

            // Generate random features
            const possibleFeatures = [
                { name: "Free Wi-Fi", icon: Wifi },
                { name: "Secure Parking", icon: Car },
                { name: "Breakfast", icon: Coffee },
                { name: "Smart TV", icon: Tv },
                { name: "AC", icon: Wind },
                { name: "Security", icon: Shield },
                { name: "Garden", icon: Trees }
            ];
            const features = possibleFeatures.sort(() => 0.5 - Math.random()).slice(0, 4);

            return {
                id: index,
                title: `${loc} Luxury Stay`,
                location: loc,
                description: `Experience the best of ${loc} in this beautiful ${rooms}-bedroom property. Ideal for families and business travelers seeking comfort and style.`,
                price: `$${price}`,
                rooms: rooms,
                features: features,
                image: image
            };
        });
    }, []);

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Your Perfect Stay</h1>
                <p className="text-gray-600">Discover our curated collection of {bnbs.length}+ premium properties across Harare's finest neighborhoods.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bnbs.map((bnb) => (
                    <div key={bnb.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                        <div className="relative h-48">
                            <img
                                src={bnb.image}
                                alt={bnb.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                                {bnb.price} / night
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{bnb.title}</h2>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{bnb.description}</p>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="flex items-center text-gray-600 text-sm">
                                    <BedDouble className="mr-2 text-blue-500" size={16} />
                                    <span>{bnb.rooms} Beds</span>
                                </div>
                                {bnb.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-gray-600 text-sm">
                                        <feature.icon className="mr-2 text-blue-500" size={16} />
                                        <span>{feature.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in booking the ${bnb.title} in ${bnb.location} priced at ${bnb.price}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-green-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                                >
                                    Book via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BnBBooking;
