import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../styles/mui/theme';
import Header from '../shared/components/Header/Header';
import { UseWalletProvider } from 'use-wallet';
import configuration from "../shared/config";
import { BenzContextProvider } from '../shared/context/BenzContext/BenzContextProvider';


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<StyledEngineProvider injectFirst>
			<Providers>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Header />
					<Component {...pageProps} />
				</ThemeProvider>
			</Providers>
		</StyledEngineProvider>
	)
}

const Providers: React.FC<any> = ({ children }) => {

	return (
		<>
			<UseWalletProvider
				connectors={{
					injected: {
						chainId: [1, 4]
					}
				}}
			>
				<BenzContextProvider>
					{children}
				</BenzContextProvider>
			</UseWalletProvider>
		</>
	)
}

export default App
