import { ChainId } from '@uniswap/sdk'
import ConfigurationType from './benz/types/ConfigurationType'

const configuration: { [env: string]: ConfigurationType } = {
    development: {
        chainId: '0x4',
        networkName: 'rinkeby',
        explorerUrl: 'https://rinkeby.etherscan.io',
        rpcUrl: 'https://rinkeby.infura.io/v3/',
        deployments: require('./benz/deployments/deployments.rinkeby.json'),
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        externalTokens: {
            DAI: ['0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa', 18],
            LINK: ['0x01BE23585060835E02B77ef475b0Cc51aA1e0709', 18],
            // "DAI-ETH UNISWAP LP": [PAIR_ADDRESS, DECIMALS]
        },
    },
}

export default configuration[process.env.NEXT_APP_STAGE || 'development']
