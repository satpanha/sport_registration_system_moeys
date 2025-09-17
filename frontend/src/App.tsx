//app.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterForm from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="*" element={<RegisterForm type="player" />} /> */}
        <Route path="register/leader" element={<RegisterForm type="leader" />} />
        <Route path="register/player" element={<RegisterForm type="player" />} />
      </Routes>
    </Router>
  );
}

export default App;

