
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-nexora-dark py-10 relative overflow-hidden">
      {/* Footer background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-1/2 left-1/4 w-64 h-64 bg-nexora-primary rounded-full filter blur-[100px] opacity-10"></div>
        <div className="absolute -top-1/2 right-1/4 w-64 h-64 bg-nexora-secondary rounded-full filter blur-[100px] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-nexora-secondary via-nexora-primary to-nexora-accent bg-clip-text text-transparent">
              Nexora
            </Link>
            <p className="text-gray-400 mt-2 max-w-md">
              A dawn of digital innovation. We merge cinematic 3D environments with buttery-smooth interactions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-white font-medium mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-nexora-secondary transition-colors">Home</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-nexora-secondary transition-colors">Features</Link></li>
                <li><Link to="/showcase" className="text-gray-400 hover:text-nexora-secondary transition-colors">Showcase</Link></li>
                <li><Link to="/technology" className="text-gray-400 hover:text-nexora-secondary transition-colors">Technology</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-nexora-secondary transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-3">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/punit-gavali-4066b41ba/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-nexora-secondary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:punitgavali29@gmail.com"
                    className="text-gray-400 hover:text-nexora-secondary transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+919096950392"
                    className="text-gray-400 hover:text-nexora-secondary transition-colors"
                  >
                    Phone
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            Created by Punit Gavali
          </p>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
