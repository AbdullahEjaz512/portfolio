export const darkTheme = {
  colors: {
    primary: '#6366f1', // Indigo
    primaryHover: '#4f46e5',
    primaryLight: 'rgba(99, 102, 241, 0.1)',
    secondary: '#10b981', // Emerald
    secondaryHover: '#059669',
    secondaryLight: 'rgba(16, 185, 129, 0.1)',
    accent: '#0d9488', // Teal
    background: '#090a0f', // Matte Industrial Black
    backgroundSecondary: '#0f111a', // Deep Slate
    backgroundTertiary: '#141622',
    card: '#111218', // Matte Dark Card
    cardHover: '#161720',
    text: '#ffffff', // Stark White
    textSecondary: '#94a3b8', // Cool Zinc/Slate
    textMuted: '#64748b', // Muted Blue-Grey
    border: '#1e202b', // Muted Border
    borderHover: '#323547', // Defined Hover Border
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gradient: 'linear-gradient(135deg, #090a0f 0%, #111218 100%)',
    gradientText: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
    navBackground: 'rgba(9, 10, 15, 0.85)',
    mobileMenuBg: 'rgba(9, 10, 15, 0.95)',
  },
  fonts: {
    primary: "'Inter', sans-serif",
    display: "'Outfit', sans-serif",
    code: "'Fira Code', monospace",
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.5)',
    medium: '0 4px 20px rgba(0, 0, 0, 0.7)',
    large: '0 8px 40px rgba(0, 0, 0, 0.8)',
    glow: 'none', // Remove glowing clichés
    glowStrong: 'none',
  },
  transitions: {
    fast: '0.12s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  spacing: {
    unit: '4px',
    gutter: '24px',
    marginMobile: '16px',
    marginDesktop: '48px',
  }
};

// Align lightTheme to a clean steel/industrial light palette
export const lightTheme = {
  colors: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    primaryLight: 'rgba(99, 102, 241, 0.05)',
    secondary: '#10b981',
    secondaryHover: '#059669',
    secondaryLight: 'rgba(16, 185, 129, 0.05)',
    accent: '#0d9488',
    background: '#f8fafc', // Slate 50
    backgroundSecondary: '#f1f5f9', // Slate 100
    backgroundTertiary: '#e2e8f0', // Slate 200
    card: '#ffffff',
    cardHover: '#f8fafc',
    text: '#0f172a', // Slate 900
    textSecondary: '#475569', // Slate 600
    textMuted: '#64748b', // Slate 500
    border: '#cbd5e1', // Slate 300
    borderHover: '#94a3b8', // Slate 400
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    gradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    gradientText: 'linear-gradient(135deg, #0f172a 0%, #475569 100%)',
    navBackground: 'rgba(248, 250, 252, 0.85)',
    mobileMenuBg: 'rgba(248, 250, 252, 0.95)',
  },
  fonts: {
    primary: "'Inter', sans-serif",
    display: "'Outfit', sans-serif",
    code: "'Fira Code', monospace",
  },
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.08)',
    large: '0 8px 24px rgba(0, 0, 0, 0.12)',
    glow: 'none',
    glowStrong: 'none',
  },
  transitions: {
    fast: '0.12s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  spacing: {
    unit: '4px',
    gutter: '24px',
    marginMobile: '16px',
    marginDesktop: '48px',
  }
};

const theme = darkTheme;
export default theme;

