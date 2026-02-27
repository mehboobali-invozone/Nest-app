import "./globals.css";
import { Providers } from "../redux/provider";
import { AuthProvider } from "../contexts/AuthContext";

export const metadata = {
  title: "App",
  description: "App",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </Providers>
            </body>
        </html>
    );
}