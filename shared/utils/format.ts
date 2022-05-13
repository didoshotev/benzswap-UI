// @ts-nocheck
import { BigNumber } from 'ethers';

export const shortenAddress = (str: string | null = "0x000000") => `${str.substring(0, 6)}...${str.substring(str.length - 4)}`;

export const getBalance = (balance: BigNumber, decimals = 18) => Number(balance.div(BigNumber.from(10).pow(decimals)));