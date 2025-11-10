import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Intervenez-vous uniquement en présentiel ?",
    answer:
      "Non, j'interviens aussi bien en présentiel (partout en France) qu'en visioconférence. Le format visio fonctionne très bien pour les conférences et même pour les ateliers, grâce à des outils interactifs en ligne (quiz, sondages, partages d'écran). Le présentiel reste plus impactant pour les formats longs, mais la visio offre flexibilité et économies logistiques.",
  },
  {
    question: "La conférence est-elle adaptée à tous les secteurs d'activité ?",
    answer:
      "Absolument. Que vous soyez dans le tertiaire, l'industrie, la santé, le retail ou tout autre secteur, les principes de nutrition et performance s'appliquent universellement. Je personnalise toujours mes exemples et cas pratiques selon votre secteur et vos enjeux spécifiques (travail posté, sédentarité, stress, etc.).",
  },
  {
    question: "Combien de participants peuvent assister à une conférence ?",
    answer:
      "La conférence seule peut accueillir de 10 à 200 participants. Pour les ateliers interactifs, je recommande des groupes de 15 à 50 personnes maximum pour garantir la qualité des échanges et l'engagement de chacun. Au-delà, nous pouvons organiser plusieurs sessions ou un format conférence plénière.",
  },
  {
    question: "Fournissez-vous des supports après la conférence ?",
    answer:
      "Oui, systématiquement. Chaque participant reçoit un document de synthèse PDF avec les points clés. Pour les séminaires sur mesure, je crée des supports 100% personnalisés à vos couleurs et enjeux.",
  },
  {
    question: "Quel est le délai pour organiser une intervention ?",
    answer:
      "Idéalement, comptez 3 à 4 semaines pour organiser sereinement l'événement (logistique, communication interne, personnalisation du contenu). Cela dit, selon mes disponibilités, des interventions plus rapides peuvent être envisagées. Contactez-moi pour vérifier mes créneaux disponibles.",
  },
  {
    question: "Proposez-vous un suivi après l'intervention ?",
    answer:
      "Pour les ateliers & formats séminaire sur mesure, oui. Je propose un suivi à J+30 (webinaire de rappel, session Q&R, nouveau contenu) pour ancrer les changements dans la durée. Pour les conférences uniques, le suivi n'est pas inclus par défaut mais peut être ajouté sur demande.",
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
        Vos questions (légitimes) 🤔
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
                  ? "max-h-40 opacity-100"
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
