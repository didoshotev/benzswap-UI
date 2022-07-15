import { Provider } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import { IConfiguration } from '../../config/Configuration'
import ERC20 from '../benz/ERC20'

export class Lottery {
    config: IConfiguration

    account?: string
    provider: Provider
    signer?: ethers.Signer | null

    contracts: { [name: string]: Contract }
    externalTokens: { [name: string]: any }

    constructor(cfg: IConfiguration, provider: Provider, signer: ethers.Signer | null = null) {
        this.config = cfg
        const { deployments, externalTokens } = cfg

        this.provider = provider
        this.signer = signer

        // load contracts from deployment
        // TODO: fix as any
        this.contracts = {}
        for (const [name, deployment] of Object.entries(deployments) as any) {
            const newContract: Contract = new Contract(
                deployment.address,
                deployment.abi,
                this.provider
            )
            this.contracts[name] = newContract
        }

        // init ERC20 tokens
        // TODO: fix as any
        this.externalTokens = {}
        for (const [symbol, [address, decimal]] of Object.entries(externalTokens) as any) {
            this.externalTokens[symbol] = new ERC20(this.provider, address, symbol, decimal)
        }
    }

    unlockContracts(provider: any, account: string) {
        this.account = account

        if (!this.signer) {
            console.log('No signer found!')
            return
        }

        // set signer for the contracts
        for (const [name, contract] of Object.entries(this.contracts)) {
            this.contracts[name] = contract.connect(this.signer)
        }

        if (!this.externalTokens) {
            return
        }
        // TODO - set signer for the tokens
        for (const token of Object.values(this.externalTokens)) {
            token.connect(this.signer)
        }
    }

    getContractByName(name: string): Contract {
        return this.contracts[name]
    }

    getExternalTokenByName(name: string): ERC20 | null {
        if (!this.externalTokens) {
            return null
        }
        return this.externalTokens[name]
    }
}
