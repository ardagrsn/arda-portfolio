
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <header className="sticky top-0 py-4 px-4 md:px-6 lg:px-12 flex justify-between items-center border-b border-gray-200 z-10 bg-white/90 backdrop-blur-sm">
        <Link to="/" className="text-xl font-montserrat font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          AG
        </Link>

        {isMobile ? (
          <>
            <button 
              onClick={toggleMenu} 
              className="p-2 text-gray-800 focus:outline-none"
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 animate-fade-in z-20">
                <nav>
                  <ul className="flex flex-col space-y-3">
                    <li className="px-6">
                      <Link 
                        to="/" 
                        className={`block text-lg transition-colors ${isActive('/') ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="px-6">
                      <Link 
                        to="/about" 
                        className={`block text-lg transition-colors ${isActive('/about') ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Über Mich
                      </Link>
                    </li>
                    <li className="px-6">
                      <Link 
                        to="/calculator" 
                        className={`block text-lg transition-colors ${isActive('/calculator') ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Taschenrechner
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-6 md:space-x-10">
              <li>
                <Link 
                  to="/" 
                  className={`hover-underline transition-colors text-lg ${isActive('/') ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className={`hover-underline transition-colors text-lg ${isActive('/about') ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                >
                  Über Mich
                </Link>
              </li>
              <li>
                <Link 
                  to="/calculator" 
                  className={`hover-underline transition-colors text-lg ${isActive('/calculator') ? 'text-accent font-medium' : 'text-gray-800 hover:text-accent'}`}
                >
                  Taschenrechner
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      
      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className={cn(
          "scroll-to-top",
          showScrollTop && "visible"
        )}
        aria-label="Zurück nach oben"
      >
        <ChevronUp size={24} />
      </button>
    </>
  );
};

export default Navigation;
