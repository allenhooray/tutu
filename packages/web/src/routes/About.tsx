import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>关于我们</h1>
      <p>这是一个示例应用，用于展示 React Router 的基本使用方法。</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/">
          <button>返回首页</button>
        </Link>
      </div>
    </div>
  );
};

export default About;