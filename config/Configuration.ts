import localhost_deployments from '../constants/deployments/deployments.localhost.json'
import { SUPPORTED_NETWORKS_INFO } from '../shared/utils/constants'

interface IConfiguration {
    chainId: number
    networkName: string
    forkedNetoworkChainId?: null | number
    deployments: any
    externalTokens: { [contractName: string]: [string, number] | null }
}

const Configuration: { [env: string]: IConfiguration } = {
    development: {
        chainId: SUPPORTED_NETWORKS_INFO.HARDHAT_LOCAL.chainId,
        networkName: SUPPORTED_NETWORKS_INFO.HARDHAT_LOCAL.name,
        forkedNetoworkChainId: null,
        deployments: localhost_deployments.hardhat,
        externalTokens: {
            DAI: ['0', 0],
            USDC: ['0', 0],
            USDT: ['0', 0],
        },
    },
    staging: {
        chainId: SUPPORTED_NETWORKS_INFO.FUJI.chainId,
        networkName: SUPPORTED_NETWORKS_INFO.FUJI.name,
        forkedNetoworkChainId: null,
        deployments: localhost_deployments,
        externalTokens: {
            DAI: null,
            USDC: null,
            USDT: null,
        },
    },
    // production: {},
}

export default Configuration[
    process.env.NEXT_PUBLIC_APP_STAGE || process.env.NODE_ENV || 'development'
]

export type { IConfiguration }
