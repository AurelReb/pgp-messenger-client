import { createMuiTheme } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';

const scrollBarLight = {
  track: '#f1f1f1',
  thumb: '#c1c1c1',
  active: '#b1b1b1',
};

const scrollBarDark = {
  track: '#2b2b2b',
  thumb: '#6b6b6b',
  active: '#959595',
};

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#f2f3f3',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.hljs': {
          background: '#282a36',
        },
        code: {
          backgroundColor: 'gainsboro',
        },
        body: {
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: scrollBarLight.track,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: scrollBarLight.thumb,
            minHeight: 24,
            border: `3px solid ${scrollBarLight.track}`,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: scrollBarLight.active,
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: scrollBarLight.active,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: scrollBarLight.active,
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: scrollBarLight.track,
          },
        },
      },
    },
  },
  mixins: {
    container: {
      height: 'calc(100vh - 56px)',
      '@media (min-width:0px) and (orientation: landscape)': {
        height: 'calc(100vh - 48px)',
      },
      '@media (min-width:600px)': { height: 'calc(100vh - 64px)' },
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink.A200,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.hljs': {
          background: '#282a36',
        },
        code: {
          backgroundColor: '#282a36',
        },
        body: {
          scrollbarColor: `${scrollBarDark.thumb} ${scrollBarDark.track}`,
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: scrollBarDark.track,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: scrollBarDark.thumb,
            minHeight: 24,
            border: `3px solid ${scrollBarDark.track}`,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: scrollBarDark.active,
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: scrollBarDark.active,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: scrollBarDark.active,
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: scrollBarDark.track,
          },
        },
      },
    },
  },
  mixins: {
    container: {
      height: 'calc(100vh - 56px)',
      '@media (min-width:0px) and (orientation: landscape)': {
        height: 'calc(100vh - 48px)',
      },
      '@media (min-width:600px)': { height: 'calc(100vh - 64px)' },
    },
  },
});

export const getMuiThemeConfig = (prefersDarkMode) => {
  return prefersDarkMode ? darkTheme : lightTheme;
};
