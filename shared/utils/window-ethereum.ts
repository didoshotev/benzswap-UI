import ConfigurationType from "../benz/types/ConfigurationType";

window.ethereum.on('accountsChanged', () => { 
    window.location.reload();
})

export const shouldChangeNetwork = async (targetNetwork: string): Promise<boolean> => {
    if (!window.ethereum) {
        return Promise.reject("No metamask installed");
    }

    const currentChainId = await window.ethereum.request({
        method: "eth_chainId"
    })

    return currentChainId !== targetNetwork;
}


export const changeNetwork = async (cfg: ConfigurationType) => {
    await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
    });
    // await window.ethereum.request({
    //     method: "wallet_addEthereumChain",
    //     params: [{
    //         chainId: cfg.chainId,
    //         rpcUrls: [cfg.rpcUrl],
    //         chainName: cfg.networkName,
    //         nativeCurrency: cfg.nativeCurrency,
    //         blockExplorerUrls: [cfg.explorerUrl]
    //     }]
    // });
}

export const addNetwork = async (cfg: ConfigurationType) => {
    try {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: cfg.chainId,
                rpcUrls: [cfg.rpcUrl],
                chainName: cfg.networkName,
                nativeCurrency: cfg.nativeCurrency,
                blockExplorerUrls: [cfg.explorerUrl]
            }]
        });
    } catch (error) {
        console.log('ERROR: ', error);
    }
}
