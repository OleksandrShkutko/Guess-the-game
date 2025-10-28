import Home from './pages/Home';
import GamePage from './pages/Game';
import SettingsPage from './pages/Settings';
import PageNotFound from './pages/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import type { StoreType } from './store';
import { DEFAULT_QUERY_FOR_ONE_GAME } from './constants';

const customTheme = createTheme({
  typography: {
    fontFamily: '"Press Start 2P"',
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#F8D60B',
          '&.Mui-focused': {
            color: '#F8D60B',
          },
          '&.Mui-error': {
            color: '#e6137d',
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#F8D60B',
    },
    success: {
      main: '#00d079',
    },
    error: {
      main: '#e6137d',
    },
  },
});

function App() {
  // Get the request URL from the Redux store
  const requestUrl = useSelector(
    (state: StoreType) => state.settings.requestUrl
  );

  // Loader function to get the total count of games
  const countOfGames = async (): Promise<number> => {
    const response = await fetch(`${requestUrl}&${DEFAULT_QUERY_FOR_ONE_GAME}`);
    const data = await response.json();
    const countOfGames: number = data.count;

    return countOfGames;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/game',
      element: <GamePage />,
      loader: countOfGames,
    },
    {
      path: '/settings',
      element: <SettingsPage />,
    },
    {
      path: '*',
      element: <PageNotFound />,
    },
  ]);

  return (
    <ThemeProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
