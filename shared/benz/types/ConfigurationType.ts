import { ChainId } from "@uniswap/sdk";
import DeploymentsType from "../deployments/types/DeploymentsType";
import EthereumConfig from "../deployments/types/EthereumConfigType";

type ConfigurationType = {
    chainId: string;
    networkName: string;
    explorerUrl: string;
    rpcUrl: string;
    nativeCurrency: { name: string, symbol: string, decimals: number },
    defaultProvider?: string;
    deployments: DeploymentsType;
    externalTokens: { [contractName: string]: [string, number] };
    config?: EthereumConfig;
    // refreshInterval: number;
};

export default ConfigurationType;