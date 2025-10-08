import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [trustVisible, setTrustVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Rajesh Patel",
      business: "Patel's Family Restaurant",
      location: "Mumbai",
      rating: 5,
      text: "Our Google reviews increased by 400% in just 2 months! The AI-generated reviews look so natural, customers love how easy it is to leave feedback.",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Dr. Priya Sharma",
      business: "Sharma Dental Clinic",
      location: "Delhi",
      rating: 5,
      text: "The multilingual feature is amazing! Our patients can leave reviews in Hindi and English. It's helped us build trust with the local community.",
      avatar:
        "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Amit Kumar",
      business: "Style Zone Salon",
      location: "Bangalore",
      rating: 5,
      text: "The QR code system is brilliant! We just put it on our counter and customers scan it after their haircut. Reviews have never been easier to collect.",
      avatar:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Sneha Gupta",
      business: "Fresh Mart Grocery",
      location: "Pune",
      rating: 5,
      text: "We went from 12 reviews to over 200 reviews in 3 months! The AI creates such authentic-sounding reviews that perfectly match our customer experience.",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Vikram Singh",
      business: "Singh Auto Repair",
      location: "Jaipur",
      rating: 5,
      text: "Setup was incredibly easy and the results speak for themselves. Our online reputation has improved dramatically, bringing in more customers daily.",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      name: "Meera Joshi",
      business: "Bliss Spa & Wellness",
      location: "Ahmedabad",
      rating: 5,
      text: "The Gujarati language support was exactly what we needed for our local customers. The reviews generated are so natural and well-written!",
      avatar:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
  ];

  // Intersection Observer for main section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger card animations
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Intersection Observer for trust indicators
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTrustVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (trustRef.current) {
      observer.observe(trustRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-10 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-4 opacity-0 scale-95"
              }`}
            >
              <span className="animate-bounce mr-2">💬</span>
              Customer Success Stories
            </div>
            <h2
              className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              What Business Owners
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient-x">
                {" "}
                Say
              </span>
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-3xl mx-auto transform transition-all duration-1000 delay-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Join hundreds of successful local businesses who've transformed
              their online reputation with our AI Review System.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-gray-100 hover:border-blue-200 relative overflow-hidden ${
                  visibleCards.includes(index)
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-12 opacity-0 scale-95"
                } hover:-translate-y-4 hover:scale-105`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Floating particles effect */}
                {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                      style={{
                        top: `${20 + i * 25}%`,
                        right: `${10 + i * 20}%`,
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: `${2 + i * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div> */}

                {/* Quote Icon with enhanced animation */}
                <div
                  className={`absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                    visibleCards.includes(index)
                      ? "animate-bounce-in"
                      : "opacity-0 scale-0"
                  } group-hover:scale-125 group-hover:rotate-12 z-20`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <Quote className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-30 rounded-full animate-ping"></div>
                  {/* Additional glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                </div>
                

                {/* Rating with staggered star animation */}
                <div
                  className={`flex items-center mb-4 relative z-10 transition-all duration-500 ${
                    visibleCards.includes(index)
                      ? "translate-x-0 opacity-100"
                      : "translate-x-4 opacity-0"
                  }`}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current transition-all duration-300 hover:scale-125 hover:rotate-12"
                      style={{
                        animationDelay: `${i * 0.1}s`,
                        transitionDelay: `${i * 50}ms`,
                      }}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p
                  className={`text-gray-700 mb-6 leading-relaxed italic relative z-10 transition-all duration-700 ${
                    visibleCards.includes(index)
                      ? "translate-x-0 opacity-100"
                      : "translate-x-6 opacity-0"
                  } group-hover:text-gray-800`}
                >
                  "{testimonial.text}"
                </p>

                {/* Author Info with enhanced animations */}
                <div
                  className={`flex items-center relative z-10 transition-all duration-700 ${
                    visibleCards.includes(index)
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <div className="relative group/avatar">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg rounded-full border-2 border-transparent border-blue-300 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    />
                    {/* Avatar ring effect */}
                    <div className=""></div>
                  </div>
                  <div className="transition-all duration-300 group-hover:translate-x-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {testimonial.business}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-in-out"></div>
              </div>
            ))}
          </div>

          {/* Trust Indicators with Enhanced Animation */}
          <div
            ref={trustRef}
            className={`bg-white rounded-3xl p-8 shadow-xl relative overflow-hidden transform transition-all duration-1000 ${
              trustVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-12 opacity-0 scale-95"
            }`}
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-green-50/30"></div>

            <div className="grid md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                {
                  emoji: "⭐",
                  number: "4.9/5",
                  label: "Average Rating",
                  gradient: "from-yellow-600 to-orange-600",
                  delay: "0ms",
                },
                {
                  emoji: "🚀",
                  number: "300%",
                  label: "Review Increase",
                  gradient: "from-blue-600 to-purple-600",
                  delay: "150ms",
                },
                {
                  emoji: "⚡",
                  number: "5 Min",
                  label: "Setup Time",
                  gradient: "from-green-600 to-teal-600",
                  delay: "300ms",
                },
                {
                  emoji: "🎯",
                  number: "500+",
                  label: "Happy Businesses",
                  gradient: "from-purple-600 to-pink-600",
                  delay: "450ms",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`group transform transition-all duration-1000 ${
                    trustVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  } hover:scale-110`}
                  style={{ transitionDelay: stat.delay }}
                >
                  <div className="text-4xl mb-3 transition-transform duration-500 group-hover:scale-125 group-hover:animate-bounce">
                    {stat.emoji}
                  </div>
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${
                      stat.gradient
                    } bg-clip-text text-transparent mb-2 transition-all duration-500 ${
                      trustVisible ? "animate-count-up" : ""
                    } group-hover:scale-110`}
                  >
                    {stat.number}
                  </div>
                  <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                    {stat.label}
                  </p>
                  {/* Animated underline */}
                  <div
                    className={`w-0 group-hover:w-full h-1 bg-gradient-to-r ${stat.gradient} mx-auto mt-2 transition-all duration-500 rounded-full`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/2 left-4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(-3deg);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-360deg);
          }
          60% {
            opacity: 1;
            transform: scale(1.3) rotate(-20deg);
          }
          80% {
            transform: scale(0.9) rotate(10deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes count-up {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-count-up {
          animation: count-up 1.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
