import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedStudent = localStorage.getItem('student');
    if (storedStudent && token) {
      setStudent(JSON.parse(storedStudent));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, [token]);

  const login = (studentData, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('student', JSON.stringify(studentData));
    setToken(authToken);
    setStudent(studentData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    setToken(null);
    setStudent(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ student, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
