'use client';

import { PropsWithChildren, memo } from 'react';

// const useStyles = createStyles(
//   ({ css, token }) => css`
//     font-size: 12px;
//     color: ${token.colorTextSecondary};
//   `,
// );

export const LayoutSettingsFooterClassName = 'settings-layout-footer';

const Footer = memo<PropsWithChildren>(() => {
  return null;
});

Footer.displayName = 'SettingFooter';

export default Footer;
