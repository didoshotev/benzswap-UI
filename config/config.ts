import * as dotenv from "dotenv";
import { SUPPORTED_NETWORKS } from "../shared/utils/constants";
dotenv.config({ path: __dirname + '/.env' });
// import HARDHAT_DEPLOYMENT from ""



interface IConfiguration {

}

const Configuration: { [env: string]: IConfiguration } = {
    development: {
        chainId: SUPPORTED_NETWORKS[1337],
        networkName: "Hardhat",
        // deployments: 
    },
    staging: {

    },
    production: { },
}


export { Configuration }
export type { IConfiguration }
