import { createTheme } from "@mui/material/styles";
import componentStyleOverrides from "./componentStyleOverrides";
import themePalette from "./palette";
import themeTypography from "./typography";


export const theme = createTheme({ 
    palette: { ...themePalette },
    typography: { ...themeTypography },
    components: { ...componentStyleOverrides }  
})