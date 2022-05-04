import { Paper, Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import { SwapDialog } from '../components/swap/SwapDialog/SwapDialog'


const Swap: NextPage = () => {

    return (
        <>
            <Container maxWidth="xl">
                <Box display="flex" justifyContent="center" mt={5}>
                    <Box width={500} mt={5}>
                        <SwapDialog />
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Swap
