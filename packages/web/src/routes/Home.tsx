import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
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
  );
};

export default Home;