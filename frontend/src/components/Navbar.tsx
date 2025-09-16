import React from "react";
import { useI18n } from "../hooks/useI18n";
import {
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const { t, lang, setLang } = useI18n();
    const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#778acfff", padding: "0 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo + Ministry text */}
        <Box display="flex" alignItems="center">
          {/* Replace this Typography with <img src="/logo.png" /> if you have a logo */}
          {/* <Typography variant="h6" sx={{ fontWeight: "bold", marginRight: 2 }}>
            MOEYS
          </Typography> */}
          <Box>
            <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
              ក្រសួងអប់រំ យុវជន និងកីឡា
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
              Ministry of Education, Youth and Sport of Cambodia
            </Typography>
          </Box>
        </Box>

        {/* Right side: Register buttons + Language toggle */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: "#fff", color: "#132050", fontWeight: "bold" }}
            onClick={ () => navigate('/register-leader')}
          >
            {t('navbar.buttons.leader')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: "#fff", color: "#132050", fontWeight: "bold" }}
            onClick={ () => navigate('/register-player')}
          >
            {t('navbar.buttons.player')}
          </Button>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={lang}
            onChange={(_e, v) => v && setLang(v)}
            aria-label="language"
            sx={{ border: '1px solid #132050', borderRadius: 1, backgroundColor: '#ffffffff', color: '#132050' }}
          >
            <ToggleButton value="en" aria-label="English">EN</ToggleButton>
            <ToggleButton value="km" aria-label="Khmer">KH</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
