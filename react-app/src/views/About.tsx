import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>关于页面</h1>
      <p>这是 React 子应用的关于页面</p>
      <nav>
        <Link to='/'>返回首页</Link>
      </nav>
    </div>
  );
}

export default About;
