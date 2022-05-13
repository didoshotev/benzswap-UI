import { Provider } from "@ethersproject/providers";
import { Contract, ethers } from "ethers";
import { getProvider } from "../../utils/provider";
import ERC20 from "../ERC20";
import ConfigurationType from "../types/ConfigurationType";
import IBenzSwap from "./types/IBenzSwap";

export class BenzSwap implements IBenzSwap {
    config: ConfigurationType;
    myAccount: string | null = null;

    provider: Provider;
    signer?: ethers.Signer

    contracts: { [name: string]: Contract };
    externalTokens: { [name: string]: ERC20 }

    DAI?: ERC20;

    constructor(cfg: ConfigurationType) {
        this.config = cfg;
        const { deployments, externalTokens } = cfg;

        this.provider = getProvider();

        // init contracts
        this.contracts = {};
        for (const [name, deployment] of Object.entries(deployments)) {
            const newContract: Contract = new Contract(deployment.address, deployment.abi, this.provider);
            this.contracts[name] = newContract;
        }

        // init ERC20 tokens
        this.externalTokens = {};
        for (const [symbol, [address, decimal]] of Object.entries(externalTokens)) {
            this.externalTokens[symbol] = new ERC20(this.provider, address, symbol, decimal);
        }
    }

    unlockWallet(provider: any, account: string) {
        const newProvider = new ethers.providers.Web3Provider(provider, this.config.chainId);
        this.signer = newProvider.getSigner(0);
        this.myAccount = account;

        // set signer for the contracts
        for (const [name, contract] of Object.entries(this.contracts)) {
            this.contracts[name] = contract.connect(this.signer);
        }

        // TODO - set signer for the tokens
        for (const token of Object.values(this.externalTokens)) {
            token.connect(this.signer);
        }
    }

    get isUnlocked(): boolean {
        return !!this.myAccount;
    }

    getContractByName(name: string): Contract {
        return this.contracts[name];
    }

    getExternalTokenByName(name: string): ERC20 {
        return this.externalTokens[name];
    }
}