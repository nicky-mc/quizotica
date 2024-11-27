import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout ( { children } ) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-base-200 text-base-content">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          { children }
          </main>
        <Footer />
      </body>
    </html>
  );
}
