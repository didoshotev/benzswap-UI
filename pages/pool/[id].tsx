import { Box, Button } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { StyledBox } from '../../shared/components/StyledBox/StyledBox'
import classes from "./pool.module.scss";
import { InputField } from '../../shared/components/InputField/InputField';
import AddIcon from '@mui/icons-material/Add';
import { InputFieldSingle } from '../../shared/components/InputFieldSingle/InputFieldSingle';

const Pool: NextPage = () => {

    return (
        <Box display="flex" justifyContent={"space-evenly"}>
            <Box width="50%" my={5}>
                <StyledBox>
                    <Box display="flex" alignItems="center" fontSize={30}>
                        <Image src={"/images/ether-logo.png"} width={40} height={40} alt="ether" color='red' />
                        <Box ml={1}>
                            WETH.e /
                        </Box>
                        <Box display="flex" alignItems="center" fontSize={30} ml={2}>
                            <Image src={"/images/avax-logo.png"} width={40} height={40} alt="ether" color='red' />
                            <Box ml={1}>
                                AVAX
                            </Box>
                        </Box>
                    </Box>
                    <Box mt={5}>
                        <ul className={classes["pair-info"]}>
                            <li className={classes["pair-info-item"]}>
                                <span className={classes["pair-info-item-label"]}>Liquidity</span>
                                <span className={classes["pair-info-item-value"]}>$76,839,015</span>
                            </li>
                            <li className={classes["pair-info-item"]}>
                                <span className={classes["pair-info-item-label"]}>Volume (24H)</span>
                                <span className={classes["pair-info-item-value"]}>$6,839,015</span>
                            </li>
                            <li className={classes["pair-info-item"]}>
                                <span className={classes["pair-info-item-label"]}>Fees (24H)</span>
                                <span className={classes["pair-info-item-value"]}>$39,015</span>
                            </li>
                            <li className={classes["pair-info-item"]}>
                                <span className={classes["pair-info-item-label"]}>APR</span>
                                <span className={classes["pair-info-item-value"]}>9.91%</span>
                            </li>
                        </ul>
                    </Box>
                    <Box mt={7} display="flex">
                        <Box>
                            <Box color={"#8b8ca7"}>
                                Your pool share
                            </Box>
                            <Box fontSize={40}>
                                0%
                            </Box>
                        </Box>
                        <Box ml={15}>
                            <Box color={"#8b8ca7"}>
                                Your pool tokens
                            </Box>
                            <Box fontSize={40}>
                                0
                            </Box>
                        </Box>
                    </Box>
                </StyledBox>
            </Box>
            <Box width="35%" my={5}>
                <StyledBox>
                    <InputFieldSingle tokenImgPath={"/images/ether-logo.png"} tokenName={"WETH.e"} available={"1200"} />
                    <Box textAlign="center" my={2}>
                        <AddIcon fontSize={"large"} htmlColor='#fff' />
                    </Box>
                    <InputFieldSingle available={"900"} tokenImgPath={"/images/avax-logo.png"} tokenName={"AVAX"}/>
                    
                    <Box textAlign={"center"}>
                        <Box py={3}>
                            <Button
                                sx={{
                                    backgroundColor: "#0177FB",
                                    borderRadius: "10px",
                                    fontStyle: "capitalize"
                                }}
                                fullWidth
                                size='large'
                                variant="contained"
                            >
                                Confirm Order
                            </Button>
                        </Box>
                    </Box>
                </StyledBox>
            </Box>
        </Box>
    )
}

export default Pool