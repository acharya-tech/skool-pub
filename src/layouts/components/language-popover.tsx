import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';
import { usePopover } from 'minimal-shared/hooks';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { FlagIcon } from 'src/components/flag-icon';
import { CustomPopover } from 'src/components/custom-popover';
import { varTap, varHover, transitionTap } from 'src/components/animate';
import { useGetLocale, useSetLocale } from '@refinedev/core';
import i18n, { languageFlags } from 'src/i18n';
import { ILanguageFlags } from 'src/interfaces';

// ----------------------------------------------------------------------

export type LanguagePopoverProps = IconButtonProps

export function LanguagePopover({ sx, ...other }: LanguagePopoverProps) {
  const { open, anchorEl, onClose, onOpen } = usePopover();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };


  const locale = useGetLocale();
  const currentLocale = locale();

  const renderMenuList = () => (
    <CustomPopover open={open} anchorEl={anchorEl} onClose={onClose}>
      <MenuList sx={{ width: 160, minHeight: 72 }}>
        {[...(Object.values(languageFlags) ?? [])].sort().map((lang: ILanguageFlags) => (
          <MenuItem
            key={lang.code}
            selected={lang.code === currentLocale}
            onClick={() => changeLanguage(lang.code)}
          >
            <FlagIcon code={lang.code} />
            {lang.name}
          </MenuItem>
        ))}
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <IconButton
        component={m.button}
        whileTap={varTap(0.96)}
        whileHover={varHover(1.04)}
        transition={transitionTap()}
        aria-label="Languages button"
        onClick={onOpen}
        sx={[
          (theme) => ({
            p: 0,
            width: 40,
            height: 40,
            ...(open && { bgcolor: theme.vars.palette.action.selected }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <FlagIcon code={currentLocale} />
      </IconButton>

      {renderMenuList()}
    </>
  );
}
