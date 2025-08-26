
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-background p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold font-headline mb-6">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of the terms, then you do not have permission to access the Service.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of the Site</h2>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to access and use the Site strictly in accordance with these terms of use. As a condition of your use of the Site, you warrant to Bombay Cloths that you will not use the Site for any purpose that is unlawful or prohibited by these Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Products and Pricing</h2>
            <p>
              All products listed on the Site are subject to change, as is product information, pricing, and availability. We reserve the right, at any time, to modify, suspend, or discontinue any Site feature or the sale of any product with or without notice.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
            <p>
              All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the Site, is the property of Bombay Cloths or its suppliers and protected by copyright and other laws.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Bombay Cloths, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
