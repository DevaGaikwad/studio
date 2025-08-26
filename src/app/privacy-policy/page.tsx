
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-background p-8 rounded-lg shadow">
          <h1 className="text-4xl font-bold font-headline mb-6">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Bombay Cloths. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
            <p>
              We may collect personal information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, place an order, and in connection with other activities, services, features, or resources we make available on our Site. You may be asked for, as appropriate, name, email address, mailing address, phone number.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
            <p>
              We may use the information we collect from you to:
            </p>
            <ul>
                <li>Personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
                <li>Improve our website in order to better serve you.</li>
                <li>Process your transactions quickly.</li>
                <li>Send periodic emails regarding your order or other products and services.</li>
            </ul>

             <h2 className="text-2xl font-semibold mt-8 mb-4">4. How We Protect Your Information</h2>
            <p>
             We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. All transactions are processed through a gateway provider and are not stored or processed on our servers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Consent</h2>
            <p>
              By using our site, you consent to our website's privacy policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Our Privacy Policy</h2>
            <p>
              If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.
            </p>

             <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contacting Us</h2>
            <p>
              If there are any questions regarding this privacy policy, you may contact us using the information on our Contact Us page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
