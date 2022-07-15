import { createContext, useContext, useEffect, useState } from 'react'
import Configuration from '../../../config/Configuration'
import { useBenzContext } from '../../benz/context/Benz/BenzContextProvider'
import { Lottery } from '../Lottery'

export const LotteryContext = createContext<any>(null)

export type PropTypes = {
    children: React.ReactNode
}

export const LotteryContextProvider: React.FC<PropTypes> = ({ children }) => {
    const [lottery, setLottery] = useState(null)
    const { account, provider, signer } = useBenzContext()

    useEffect(() => {
        if (lottery === null && provider) {
            console.log('Configuration: ', Configuration)
            console.log(provider)
            console.log(signer)
            // const newLottery = new Lottery(Configuration, provider, signer)
        }
    }, [signer, provider])

    return (
        <LotteryContext.Provider value={{ lottery, setLottery }}>
            {children}
        </LotteryContext.Provider>
    )
}

export const useLottery = () => {
    const context = useContext(LotteryContext)

    if (!context) {
        throw new Error('LotteryContext must be use within LotteryContextProvider!')
    }
    return context
}
