import { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "use-wallet"
import { BenzSwap } from "../../benz/BenzSwap/BenzSwap";
import configuration from "../../config";
import BenzContext from "./BenzContext";


const BenzContextProvider: React.FC<any> = ({ children }) => {
    // const { ethereum, account } = useWallet();
    const { ethereum, account } = useWallet();
    const wallet = useWallet();
    const [benzInstance, setBenzInstance] = useState<any>();
    
    useEffect(() => { 
        console.log('BenzProvider');
        console.log(wallet);

    }, [account, ethereum])

    // useEffect(() => {
    //     if (!benzInstance) {
    //         const newBenzInstance = new BenzSwap(configuration);

    //         if (account) {
    //             newBenzInstance.unlockWallet(ethereum, account);
    //         }
    //         setBenzInstance(newBenzInstance);
    //     } else if (account) {
    //         benzInstance.unlockWallet(ethereum, account);
    //     }
    // }, [account, ethereum, benzInstance])

    return (
        <BenzContext.Provider value={{ benzInstance }}>{children}</BenzContext.Provider>    
    )
}

const useBenzContext = () => { 
    const context = useContext(BenzContext);
    
    if(!context) { 
        throw new Error("useBenzContext must be used within a BenzContextProvider!");
    }

    return context;
}

export { BenzContextProvider, useBenzContext}
