
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { LanguageProvider } from '@/context/language-context';
import { Toaster } from '@/components/ui/toaster';
import AgeVerificationModal from '@/components/age-verification-modal';
import AppBodyContent from '@/components/app-body-content';
import Script from 'next/script';


const siteUrl = 'https://xxxc.online';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'xxxc.online Videos | Real Indian Adult Content Online | xxxc.online',
    template: '%s | xxxc.online',
  },
  description: 'Watch real desi sex videos at xxxc.online featuring bold Indian couples, bhabhis, and homemade adult content in full HD. 100% authentic, uncensored, and updated daily for nonstop pleasure.',
  keywords: ['desi sex', 'indian porn', 'adult videos', 'porn', 'free porn', 'xxx movies', 'sex videos', 'xxxc.online'],
  robots: {
    index: true,
    follow: true,
    noodp: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'xxxc.online Videos | Real Indian Adult Content Online | xxxc.online',
    description: 'Watch real desi sex videos at xxxc.online featuring bold Indian couples, bhabhis, and homemade adult content in full HD. 100% authentic, uncensored, and updated daily for nonstop pleasure.',
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'xxxc.online',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xxxc.online Videos | Real Indian Adult Content Online | xxxc.online',
    description: 'Watch real desi sex videos at xxxc.online featuring bold Indian couples, bhabhis, and homemade adult content in full HD. 100% authentic, uncensored, and updated daily for nonstop pleasure.',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <script defer src="https://analytics.testss1.online/script.js" data-website-id="c9dcf744-c692-4e67-98d7-6a7476f65601"></script>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22hsl(37 100% 58%)%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2240%22 font-family=%22sans-serif%22 fill=%22black%22>xxxc</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SidebarProvider defaultOpen={false}>
                <AppBodyContent>
                    {children}
                </AppBodyContent>
                <Toaster />
                <AgeVerificationModal />
            </SidebarProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
