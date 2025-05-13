
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navigation from '@/components/Navigation';
import { Code, Terminal, Lightbulb } from 'lucide-react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const interestsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Immediately set loaded to true on mount to prevent flashing
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="text-center px-4 md:px-8 max-w-3xl mx-auto">
          <h1 
            ref={nameRef} 
            className={`text-4xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-text opacity-0 animate-fade-in`}
            style={{ animationDelay: '0ms' }}
          >
            Arda Görgüsenli
          </h1>
          
          <p 
            ref={subtitleRef} 
            className="text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            Schüler am Berufskolleg Kaufmannsschule Krefeld
          </p>

          <div 
            ref={quoteRef}
            className="mx-auto max-w-2xl mb-10 opacity-0 animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <p className="quote py-2">
              Wenn ich eine Idee habe, beginne ich sofort damit, sie in meiner Vorstellung zu konstruieren. Ich ändere die Konstruktion, mache Verbesserungen und bediene das Gerät in meinem Kopf. - Nikola Tesla
            </p>
          </div>

          <div 
            ref={interestsRef}
            className="flex justify-center flex-wrap gap-8 md:gap-12 mb-8 md:mb-10 opacity-0 animate-fade-in"
            style={{ animationDelay: '700ms' }}
          >
            <div className="flex flex-col items-center">
              <div className="interest-icon w-16 h-16 md:w-20 md:h-20 rounded-full bg-purple-100 flex items-center justify-center mb-3 shadow-sm">
                <Code size={32} className="text-accent" />
              </div>
              <span className="text-sm md:text-base text-gray-700 font-medium">Webentwicklung</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="interest-icon w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 shadow-sm">
                <Terminal size={32} className="text-blue-600" />
              </div>
              <span className="text-sm md:text-base text-gray-700 font-medium">Programmierung</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="interest-icon w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-100 flex items-center justify-center mb-3 shadow-sm">
                <Lightbulb size={32} className="text-amber-500" />
              </div>
              <span className="text-sm md:text-base text-gray-700 font-medium">Problemlösung</span>
            </div>
          </div>
          
          <div 
            ref={buttonRef} 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: '900ms' }}
          >
            <Link to="/about">
              <Button className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-5 md:px-8 md:py-6 rounded-md transition-all hover:shadow-lg">
                Mehr über mich
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Arda Görgüsenli
            </div>
            <div className="text-sm text-gray-500">
              Tel: 0163 7859732 | goerguesenliarda@gmail.com
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
