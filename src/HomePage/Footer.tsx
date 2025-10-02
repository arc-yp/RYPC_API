import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import type { MouseEvent } from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/arslogo1.png"
                  alt="AI Review System Logo"
                  className="w-[160px] h-full mr-1"
                />
                {/* <span className="text-2xl font-bold">AI Review System</span> */}
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Helping local businesses grow their online reputation with AI-powered review generation. 
                Get more Google reviews effortlessly and build trust with your customers.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Mail className="w-5 h-5 mr-3 text-blue-400" />
                  <span>aireviewsystem@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="w-5 h-5 mr-3 text-green-400" />
                  <span>+91 99099 08230</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {(() => {
                  const handleDemoClick = (e: MouseEvent<HTMLAnchorElement>) => {
                    if (typeof window === 'undefined') return;
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('lead-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                    // If not on home, allow navigation to '/#lead-form' via href
                  };

                  const handleFeaturesClick = (e: MouseEvent<HTMLAnchorElement>) => {
                    if (typeof window === 'undefined') return;
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('features');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  };

                  const links: Array<{ label: string; href: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }>= [
                    { label: 'How It Works', href: '/#how-it-works', onClick: (e) => {
                      if (typeof window === 'undefined') return;
                      if (window.location.pathname === '/') {
                        e.preventDefault();
                        const el = document.getElementById('how-it-works');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    } },
                      { label: 'Industries', href: '/#industries', onClick: (e) => {
                        if (typeof window === 'undefined') return;
                        if (window.location.pathname === '/') {
                          e.preventDefault();
                          const el = document.getElementById('industries');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      } },
                    { label: 'Features', href: '/#features', onClick: handleFeaturesClick },
                    { label: 'Pricing', href: '/#pricing', onClick: (e) => {
                      if (typeof window === 'undefined') return;
                      if (window.location.pathname === '/') {
                        e.preventDefault();
                        const el = document.getElementById('pricing');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    } },
                    { label: 'Demo', href: '/#lead-form', onClick: handleDemoClick },
                    { label: 'Contact Us', href: '/#faq', onClick: (e) => {
                      if (typeof window === 'undefined') return;
                      if (window.location.pathname === '/') {
                        e.preventDefault();
                        const el = document.getElementById('faq');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    } }
                  ];

                  return links.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={item.onClick}
                        className="text-gray-300 hover:text-white transition-colors duration-300"
                      >
                        {item.label}
                      </a>
                    </li>
                  ));
                })()}
              </ul>
            </div>

{/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Policies</h3>
              <ul className="space-y-3">
               
                <li>
                  <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/refund-policy" className="text-gray-300 hover:text-white transition-colors duration-300">Refund &amp; Cancellation</a>
                </li>
              </ul>
            </div>
           
          </div>
          
          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 mt-12 pt-12">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with AI Review Tips
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest strategies for growing your business reviews and online reputation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 AI Review System. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <social.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;