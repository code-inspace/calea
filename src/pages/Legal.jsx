import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Legal() {
  return (
    <main className="relative w-full min-h-screen bg-paradou-cream text-paradou-green overflow-x-hidden pt-40">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 md:px-12 pb-32">
        <h1 className="font-serif text-5xl md:text-7xl mb-16 text-paradou-green">Mentions Légales</h1>
        
        <div className="font-sans text-lg leading-relaxed flex flex-col gap-12 text-paradou-green/80">
          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-paradou-green/50">1. Éditeur du site</h2>
            <p>Le site Caléa est édité par Axel Coudair.<br/>
            Adresse : Chemin des Crêtes, 83990 Saint-Tropez, France.<br/>
            Email : reception@calea-resort.com<br/>
            Directeur de la publication : Axel Coudair.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-paradou-green/50">2. Hébergement</h2>
            <p>Ce site est hébergé par Vercel Inc.<br/>
            340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-paradou-green/50">3. Propriété Intellectuelle</h2>
            <p>L'ensemble du contenu (textes, images, vidéos, design) est la propriété exclusive de Caléa ou de ses partenaires. Toute reproduction, totale ou partielle, est strictement interdite sans autorisation expresse préalable.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-paradou-green/50">4. Données Personnelles</h2>
            <p>Les informations recueillies via les formulaires de réservation ou de contact ne sont utilisées que dans le cadre de votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ce droit en nous envoyant un email à reception@calea-resort.com.</p>
          </section>

          <section>
            <h2 className="font-inter font-medium tracking-[0.2em] uppercase text-sm mb-4 text-paradou-green/50">5. Cookies</h2>
            <p>Ce site utilise uniquement des cookies strictement nécessaires à son fonctionnement. Aucun cookie de ciblage publicitaire intrusif n'est déployé à votre insu.</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
