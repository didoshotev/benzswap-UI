import { AppBar, Box, Button, Menu } from '@mui/material'
import Link from 'next/link'
const Header: React.FC = () => {


    return (
        <>
            <AppBar position='static' color='transparent' sx={{p: 1}}>
                <Box display="flex" justifyContent="center">
                    <Box mr={3}>
                        <Button>
                            <Link href="/liquidity">
                                <a>liquidity</a>
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
                </Box>

            </AppBar>
        </>
    )
}

export default Header
