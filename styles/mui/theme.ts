import { createTheme } from "@mui/material/styles";

export const theme = createTheme({ 
    palette: { 
        primary: { 
            main: "#fff",
            light: "#fff"
        },  
        text: { 
            primary: "#8B8CA7"
        }
    },

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