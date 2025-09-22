import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <div style={{ marginTop: '2rem' }}>
        <Link to="/">
          <button>返回首页</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;