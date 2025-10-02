// ...existing code...
import { Utensils, Heart, Scissors, ShoppingBag, Car, Home, Dumbbell, GraduationCap } from 'lucide-react';

const Industries = () => {
  const industries = [
    {
      icon: <Utensils className="w-8 h-8" />,
      name: "Restaurants",
      description: "Cafes, Fine Dining, Fast Food",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      name: "Healthcare",
      description: "Hospitals, Clinics, Dental",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      name: "Beauty & Wellness",
      description: "Salons, Spas, Barbershops",
      color: "from-pink-500 to-purple-500"
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      name: "Retail Stores",
      description: "Clothing, Electronics, Grocery",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Car className="w-8 h-8" />,
      name: "Automotive",
      description: "Repair Shops, Dealerships",
      color: "from-gray-600 to-gray-700"
    },
    {
      icon: <Home className="w-8 h-8" />,
      name: "Home Services",
      description: "Plumbing, Cleaning, Repair",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      name: "Fitness",
      description: "Gyms, Yoga Studios, Sports",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      name: "Education",
      description: "Schools, Coaching, Training",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section id="industries" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI Review System works perfectly for any local business.<br/> Customized review generation for every industry.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {industries.map((industry, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${industry.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {industry.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {industry.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  500+
                </div>
                <p className="text-gray-600 font-medium">Businesses Using AI Reviews</p>
              </div>
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  50K+
                </div>
                <p className="text-gray-600 font-medium">Reviews Generated</p>
              </div>
              <div className="group">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                  300%
                </div>
                <p className="text-gray-600 font-medium">Average Review Increase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;