import { useState, useEffect } from 'react';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

  }, []);

  return (
    <nav className={scrolled? "navbar navbar-light fixed-top navbar-scrolled" : "navbar navbar-light fixed-top"}>
      <div className="container">
        <h1 className="mx-auto text-center py-1 h-color">cat corner</h1>
      </div>
    </nav>
  )
}

export default Header;