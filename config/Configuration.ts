import * as dotenv from "dotenv";
import { SUPPORTED_NETWORKS, SUPPORTED_NETWORKS_INFO } from "../shared/utils/constants";
import localhost_deployments from "../constants/deployments/deployments.localhost.json"
dotenv.config({ path: __dirname + '/.env' });
// import HARDHAT_DEPLOYMENT from ""


interface IConfiguration {
    chainId: number,
    networkName: string,
    forkedNetoworkChainId?: null | number,
    deployments: any,
    externalTokens: { [contractName: string]: [string, number] | null }
}


const Configuration: { [env: string]: IConfiguration } = {
    development: {
        chainId: SUPPORTED_NETWORKS_INFO.HARDHAT.chainId,
        networkName: SUPPORTED_NETWORKS_INFO.HARDHAT.name,
        forkedNetoworkChainId: null,
        deployments: localhost_deployments,
        externalTokens: {
            DAI: null,
            USDC: null,
            USDT: null
        }
    },
    staging: {
        chainId: SUPPORTED_NETWORKS_INFO.FUJI.chainId,
        networkName: SUPPORTED_NETWORKS_INFO.FUJI.name,
        forkedNetoworkChainId: null,
        deployments: localhost_deployments,
        externalTokens: {
            DAI: null,
            USDC: null,
            USDT: null
        }
    },
    // production: {},
}


// export { Configuration }
export default Configuration[process.env.NEXT_APP_STAGE || process.env.NODE_ENV || "development"];

export type { IConfiguration }
