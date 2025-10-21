import React from 'react';
import { useI18n } from '../hooks/useI18n';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography, Box, Button } from './section/section';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/image.png';

const Navbar: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4, md: 6 },
          py: 1,
        }}
      >
        {/* Left side: Logo + Ministry text */}
        <Box display="flex" alignItems="center">
          <img
            src={logoImage}
            alt="MOEYS Logo"
            style={{
              height: '50px',
              width: 'auto',
              marginRight: '16px',
            }}
          />
          <Box>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.2,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              ក្រសួងអប់រំ យុវជន និងកីឡា
            </Typography>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.2,
                fontSize: '0.8rem',
                color: 'text.secondary',
              }}
            >
              Ministry of Education, Youth and Sport of Cambodia
            </Typography>
          </Box>
        </Box>

        {/* Right side: Register buttons + Language toggle */}
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/register/leader')}
          >
            {t('navbar.buttons.leader')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/register/player')}
          >
            {t('navbar.buttons.player')}
          </Button>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={lang}
            onChange={(_e, v) => v && setLang(v)}
            aria-label="language"
          >
            <ToggleButton value="km" aria-label="Khmer">ខ្មែរ</ToggleButton>
            <ToggleButton value="en" aria-label="English">English</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
