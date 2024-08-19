import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
const drawerWidth = 240;

const routes = [{
    label: "Dashboard",
    href: "/dashboard",
},
{
  label: "Chat",
  href: "/chat",
},
{
  label: "Image Generation",
  href: "/image",
},
{
  label: "Video Generation",
  href: "/video",
},
{
  label: "Music Generation",
  href: "/music",
},
{
  label: "Code Generation",
  href: "/code",
},
{
  label: "Configurations",
  href: "/config",
},
]

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
        <Link href="/dashboard">
        <div className="link">
          <h1 className="title">
            DashboardNow
          </h1>
          </div>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
        {routes.map((route) => (
            <Link className = "link2" href={route.href} key={route.label} passHref>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
