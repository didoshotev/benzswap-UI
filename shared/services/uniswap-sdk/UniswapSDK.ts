import { ChainId, Fetcher, Route, Token, WETH } from '@uniswap/sdk'
import { TOKENS } from '../../utils/constants'

// interface IUniswapSDK = {
//     getPair:  () => { }
// }

export const UniswapSDK: any = {}

UniswapSDK.fetchPairs = async (token1: Token, token2: Token) => {
    console.log('HEREEE')
    console.log('ENV: ', process.env.NEXT_PUBLIC_INFURA_ID)

    const DAI = new Token(ChainId.MAINNET, TOKENS[1].DAI.address, TOKENS[1].DAI.decimals)

    // pass provider - third arg
    const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])
    // console.log('pair: ', pair);

    const route = new Route([pair], WETH[DAI.chainId])

    console.log('mid price: ', route.midPrice.toSignificant(6))
    console.log('invert mid price: ', route.midPrice.invert().toSignificant(6))
}
