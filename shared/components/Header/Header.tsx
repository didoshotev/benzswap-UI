import { AppBar, Box, Button, Menu } from '@mui/material'
import Link from 'next/link'
import { useWallet } from 'use-wallet'

const Header: React.FC = () => {
    const { connect, isConnected, account } = useWallet();


    const handleConnect = async () => {
        await connect("injected");
    }

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
                        {isConnected()
                            ?
                            <Box color={"red"}>
                                {account}
                            </Box>

                            :
                            <Button onClick={handleConnect} variant="contained">Connect Wallet</Button>
                        }
                    </Box>
                </Box>

            </AppBar>
        </>
    )
}

export default Header
