export const TOKENS = { 
    1: { 
        DAI: { 
            address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            decimals: 18
        }
    }
}

export interface ISupportedNetworks { 
    1: string,
    4: string,
    1337: string,
    // 41337: string,
    43114: string,
    43113: string,
}

export const SUPPORTED_NETWORKS: ISupportedNetworks = { 
    1: "0x1",
    4: "0x4",
    1337: "0x539",
    // 41337: "0xA179",
    43114: "0xa86a",
    43113: "0xA869"
}