import './App.css';
import { Link } from '@tanstack/react-router';

function App() {
  return (
    <Link to="/login" style={{ fontSize: '24px' }}>
      Login
    </Link>
  );
}

export default App;
