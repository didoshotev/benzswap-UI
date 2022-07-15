import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { MoralisProvider } from 'react-moralis'
import { UseWalletProvider } from 'use-wallet'
import { BenzContextProvider } from '../shared/benz/context/Benz/BenzContextProvider'
import Header from '../shared/components/Header/Header'
import { LotteryContextProvider } from '../shared/lottery/context/LotteryContextProvider'
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
                    <BenzContextProvider>
                        <LotteryContextProvider>
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
                        </LotteryContextProvider>
                    </BenzContextProvider>
                </MoralisProvider>
            </StyledEngineProvider>
        </>
    )
}

export default App
