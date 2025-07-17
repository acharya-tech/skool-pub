import { useBoolean } from 'minimal-shared/hooks';
import { mergeClasses } from 'minimal-shared/utils';

import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles';

import { NavList, NavMainList } from './nav-list';
import { Nav, NavUl, NavLi, NavSubheader } from '../components';
import { navSectionClasses, navSectionCssVars } from '../styles';

import type { NavGroupProps, NavSectionProps } from '../types';

// ----------------------------------------------------------------------

export function NavMainMenu({
  sx,
  render,
  className,
  slotProps,
  currentRole,
  enabledRootRedirect,
  ...other
}: Omit<NavSectionProps, 'data'>) {
  return (
    <Nav
      className={mergeClasses([navSectionClasses.mainnav, className])}
      sx={{
        height: "100%",
        zIndex: 1102,
        display: "flex",
        backgroundColor: "var(--layout-main-nav-bg)",
        width: "var(--layout-main-nav-width)",
      }}
      {...other}
    >
      <NavUl>
        <NavMainList />
      </NavUl>
    </Nav>
  );
}