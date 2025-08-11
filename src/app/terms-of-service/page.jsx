
export const metadata = {
  title: 'Terms of Service',
  description: 'Read the Terms of Service for xxxc.online.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6 font-headline">Terms of Service</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>Welcome to xxxc.online. By accessing or using our website, you agree to be bound by these Terms of Service and to use the site in accordance with all applicable laws and regulations.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">1. Age Requirement</h2>
        <p>You must be at least 18 years of age or the age of majority in your jurisdiction to enter and use this website. By entering, you are affirming that you meet this age requirement.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">2. Use of Content</h2>
        <p>All content on this website is provided for personal, non-commercial use only. You may not distribute, modify, transmit, reuse, or use the content for public or commercial purposes without our written permission.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">3. User Conduct</h2>
        <p>You agree not to use the website in a way that may cause harm to the site or impair the availability or accessibility of the website. You must not use this website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, or other malicious computer software.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">4. Limitation of Liability</h2>
        <p>The content on this website is provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties. In no event shall xxxc.online or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
