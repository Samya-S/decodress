import { ThemeProvider } from "@mui/material/styles";
import theme from "@/admin/src/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import FullLayout from "@/admin/src/layouts/FullLayout";

export const metadata = {
    title: 'Admin | Decodress',
    description: 'Decodress - Dress Decoded, Style Encoded',
}

export default function RootLayout({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <FullLayout>
                {children}
            </FullLayout>
        </ThemeProvider>
    )
}
