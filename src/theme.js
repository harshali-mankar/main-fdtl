import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        // primary: {
        // main: "#1976d2",
        // },
        // secondary: {
        // main: "#dc004e",
        // },
        // background: {
        // default: "#f5f5f5",
        // },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: '8px', // <-- Change this value as needed
                },
            },
        }
    },
});
export default theme;