import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle'
import { Box, Button } from '@mui/material'
import { InputField } from '../../../shared/components/InputField/InputField'
import classes from './swap-dialog.module.scss'

export const SwapDialog: React.FC = () => {
    return (
        <>
            <div className={classes.swap}>
                <InputField label={'pay'} available={'500'} />
                <Box textAlign="center" my={2}>
                    <SwapVerticalCircleIcon fontSize={'large'} htmlColor="#fff" />
                </Box>
                <InputField label={'Receive (Estimated)'} available={'1200'} />
                <Box textAlign={'center'}>
                    <Box color={'#8B8CA7'} mt={2}>
                        1 BUSD = 25 ETH
                    </Box>
                    <Box py={3}>
                        <Button
                            sx={{
                                backgroundColor: '#0177FB',
                                borderRadius: '10px',
                                fontStyle: 'capitalize',
                            }}
                            fullWidth
                            size="large"
                            variant="contained"
                        >
                            Confirm Order
                        </Button>
                    </Box>
                </Box>
            </div>
        </>
    )
}
