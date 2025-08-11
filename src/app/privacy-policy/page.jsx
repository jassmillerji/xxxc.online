
export const metadata = {
  title: 'Privacy Policy',
  description: 'Read the Privacy Policy for xxxc.online.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6 font-headline">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>Your privacy is important to us. It is xxxc.online's policy to respect your privacy regarding any information we may collect from you across our website.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">1. Information We Collect</h2>
        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">2. How We Use Your Information</h2>
        <p>We use the information we collect to operate, maintain, and provide to you the features and functionality of the Service. We may use your email address to send you Service-related notices (including any notices required by law, in lieu of communication by postal mail).</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">3. Security</h2>
        <p>We are committed to protecting your information. We use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">4. Cookies</h2>
        <p>We use cookies to store information about your preferences and to record user-specific information on which pages you access or visit. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
