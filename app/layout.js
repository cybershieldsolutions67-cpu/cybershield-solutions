import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "CyberShield Solutions - Soporte, Redes y Ciberseguridad",
  description: "Protegemos tu tecnología para que tu negocio siga funcionando. Soporte técnico, instalación de redes, desarrollo web y ciberseguridad básica para pequeñas empresas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
