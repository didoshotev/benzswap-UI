import { Box } from '@mui/material'
import classes from './styled-box.module.scss'

export const StyledBox: React.FC<{ children: React.ReactNode; padding?: string | number }> = ({
    children,
    padding = '24px',
}) => {
    return (
        <Box p={padding} className={classes.box}>
            {children}
        </Box>
    )
}
