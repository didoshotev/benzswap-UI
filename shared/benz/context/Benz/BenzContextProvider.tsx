import { ethers, providers } from "ethers"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useChain, useMoralis } from "react-moralis"
import { ISupportedNetworks, SUPPORTED_NETWORKS } from "../../../utils/constants"

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

    const changeChainTo = async(chainIdTo: string) => { 
        if (!(parseInt(chainIdTo) in SUPPORTED_NETWORKS)) {
            console.log(`${chainIdTo} Chain Not Supported!`)
            return null;
        }
        
        try {
            await switchNetwork(chainIdTo)
        } catch (error) {
            // ERROR message
            console.error(`${chainIdTo} Chain Not Supported!`)                       
        }
    }

    const value = {
        account, chainId, isWeb3Enabled, connectWeb3, signer, provider, changeChainTo
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