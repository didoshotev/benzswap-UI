// @ts-nocheck
import { Box, Button, Typography } from '@mui/material'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi, contactAddresses } from '../constants'
import { useLottery } from '../shared/lottery/context/LotteryContextProvider'
import type { NextPage } from 'next'

const Lottery: NextPage = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: any = parseInt(chainIdHex)
    const raffleAddress =
        chainId in contactAddresses ? contactAddresses[chainId.toString()][0] : null
    const [enteranceFee, setEnteranceFee] = useState<BigNumber | null>()
    const [numberOfPlayers, setNumberOfPlayers] = useState<BigNumber>(BigNumber.from(0))

    const [raffleInstance, setRaffleInstance] = useState(null)

    const { lottery } = useLottery()

    // const { data, error, fetch, isFetching, isLoading }
    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: 'getEntranceFee',
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: 'getNumberOfPlayers',
    })

    useEffect(() => {
        const asyncWrapper = async () => {
            // const raffle = new Contract(raffleAddress, abi, )

            const newEntranceFee = await getEnteranceFee()
            const newNumberOfPlayers = await getNumberOfPlayers()
            if (!newEntranceFee) {
                return
            }
            setEnteranceFee(newEntranceFee)
            setNumberOfPlayers(newNumberOfPlayers)
        }

        asyncWrapper()
    }, [isWeb3Enabled, getEnteranceFee, getNumberOfPlayers])

    const handleEnterRaffle = async () => {}

    return (
        <Box textAlign="center" color="#fff">
            <h2>Lottery Page</h2>

            <Box mt={10} mb={5}>
                {enteranceFee ? (
                    <Typography variant="h5">
                        Entrance Fee: {ethers.utils.formatEther(enteranceFee)} ETH
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
                    Participants Count: {numberOfPlayers.toString()}
                </Typography>
            </Box>
        </Box>
    )
}

// Lottery.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <BenzContextProvider>
//             <LotteryContextProvider>{page}</LotteryContextProvider>
//         </BenzContextProvider>)
// }

export default Lottery
