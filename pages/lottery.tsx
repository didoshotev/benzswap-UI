import type { NextPage } from 'next'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi, contactAddresses } from "../constants"


const Lottery: NextPage = () => {
    const { chainId: chainIdHex } = useMoralis()    
    // console.log('chainId: ', parseInt(chainIdHex));
    
    // const { runContractFunction } = useWeb3Contract({ 
    //     abi: abi,
    //     contract: contactAddresses,
    //     functionName: "enterRaffle", 
    //     params: { },
    //     msgValue: 
    // })    

    return (
        <>
            <h2>Lottery Page</h2>
        </>
    )
}

export default Lottery
