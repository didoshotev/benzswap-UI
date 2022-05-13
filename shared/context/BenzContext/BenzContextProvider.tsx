import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "use-wallet"
import { BenzSwap } from "../../benz/BenzSwap/BenzSwap";
import IBenzSwap from "../../benz/BenzSwap/types/IBenzSwap";
import configuration from "../../config";
import BenzContext from "./BenzContext";

type providerValueType = { 
    benzInstance: IBenzSwap | undefined
}


const BenzContextProvider: React.FC<any> = ({ children }) => {
    const { ethereum, account } = useWallet();
    const [benzInstance, setBenzInstance] = useState<IBenzSwap>();

    useEffect(() => {
        // console.log('BenzContextProvider useEffect...!');
        // console.log(benzInstance);

        if (!benzInstance && account) {
            const newBenzInstance: IBenzSwap = new BenzSwap(configuration);
            console.log(newBenzInstance);

            // if (account) {
            newBenzInstance.unlockWallet(ethereum, account);
            // }
            setBenzInstance(newBenzInstance);
        } else if (account) {
            benzInstance?.unlockWallet(ethereum, account);
        }

    }, [account, ethereum, benzInstance])

    const providerValue: providerValueType = { benzInstance: benzInstance }
    
    // if(!benzInstance) { 
    //     return <div>Loading...</div>
    // }

    return (
        <BenzContext.Provider value={providerValue}>{children}</BenzContext.Provider>
    )
}

const useBenzContext = () => {
    const context = useContext(BenzContext);

    if (!context) {
        throw new Error("useBenzContext must be used within a BenzContextProvider!");
    }

    return context;
}

export { BenzContextProvider, useBenzContext }
