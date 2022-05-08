import { Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import configuration from "../config";

let provider: Provider | null = null;

export function getProvider(): Provider { 
    if(!provider) { 
        provider = ethers.getDefaultProvider(configuration.networkName, {
            infura: process.env.NEXT_PUBLIC_INFURA_ID
        })
    }
    return provider;
}
