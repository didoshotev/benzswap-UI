import { ChainId, UiIncentiveDataProvider, UiPoolDataProvider } from '@aave/contract-helpers'
import { Box, Button } from '@mui/material'
import { ethers } from 'ethers'
import type { NextPage } from 'next'

const Aave: NextPage = () => {
    const init = async () => {
        const provider = new ethers.providers.StaticJsonRpcProvider(
            'https://eth-mainnet.alchemyapi.io/v2/demo',
            ChainId.mainnet
        )

        const uiPoolDataProviderAddress = '0xa2DC1422E0cE89E1074A6cd7e2481e8e9c4415A6'
        const uiIncentiveDataProviderAddress = '0xD01ab9a6577E1D84F142e44D49380e23A340387d'
        const lendingPoolAddressProvider = '0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5'

        // View contract used to fetch all reserves data (including market base currency data), and user reserves
        const poolDataProviderContract = new UiPoolDataProvider({
            uiPoolDataProviderAddress,
            provider,
            chainId: ChainId.mainnet,
        })

        const incentiveDataProviderContract = new UiIncentiveDataProvider({
            uiIncentiveDataProviderAddress,
            provider,
            chainId: ChainId.mainnet,
        })
        console.log('incentiveDataProviderContract: ', incentiveDataProviderContract)

        // Object containing array of pool reserves and market base currency data
        // { reservesArray, baseCurrencyData }
        // const reserves = await poolDataProviderContract.getReservesHumanized({
        //     lendingPoolAddressProvider,
        // })
        // console.log('RESERVES: ', reserves)

        const reserveIncentives =
            await incentiveDataProviderContract.getReservesIncentivesDataHumanized({
                lendingPoolAddressProvider,
            })
    }

    return (
        <>
            <Box textAlign="center" mt={15}>
                <h2>Aave Page</h2>
                <Button variant={'contained'} onClick={init}>
                    Trigger
                </Button>
            </Box>
        </>
    )
}

export default Aave
