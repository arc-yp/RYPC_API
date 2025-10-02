import { useEffect, useState } from 'react';
import { Star, Globe, Copy, QrCode, Smartphone, RefreshCw } from 'lucide-react';

const Features = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close modal on ESC and lock scroll when open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', onKeyDown);
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = original;
      };
    }
    return () => {};
  }, [isVideoOpen]);
  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Smart Rating System",
      description: "AI generates reviews based on 1-5 star ratings with contextual understanding",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multilingual Support",
      description: "English, Hindi, and Gujarati reviews (all in Roman script for easy reading)",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Copy className="w-6 h-6" />,
      title: "One-Click Copy & Paste",
      description: "Generated reviews can be copied and posted to Google Reviews instantly",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <QrCode className="w-6 h-6" />,
      title: "QR Code System",
      description: "Unique QR codes and links for each business - easy customer access",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "SEO Ranking",
      description: "Boost your Google My Business (GMB) ranking with more frequent, high-quality reviews that improve your local search visibility.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Unique Content",
      description: "No duplicate reviews - each AI-generated review is unique and natural",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✨ Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Boost Reviews</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI Review System comes packed with features designed to make collecting authentic Google reviews effortless for your business.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Demo Preview Section */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">
              See It In Action
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Watch how our AI generates natural, authentic reviews that help your business grow its online reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setIsVideoOpen(true)} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center">
                📱 View Live Demo
              </button>
                <a
                href="tel:+919909908230"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
                >
                📞 Call Now
                </a>
            </div>
          </div>
        </div>
      </div>
      {/* Video Lightbox Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Watch demo video"
        >
          <div
            className="relative w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 sm:top-3 sm:right-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-105 transition"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
            >
              {/* using an emoji X to avoid importing new icon here */}
              ✖
            </button>
            {/* 9:16 Responsive Video Wrapper sized by viewport height for desktops */}
            <div className="relative aspect-[9/16] h-[70vh] sm:h-[75vh] md:h-[85vh] max-h-[900px] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-white/10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/F-CwRTHFzPM?autoplay=1&rel=0&modestbranding=1"
                title="AI Review System - Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;