import React from "react";

function SectionTestimonial() { 
    return (
        <section className="mx-4 md:mx-auto md:max-w-5xl my-20">
                <h2 className="text-center font-SFBold text-4xl">Il m'ont fait <span className="text-marron">confiance.</span></h2>
                <div className="mt-10 flex flex-col md:flex-row gap-10 justify-center items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
                        <p className="font-SF italic text-lg">"Grâce à l'accompagnement de Nut, j'ai réussi à transformer mes habitudes alimentaires. Ses conseils sont pratiques et adaptés à mon mode de vie."</p>
                        <h3 className="mt-4 font-SFBold text-marron">— Sophie L.</h3>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
                        <p className="font-SF italic text-lg">"Les sessions avec Nut m'ont aidé à comprendre l'importance de la nutrition dans ma performance sportive. Je me sens plus énergique et concentré."</p>
                        <h3 className="mt-4 font-SFBold text-marron">— Marc D.</h3>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg max-w-md">
                        <p className="font-SF italic text-lg">"Je recommande vivement Nut à toute personne cherchant à améliorer sa santé. Son approche est bienveillante et motivante."</p>
                        <h3 className="mt-4 font-SFBold text-marron">— Claire P.</h3>
                    </div>
                </div>
        </section>
        
    );
}

export default SectionTestimonial;