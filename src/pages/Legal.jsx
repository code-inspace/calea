import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Legal() {
  return (
    <main className="relative w-full min-h-screen bg-calea-cream text-calea-primary overflow-x-hidden">
      <Helmet>
        <title>Mentions Légales · Caléa Resort</title>
        <meta name="description" content="Mentions légales du site Caléa Resort : éditeur, hébergement, propriété intellectuelle, données personnelles et cookies." />
      </Helmet>
      <Navbar />
      
      {/* Mini Hero with sober background image */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center mb-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1600&q=75"
            alt="Mentions Légales" 
            className="w-full h-full object-cover grayscale opacity-80"
          />
          <div className="absolute inset-0 bg-calea-primary/70 mix-blend-multiply" />
        </div>
        <h1 className="relative z-10 font-serif text-5xl md:text-7xl text-white tracker-wider mt-16">
          Mentions Légales
        </h1>
      </section>

      <div className="max-w-4xl mx-auto px-4 md:px-12 pb-32">
        <div className="font-sans text-lg leading-relaxed flex flex-col gap-12 text-calea-primary/80">
          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-calea-primary/50">1. Éditeur du site</h2>
            <p>Le site Caléa est édité par Axel Coudair.<br/>
            Adresse : Chemin des Crêtes, 83990 Saint-Tropez, France.<br/>
            Email : reception@calea-resort.com<br/>
            Directeur de la publication : Axel Coudair.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-calea-primary/50">2. Hébergement</h2>
            <p>Ce site est hébergé par Vercel Inc.<br/>
            340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-calea-primary/50">3. Propriété Intellectuelle</h2>
            <p>L'ensemble du contenu (textes, images, vidéos, design) est la propriété exclusive de Caléa ou de ses partenaires. Toute reproduction, totale ou partielle, est strictement interdite sans autorisation expresse préalable.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-calea-primary/50">4. Données Personnelles</h2>
            <p>Les informations recueillies via les formulaires de réservation ou de contact ne sont utilisées que dans le cadre de votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit en nous envoyant un email à reception@calea-resort.com.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-calea-primary/50">5. Cookies</h2>
            <p>Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement. Aucun cookie de ciblage publicitaire intrusif n'est déployé à votre insu.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
