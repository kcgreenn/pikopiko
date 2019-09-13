import { createMuiTheme } from '@material-ui/core';
import { blue, red, orange } from '@material-ui/core/colors';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: blue,
    secondary: orange,
    error: red
  }
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: orange,
    error: red
  }
});
