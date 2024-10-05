import React, { useState, useEffect } from 'react';

function Sidebar() {
  const [activeSection, setActiveSection] = useState('');

  const sections = ['inicio', 'nosotros', 'servicios', 'contacto', ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
        }
      }
    });
  };

  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setActiveSection(section);
    }
  };

  return (
    <div className="hidden md:flex fixed top-1/2 left-4 transform -translate-y-1/2 flex-col space-y-4 z-40  ">
      {sections.map((section) => (
        <a
          key={section}
          onClick={() => handleClick(section)}
          className={`w-4 h-4 rounded-full transition-colors duration-800 cursor-pointer ${
            activeSection === section ? 'bg-red-600' : 'bg-gray-400'
          }`}
        ></a>
      ))}
    </div>
  );
}

export default Sidebar;
