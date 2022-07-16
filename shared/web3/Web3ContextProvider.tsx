import { ethers, providers } from 'ethers'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useChain, useMoralis } from 'react-moralis'
import { ISupportedNetworks, SUPPORTED_NETWORKS, TypeChain } from '../utils/constants'

const Web3Context = createContext<any>(null)

export type IProps = {
    children: React.ReactNode
}

const Web3ContextProvider: React.FC<IProps> = ({ children }) => {
    const {
        account,
        isWeb3Enabled,
        isWeb3EnableLoading,
        enableWeb3,
        web3,
        user,
        Moralis,
        deactivateWeb3,
    } = useMoralis()
    const { switchNetwork, chainId, chain } = useChain()
    const [provider, setProvider] = useState<ethers.providers.Provider | null>(null)
    const [signer, setSigner] = useState<ethers.Signer | null>()

    // refresh handler
    useEffect(() => {
        if (isWeb3Enabled) {
            return
        }
        if (typeof window !== 'undefined' && window.localStorage.getItem('connected')) {
            connectWeb3()
        }
    }, [isWeb3Enabled])

    // deactivate web3 handler
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem('connected')
                deactivateWeb3()
            }
        })
    }, [])

    // activate web3 handler
    useEffect(() => {
        const setWeb3 = async () => {
            await changeSignerAndProvider()
            window.localStorage.setItem('connected', 'injected')
        }

        if (isWeb3Enabled) {
            setWeb3()
        }
    }, [isWeb3Enabled, account])

    const connectWeb3 = async () => {
        await enableWeb3()
    }

    const changeSignerAndProvider = async () => {
        const moralisProvider: any = Moralis.provider
        const accountAddress: any = account
        const currChainId: any = chainId

        const newProvider = new ethers.providers.Web3Provider(moralisProvider)
        const newSigner = newProvider.getSigner(accountAddress)

        setProvider(newProvider)
        setSigner(newSigner)
    }

    const changeChainTo = async (network: TypeChain) => {
        if (!(network.chainId in SUPPORTED_NETWORKS)) {
            console.log(`${network.chainId} Chain Not Supported!`)
            return null
        }

        try {
            await switchNetwork(network.chainIdHex)
        } catch (error) {
            console.error(`${network.name} Chain Not Supported!`)
        }
    }

    const value = {
        account,
        chainId: chainId ? parseInt(chainId) : null,
        chainIdHex: chainId,
        isWeb3Enabled,
        connectWeb3,
        signer,
        provider,
        changeChainTo,
    }

    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

const useWeb3Context = () => {
    const context = useContext(Web3Context)
    if (!context) {
        throw new Error('Make sure useWeb3Context is within Web3ContextProvider!')
    }
    return context
}

export { Web3ContextProvider, Web3Context, useWeb3Context }
