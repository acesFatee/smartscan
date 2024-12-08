import localFont from "next/font/local";
import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Provider from "../../Context/Provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "../../Context/AuthProvider";
import { Open_Sans } from 'next/font/google'

const font = Open_Sans({
  subsets: ['latin'],
  weight: "400"
})

export const metadata = {
  title: "Smartscan - AI receipt manager",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    return redirect("/api/auth/login");
  }

  const user = await getUser();

  return (
    <AuthProvider>
      <Provider>
        <html lang="en" suppressHydrationWarning>
          <body className={font.className}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar user={user} />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </Provider>
    </AuthProvider>
  );
}
