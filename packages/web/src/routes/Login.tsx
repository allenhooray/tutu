import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 获取重定向的来源页面，如果没有则默认返回首页
  const from = (location.state as { from: { pathname: string } })?.from?.pathname || '/';

  // 处理登录表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 简单的表单验证
    if (!email || !password) {
      setError('请填写所有必填字段');
      return;
    }

    // 这里是模拟登录，实际项目中应该调用API进行认证
    // 在真实环境中，这里应该是一个异步请求
    setTimeout(() => {
      try {
        // 模拟登录成功，创建一个用户对象
        const user = {
          id: '1',
          name: '示例用户',
          email: email
        };

        // 调用auth context的login方法
        login(user);

        // 登录成功后重定向到来源页面
        navigate(from, { replace: true });
      } catch (_) {
        setError('登录失败，请检查您的邮箱和密码');
      }
    }, 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>用户登录</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">邮箱</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="请输入邮箱"
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="请输入密码"
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>登录</button>
        </form>
        <div style={styles.footer}>
          <p>没有账号？请联系管理员</p>
          {/* 实际项目中这里可以链接到注册页面 */}
        </div>
      </div>
    </div>
  );
};

// 简单的样式定义
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center' as const,
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold' as const,
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#4a6cf7',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    marginTop: '1rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center' as const,
    color: '#777',
  },
};

export default Login;