import { useEffect, useMemo} from 'react';
import { Box, Drawer } from '@mui/material';
import { windowOverflowDefault, windowOverflowHidden } from '@/app/helpers/functions/manageWindowOverflow';

import { MenuItems } from './Menu';

export default function SideMenu({ open, setOpen, layoutBreakpoint }: SideMenuProps) {

  // Hide Window Overflow if the side menu is open on mobile/tablet
  useEffect(() => {
    if (open && layoutBreakpoint) {
      windowOverflowHidden()
    }
    else {
      windowOverflowDefault()
    }

    return windowOverflowDefault
  }, [open, layoutBreakpoint])

  // Decide whether to show the side menu as permanent or temporary (permanent on desktop, temporary on mobile)
  const sideMenuVariant = useMemo(() => {
    return layoutBreakpoint ? 'temporary' : 'permanent'
  }, [layoutBreakpoint])

  // Optimising UI, so it doesn't render while it's not decided whether to show the side menu or not
  if (layoutBreakpoint === undefined) {
    return null
  }

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={() => setOpen(false)}
      variant={sideMenuVariant}
    >
      <Box
        component="div"
        sx={{
          paddingTop: '60px',
          width: 250,
          position: 'static',
        }}
        role="presentation"
        onClick={() => setOpen(false)}
        onKeyDown={() => setOpen(false)}
      >
        <MenuItems />
      </Box>
    </Drawer>
  );
}