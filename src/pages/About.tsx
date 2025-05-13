
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Code, Lightbulb, Terminal, ExternalLink } from 'lucide-react';

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRefs = {
    about: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    setIsLoaded(true);
    
    // Staggered animations for sections
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe each section
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow py-6 md:py-10 px-4 md:px-12 max-w-4xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-text ${isLoaded ? 'opacity-100 transition-opacity duration-700' : 'opacity-0'}`}>
          Über Mich
        </h1>
        
        <section 
          ref={sectionRefs.about} 
          className="mb-12 opacity-0 transition-all duration-700 bg-white p-6 md:p-8 rounded-lg shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-accent/30 pb-2 flex items-center">
            <Lightbulb size={24} className="text-accent mr-2" />
            Mein Weg
          </h2>
          
          <div className="space-y-4">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Ich besuche derzeit die Höhere Handelsschule am Berufskolleg Kaufmannsschule Krefeld und strebe mein Fachabitur an.
            </p>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Schon früh habe ich meine Begeisterung für IT und Softwareentwicklung entdeckt. 
              Besonders faszinieren mich das Problemlösen mit Code und das Erschaffen neuer Anwendungen, 
              die eine praktische Bedeutung haben. Diese Leidenschaft treibt mich an, 
              meine Kenntnisse stetig zu erweitern und neue Technologien zu erkunden.
            </p>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Was mich an der Softwareentwicklung begeistert, ist die kreative Freiheit, eigene Ideen umsetzen zu können 
              und gleichzeitig logisches Denken zu fördern. Ich lerne gerne durch praktische Projekte und möchte in 
              Zukunft meine Fähigkeiten in der Anwendungsentwicklung professionell einsetzen, um innovative Lösungen zu schaffen.
            </p>
          </div>
        </section>
        
        <section 
          ref={sectionRefs.skills} 
          className="mb-12 opacity-0 transition-all duration-700"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-accent/30 pb-2 flex items-center">
            <Terminal size={24} className="text-accent mr-2" />
            Meine Kenntnisse
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-white to-purple-50 p-5 md:p-6 rounded-lg shadow-sm border border-purple-100">
              <h3 className="text-lg md:text-xl font-medium mb-3 text-accent">Programmiersprachen</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Python (lerne ich gerade aktiv)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                  JavaScript (Grundlagen)
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-white to-blue-50 p-5 md:p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-lg md:text-xl font-medium mb-3 text-blue-600">Webentwicklung</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  HTML
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  CSS
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Responsive Design
                </li>
              </ul>
            </div>
          </div>
          
          <p className="text-gray-600 mt-4 italic text-sm md:text-base bg-amber-50 p-3 rounded-md border border-amber-100">
            Diese Grundlagen habe ich mir durch eigenständiges Lernen, die Umsetzung kleiner Projekte und auch mithilfe von KI-gestützten Lernwerkzeugen angeeignet.
          </p>
        </section>
        
        <section 
          ref={sectionRefs.projects} 
          className="mb-12 opacity-0 transition-all duration-700"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-accent/30 pb-2 flex items-center">
            <Code size={24} className="text-accent mr-2" />
            Projekte
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-medium mb-3 text-primary">Persönliche Portfolio-Website</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Diese Website, die Sie gerade besuchen, habe ich als Übungsprojekt entwickelt,
                um meine Webentwicklungsfähigkeiten zu demonstrieren und zu verbessern.
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm text-accent font-medium">Technologien: React, Tailwind CSS</p>
              </div>
            </div>
            
            <Link 
              to="/calculator" 
              className="project-card group bg-white border border-gray-200 p-5 md:p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-primary group-hover:text-accent transition-colors">Taschenrechner-App</h3>
                <ExternalLink size={18} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Eine Webanwendung, die die Grundfunktionen eines Taschenrechners implementiert.
                Entwickelt, um meine JavaScript-Kenntnisse praktisch anzuwenden und zu vertiefen.
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm text-accent font-medium">Technologien: HTML, CSS, JavaScript</p>
                <Button variant="outline" size="sm" className="text-xs bg-transparent hover:bg-accent hover:text-white border-accent text-accent">
                  Ausprobieren
                </Button>
              </div>
            </Link>
          </div>
        </section>
        
        <section 
          ref={sectionRefs.contact} 
          className="mb-6 opacity-0 transition-all duration-700"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-accent/30 pb-2">
            Kontakt
          </h2>
          
          <div className="bg-gradient-to-br from-white to-purple-50 p-5 md:p-6 rounded-lg shadow-sm border border-purple-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-base md:text-lg font-medium mb-3 text-accent">Arda Görgüsenli</h3>
              </div>
              
              <div>
                <p className="text-gray-700 mb-2 text-sm md:text-base">
                  <span className="font-medium">Telefon:</span> 0163 7859732
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-medium">E-Mail:</span> goerguesenliarda@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 text-center border-t border-gray-200">
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

export default About;
