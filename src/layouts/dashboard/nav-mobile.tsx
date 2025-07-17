import type { NavSectionProps } from 'src/components/nav-section';

import { useEffect, useMemo } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';

import { layoutClasses } from '../core/classes';
import { NavMainMenu } from 'src/components/nav-section/vertical/nav-main-menu';

// ----------------------------------------------------------------------

type NavMobileProps = NavSectionProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavMobile({ data, open, onClose, slots, sx, className, ...other }: NavMobileProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const renderMainMenu = useMemo(() => <NavMainMenu sx={{ px: 2, flex: '1 1 auto' }} />, [])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        className: mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className]),
        sx: [
          (theme) => ({
            overflow: 'unset',
            bgcolor: 'var(--layout-nav-bg)',
            width: 'var(--layout-nav-mobile-width)',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ],
      }}
    >
      <Box display={'flex'} height={'100%'}>
        {renderMainMenu}
        <Box sx={{ width: "100%", height: 1 }} >
          {slots?.topArea ?? (
            <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
              <Logo />
            </Box>
          )}
          <Scrollbar fillContent>
            <NavSectionVertical data={data} sx={{ px: 2, flex: '1 1 auto' }} {...other} />
          </Scrollbar>
        </Box>
      </Box>
    </Drawer>
  );
}
