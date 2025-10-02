import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Patel",
      business: "Patel's Family Restaurant",
      location: "Mumbai",
      rating: 5,
      text: "Our Google reviews increased by 400% in just 2 months! The AI-generated reviews look so natural, customers love how easy it is to leave feedback.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Dr. Priya Sharma",
      business: "Sharma Dental Clinic",
      location: "Delhi",
      rating: 5,
      text: "The multilingual feature is amazing! Our patients can leave reviews in Hindi and English. It's helped us build trust with the local community.",
      avatar: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Amit Kumar",
      business: "Style Zone Salon",
      location: "Bangalore",
      rating: 5,
      text: "The QR code system is brilliant! We just put it on our counter and customers scan it after their haircut. Reviews have never been easier to collect.",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Sneha Gupta",
      business: "Fresh Mart Grocery",
      location: "Pune",
      rating: 5,
      text: "We went from 12 reviews to over 200 reviews in 3 months! The AI creates such authentic-sounding reviews that perfectly match our customer experience.",
      avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Vikram Singh",
      business: "Singh Auto Repair",
      location: "Jaipur",
      rating: 5,
      text: "Setup was incredibly easy and the results speak for themselves. Our online reputation has improved dramatically, bringing in more customers daily.",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Meera Joshi",
      business: "Bliss Spa & Wellness",
      location: "Ahmedabad",
      rating: 5,
      text: "The Gujarati language support was exactly what we needed for our local customers. The reviews generated are so natural and well-written!",
      avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              💬 Customer Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Business Owners Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of successful local businesses who've transformed their online reputation with our AI Review System.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-blue-200 relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-white" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
                <p className="text-gray-600 text-sm">Average Rating</p>
              </div>
              <div className="group">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">300%</div>
                <p className="text-gray-600 text-sm">Review Increase</p>
              </div>
              <div className="group">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">5 Min</div>
                <p className="text-gray-600 text-sm">Setup Time</p>
              </div>
              <div className="group">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">500+</div>
                <p className="text-gray-600 text-sm">Happy Businesses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;