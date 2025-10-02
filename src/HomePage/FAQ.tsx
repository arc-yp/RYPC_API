import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI Review System work?",
      answer: "Our AI analyzes the star rating, business category, and language preference to generate unique, natural-sounding reviews. Customers simply scan your QR code, rate their experience, and get a ready-to-post review that they can copy to Google Reviews with one click."
    },
    {
      question: "Are the AI-generated reviews authentic and safe to use?",
      answer: "Yes! Our AI creates unique, human-like reviews that reflect genuine customer experiences. Each review is different and contextually appropriate for your business type. The reviews are generated based on actual customer ratings, making them authentic representations of their experience."
    },
    {
      question: "What languages are supported?",
      answer: "We support English, Hindi, and Gujarati. All reviews are written in Roman script (English letters) for easy reading and posting on Google Reviews, even for Hindi and Gujarati content."
    },
    {
      question: "How quickly can I start collecting reviews?",
      answer: "Setup takes less than 5 minutes! After your demo call, we'll create your custom QR codes and links immediately. You can start collecting reviews the same day."
    },
    {
      question: "Do customers need to download any app?",
      answer: "No! The entire process works through a web browser. Customers simply scan your QR code or click your link, rate their experience, and get their review - no app downloads required."
    },
    {
      question: "Can I customize the reviews for my specific business?",
      answer: "Absolutely! Our AI is trained to understand different business categories (restaurants, salons, hospitals, etc.) and generates contextually appropriate reviews for each industry."
    },
    {
      question: "What if customers give low ratings?",
      answer: "For ratings below 4 stars, our system can redirect customers to a private feedback form instead of generating a public review, helping you address concerns privately while protecting your online reputation."
    },
    {
      question: "Is there a limit to how many reviews I can generate?",
      answer: "No limits! Generate as many reviews as you need. Our pricing is based on your business size, not the number of reviews generated."
    },
    {
      question: "How much does it cost?",
      answer: "We offer flexible pricing plans starting from ₹999/month for small businesses. During your demo call, we'll recommend the best plan for your needs. Plus, get 3 months free when you sign up during your demo!"
    },
    {
      question: "Can I track my review performance?",
      answer: "Yes! You get access to a dashboard showing review generation stats, rating distributions, and performance analytics to help you understand your customer satisfaction trends."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
    {/* Bottom CTA */}
          <div className="text-center mt-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help! Get in touch and we'll answer any questions about our AI Review System.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:9909908230"
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center"
                >
                  📞 Schedule a Call
                </a>
                <a
                  href="https://wa.me/919909908230?text=Hi%21%20I%27m%20interested%20in%20AI%20Review%20System%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center"
                >
                  💬 Live Chat Support
                </a>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ❓ Frequently Asked Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about our AI Review System. <br/> Can't find what you're looking for? Contact our support team!
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mt-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-200 transition-colors duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

      
        </div>
      </div>
    </section>
  );
};

export default FAQ;