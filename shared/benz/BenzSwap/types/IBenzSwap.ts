import { Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import ERC20 from "../../ERC20";
import ConfigurationType from "../../types/ConfigurationType";


interface IBenzSwap {
    config: ConfigurationType;
    myAccount: string | null;

    provider: Provider;
    signer?: ethers.Signer

    contracts: { [name: string]: Contract };
    externalTokens: { [name: string]: ERC20 }

    DAI?: ERC20;
    
    unlockWallet: (provider: any, account: string) => void;
    
    readonly isUnlocked: boolean; 

    getContractByName: (name: string) => Contract;

    getExternalTokenByName: (name: string) => ERC20; 
}

export default IBenzSwap