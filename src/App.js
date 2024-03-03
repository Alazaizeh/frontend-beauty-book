import {  useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// routing
import Routes from 'routes';

// routing
import Loading from 'views/pages/Loading';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'layout/SnackBar';
import Navbar from './ui-component/navbar';
import Footer from 'ui-component/Footer';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isLoggingIn = useSelector((state) => state.auth.isLoggingIn);
  

  if (isLoggingIn) {
    return (
      <ThemeProvider theme={themes(customization)}>
        <Loading />
      </ThemeProvider>
    );
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
          <Navbar/>
          <Snackbar>
            <CssBaseline />
            <NavigationScroll>
              <Routes />
            </NavigationScroll>
          </Snackbar>
          <Footer/>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
