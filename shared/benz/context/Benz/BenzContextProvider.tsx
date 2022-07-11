import { ethers, providers } from "ethers"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"

interface IBenzContext {
    // account: , 
    // chainId, isWeb3Enabled, connectWeb3
}

const BenzContext = createContext<any>(null)

export type IProps = {
    children: React.ReactNode
}

const BenzContextProvider: React.FC<IProps> = ({ children }) => {
    const { account, chainId, isWeb3Enabled, isWeb3EnableLoading, enableWeb3, web3, user, Moralis, deactivateWeb3 } = useMoralis()
    const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)
    const [signer, setSigner] = useState<ethers.Signer | null>()

    useEffect(() => {
        if (isWeb3Enabled) { return; }
        if (typeof window !== "undefined" && window.localStorage.getItem("connected")) {
            console.log("Enabling Web3...!")
            enableWeb3()
        }
    }, [isWeb3Enabled])


    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log('account changed to: ', account)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log('Null account found')
            }
        })
    }, [])


    const connectWeb3 = async () => {
        await enableWeb3();

        if (typeof window !== "undefined") {
            console.log('setting window item')
            await changeSignerAndProvider()
            window.localStorage.setItem("connected", "injected")
        }
    }

    // TODO: FIX MORALIS CONNECTION
    const changeSignerAndProvider = async () => {
        const moralisProvider: any = Moralis.provider
        const accountAddress: any = account
        const currChainId: any = chainId;
        
        const newProvider = new ethers.providers.Web3Provider(moralisProvider, currChainId)
        const newSigner = newProvider.getSigner(accountAddress)
        console.log('accountAddress: ', accountAddress);
        console.log('new Provider: ', newProvider);
        console.log('new Signer: ', newSigner);

        setProvider(newProvider)
        setSigner(newSigner)
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