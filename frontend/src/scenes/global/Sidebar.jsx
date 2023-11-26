import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme} from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';


export default function Sidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed &&
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="10px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Augment Fitness
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              }
            </MenuItem>

            {!isCollapsed && (
              <Box>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <img 
                      src={`../../assets/profile.png`} 
                      alt={'profile-pic'}
                      height={'100px'}
                      width={'100px'}
                      style={{borderRadius: '50%'}}
                    />
                </Box>
                <Box textAlign={'center'}>
                  <Typography 
                    variant='h3'
                    fontWeight={'bold'}
                    color={colors.grey[100]}
                    sx={{m: '10px 0 0 0'}}
                  >
                    Ambuj Gupta
                  </Typography>
                  <Typography variant='h5' color={colors.greenAccent[500]}>
                    Member
                  </Typography>
                </Box>
              </Box>
            )}

            <Box>
              <MenuItem
                active={selected === 'Dashboard'}
                style={{
                  color: colors.grey[100],
                }}
                onClick={() => setSelected("Dashboard")}
              >
                <Typography>Dashboard</Typography>
                <Link to='/dashboard' />
              </MenuItem>
            </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}
