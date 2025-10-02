import { useEffect, useState } from 'react';
import { Star, ArrowRight, Play, X } from 'lucide-react';

const Hero = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToLeadForm = () => {
    const leadFormElement = document.querySelector('#lead-form');
    if (leadFormElement) {
      leadFormElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Close modal on ESC and lock scroll when open
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    if (isVideoOpen) {
      window.addEventListener('keydown', onKeyDown);
      // lock body scroll
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = original;
      };
    }
    return () => {};
  }, [isVideoOpen]);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 pt-20 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto mt-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Trusted by 500+ Local Businesses
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-0 leading-tight">
                Get More 
 </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Google Reviews
                
                <span className="block"><span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Effortlessly</span> with AI</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Turn happy customers into loyal promoters in just one tap - powered by smart AI-generated reviews that sound natural and authentic.
              </p>
              
              {/* CTA Buttons */} 
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <button 
                  onClick={scrollToLeadForm}
                  className="group bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
                >
                  Book Free Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => setIsVideoOpen(true)} className="group bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                    <div className="flex -space-x-2 mr-3">
                    {[
                      "https://randomuser.me/api/portraits/men/32.jpg",
                      "https://randomuser.me/api/portraits/women/44.jpg",
                      "https://randomuser.me/api/portraits/men/54.jpg",
                      "https://randomuser.me/api/portraits/women/65.jpg"
                    ].map((src, i) => (
                      <img
                      key={i}
                      src={src}
                      alt={`User ${i + 1}`}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    </div>
                  <span>500+ businesses trust us</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  AI Powered ✨
                </div>
                
                {/* Mock Phone Interface */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      AI
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold text-gray-900">Review Generator</h3>
                      <p className="text-sm text-gray-500">Rate your experience</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                    ))}
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 border-l-4 border-blue-500">
                    <p className="text-gray-700 text-sm italic">
                      "Amazing service! The staff was incredibly helpful and the food was delicious. Highly recommend this restaurant to anyone looking for great dining experience!"
                    </p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow">
                    📋 Copy & Post to Google
                  </button>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                🚀 +300% Reviews
              </div>
              <div className="absolute -bottom-8 -right-8 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                🌟 5-Star Reviews
              </div>
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
              <X className="w-5 h-5" />
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

export default Hero;