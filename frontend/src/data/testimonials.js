import {
    Flame,
    Sparkles,
    Share2,
    CheckCircle2,
    BookOpen,
    Heart,
    Star,
} from "lucide-react";

// Avis transcrits depuis les messages reçus sur Instagram, réécrits au propre.
// Prénoms et rôles anonymisés pour respecter la vie privée des abonnés.
const testimonials = [
    {
        id: 1,
        initials: "SM",
        name: "Sarah M.",
        role: "Abonnée Instagram",
        quote:
            "Merci pour ton contenu anti-bullshit. Tu parles vrai, tu parles fort et sans filtre, j'adore.",
        tags: [
            { text: "Sans filtre", type: "featured" },
            { text: "Anti-bullshit", type: "default" },
        ],
        stats: [{ icon: Flame, text: "Cash & vrai" }],
        avatarGradient: "linear-gradient(135deg, #ff9500 0%, #995900 100%)",
    },
    {
        id: 2,
        initials: "MD",
        name: "Manon D.",
        role: "Nouvelle membre",
        quote:
            "Je n'envoie jamais de message, mais ton compte est une pépite. Je suis tombée dessus il y a quelques jours et l'abonnement a été instantané. Merci, et continue !",
        tags: [
            { text: "Abonnement instantané", type: "featured" },
            { text: "Pépite", type: "default" },
        ],
        stats: [{ icon: Sparkles, text: "Coup de cœur" }],
        avatarGradient: "linear-gradient(135deg, #b8860b 0%, #6b4f00 100%)",
    },
    {
        id: 3,
        initials: "CR",
        name: "Camille R.",
        role: "Membre de la communauté",
        quote:
            "J'adore ce que tu proposes, c'est très instructif et je suis admirative de tout ton savoir. J'ai envoyé tes vidéos à plein de proches, c'est d'utilité publique. Avec mon conjoint, on s'intéresse de plus en plus à l'impact de l'alimentation sur notre santé.",
        tags: [
            { text: "Instructif", type: "featured" },
            { text: "Utilité publique", type: "default" },
        ],
        stats: [{ icon: Share2, text: "Partagé à ses proches" }],
        avatarGradient: "linear-gradient(135deg, #d3b897 0%, #8b4513 100%)",
    },
    {
        id: 4,
        initials: "TL",
        name: "Thomas L.",
        role: "Membre",
        quote:
            "Tu fais du super contenu et je résonne pas mal avec le message, alors merci beaucoup. C'est quand même fou que manger en majorité des aliments bruts soit considéré comme anormal de nos jours.",
        tags: [
            { text: "Aliments bruts", type: "featured" },
            { text: "Sur le fond", type: "default" },
        ],
        stats: [{ icon: CheckCircle2, text: "Convaincu" }],
        avatarGradient: "linear-gradient(135deg, #e0a23b 0%, #7a4e10 100%)",
    },
    {
        id: 5,
        initials: "IB",
        name: "Inès B.",
        role: "Membre",
        quote:
            "J'aime beaucoup ton compte parce que tu ne parles pas que d'alimentation : tu vas plus loin et tu montres comment bien manger peut impacter notre spiritualité, notre énergie, notre fréquence. J'adore les sujets profonds comme ça, ça fait vibrer mon âme.",
        tags: [
            { text: "Sujets profonds", type: "featured" },
            { text: "Énergie", type: "default" },
        ],
        stats: [{ icon: Sparkles, text: "Éveil" }],
        avatarGradient: "linear-gradient(135deg, #c98a3a 0%, #5c3a0a 100%)",
    },
    {
        id: 6,
        initials: "NK",
        name: "Naomi K.",
        role: "Abonnée Instagram",
        quote:
            "Tu devrais faire un livre sur comment se nourrir, s'il te plaît ! Merci pour tes vidéos et tes enseignements, merci de les partager gratuitement, c'est un cadeau infini.",
        tags: [
            { text: "Cadeau gratuit", type: "featured" },
            { text: "Pédagogie", type: "default" },
        ],
        stats: [{ icon: BookOpen, text: "Veut le livre" }],
        avatarGradient: "linear-gradient(135deg, #b8860b 0%, #4d3600 100%)",
    },
    {
        id: 7,
        initials: "SV",
        name: "Sophie V.",
        role: "Membre",
        quote:
            "Un grand merci pour vos conseils santé. Grâce à vous, je change mon alimentation au quotidien au profit de vos précieux conseils. Merci Alionka !",
        tags: [
            { text: "Passage à l'action", type: "featured" },
            { text: "Résultats", type: "default" },
        ],
        stats: [{ icon: CheckCircle2, text: "A changé son assiette" }],
        avatarGradient: "linear-gradient(135deg, #ffb347 0%, #a85f00 100%)",
    },
    {
        id: 8,
        initials: "LP",
        name: "Léa P.",
        role: "Abonnée Instagram",
        quote:
            "Merci pour tout ce que tu fais sur les réseaux ! Je suis fan, c'est authentique, tout ce que j'aime chez un humain. Merci encore pour tes vibes.",
        tags: [
            { text: "Authentique", type: "featured" },
            { text: "Fan", type: "default" },
        ],
        stats: [{ icon: Heart, text: "Fan de la première heure" }],
        avatarGradient: "linear-gradient(135deg, #d3b897 0%, #7a4e10 100%)",
    },
    {
        id: 9,
        initials: "YA",
        name: "Yanis A.",
        role: "Abonné Instagram",
        quote:
            "Lourd, ton compte Instagram. De bons conseils nutritionnels, je valide. Bonne continuation !",
        tags: [
            { text: "Validé", type: "featured" },
            { text: "Conseils nutrition", type: "default" },
        ],
        stats: [{ icon: Flame, text: "Coup de cœur" }],
        avatarGradient: "linear-gradient(135deg, #ff9500 0%, #804b00 100%)",
    },
    {
        id: 10,
        initials: "MT",
        name: "Marc T.",
        role: "Membre",
        quote:
            "Un grand merci pour tes vidéos, tes explications claires, référencées et argumentées, ton énergie et la diffusion de très belles et saines valeurs. C'est d'une grande richesse et ça participe à l'éveil des consciences.",
        tags: [
            { text: "Sources & références", type: "featured" },
            { text: "Valeurs", type: "default" },
        ],
        stats: [{ icon: Star, text: "Éveil des consciences" }],
        avatarGradient: "linear-gradient(135deg, #b8860b 0%, #5c3a0a 100%)",
    },
];

export default testimonials;
