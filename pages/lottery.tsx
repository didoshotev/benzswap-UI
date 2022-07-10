// @ts-nocheck
import { Box, Button, Typography } from '@mui/material'
import { BigNumber, ethers } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi, contactAddresses } from "../constants"

const Lottery: NextPage = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId: any = parseInt(chainIdHex)
    const raffleAddress = chainId in contactAddresses ? (contactAddresses[chainId.toString()][0]) : null
    const [enteranceFee, setEnteranceFee] = useState<BigNumber | null>();
    const [numberOfPlayers, setNumberOfPlayers] = useState<BigNumber>(BigNumber.from(0));

    // const { data, error, fetch, isFetching, isLoading }
    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee"
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers"
    })

    useEffect(() => {
        const asyncWrapper = async () => {
            const newEntranceFee = await getEnteranceFee()
            const newNumberOfPlayers = await getNumberOfPlayers()
            if (!newEntranceFee) { return; }
            setEnteranceFee(newEntranceFee)
            setNumberOfPlayers(newNumberOfPlayers)
        }

        asyncWrapper()
    }, [isWeb3Enabled])

    const handleEnterRaffle = async () => { 
        
    }

    return (
        <Box textAlign="center" color="#fff">
            <h2>Lottery Page</h2>

            {enteranceFee ?
                <Box mt={10} mb={5}>
                    <Typography variant='h5'>
                        Entrance Fee: {ethers.utils.formatEther(enteranceFee)} ETH
                    </Typography>
                </Box>
                :
                <>No data</>
            }
            <Button variant="contained" color="primary" onClick={handleEnterRaffle}>Enter Raffle</Button>
            <Box mt={2}>
                <Typography variant="h6">Participants Count: {numberOfPlayers.toString()}</Typography>
            </Box>
        </Box>
    )
}

export default Lottery