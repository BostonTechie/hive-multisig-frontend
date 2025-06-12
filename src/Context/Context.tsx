import DOMPurify from 'dompurify';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const inactivityTimeout = 30 * 60 * 1000;

interface User {
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showVerify, setShowVerify] = useState(false);
  const [input, setInput] = useState('');

  //auto logout
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout(); // Auto logout after inactivity
    }, inactivityTimeout);
  };

  useEffect(() => {
    const events = [
      'mousemove',
      'mousedown',
      'keypress',
      'touchstart',
      'scroll',
    ];
    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));
    resetTimer(); // Start initial timer

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  //end auto logout

  useEffect(() => {
    if (showVerify) {
      setShowVerify(false);
    }
  }, [showVerify]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData: User) => {
    const cleanUser = {
      ...userData,
      email: DOMPurify.sanitize(userData.email),
    };

    localStorage.setItem('user', JSON.stringify(cleanUser));
    setUser(cleanUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  // Memoize context value to optimize performance
  const contextValue = useMemo(
    () => ({ isLoggedIn, user, login, logout }),
    [isLoggedIn, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const stripHtml = (input: string): string => {
  return input.replace(/<[^>]*>?/gm, '');
};
