//app.tsx
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import RegisterForm from './pages/Register';

function Home() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Register As
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ m: 2 }}
        onClick={() => navigate('/register-leader')}
      >
        Coach / Leader
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 2 }}
        onClick={() => navigate('/register-player')}
      >
        Player
      </Button>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-leader" element={<RegisterForm type="leader" />} />
        <Route path="/register-player" element={<RegisterForm type="player" />} />
      </Routes>
    </Router>
  );
}

export default App;
