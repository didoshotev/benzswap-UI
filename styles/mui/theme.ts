import { createTheme } from "@mui/material/styles";
import componentStyleOverrides from "./componentStyleOverrides";
import themePalette from "./palette";
import themeTypography from "./typography";


export const theme = createTheme({ 
    // palette: { ...themePalette },
    palette: { 
        primary: { 
            main: "#8B8CA7",
            light: "#fff"
        },  
        text: { 
            primary: "#8B8CA7"
        }
    },
    // typography: { ...themeTypography },
    // components: { ...componentStyleOverrides }  
    components: { 
        MuiInputLabel: { 
            styleOverrides: { 
                root: { 
                    color: "#fff"
                }
            }
        },
    }
})  