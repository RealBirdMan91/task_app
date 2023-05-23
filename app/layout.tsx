import "@/styles/globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen w-screen rainbow-mesh p-6">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
