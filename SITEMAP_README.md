# 🗺️ Sitemap - Nutrition Antifragile

Ce document explique comment fonctionne le système de sitemap du site Nutrition Antifragile.

## 📋 Vue d'ensemble

Le site utilise un système de sitemap **dynamique** et **statique** pour optimiser le référencement SEO :

- **Sitemap dynamique** : Généré automatiquement par Django sur `/sitemap.xml`
- **Sitemap statique** : Fichier `sitemap.xml` sauvegardé à la racine du projet

## 🏗️ Structure du sitemap

### Pages statiques (10 URLs)
- `/` - Page d'accueil (priorité: 1.0, maj: daily)
- `/livre` - Page livre (priorité: 0.5, maj: monthly)  
- `/articles` - Liste des articles (priorité: 0.8, maj: weekly)
- `/abonnement` - Page abonnement (priorité: 0.8, maj: monthly)
- `/contact` - Contact (priorité: 0.5, maj: monthly)
- `/connexion` - Connexion (priorité: 0.5, maj: monthly)
- `/mentions-legales` - Mentions légales (priorité: 0.5, maj: monthly)  
- `/cgv` - CGV (priorité: 0.5, maj: monthly)
- `/cgu` - CGU (priorité: 0.5, maj: monthly)
- `/rgpd` - RGPD (priorité: 0.5, maj: monthly)

### Articles dynamiques (actuellement 10 URLs)
- `/articles/{slug}` - Chaque article avec son slug unique
- Priorité basée sur l'âge : 0.9 (récent), 0.7 (moyen), 0.5 (ancien)
- Fréquence de mise à jour : weekly
- Date de dernière modification incluse

## 🚀 URLs d'accès

### En développement
```
http://127.0.0.1:8000/sitemap.xml
```

### En production
```
# Frontend Vercel: https://alionka-houl.eo.symbiose-audiovisuelle.fr/sitemap.xml (redirects to backend)
# Backend Django/Railway: https://web-production-a7977.up.railway.app/sitemap.xml
https://alionka-houl.eo.symbiose-audiovisuelle.fr/sitemap.xml
```

## 🛠️ Génération du sitemap

### 1. Commande Django (recommandée)
```bash
python manage.py generate_sitemap
```

### 2. Script Python autonome
```bash
python generate_sitemap.py
```

### 3. Génération manuelle via curl
```bash
curl -s http://127.0.0.1:8000/sitemap.xml > sitemap.xml
xmllint --format sitemap.xml > sitemap_formatted.xml
mv sitemap_formatted.xml sitemap.xml
```

## 📁 Fichiers impliqués

### Configuration principale
- `blog/sitemaps.py` - Classes de génération du sitemap
- `backend/urls.py` - Configuration des URLs de sitemap

### Scripts de génération
- `generate_sitemap.py` - Script autonome
- `blog/management/commands/generate_sitemap.py` - Commande Django

### Fichier de sortie
- `sitemap.xml` - Fichier sitemap formaté (4.7Ko, 20 URLs)

## 🔄 Mise à jour automatique

Le sitemap dynamique Django se met à jour automatiquement quand :
- ✅ Un nouvel article est publié
- ✅ Un article existant est modifié  
- ✅ Un article est supprimé

Le fichier statique doit être régénéré manuellement après des changements.

## 📊 Statistiques actuelles

- **Total URLs** : 20
- **Pages statiques** : 10  
- **Articles** : 10
- **Taille fichier** : 4,683 bytes
- **Format** : XML sitemap standard
- **Protocole** : HTTPS

## 🔍 Validation SEO

Le sitemap respecte les standards :
- ✅ Format XML sitemap 0.9
- ✅ URLs en HTTPS
- ✅ Priorités définies (0.5 à 1.0)
- ✅ Fréquences de mise à jour
- ✅ Dates de modification pour les articles
- ✅ Formatage propre et lisible

## 🚨 Maintenance

### Régénérer après :
- Ajout de nouveaux articles
- Modification des URLs de pages statiques
- Changement de domaine
- Mise à jour majeure du site

### Vérification :
```bash
# Tester l'accès au sitemap
curl -I http://127.0.0.1:8000/sitemap.xml

# Valider le XML
xmllint --noout sitemap.xml && echo "✅ XML valide"

# Compter les URLs
grep -c "<url>" sitemap.xml
```

---

*Dernière mise à jour : 29 septembre 2025*
