import { Box, Button, Container, Paper, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useWallet } from 'use-wallet'
import ERC20 from '../shared/benz/ERC20'
import { StyledBox } from '../shared/components/StyledBox/StyledBox'
import { useBenzContext } from '../shared/context/BenzContext/BenzContextProvider'
import { getBalance } from '../shared/utils/format'

const Profile: NextPage = () => {
    const { account } = useWallet()
    const [daiBalance, setDaiBalance] = useState(0);
    const [linkBalance, setLinkBalance] = useState(0);
    const { benzInstance } = useBenzContext();


    const handleFetch = async () => {
        if (!benzInstance || !account) { return; }
        console.log(benzInstance);
        const dai: ERC20 = benzInstance.externalTokens.DAI
        const link: ERC20 = benzInstance.getExternalTokenByName("LINK");
        const balance = getBalance(await dai.balanceOf(account));
        setDaiBalance(balance);

        const linkBalance = getBalance(await link.balanceOf(account));
        setLinkBalance(linkBalance);
    }

    return (
        <>
            <Container maxWidth="xl">
                <StyledBox>
                    <Typography mb={2}>Address: {account}</Typography>
                    <Button onClick={handleFetch} variant="contained">Get token balances: </Button>
                    <Box mt={2}>
                        Your  DAI - {daiBalance}
                    </Box>
                    <Box mt={2}>
                        Your  LINK - {linkBalance}
                    </Box>
                </StyledBox>
            </Container>
        </>
    )
}

export default Profile
