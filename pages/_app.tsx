import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from '../styles/mui/theme';
import Header from '../shared/components/Header/Header';
import { UseWalletProvider } from 'use-wallet';
import configuration from "../shared/config";
import { MoralisProvider } from 'react-moralis';
import LibHeader from '../shared/components/Header/LibHeader';
import { BenzContextProvider } from '../shared/benz/context/Benz/BenzContextProvider';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next'


export type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode
}


type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
}

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {

	const getLayout = Component.getLayout ?? ((page) => page);

	return getLayout(
		<Providers>
			<Component {...pageProps} />
		</Providers>
	)
}

const Providers: React.FC<any> = ({ children }) => {

	return (
		<>
			<StyledEngineProvider injectFirst>
				<MoralisProvider initializeOnMount={false}>
					<BenzContextProvider>
						<UseWalletProvider
							connectors={{
								injected: {
									chainId: [1, 4]
								}
							}}
						>

							<ThemeProvider theme={theme}>
								<CssBaseline />
								<Header />
								{children}

							</ThemeProvider>
						</UseWalletProvider>
					</BenzContextProvider>
				</MoralisProvider>
			</StyledEngineProvider>
		</>
	)
}

export default App
