//navbar.tsx
import React from "react";
import { useI18n } from "../hooks/useI18n";
import {
  ToggleButton,
  ToggleButtonGroup,
  // IconButton,
  // Drawer,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import menuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/image.png";

const Navbar: React.FC = () => {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  // const [mobile, setMobile] = 
  return (
    <AppBar position="static" sx={{ backgroundColor: "#778acfff", borderRadius: 0}}>
      <Toolbar sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        px: { xs: 1, sm: 2, md: 4, lg: 8 },
        flexWrap: { xs: "wrap", md: "nowrap" }
      }}>
        {/* Left side: Logo + Ministry text */}
        <Box display="flex" alignItems="center" sx={{ minWidth: 0, flex: { xs: "1 1 100%", md: "1 1 auto" } }}>
          <img 
            src={logoImage} 
            alt="MOEYS Logo" 
            style={{ 
              height: "40px", 
              width: "auto", 
              marginRight: "12px",
              flexShrink: 0
            }} 
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="body2" sx={{ 
              lineHeight: 1.2,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              whiteSpace: { xs: "nowrap", sm: "normal" },
              overflow: { xs: "hidden", sm: "visible" },
              textOverflow: { xs: "ellipsis", sm: "clip" }
            }}>
              ក្រសួងអប់រំ យុវជន និងកីឡា
            </Typography>
            <Typography variant="body2" sx={{ 
              lineHeight: 1.2,
              fontSize: { xs: "0.65rem", sm: "0.75rem" },
              whiteSpace: { xs: "nowrap", sm: "normal" },
              overflow: { xs: "hidden", sm: "visible" },
              textOverflow: { xs: "ellipsis", sm: "clip" }
            }}>
              Ministry of Education, Youth and Sport of Cambodia
            </Typography>
          </Box>
        </Box>

        {/* Right side: Register buttons + Language toggle */}
        <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }} sx={{ 
          mt: { xs: 1, md: 0 },
          width: { xs: "100%", md: "auto" },
          justifyContent: { xs: "center", md: "flex-end" }
        }}>
          <Button
            variant="contained"
            color="secondary"
            sx = {{
              backgroundColor: "#fff", 
              color: "#132050", 
              fontWeight: "bold",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              px: { xs: 1, sm: 2 }

            }}
            onClick={ () => navigate('/register/leader')}
          >
            {t('navbar.buttons.leader')}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ 
              backgroundColor: "#fff", 
              color: "#132050", 
              fontWeight: "bold",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              px: { xs: 1, sm: 2 }
            }}
            onClick={ () => navigate('/register/player')}
          >
            {t('navbar.buttons.player')}
          </Button>

          <ToggleButtonGroup
            size="small"
            exclusive
            value={lang}
            onChange={(_e, v) => v && setLang(v)}
            aria-label="language"
            sx={{ 
              border: '1px solid #132050', 
              borderRadius: 1, 
              backgroundColor: '#ffffffff', 
              color: '#132050',
              '& .MuiToggleButton-root': {
                fontSize: { xs: "0.7rem", sm: "0.875rem" },
                px: { xs: 1, sm: 1.5 }
              }
            }}
          >
            <ToggleButton value="km" aria-label="Khmer">Khmer</ToggleButton>
            <ToggleButton value="en" aria-label="English">English</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
