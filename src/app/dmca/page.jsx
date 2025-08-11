
export const metadata = {
  title: 'DMCA Policy',
  description: 'Read the DMCA Policy for xxxc.online.',
};

export default function DMCA() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6 font-headline">DMCA Notice</h1>
      <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
        <p>xxxc.online respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged copyright infringement that are reported to our designated Copyright Agent.</p>
        <h2 className="text-2xl font-bold pt-4 text-foreground">Submitting a DMCA Notice</h2>
        <p>If you are a copyright owner or an agent thereof and believe that any content on our site infringes upon your copyright, you may submit a notification pursuant to the DMCA by providing our Copyright Agent with the following information in writing:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled.</li>
            <li>Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and, if available, an electronic mail address.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
        </ul>
        <p>Our designated Copyright Agent to receive notifications of claimed infringement can be contacted at: legal@xxxc.online</p>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
