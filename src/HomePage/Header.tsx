import { useState, useEffect } from 'react';
import { Star, Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToLeadForm = () => {
    const leadFormElement = document.querySelector('#lead-form');
    if (leadFormElement) {
      leadFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Industries', href: '#industries' },
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-0">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center w-44 h-26">
              <img 
              src="/arslogo.png" 
              alt="AI Review System Logo" 
              className="w-[280px] h-[180px] object-contain"
              onError={(e) => {
                // Fallback to Star icon if logo fails to load
                e.currentTarget.style.display = 'none';
                const starIcon = e.currentTarget.nextElementSibling as HTMLElement;
                if (starIcon) {
                starIcon.style.display = 'block';
                }
              }}
              />
              <Star className="w-8 h-8 text-blue-700 hidden" />
            </div>
            {/* <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-blue-700'
            }`}>
              AI Review System
            </span> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-blue-700'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* <button className={`px-6 py-2 rounded-xl font-semibold transition-all ${
              isScrolled 
                ? 'text-gray-700 hover:text-blue-600' 
                : 'text-white hover:text-blue-200'
            }`}>
              Login
            </button> */}
            <button onClick={scrollToLeadForm} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-2 mr-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center">
              Get Demo
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-2xl border-t border-gray-100">
            <nav className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 font-medium hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {/* <button className="block w-full text-left text-gray-700 font-medium hover:text-blue-600 transition-colors">
                  Login
                </button> */}
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // slight delay to allow menu to close animation before scrolling
                    setTimeout(() => scrollToLeadForm(), 50);
                  }}
                >
                  Get Demo
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;