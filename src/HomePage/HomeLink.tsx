import Header from "./Header";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Industries from "./Industries";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing1";
import LeadForm from "./LeadForm";
import FAQ from "./FAQ";
import Footer from "./Footer";

function HomeLink() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="industries">
          <Industries />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="lead-form">
          <LeadForm />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919909908230?text=Hi!%20I'm%20interested%20in%20AI%20Review%20System%20for%20my%20business."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 group"
      >
        <div className="relative">
          {/* Outer glow ring */}
          <span className="absolute inset-0 rounded-full bg-green-500/80 blur-xl opacity-90 group-hover:opacity-40 transition duration-300" />
          <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 via-green-500 to-emerald-500 animate-pulse opacity-30" />

          {/* Button core */}
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#058E34] shadow-lg shadow-green-600/40 flex items-center justify-center text-white ring-4 ring-green-500/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-8 h-8 drop-shadow-sm"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
            </svg>
            <span className="sr-only">Open WhatsApp chat</span>
          </div>
        </div>
      </a>

      <Footer />
    </div>
  );
}

export default HomeLink;
