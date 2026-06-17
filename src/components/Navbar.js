import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 18px 0;
  transition: all ${({ theme }) => theme.transitions.normal};
  background: ${({ scrolled, theme }) => 
    scrolled ? theme.colors.navBackground : 'rgba(9, 10, 15, 0.4)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid ${({ scrolled, theme }) => 
    scrolled ? theme.colors.border : 'rgba(30, 32, 43, 0.3)'};
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.03em;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 32px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  position: relative;
  padding: 4px 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HireButton = styled(motion.a)`
  padding: 10px 22px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 0.85rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0px; /* Sharp Industrial Corners */
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.6rem;
  z-index: 1001;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileControls = styled.div`
  display: none;
  align-items: center;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const MobileThemeToggle = styled(motion.button)`
  width: 38px;
  height: 38px;
  border-radius: 0px; /* Sharp corners */
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.mobileMenuBg};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  z-index: 999;
`;

const MobileNavLink = styled(motion.a)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const ThemeToggle = styled(motion.button)`
  width: 38px;
  height: 38px;
  border-radius: 0px; /* Sharp corners */
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <Nav
      scrolled={scrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NavContainer>
        <Logo href="#home">
          Abdullah<span>.</span>Ejaz
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              whileHover={{ y: -1 }}
            >
              {item.name}
            </NavLink>
          ))}
          <ThemeToggle
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <HiSun /> : <HiMoon />}
          </ThemeToggle>
          <HireButton
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Hire Me
          </HireButton>
        </NavLinks>

        <MobileControls>
          <MobileThemeToggle
            onClick={toggleTheme}
            whileTap={{ scale: 0.95 }}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <HiSun /> : <HiMoon />}
          </MobileThemeToggle>
          <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </MobileMenuButton>
        </MobileControls>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <MobileNavLink
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.name}
              </MobileNavLink>
            ))}
            <HireButton
              href="#contact"
              onClick={handleLinkClick}
              whileTap={{ scale: 0.98 }}
              style={{ marginTop: '16px' }}
            >
              Hire Me
            </HireButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
