import { alpha, createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;
  const transparent = alpha('#66216C', 0.16);

  const themeOption = {
    colors: color,
    heading:'#66216C',
    paper: color.paper,
    backgroundDefault: color.paper,
    background:'#f6f5f7',
    darkTextPrimary: color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey900,
    menuSelected: '#66216C',
    menuSelectedBack: '#FDF2F5',
    divider: color.grey200,
    customShadows: {
      z1: `0 1px 2px 0 ${transparent}`,
      z4: `0 4px 8px 0 ${transparent}`,
      z8: `0 8px 16px 0 ${transparent}`,
      z12: `0 12px 24px -4px ${transparent}`,
      z16: `0 16px 32px -4px ${transparent}`,
      z20: `0 20px 40px -4px ${transparent}`,
      z24: `0 24px 48px 0 ${transparent}`,

      card: `0 0 2px 0 ${alpha('#66216C', 0.2)}, 0 12px 24px -4px ${alpha('#66216C', 0.12)}`,
      dialog: `-40px 40px 80px -8px ${alpha('#66216C', 0.24)}`,
      dropdown: `0 0 2px 0 ${alpha('#66216C', 0.24)}, -20px 20px 40px -4px ${alpha('#66216C', 0.24)}`
    },
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    background: color.primaryLight,
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
