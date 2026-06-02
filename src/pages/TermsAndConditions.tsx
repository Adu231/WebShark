import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/features/ScrollToTop';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using WebShark's website intelligence platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not access or use the Service.

These Terms apply to all visitors, users, and others who access or use the Service. By creating an account or using any part of the Service, you confirm that you are at least 18 years old and have the legal capacity to enter into a binding agreement.`
  },
  {
    title: '2. Description of Service',
    content: `WebShark provides a website intelligence and digital marketing platform that includes:

• Website SEO auditing and analysis
• Keyword ranking tracking and SERP analysis
• Competitor intelligence and comparison
• Website uptime and performance monitoring
• AI-powered content and SEO recommendations
• Analytics reporting and data export

The Service is provided on a subscription basis. Features available to you depend on your chosen subscription plan. WebShark reserves the right to modify, suspend, or discontinue any part of the Service at any time.`
  },
  {
    title: '3. Account Registration and Security',
    content: `To use our Service, you must create an account by providing accurate and complete information. You are responsible for:

• Maintaining the confidentiality of your login credentials
• All activity that occurs under your account
• Notifying us immediately of any unauthorized access
• Ensuring your account information remains accurate and up to date

You may not share your account credentials with others or create accounts using false or misleading information. WebShark reserves the right to terminate accounts that violate these requirements.`
  },
  {
    title: '4. Subscription Plans and Billing',
    content: `WebShark offers various subscription plans including a free Starter tier and paid Pro and Enterprise tiers.

Paid Subscriptions:
• Subscriptions are billed monthly or annually in advance
• Prices are listed in USD and may be subject to applicable taxes
• Annual subscriptions offer a discounted rate compared to monthly billing
• Your subscription automatically renews unless cancelled before the renewal date

Free Trials:
• New users may be eligible for a 14-day free trial of the Pro plan
• No credit card is required to start a free trial
• At the end of the trial, you will be moved to the Starter plan unless you upgrade

Refunds:
• Monthly subscriptions are non-refundable after payment
• Annual subscriptions may be eligible for a prorated refund within 30 days of purchase
• Contact billing@webshark.io for refund requests`
  },
  {
    title: '5. Acceptable Use Policy',
    content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:

• Use the Service to analyze websites you do not own or have permission to analyze
• Attempt to reverse engineer, decompile, or extract source code from the Service
• Use automated tools to excessively crawl or scrape our platform
• Interfere with or disrupt the integrity or performance of the Service
• Upload or transmit viruses or malicious code
• Use the Service to spam or send unsolicited commercial communications
• Violate any applicable local, state, national, or international law or regulation
• Impersonate any person or entity, or misrepresent your affiliation with any person or entity

Violation of this policy may result in immediate account termination without refund.`
  },
  {
    title: '6. Data and Intellectual Property',
    content: `Your Data:
You retain ownership of all website data, reports, and content you create using the Service ("Your Data"). You grant WebShark a limited license to process Your Data solely to provide the Service to you.

WebShark Intellectual Property:
The Service, including all software, algorithms, designs, text, graphics, and other content created by WebShark, is owned by WebShark and protected by copyright, trademark, and other intellectual property laws.

License Grant:
WebShark grants you a limited, non-exclusive, non-transferable license to access and use the Service for your internal business purposes in accordance with these Terms.`
  },
  {
    title: '7. Privacy and Data Protection',
    content: `Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.

We comply with applicable data protection laws including GDPR and CCPA. For information about how we handle your personal data, data retention, and your rights, please review our Privacy Policy at webshark.io/privacy.`
  },
  {
    title: '8. Disclaimer of Warranties',
    content: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WEBSHARK DISCLAIMS ALL WARRANTIES INCLUDING:

• WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
• WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE
• WARRANTIES REGARDING THE ACCURACY OR COMPLETENESS OF SEO DATA
• WARRANTIES THAT DEFECTS WILL BE CORRECTED

WebShark does not guarantee specific SEO results, ranking improvements, or traffic increases. SEO outcomes depend on many factors outside our control.`
  },
  {
    title: '9. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, WEBSHARK SHALL NOT BE LIABLE FOR:

• Indirect, incidental, special, consequential, or punitive damages
• Loss of profits, revenue, data, goodwill, or other intangible losses
• Damages resulting from your access to or use of (or inability to access or use) the Service
• Damages resulting from third-party conduct or content

IN ANY CASE, WEBSHARK'S AGGREGATE LIABILITY FOR CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) $100 OR (B) THE AMOUNTS PAID BY YOU TO WEBSHARK IN THE 12 MONTHS PRECEDING THE CLAIM.`
  },
  {
    title: '10. Governing Law and Disputes',
    content: `These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.

Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration conducted by the American Arbitration Association (AAA) in San Francisco, California, except that either party may seek injunctive or other equitable relief in a court of competent jurisdiction.

You agree to waive your right to participate in any class action lawsuits against WebShark.`
  },
  {
    title: '11. Changes to Terms',
    content: `WebShark reserves the right to modify these Terms at any time. We will notify you of significant changes by:

• Sending an email to the address associated with your account
• Displaying a prominent notice on our website or within the Service
• Updating the "Last Updated" date at the top of these Terms

Your continued use of the Service after changes become effective constitutes acceptance of the new Terms. If you do not agree to the revised Terms, you must stop using the Service.`
  },
  {
    title: '12. Contact Information',
    content: `For questions about these Terms, please contact us:

WebShark, Inc.
Legal Department
340 Pine Street, Suite 800
San Francisco, CA 94104

Email: legal@webshark.io
Phone: +1 (415) 555-0192

We will respond to all legal inquiries within 10 business days.`
  }
];

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-14 bg-gradient-mesh border-b border-border">
          <div className="container-wide max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">
              <FileText className="w-3 h-3 mr-1" /> Legal
            </Badge>
            <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: <strong>June 2, 2025</strong> · Effective: June 2, 2025
            </p>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Please read these Terms of Service carefully before using the WebShark platform.
              These terms constitute a legally binding agreement between you and WebShark, Inc.
              regarding your use of our website intelligence services.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-wide max-w-3xl">
            {/* Table of Contents */}
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
