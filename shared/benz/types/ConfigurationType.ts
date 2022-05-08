import { ChainId } from "@uniswap/sdk";
import DeploymentsType from "../deployments/types/DeploymentsType";
import EthereumConfig from "../deployments/types/EthereumConfigType";

type ConfigurationType = {
    chainId: ChainId;
    networkName: string;
    explorerUrl: string;
    defaultProvider?: string;
    deployments: DeploymentsType;
    externalTokens: { [contractName: string]: [string, number] };
    config?: EthereumConfig;
    // refreshInterval: number;
};

export default ConfigurationType;