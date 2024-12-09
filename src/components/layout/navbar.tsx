'use client'
import * as React from 'react'
import AppBar from '@avc/components/ui/appbar'
import Toolbar from '@avc/components/ui/toolbar'
import Box from '@avc/components/ui/box'
import Button from '@avc/components/ui/button'
import Menu from '@avc/components/ui/menu'
import MenuItem from '@avc/components/ui/menu-item'
import Link from '../ui/link'
import RestorePlusLogo from '../common/restoreplus-logo'
import { NavbarItemType, navbarItems } from '@avc/navbar-items'
import { usePathname } from 'next/navigation'

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
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', ml: 4 }}>
          {navbarItems.map((item) => (
            <NavbarItem key={item.label} item={item} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

function NavbarItem({ item }: { item: NavbarItemType }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const pathname = usePathname()

  // Determine active states
  const isActiveMain =
    item.children?.some((child) => pathname.startsWith(child.route || '')) ||
    (item.route && pathname.startsWith(item.route))

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (item.children?.length) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: 'relative' }}
    >
      <Button
        aria-controls={open ? 'navbar-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        sx={{
          color: isActiveMain ? '#fff' : '#e0e0e0',
          fontWeight: isActiveMain ? 'bold' : 'normal',
          textTransform: 'capitalize',
          fontSize: '0.95rem',
          '&:hover': {
            color: '#fff',
          },
        }}
        startIcon={item.icon}
      >
        {item.label}
      </Button>
      {item.children && (
        <Menu
          id="navbar-menu"
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
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 220,
              backgroundColor: '#2e2e2e',
              border: '1px solid #444',
              borderRadius: 1,
            },
          }}
        >
          {item.children.map((child) => {
            const isActiveChild = pathname.startsWith(child.route || '')
            return (
              <MenuItem
                key={child.label}
                onClick={handleMouseLeave}
                sx={{
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: isActiveChild ? 'bold' : 'normal',
                  backgroundColor: isActiveChild ? '#3a3a3a' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#3a3a3a',
                  },
                }}
              >
                <Link
                  href={child.route || '#'}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {child.label}
                </Link>
              </MenuItem>
            )
          })}
        </Menu>
      )}
    </Box>
  )
}
