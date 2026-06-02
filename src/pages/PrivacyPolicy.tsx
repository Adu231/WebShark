import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support. This includes:

• Account information: name, email address, password, and company name
• Payment information: credit card details processed securely through our payment processor (Stripe)
• Usage data: how you interact with our platform, features you use, and actions you take
• Website data: URLs and data from websites you analyze using WebShark
• Communications: messages you send us and responses we provide

We also collect information automatically when you use our services, including log data, device information, location data, and cookies.`
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send technical notices, updates, security alerts, and support messages
• Respond to your comments and questions
• Monitor and analyze trends and usage of our services
• Detect and prevent fraudulent transactions and other illegal activities
• Personalize your experience on our platform
• Send promotional communications (you can opt out at any time)
• Comply with legal obligations`
  },
  {
    title: '3. Information Sharing and Disclosure',
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

• With service providers who assist in our operations (hosting, payment processing, email delivery)
• In response to legal requests if required by law or legal process
• To protect the rights, property, and safety of WebShark, our users, and others
• In connection with a business merger, acquisition, or sale of all or substantially all of our assets
• With your consent or at your direction

All third-party service providers are contractually obligated to protect your information and use it only for the purpose of providing services to us.`
  },
  {
    title: '4. Data Retention',
    content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:

• Account data is retained for the duration of your account and for 30 days after deletion
• Website audit data is retained for 24 months to support historical comparisons
• Payment records are retained for 7 years as required by financial regulations
• Log data is typically retained for 90 days
• Marketing communications opt-out records are retained indefinitely

You may request deletion of your personal data at any time by contacting us at privacy@webshark.io.`
  },
  {
    title: '5. Cookies and Tracking Technologies',
    content: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Types of cookies we use:

• Strictly necessary cookies: Required for the platform to function properly
• Preference cookies: Remember your settings and preferences
• Analytics cookies: Help us understand how visitors interact with our platform
• Marketing cookies: Track visitors across websites to display relevant ads

You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our services.`
  },
  {
    title: '6. Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:

• TLS 1.3 encryption for all data in transit
• AES-256 encryption for sensitive data at rest
• Regular security audits and penetration testing
• SOC 2 Type II compliance
• Multi-factor authentication for our internal systems
• Employee security training and access controls

While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet is 100% secure.`
  },
  {
    title: '7. Your Rights (GDPR & CCPA)',
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Right to access: Request a copy of the personal data we hold about you
• Right to rectification: Request correction of inaccurate or incomplete data
• Right to erasure: Request deletion of your personal data ("right to be forgotten")
• Right to restriction: Request that we limit the processing of your data
• Right to data portability: Request your data in a machine-readable format
• Right to object: Object to processing based on legitimate interests or for direct marketing
• Right to withdraw consent: Where processing is based on consent, withdraw at any time

To exercise any of these rights, contact our Data Protection Officer at privacy@webshark.io.`
  },
  {
    title: '8. Contact Us',
    content: `If you have questions about this Privacy Policy or our privacy practices, please contact us:

WebShark, Inc.
340 Pine Street, Suite 800
San Francisco, CA 94104

Email: privacy@webshark.io
Phone: +1 (415) 555-0192

Data Protection Officer: dpo@webshark.io

We will respond to all inquiries within 30 days.`
  }
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-14 bg-gradient-mesh border-b border-border">
          <div className="container-wide max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
              <Shield className="w-3 h-3 mr-1" /> Legal
            </Badge>
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: <strong>June 2, 2025</strong> · Effective: June 2, 2025
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              At WebShark, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our website intelligence platform.
              Please read this policy carefully. If you disagree with its terms, please discontinue use of our services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-wide max-w-3xl">
            {/* Quick Navigation */}
            <div className="rounded-xl border border-border bg-muted/30 p-5 mb-10">
              <h3 className="text-sm font-semibold mb-3">Table of Contents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {SECTIONS.map(({ title }) => (
                  <a key={title} href={`#${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-sm text-primary hover:underline">
                    {title}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {SECTIONS.map(({ title, content }) => (
                <div key={title} id={title.replace(/\s+/g, '-').toLowerCase()}>
                  <h2 className="text-xl font-bold mb-4">{title}</h2>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{content}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
