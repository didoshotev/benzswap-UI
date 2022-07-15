import { AppBar, Box, Button, Menu } from '@mui/material'
import Link from 'next/link'
import { useWallet } from 'use-wallet'
import { shortenAddress } from '../../utils/format'
import { addNetwork, changeNetwork, shouldChangeNetwork } from '../../utils/window-ethereum'
import configuration from '../../config'
import { useMoralis } from 'react-moralis'
import { useEffect } from 'react'
import { useBenzContext } from '../../benz/context/Benz/BenzContextProvider'
import { SUPPORTED_NETWORKS, SUPPORTED_NETWORKS_INFO } from '../../utils/constants'

const Header: React.FC = () => {
    // const { connect, isConnected, account } = useWallet();
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } =
        useMoralis()
    const { connectWeb3, changeChainTo, chainId } = useBenzContext()

    const handleConnect = async () => {
        connectWeb3()
    }

    const handleChangeChain = async () => {
        // changeChainTo(SUPPORTED_NETWORKS_INFO.HARDHAT.chainId);
        changeChainTo(SUPPORTED_NETWORKS_INFO.RINKEBY)
    }

    return (
        <>
            <AppBar position="static" color="transparent" sx={{ p: 1 }}>
                <Box display="flex" justifyContent="center">
                    <Box mr={3}>
                        <Button>
                            <Link href="/pool">
                                <a>pool</a>
                            </Link>
                        </Button>
                    </Box>

                    <Box mr={3}>
                        <Button>
                            <Link href="/lottery">
                                <a>Lottery</a>
                            </Link>
                        </Button>
                    </Box>

                    <Box mr={3}>
                        <Button>
                            <Link href="/swap">
                                <a>swap</a>
                            </Link>
                        </Button>
                    </Box>
                    <Box mr={3}>
                        <Button>
                            <Link href="/farm">
                                <a>farm</a>
                            </Link>
                        </Button>
                    </Box>
                    <Box mr={3}>
                        <Button>
                            <Link href="/nft">
                                <a>nft</a>
                            </Link>
                        </Button>
                    </Box>

                    <Box>
                        {account ? (
                            <Box display="flex">
                                <Link href="/profile">
                                    <Button variant="contained">{shortenAddress(account)}</Button>
                                </Link>
                                {chainId !== SUPPORTED_NETWORKS_INFO.HARDHAT.chainId ? (
                                    <Button
                                        onClick={handleChangeChain}
                                        variant="contained"
                                        color="secondary"
                                        disabled={isWeb3EnableLoading}
                                        sx={{ ml: 2 }}
                                    >
                                        Change Network to Hardhat
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleChangeChain}
                                        variant="contained"
                                        color="secondary"
                                        sx={{ ml: 2 }}
                                    >
                                        Network: {SUPPORTED_NETWORKS_INFO.HARDHAT.name}
                                    </Button>
                                )}
                            </Box>
                        ) : (
                            <>
                                <Button
                                    onClick={handleConnect}
                                    variant="contained"
                                    disabled={isWeb3EnableLoading}
                                >
                                    Connect Wallet
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </AppBar>
        </>
    )
}

export default Header
