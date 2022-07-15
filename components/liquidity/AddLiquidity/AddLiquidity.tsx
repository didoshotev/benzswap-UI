import { Box, Button } from '@mui/material'
import { InputField } from '../../../shared/components/InputField/InputField'
import { StyledBox } from '../../../shared/components/StyledBox/StyledBox'
import AddIcon from '@mui/icons-material/Add'

export const AddLiquidityModal: React.FC = () => {
    return (
        <>
            <StyledBox>
                <InputField label={''} available={'500'} />
                <Box textAlign="center" my={2}>
                    <AddIcon fontSize={'large'} htmlColor="#fff" />
                </Box>
                <InputField label={''} available={'1200'} />
                <Box textAlign={'center'}>
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
            </StyledBox>
        </>
    )
}
