import { ethers, providers } from "ethers"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useChain, useMoralis } from "react-moralis"

interface IBenzContext {
    // account: , 
    // chainId, isWeb3Enabled, connectWeb3
}

const BenzContext = createContext<any>(null)

export type IProps = {
    children: React.ReactNode
}

const BenzContextProvider: React.FC<IProps> = ({ children }) => {
    const { account, isWeb3Enabled, isWeb3EnableLoading, enableWeb3, web3, user, Moralis, deactivateWeb3 } = useMoralis()
    const { switchNetwork, chainId, chain } = useChain();
    const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)
    const [signer, setSigner] = useState<ethers.Signer | null>()


    // refresh handler
    useEffect(() => {
        if (isWeb3Enabled) { return; }
        if (typeof window !== "undefined" && window.localStorage.getItem("connected")) {
            connectWeb3()
        }
    }, [isWeb3Enabled])

    // deactivate web3 handler
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    }, [])

    // activate web3 handler
    useEffect(() => {
        const setWeb3 = async () => {
            await changeSignerAndProvider()
            window.localStorage.setItem("connected", "injected")
        }

        if(isWeb3Enabled) { 
            console.log('chainId: ', chainId);
            ethers.utils.hexValue
            setWeb3()
        }

    }, [isWeb3Enabled, account])


    const connectWeb3 = async () => {
        await enableWeb3();
    }


    const changeSignerAndProvider = async () => {
        const moralisProvider: any = Moralis.provider
        const accountAddress: any = account
        const currChainId: any = chainId;

        const newProvider = new ethers.providers.Web3Provider(moralisProvider)
        const newSigner = newProvider.getSigner(accountAddress)

        setProvider(newProvider)
        setSigner(newSigner)
    }

    const changeChainTo = async() => { 

    }

    const value = {
        account, chainId, isWeb3Enabled, connectWeb3, signer, provider
    }

    return (
        <BenzContext.Provider value={value}>
            {children}
        </BenzContext.Provider>
    )
}

const useBenzContext = () => {
    const context = useContext(BenzContext)
    if (!context) {
        throw new Error("Make sure useBenzContext is within BenzContextProvider!")
    }
    return context
}


export { BenzContextProvider, BenzContext, useBenzContext }