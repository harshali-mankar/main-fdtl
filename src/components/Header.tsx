import { AppBar, Box, Toolbar, Typography, Avatar, Menu, MenuItem, CardMedia } from '@mui/material'
import { ExitToApp, KeyboardArrowDown } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import LogoutButton from './LogoutButton'


const Header = () => {
  const [userName, setUserName] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl)

  useEffect(() => {
    const name = localStorage.getItem('name')
    if (name) {
      setUserName(name)
    }
  }, [])

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
        boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ minHeight: 70, px: { xs: 2, md: 4 }, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CardMedia
            component="img"
            height="60"
            image={"/kraft_nexus.png"}
            alt="Kraft Nexus"
            sx={{ objectFit: 'contain', padding: '8px' }}
          />

           <Typography
    variant="h6"
    sx={{
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      fontSize: '2rem', 
      gap: 0.5,
    }}
  >
    <Box component="span" sx={{ color: '#1D3A6D' }}>KRAFT</Box>
    <Box component="span" sx={{ color: '#D4A33D' }}>NEXUS</Box>
  </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            px: 2,
            py: 1,
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
          }}
          onClick={handleUserMenuClick}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: '#ff9800',
              fontSize: '0.875rem',
              fontWeight: 600,
              mr: 1
            }}
          >
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </Avatar>

          <Typography
            variant="body2"
            sx={{
              color: 'white',
              fontWeight: 500,
              mr: 1
            }}
          >
            {userName || 'User'}
          </Typography>

          <KeyboardArrowDown
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 20,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }}
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiPaper-root': {
              mt: 1,
              borderRadius: 2,
              minWidth: 180,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#d32f2f' }}>
            <ExitToApp sx={{ mr: 2 }} />
            <LogoutButton />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header