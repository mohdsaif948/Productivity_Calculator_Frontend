import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AnimatedBg from './components/AnimatedBg';
import Particles from './components/Particles';
import LoginPage from './components/LoginPage';
import MainPanel from './components/MainPanel';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('taskflow_auth'));
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      alert('Failed to fetch tasks from backend.');
    }
    setLoading(false);
  };

  // Auth logic
  // Use a wrapper to get navigate
  const LoginWrapper = (props) => {
    const navigate = useNavigate();
    const loginWithGoogle = () => {
      localStorage.setItem('taskflow_auth', 'true');
      setIsAuth(true);
      navigate('/dashboard', { replace: true });
    };
    return <LoginPage onLogin={loginWithGoogle} {...props} />;
  };

  const logout = () => {
    localStorage.removeItem('taskflow_auth');
    setIsAuth(false);
  };

  useEffect(() => {
    if (isAuth) fetchTasks();
  }, [isAuth]);

  // Helper to extract view from path
  const getViewFromPath = (pathname) => {
    if (pathname === '/insights') return 'insights';
    if (pathname === '/analytics') return 'analytics';
    return 'dashboard';
  };

  // Wrapper to sync MainPanel view with route
  const MainPanelWithRouting = (props) => {
    const location = useLocation();
    const view = getViewFromPath(location.pathname);
    return (
      <MainPanel
        {...props}
        view={view}
      />
    );
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div>
      <AnimatedBg />
      <Particles />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ProtectedRoute><MainPanelWithRouting
            tasks={tasks}
            setTasks={setTasks}
            fetchTasks={fetchTasks}
            logout={logout}
            loading={loading}
          /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><MainPanelWithRouting
            tasks={tasks}
            setTasks={setTasks}
            fetchTasks={fetchTasks}
            logout={logout}
            loading={loading}
          /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><MainPanelWithRouting
            tasks={tasks}
            setTasks={setTasks}
            fetchTasks={fetchTasks}
            logout={logout}
            loading={loading}
          /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App; 