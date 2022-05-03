import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../styles/mui/theme';


function MyApp({ Component, pageProps }: AppProps) {
	return (
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Component {...pageProps}/>
				</ThemeProvider>
			</StyledEngineProvider>
		)
}

export default MyApp
