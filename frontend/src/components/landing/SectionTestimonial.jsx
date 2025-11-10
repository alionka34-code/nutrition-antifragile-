import React from "react";

function SectionTestimonial() { 
    return (
        <section className="mx-4 md:mx-auto md:max-w-5xl my-20">
                <h2 className="text-center font-SFBold text-4xl">Il m'ont fait <span className="text-marron">confiance.</span></h2>
                <div className="mt-10 flex flex-col md:flex-row gap-10 justify-center items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
                        <p className="font-SF italic text-lg">"Alionka capte l’attention dès les premières minutes. Les collaborateurs sont sortis avec des déclics simples, applicables dès le lendemain. On a senti une vraie montée d’énergie et un meilleur focus dans les jours qui ont suivi."</p>
                        <h3 className="mt-4 font-SFBold text-marron">— Sophie L. DRH, Groupe Industriel</h3>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
                        <p className="font-SF italic text-lg">"Pas de théorie ennuyeuse : des exemples concrets, de l’interaction, et surtout une prise de conscience collective. L’impact sur la concentration et le climat d’équipe s’est vu très vite."</p>
                        <h3 className="mt-4 font-SFBold text-marron">— Marc D. Responsable RH, Entreprise de services</h3>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
                        <p className="font-SF italic text-lg">"Le séminaire a déclenché de vraies discussions internes. Les équipes se sentent plus concernées par leur énergie et ça change l’ambiance au travail. On m’en reparle encore des semaines après."</p>
                        <h3 className="mt-4 font-SFBold text-marron">— Claire P. Directrice communication, PME Tech</h3>
                    </div>
                </div>
        </section>
        
    );
}

export default SectionTestimonial;
