import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { MoralisProvider } from 'react-moralis'
import { UseWalletProvider } from 'use-wallet'
import { Web3ContextProvider } from '../shared/web3/Web3ContextProvider'
import Header from '../shared/components/Header/Header'
import { BenzSwapContextProvider } from '../shared/benzSwap/BenzSwapContextProvider'
import '../styles/globals.css'
import { theme } from '../styles/mui/theme'

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout): unknown => {
    const getLayout = Component.getLayout ?? ((page) => page)

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
                    <Web3ContextProvider>
                        <BenzSwapContextProvider>
                            <UseWalletProvider
                                connectors={{
                                    injected: {
                                        chainId: [1, 4],
                                    },
                                }}
                            >
                                <ThemeProvider theme={theme}>
                                    <CssBaseline />
                                    <Header />
                                    {children}
                                </ThemeProvider>
                            </UseWalletProvider>
                        </BenzSwapContextProvider>
                    </Web3ContextProvider>
                </MoralisProvider>
            </StyledEngineProvider>
        </>
    )
}

export default App
