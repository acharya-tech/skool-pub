import type { NavSectionProps } from 'src/components/nav-section';
import type { Theme, SxProps, CSSObject, Breakpoint } from '@mui/material/styles';

import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { NavSectionMini, NavSectionVertical } from 'src/components/nav-section';

import { layoutClasses } from '../core/classes';
import { NavToggleButton } from '../components/nav-toggle-button';
import { NavMainMenu } from 'src/components/nav-section/vertical/nav-main-menu';
import { accessControlProvider } from 'src/accessControlProvider';
import { useEffect, useMemo, useState } from 'react';

// ----------------------------------------------------------------------
const navParceByAccess = async (data: NavSectionProps['data']) => {
  const newItem: any[] = []
  for (const items of data) {
    const itemChild: any[] = []
    for (const d of items.items) {
      const res = await accessControlProvider.can({ resource: d.path, action: "sidenav" })
      if (res.can) {
        itemChild.push(d)
      }
    }
    if (itemChild.length > 0) {
      newItem.push({
        ...items,
        items: itemChild
      })
    }
  }
  return newItem
}

export type NavVerticalProps = React.ComponentProps<'div'> & {
  isNavMini: boolean;
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  layoutQuery?: Breakpoint;
  onToggleNav: () => void;
  data: NavSectionProps['data'];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
};

export function NavVertical({
  sx,
  data,
  slots,
  cssVars,
  className,
  isNavMini,
  onToggleNav,
  layoutQuery = 'md',
  ...other
}: NavVerticalProps) {
  const [navData, setNavData] = useState<any[]>([])
  useEffect(() => {
    navParceByAccess(data).then(setNavData)
  }, [data])
  const renderNavVertical = () => (
    <Box display={'flex'} height={'100%'}>
      {/* TODO : Add Scrollbar */}
      {/* <Scrollbar> */}
      {renderMainMenu}
      <Box sx={{ width: "100%", height: 1 }} >
        {slots?.topArea ?? (
          <Box sx={{ pl: 3.5, pt: 2.5, pb: 1 }}>
            <Logo isSingle={isNavMini} />
          </Box>
        )}
        <NavSectionVertical data={navData} cssVars={cssVars} sx={{ px: 1, flex: '1 1 auto', overflowY: "auto" }} />
      </Box>
      {/* </Scrollbar> */}
    </Box>
  );
  const renderMainMenu = useMemo(() => <NavMainMenu cssVars={cssVars} sx={{ px: 2, flex: '1 1 auto' }} />, [])
  const renderNavMini = () => (
    <Box display={'flex'} height={'100%'}>
      {renderMainMenu}
      <Box sx={{ width: "100%", height: 1 }} >
        {slots?.topArea ?? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2.5 }}>
            <Logo />
          </Box>
        )}

        <NavSectionMini
          data={navData}
          cssVars={cssVars}
          sx={[
            (theme) => ({
              ...theme.mixins.hideScrollY,
              pb: 2,
              px: 0.5,
              flex: '1 1 auto',
              overflowY: 'auto',
            }),
          ]}
        />
      </Box>
    </Box>
  );

  return (
    <>
      <NavRoot
        isNavMini={isNavMini}
        layoutQuery={layoutQuery}
        className={mergeClasses([layoutClasses.nav.root, layoutClasses.nav.vertical, className, "sacasc"])}
        sx={sx}
        {...other}
      >
        <NavToggleButton
          isNavMini={isNavMini}
          onClick={onToggleNav}
          sx={[
            (theme) => ({
              display: 'none',
              [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
            }),
          ]}
        />
        {isNavMini ? renderNavMini() : renderNavVertical()}
      </NavRoot>
    </>
  );
}

// ----------------------------------------------------------------------

const NavRoot = styled('div', {
  shouldForwardProp: (prop: string) => !['isNavMini', 'layoutQuery', 'sx'].includes(prop),
})<Pick<NavVerticalProps, 'isNavMini' | 'layoutQuery'>>(
  ({ isNavMini, layoutQuery = 'md', theme }) => ({
    top: 0,
    left: 0,
    height: '100%',
    display: 'none',
    position: 'fixed',
    flexDirection: 'column',
    zIndex: 'var(--layout-nav-zIndex)',
    backgroundColor: 'var(--layout-nav-bg)',
    width: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
    borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
    transition: theme.transitions.create(['width'], {
      easing: 'var(--layout-transition-easing)',
      duration: 'var(--layout-transition-duration)',
    }),
    [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
  })
);
