type DeploymentsType = {
    [contractName: string]: { 
        address: string,
        abi: any[]
    };
};

export default DeploymentsType