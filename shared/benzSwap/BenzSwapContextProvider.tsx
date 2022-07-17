import { createContext, useContext, useEffect, useState } from 'react'
import Configuration from '../../config/Configuration'
import { useWeb3Context } from '../web3/Web3ContextProvider'
import { BenzSwap } from './BenzSwap'

export type BenzSwapContextType = {
    benzSwap: BenzSwap
}

export const BenzSwapContext = createContext<any>(null)

export type PropTypes = {
    children: React.ReactNode
}

export const BenzSwapContextProvider: React.FC<PropTypes> = ({ children }) => {
    const [benzSwap, setBenzSwap] = useState<BenzSwap | null>(null)
    const { account, provider, signer } = useWeb3Context()

    useEffect(() => {
        if (benzSwap === null && provider) {
            let newBenzSwap: BenzSwap
            if (signer) {
                newBenzSwap = new BenzSwap(Configuration, provider, signer)
                newBenzSwap.unlockContracts()
            } else {
                newBenzSwap = new BenzSwap(Configuration, provider, null)
            }
            console.log('BenzSwap Initialized Successfully!')
            setBenzSwap(newBenzSwap)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer, provider, account])

    return <BenzSwapContext.Provider value={{ benzSwap }}>{children}</BenzSwapContext.Provider>
}

export const useBenzSwap = () => {
    const context = useContext<BenzSwapContextType>(BenzSwapContext)

    if (!context) {
        throw new Error('BenzSwapContext must be use within BenzSwapContextProvider!')
    }
    return context
}
