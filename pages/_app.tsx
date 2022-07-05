import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../styles/mui/theme';
import Header from '../shared/components/Header/Header';
import { UseWalletProvider } from 'use-wallet';
import configuration from "../shared/config";
import { BenzContextProvider } from '../shared/context/BenzContext/BenzContextProvider';
import { MoralisProvider } from 'react-moralis';
import LibHeader from '../shared/components/Header/LibHeader';


const App: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<StyledEngineProvider injectFirst>
			<Providers>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<Header />
					{/* <LibHeader /> */}
					<Component {...pageProps} />
				</ThemeProvider>
			</Providers>
		</StyledEngineProvider>
	)
}

const Providers: React.FC<any> = ({ children }) => {

	return (
		<>
			<MoralisProvider initializeOnMount={false}>
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
			</MoralisProvider>
		</>
	)
}

export default App
