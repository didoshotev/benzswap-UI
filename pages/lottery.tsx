// @ts-nocheck
import { Box, Button, Typography } from '@mui/material'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useBenzSwap } from '../shared/benzSwap/BenzSwapContextProvider'
import type { NextPage } from 'next'
import { useNotification } from 'web3uikit'

export type LotteryMetadataType = {
    fee: BigNumber | null
    participantsCount: string
}

const Lottery: NextPage = () => {
    const { benzSwap } = useBenzSwap()
    const dispatch = useNotification()
    const [lotteryMetadata, setLotteryMetadata] = useState<LotteryMetadataType>({
        fee: null,
        participantsCount: '0',
    })

    const fetchLotteryData = async () => {
        try {
            const fee = await benzSwap.contracts.Raffle.getEntranceFee()
            const participants = await benzSwap.contracts.Raffle.getNumberOfPlayers()
            const recentWinner = await benzSwap.contracts.Raffle.getRecentWinner()

            setLotteryMetadata({
                fee,
                participantsCount: participants.toString(),
            })
        } catch (error) {
            console.log('Error while fetching Lottery data')
            console.log('ERROR: ', error)
        }
    }

    useEffect(() => {
        if (!benzSwap) {
            return
        }
        (async () => {
            await fetchLotteryData()
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [benzSwap])

    const handleEnterRaffle = async () => {
        try {
            console.log('lotteryMetadata', lotteryMetadata)
            const enterRaffleTx = await benzSwap.contracts.Raffle.enterRaffle({
                value: lotteryMetadata.fee,
            })
            await enterRaffleTx.wait(1)
            dispatch({
                type: 'info',
                message: 'Succesfully entered the Lottery!',
                title: 'Tx Notification',
                position: 'topR',
                icon: 'bell',
            })

            await fetchLotteryData()
        } catch (error) {
            console.log('Error while entering the Lottery!')
        }
    }

    return (
        <Box textAlign="center" color="#fff">
            <h2>Lottery Page</h2>

            <Box mt={10} mb={5}>
                {lotteryMetadata.fee ? (
                    <Typography variant="h5">
                        Entrance Fee: {ethers.utils.formatUnits(lotteryMetadata.fee, 'ether')} ETH
                    </Typography>
                ) : (
                    <>No data about Entrance Fee</>
                )}
            </Box>

            <Button variant="contained" color="primary" onClick={handleEnterRaffle}>
                Enter Raffle
            </Button>

            <Box mt={2}>
                <Typography variant="h6">
                    Participants Count: {lotteryMetadata.participantsCount}
                </Typography>
            </Box>
        </Box>
    )
}

// Lottery.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <Web3ContextProvider>
//             <BenzSwapContextProvider>{page}</BenzSwapContextProvider>
//         </Web3ContextProvider>)
// }

export default Lottery
