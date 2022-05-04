import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../styles/mui/theme';
import Header from '../shared/components/Header/Header';


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Header />
					<Component {...pageProps}/>
				</ThemeProvider>
			</StyledEngineProvider>
		)
}

export default App
