import { CustomTable } from "../../../shared/components/CustomTable/CustomTable"
import { useEffect } from "react"

import { ChainId, Fetcher, Token, WETH } from '@uniswap/sdk'
import { TOKENS } from "../../../shared/utils/constants"
import { UniswapSDK } from "../../../shared/services/uniswap-sdk/UniswapSDK"
import { Button } from "@mui/material"


export const PoolsList: React.FC = () => {

    const handleFetchData = async () => { 
        await UniswapSDK.fetchPairs();
    }

    return (
        <>
            <Button variant="contained" onClick={handleFetchData}>Fetch Data</Button>
            <CustomTable />
        </>
    )
}
