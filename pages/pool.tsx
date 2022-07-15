import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { PoolsList } from '../components/liquidity/PoolsList/PoolList'
import { StyledBox } from '../shared/components/StyledBox/StyledBox'

const Pool: NextPage = () => {
    return (
        <>
            <Container maxWidth="xl">
                <Box mb={4}>
                    <StyledBox>
                        <Typography variant="h6">Uniswap pools</Typography>
                    </StyledBox>
                </Box>
                <PoolsList />
            </Container>
        </>
    )
}

export default Pool
