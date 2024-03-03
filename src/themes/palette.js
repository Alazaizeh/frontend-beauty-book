/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper
    },
    primary: {
      
      light: '#FDF2F5',
      main: '#C17FB2',
      dark: '#66216C',
      200: '#FCE5EE',
      400: '#ECC5DC',
      800: '#823780'
    },
    secondary: {
      light: '#F7D5EF',
      main: '#66216C',
      dark: '#210633',
      200: '#F0ADE5',
      400: '#A64FA6',
      800: '#2D0A3E'
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark
    },
    cancel: {
      main: theme.colors?.grey50,
      dark: '#E8E8E8'
    },
    default: {
      light: "#FBF3CC",
      main:  "#B8860B",
      dark: "#6A4303"
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault
    },
    chart: ['#05e6fe', '#01d2e8', '#01bbce', '#955351', '#018d9c', '#017682', '#015f69', '#014850', '#013136', '#001a1d'],
    chart2: ['#02afc8', '#91e4e8', '#028c93', '#a8dee0', '#006d7c', '#17b2c0', '#f0fafa', '#036b78', '#cbe7e9', '#0396a6']
  };
}
