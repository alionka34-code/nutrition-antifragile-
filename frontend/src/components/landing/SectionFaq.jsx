import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Intervenez-vous uniquement en présentiel ?",
    answer:
      "Les deux ! Le présentiel maximise l’impact émotionnel. La visio permet une diffusion rapide sur plusieurs sites. Les formats hybrides sont possibles selon vos contraintes logistiques.",
  },
  {
    question: "Est-ce vraiment adapté à un public d’entreprise ?",
    answer:
      "Absolument. Chaque intervention est conçue pour des collaborateurs et managers, quel que soit le secteur. Les exemples, messages et supports sont contextualisés à vos enjeux : énergie, concentration, stress, rythme de travail, postures de performance.",
  },
  {
    question: "Combien de personnes peuvent participer ?",
    answer:
      "Conférence seule : 20 à 300 participants (présentiel ou visio)/ Ateliers interactifs : 15 à 50 personnes pour favoriser la participation. Pour de grands effectifs, plusieurs sessions ou un format plénière peuvent être organisés.",
  },
  {
    question: "Fournissez-vous des supports après la conférence ?",
    answer:
      "Oui. Chaque participant repart avec un mini-guide PDF récapitulatif des points clés.",
  },
  {
    question: "Quel est le délai pour organiser une intervention ?",
    answer:
      "3 à 4 semaines pour un format personnalisé (contenu, logistique, communication interne). Des interventions plus rapides sont possibles selon mes disponibilités.",
  },
  {
    question: "Quels résultats peut-on attendre concrètement ?",
    answer:
      "Un vrai déclic collectif dès la conférence : vos équipes comprennent ce qui freine leur énergie et leur concentration. Dans les semaines suivantes :  plus d’énergie, moins de coups de fatigue ; réunions plus efficaces, climat apaisé & engagement et performance en hausse",
  },
    
    
];

export default function SectionFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-4 md:max-w-5xl md:mx-auto py-16 px-6" id="faq">
      <h2 className="text-3xl font-bold text-center mb-10">
      Questions fréquentes (FAQ)
      </h2>
      <div className="space-y-8 font-SFBold">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-2xl shadow-md overflow-hidden bg-white dark:bg-neutral-900"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left text-lg text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-300 transition"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-6 pb-4 text-gray-600 dark:text-white transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "h-full opacity-100"
                  : "max-h-0 opacity-0 overflow-hidden"
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
