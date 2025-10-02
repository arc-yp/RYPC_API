// ...existing code...
import { QrCode, Star, Copy, Share2 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Share QR Code",
      description: "Customer scans your unique QR code or clicks your link after their visit",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Rate Experience",
      description: "They select 1-5 stars and choose their business category and language",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Copy className="w-8 h-8" />,
      title: "AI Generates Review",
      description: "Our AI creates a unique, natural-sounding review in seconds",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "One-Click Posting",
      description: "Customer copies and posts the review directly to Google with one tap",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
  <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get more Google reviews in 4 simple steps.<br/> No technical knowledge required just share and watch your reviews grow!
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0"></div>
                )}
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group-hover:border-blue-200">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-green-50 px-8 py-4 rounded-2xl">
              <span className="text-2xl mr-3">⚡</span>
              <span className="text-lg font-semibold text-gray-800">
                Setup takes less than 5 minutes!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;