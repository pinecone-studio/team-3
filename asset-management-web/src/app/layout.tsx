"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./_components/providers";
import { Button, SidebarProvider } from "@/libs";
import { AppSidebar } from "./_components/AppSidebar";
import Navbar from "./_components/Navbar";
import { ClerkProvider, Show, SignInButton } from "@clerk/nextjs";
import { ApolloProvider } from "@apollo/client";
import { client } from "./_hooks/apollo-client";
import { UserProvider } from "./_providers/user-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={client}>

          <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <UserProvider>
            <Show when={"signed-out"}>
              <div className="flex justify-center items-center w-full mt-10">
                <SignInButton>
                  <Button>Sign in</Button>
                </SignInButton>
              </div>


            </Show>
            <Show when={"signed-in"}>
              <Providers>
                <SidebarProvider>
                  <div className="hidden lg:block">
  <AppSidebar />
</div>
                  <div className="flex flex-col flex-1 min-h-screen bg-slate-50/30 min-w-0">
                    <Navbar />
                    <main className="w-full px-3 sm:px-8 py-6 sm:py-8">{children}</main>
                  </div>
                </SidebarProvider>
              </Providers>
            </Show>
          </UserProvider>
          </ClerkProvider>
        </ApolloProvider>

      </body>
    </html>
  );
}
