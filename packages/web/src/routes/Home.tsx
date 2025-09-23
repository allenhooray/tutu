import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const Home: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      {/* 导航栏 */}
      <nav style={navStyles}>
        <div style={navLeft}>
          <h2>图图 Web</h2>
        </div>
        <div style={navRight}>
          {isAuthenticated ? (
            <div style={userMenu}>
              <span>欢迎, {user?.name}</span>
              <button onClick={handleLogout} style={logoutButton}>登出</button>
            </div>
          ) : (
            <Link to="/login">
              <button style={loginButton}>登录</button>
            </Link>
          )}
        </div>
      </nav>

      {/* 主要内容 */}
      <div style={contentStyles}>
        <h1>欢迎来到 Tutu Web</h1>
        <p>这是一个使用 React 和 Vite 构建的 Web 应用</p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/about">
            <button style={{ marginRight: '1rem' }}>关于我们</button>
          </Link>
          <Link to="/non-existent-route">
            <button>不存在的路由（测试404）</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// 导航栏样式
const navStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #e9ecef',
};

const navLeft = {
  display: 'flex',
  alignItems: 'center',
};

const navRight = {
  display: 'flex',
  alignItems: 'center',
};

const userMenu = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const loginButton = {
  padding: '0.5rem 1rem',
  backgroundColor: '#4a6cf7',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const logoutButton = {
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const contentStyles = {
  textAlign: 'center' as const,
  padding: '2rem',
};

export default Home;