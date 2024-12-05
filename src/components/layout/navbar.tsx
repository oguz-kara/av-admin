'use client'
import * as React from 'react'
import AppBar from '@avc/components/ui/appbar'
import Toolbar from '@avc/components/ui/toolbar'
import Button from '@avc/components/ui/button'
import Menu from '@avc/components/ui/menu'
import MenuItem from '@avc/components/ui/menu-item'
import Box from '@avc/components/ui/box'
import { NavbarItemType, navbarItems } from '@avc/navbar-items'
import Link from '../ui/link'
import RestorePlusLogo from '../common/restoreplus-logo'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function NavBar() {
  return (
    <AppBar
      position="relative"
      sx={{
        px: 4,
        py: 1,
        boxShadow:
          'rgba(17, 22, 26, 0.5) 0px 5px 6px, rgba(17, 21, 26, 0.5) 0px 2px 8px',
      }}
    >
      <Toolbar disableGutters sx={{ gap: 4 }}>
        <RestorePlusLogo />
        {navbarItems.map((item) => (
          <NavbarItem key={item.label} item={item} />
        ))}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

function NavbarItem({ item }: { item: NavbarItemType }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box>
        <Button
          id="positioned-button"
          aria-controls={open ? 'positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onMouseEnter={handleMouseEnter}
          variant="text"
          sx={{ color: 'white', textTransform: 'capitalize' }}
          startIcon={item.icon}
          endIcon={<ExpandMoreIcon />}
        >
          {item.label}
        </Button>
        <Menu
          id="positioned-menu"
          aria-labelledby="positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMouseLeave}
          MenuListProps={{
            onMouseLeave: handleMouseLeave,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          TransitionProps={{ style: { transition: 'none' } }}
        >
          {item.children?.map((child) => (
            <MenuItem key={child.label} onClick={handleMouseLeave}>
              <Link href={child.route || '#'}>{child.label}</Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  )
}
