import { Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import { getProvider } from "../../utils/provider";
import ERC20 from "../ERC20";
import ConfigurationType from "../types/ConfigurationType";

export class BenzSwap { 
    config: ConfigurationType;
    myAccount: string | null = null;

    provider: Provider;    
    signer?: ethers.Signer

    contracts: { [name: string]: Contract };
    externalTokens?: { [name: string]: ERC20 }

    DAI?: ERC20;

    constructor(cfg: ConfigurationType) {
        this.config = cfg;
        const { deployments, externalTokens } = cfg;
        this.provider = getProvider();

        // init contracts
        this.contracts = { };
        for(const [name, deployment] of Object.entries(deployments)) {
            const newContract: Contract = new Contract(deployment.address, deployment.abi, this.provider);
            this.contracts[name] = newContract;
            console.log('new contract: ', newContract);
        }

        // init ERC20 tokens
        this.externalTokens = { };
        for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
            console.log('symbol: ', symbol);
            console.log('address: ', address);
            console.log('decimal: ', decimal);
            const token = new ERC20(this.provider, address, symbol, decimal);
            console.log('-------------------');
            console.log('new Token: ', token);
        }
    }

    unlockWallet(provider: any, account: string) { 
        const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
        this.signer = newProvider.getSigner(0);
        this.myAccount = account;

        // set signer for the contracts
        for(const [name, contract] of Object.entries(this.contracts)) {
            this.contracts[name] = contract.connect(this.signer);
        }
        // TODO - set signer for the tokens
        
        // fetch anything data here
    }

    get isUnlocked(): boolean { 
        return !!this.myAccount;
    }
}