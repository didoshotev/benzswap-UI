import { createContext } from "react";
import { BenzSwap } from "../../benz/BenzSwap/BenzSwap";

interface IBenzContext { 
    benzInstance: BenzSwap | undefined
}


const BenzContext = createContext<IBenzContext>({ benzInstance: undefined });

export default BenzContext;