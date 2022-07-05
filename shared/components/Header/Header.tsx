import { AppBar, Box, Button, Menu } from '@mui/material'
import Link from 'next/link'
import { useWallet } from 'use-wallet'
import { shortenAddress } from '../../utils/format';
import { addNetwork, changeNetwork, shouldChangeNetwork } from '../../utils/window-ethereum';
import configuration from "../../config";
import { useMoralis } from 'react-moralis';
import { useEffect } from 'react';

const Header: React.FC = () => {
    // const { connect, isConnected, account } = useWallet();
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) { return; }
        if (typeof window !== "undefined" && window.localStorage.getItem("connected")) {
            enableWeb3();
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log('account changed to: ', account);
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log('Null account found');
            }
        })
    }, [])

    const handleConnect = async () => {
        await enableWeb3();

        if (typeof window !== "undefined") {
            console.log('setting window item');
            window.localStorage.setItem("connected", "injected");
        }
    }

    // const handleConnect = async () => {
    //     const shouldChange = await shouldChangeNetwork(configuration.chainId);

    //     try {
    //         await changeNetwork(configuration);
    //     } catch (error) {
    //         return;
    //     }
    //     // await connect("injected");
    // }

    return (
        <>
            <AppBar position='static' color='transparent' sx={{ p: 1 }}>
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
                        {account
                            ?
                            <Box color="#dbdde6">
                                <Link href="/profile">
                                    <Button
                                        variant="contained"
                                    >
                                        {shortenAddress(account)}
                                    </Button>
                                </Link>

                            </Box>
                            :
                            <Button
                                onClick={handleConnect}
                                variant="contained"
                                disabled={isWeb3EnableLoading}
                            >
                                Connect Wallet
                            </Button>
                        }
                    </Box>
                </Box>

            </AppBar>
        </>
    )
}

export default Header
