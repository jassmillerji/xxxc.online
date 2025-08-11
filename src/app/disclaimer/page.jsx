
export const metadata = {
  title: 'Disclaimer',
  description: 'Read the Disclaimer for xxxc.online.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6 font-headline">Disclaimer</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>The information provided by xxxc.online on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">External Links Disclaimer</h2>
        <p>The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">Adult Content Disclaimer</h2>
        <p>This website contains sexually explicit material. You must be at least 18 years of age or the age of majority in your jurisdiction to view this content. By entering this site, you are agreeing to all our terms and conditions, and you are confirming that you are of legal age.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">No Professional Advice</h2>
        <p>The information provided on this website is for entertainment purposes only and does not constitute legal, financial, or medical advice. You should not rely on the material or information on the website as a basis for making any business, legal or any other decisions.</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
