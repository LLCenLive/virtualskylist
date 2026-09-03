(() => {
  "use strict";

  /* =======================================================
     Translations
     ======================================================= */
  const translations = {
    fr: {
      "nav.home": "Accueil",
      "nav.tierlists": "Tier Lists",
      "nav.trends": "Tendances",
      "nav.community": "Communauté",
      "nav.suggest": "Proposer du contenu",
      "nav.signin": "Se connecter",

      "hero.eyebrow": "Créé par des pilotes. Classé par la communauté.",
      "hero.title1": "Classez l’aviation.",
      "hero.title2": "Découvrez les",
      "hero.title3": "favoris de la communauté.",
      "hero.sub": "Vote pour les avions, compagnies aériennes, aéroports et add-ons de simulateur de vol. Les données de notre communauté révèlent les favoris et les valeurs montantes.",
      "hero.cta2": "Explorer les classements",

      "featured.label": "Tier list en vedette",
      "featured.title": "Avions de ligne commerciaux",
      "featured.empty.body": "Personne n’a encore classé cette tier list. Sois le premier à voter et à faire émerger le classement de la communauté.",
      "featured.empty.cta": "Commencer le classement",

      "trending.title": "Tier lists tendance",
      "trending.viewall": "Voir tout",

      "card1.title": "Meilleurs avions de ligne",
      "card1.desc": "Classement des meilleurs avions de ligne commerciaux de tous les temps.",

      "card2.title": "Meilleurs add-ons MSFS",
      "card2.desc": "Avions payware et studios pour MSFS 2024\u00a0: PMDG, Fenix, iniBuilds, ToLiss, A2A, Just Flight, Carenado et plus.",

      "card3.title": "Meilleurs aéroports",
      "card3.desc": "Les meilleurs aéroports du monde, pour l’exploitation comme pour l’expérience.",

      "card4.title": "Meilleures livrées",
      "card4.desc": "Les livrées les plus iconiques et les plus belles de l’aviation.",

      "votes.empty": "Pas encore de votes",

      "community.title": "Top avions de la communauté",
      "community.empty": "Aucun vote pour le moment. Sois le premier à classer un avion !",
      "community.viewall": "Voir tous les classements",

      "now.title": "Tendances du moment",
      "now.empty": "Pas encore de tendances à afficher.",

      "suggest.eyebrow": "Proposer du contenu",
      "suggest.title": "Aidez à façonner VirtualSkyList",
      "suggest.sub": "Aidez-nous à façonner VirtualSkyList en proposant de nouvelles tier lists ou des avions qui manquent.",
      "suggest.form1.title": "Proposer une tier list",
      "suggest.form1.placeholder": "ex. Meilleurs avions cargo",
      "suggest.form1.category": "Catégorie",
      "suggest.opt.airliners": "Avions de ligne",
      "suggest.opt.ga": "Aviation générale",
      "suggest.opt.airports": "Aéroports",
      "suggest.opt.addons": "Add-ons simulateur",
      "suggest.opt.liveries": "Livrées",
      "suggest.submit": "Envoyer la suggestion",
      "suggest.or": "OU",
      "suggest.form2.title": "Proposer un avion",
      "suggest.form2.placeholder": "ex. Boeing 777-8",
      "suggest.form2.type": "Type d’avion",
      "suggest.opt.airliner": "Avion de ligne",
      "suggest.opt.gaSingle": "Aviation générale",
      "suggest.opt.heli": "Hélicoptère",
      "suggest.opt.military": "Militaire",
      "suggest.opt.cargo": "Cargo",

      "footer.copyright": "© 2026 VirtualSkyList. Tous droits réservés.",
      "footer.privacy": "Confidentialité",
      "footer.terms": "Conditions",
      "footer.contact": "Contact",
      "footer.credit": "Site réalisé par LLCenLive",

      "nav.admin": "Admin",

      "toast.tierlist": "Merci ! Ta suggestion de tier list a bien été envoyée.",
      "toast.aircraft": "Merci ! Ta suggestion d’avion a bien été envoyée.",

      /* ---- Tier Lists page ---- */
      "tierlists.page.title": "Toutes les tier lists",
      "tierlists.page.sub": "Explore les classements de la communauté et vote pour tes favoris.",
      "tierlists.search.placeholder": "Rechercher une tier list…",
      "tierlists.filter.all": "Tout",
      "tierlists.filter.airliners": "Avions de ligne",
      "tierlists.filter.airlines": "Compagnies aériennes",
      "tierlists.filter.ga": "Aviation générale",
      "tierlists.filter.airports": "Aéroports",
      "tierlists.filter.liveries": "Livrées",
      "tierlists.filter.addons": "Add-ons MSFS",
      "tierlists.empty": "Aucune tier list ne correspond à ta recherche.",
      "tierlists.badge.msfs": "MSFS 2024",

      "tl.airlines.title": "Meilleures compagnies aériennes",
      "tl.airlines.desc": "Service, confort et fiabilité\u00a0: le classement des meilleures compagnies aériennes par la communauté.",

      "tl.msfsAirliners.title": "Avions de ligne payware — MSFS 2024",
      "tl.msfsAirliners.desc": "Onze studios, un seul verdict\u00a0: Fenix, FSLabs, PMDG, iniBuilds, Aerosoft, ToLiss, TFDi, Fokker et plus.",

      "tl.msfsGA.title": "Aviation générale payware — MSFS 2024",
      "tl.msfsGA.desc": "Monomoteurs et bimoteurs payware\u00a0: A2A, BlackSquare, Just Flight, Carenado, Milviz, SimWorks Studios et plus.",

      "tl.msfsStudios.title": "Studios payware & freeware — MSFS 2024",
      "tl.msfsStudios.desc": "Vingt éditeurs, tous segments confondus\u00a0: liners, régional, GA, hélico, warbirds.",

      /* ---- Trends page ---- */
      "trends.page.title": "Tendances",
      "trends.page.sub": "Ce qui grimpe (et ce qui chute) dans les classements de la communauté.",
      "trends.range.week": "Cette semaine",
      "trends.range.month": "Ce mois",
      "trends.range.all": "Toujours",
      "trends.podium.title": "Top 3 de la semaine",
      "trends.podium.empty": "Pas encore de classement cette semaine.",
      "trends.risers.title": "Plus fortes progressions",
      "trends.risers.empty": "Aucune progression pour le moment.",
      "trends.fallers.title": "Plus fortes baisses",
      "trends.fallers.empty": "Aucune baisse pour le moment.",
      "trends.chart.title": "Activité de vote",
      "trends.chart.empty": "Pas encore de données de vote.",

      /* ---- Community page ---- */
      "community.page.title": "Communauté",
      "community.page.sub": "Découvre les pilotes qui façonnent VirtualSkyList.",
      "community.seeTrends": "Voir les tendances",
      "stat.members.label": "Membres actifs",
      "stat.lists.label": "Tier lists disponibles",
      "stat.votes.label": "Votes total",
      "stat.aircraft.label": "Avions référencés",

      "leaderboard.title": "Meilleurs contributeurs",
      "leaderboard.empty": "Aucun contributeur pour le moment.",

      "activity.title": "Activité récente",
      "activity.empty": "Aucune activité récente.",

      /* ---- Tier list builder page ---- */
      "builder.validate": "Valider mon classement",
      "builder.reset": "Réinitialiser",
      "builder.hangar": "Hangar",
      "builder.hangarHint": "Fais glisser chaque élément dans un tier.",
      "builder.community": "Classement de la communauté",
      "builder.empty": "Sois le premier à voter !",
      "builder.loading": "Chargement…",
      "builder.error": "Impossible de charger cette tier list.",
      "builder.saved": "Merci ! Ton classement a été enregistré.",
      "builder.saveError": "L'enregistrement a échoué. Réessaie.",
      "builder.votesSuffix": "votes",
      "tier.s.label": "GOTY",
      "tier.a.label": "Superbe",
      "tier.b.label": "Cool",
      "tier.c.label": "Correct",
      "tier.d.label": "Mauvais",

      /* ---- Auth modal ---- */
      "auth.title.signin": "Se connecter",
      "auth.title.signup": "Créer un compte",
      "auth.email.label": "Email",
      "auth.password.label": "Mot de passe",
      "auth.submit.signin": "Se connecter",
      "auth.submit.signup": "Créer le compte",
      "auth.switch.toSignup": "Pas encore de compte ? Crée-en un",
      "auth.switch.toSignin": "Déjà un compte ? Connecte-toi",
      "auth.error.generic": "Une erreur est survenue. Réessaie.",
      "auth.success.signup": "Compte créé ! Vérifie tes emails pour confirmer.",
      "auth.signout": "Déconnexion",

      /* ---- Admin page ---- */
      "admin.page.title": "Administration",
      "admin.page.sub": "Gère les tier lists et leurs éléments.",
      "admin.gate.needLogin.title": "Connexion requise",
      "admin.gate.needLogin.body": "Connecte-toi pour accéder à l’administration.",
      "admin.gate.notAdmin.title": "Accès refusé",
      "admin.gate.notAdmin.body": "Ton compte n’a pas les droits d’administration.",
      "admin.notConfigured": "Backend non connecté.",
      "admin.tierlists.title": "Tier lists",
      "admin.addTierlist": "Ajouter une tier list",
      "admin.field.slug": "Identifiant (slug)",
      "admin.field.titleFr": "Titre (FR)",
      "admin.field.titleEn": "Titre (EN)",
      "admin.field.descFr": "Description (FR)",
      "admin.field.descEn": "Description (EN)",
      "admin.save": "Enregistrer",
      "admin.cancel": "Annuler",
      "admin.delete": "Supprimer",
      "admin.edit": "Modifier",
      "admin.items.title": "Éléments",
      "admin.addItem": "Ajouter un élément",
      "admin.field.name": "Nom",
      "admin.field.subtitle": "Sous-titre (optionnel)",
      "admin.confirmDeleteList": "Supprimer cette tier list et tous ses éléments ?",
      "admin.confirmDeleteItem": "Supprimer cet élément ?",
      "admin.saved": "Enregistré.",
      "admin.deleted": "Supprimé.",
      "admin.loadError": "Impossible de charger les données.",
      "admin.noItems": "Aucun élément pour le moment.",

      /* ---- Legal / footer pages ---- */
      "legal.privacy.title": "Politique de confidentialité",
      "legal.privacy.p1": "VirtualSkyList est un projet communautaire non commercial. On ne diffuse aucune publicité et on ne vend aucune donnée.",
      "legal.privacy.p2": "Si tu crées un compte, on stocke ton email et ton mot de passe (chiffré) via Supabase, notre hébergeur de base de données, uniquement pour te permettre de te connecter et de proposer du contenu.",
      "legal.privacy.p3": "Voter sur une tier list ne nécessite pas de compte : un identifiant anonyme est généré dans ton navigateur pour éviter les votes en double, sans lien avec ton identité.",
      "legal.privacy.p4": "Pour toute question sur tes données, contacte-nous sur Discord.",
      "legal.terms.title": "Conditions d’utilisation",
      "legal.terms.p1": "VirtualSkyList est un site communautaire créé par des passionnés d’aviation et de simulation de vol, sans lien officiel avec les constructeurs, compagnies aériennes ou studios mentionnés sur le site.",
      "legal.terms.p2": "Les classements reflètent les votes de la communauté et n’engagent pas VirtualSkyList sur la qualité réelle des produits ou services évoqués.",
      "legal.terms.p3": "Merci de rester respectueux dans tes suggestions et tes échanges avec la communauté. Tout contenu jugé inapproprié pourra être retiré.",
      "legal.terms.p4": "Ce site est amené à évoluer ; ces conditions pourront être mises à jour.",
      "legal.contact.title": "Contact",
      "legal.contact.p1": "La meilleure façon de nous joindre, c’est notre serveur Discord.",
      "legal.contact.cta": "Rejoindre le Discord",

      /* ---- Suggestions ---- */
      "suggest.needLogin": "Connecte-toi pour proposer du contenu.",
      "admin.nav.suggestions": "Suggestions",
      "admin.suggestions.title": "Suggestions de la communauté",
      "admin.suggestions.tierlists": "Tier lists proposées",
      "admin.suggestions.aircraft": "Avions proposés",
      "admin.suggestions.empty": "Aucune suggestion pour le moment.",
      "admin.nav.tierlists": "Tier lists",
      "admin.nav.clash": "The Clash",

      /* ---- Tier board (builder) ---- */
      "tier.untested.label": "Non testé",
      "builder.export": "Exporter en PNG",
      "builder.exporting": "Génération…",

      /* ---- The Clash ---- */
      "nav.clash": "The Clash",
      "clash.page.title": "The Clash",
      "clash.page.sub": "Chaque semaine, deux avions s’affrontent. Vote pour ton préféré !",
      "clash.vs": "VS",
      "clash.vote": "Voter",
      "clash.voted": "Merci pour ton vote !",
      "clash.results": "Résultats",
      "clash.empty": "Pas de clash actif pour le moment.",
      "clash.loadError": "Impossible de charger le clash.",
      "admin.clash.title": "The Clash",
      "admin.clash.current": "Round actuel",
      "admin.field.itemA": "Concurrent A",
      "admin.field.itemB": "Concurrent B",
      "admin.field.imageUrl": "URL de l’image (optionnel)",
      "admin.clash.publish": "Publier ce round",
      "admin.field.category": "Catégorie",
      "day.sun": "Dim", "day.mon": "Lun", "day.tue": "Mar", "day.wed": "Mer",
      "day.thu": "Jeu", "day.fri": "Ven", "day.sat": "Sam",

      "activity.newTierlist": "Nouvelle tier list : {label}",
      "activity.newMember": "Un nouveau membre s’est inscrit",
      "activity.newSuggestion": "{actor} a proposé : {label}",
      "leaderboard.suggestions": "{n} suggestion(s)",
      "time.justNow": "À l’instant",
      "time.minutesAgo": "Il y a {n} min",
      "time.hoursAgo": "Il y a {n} h",
      "time.daysAgo": "Il y a {n} j"
    },

    en: {
      "nav.home": "Home",
      "nav.tierlists": "Tier Lists",
      "nav.trends": "Trends",
      "nav.community": "Community",
      "nav.suggest": "Suggest Content",
      "nav.signin": "Sign In",

      "hero.eyebrow": "Built by pilots. Ranked by the community.",
      "hero.title1": "Rank aviation.",
      "hero.title2": "Discover the",
      "hero.title3": "community's favorites.",
      "hero.sub": "Vote on aircraft, airlines, airports, and flight sim add-ons. Our community data reveals the overall favorites and biggest risers.",
      "hero.cta2": "Explore Rankings",

      "featured.label": "Featured tier list",
      "featured.title": "Commercial Airliners",
      "featured.empty.body": "No one has ranked this tier list yet. Be the first to vote and kick off the community ranking.",
      "featured.empty.cta": "Start ranking",

      "trending.title": "Trending tier lists",
      "trending.viewall": "View all",

      "card1.title": "Best Airliners",
      "card1.desc": "Ranking the best commercial airliners of all time.",

      "card2.title": "Best MSFS Add-ons",
      "card2.desc": "Payware aircraft and studios for MSFS 2024: PMDG, Fenix, iniBuilds, ToLiss, A2A, Just Flight, Carenado and more.",

      "card3.title": "Best Airports",
      "card3.desc": "The world's greatest airports for ops and experience.",

      "card4.title": "Best Airline Liveries",
      "card4.desc": "The most iconic and beautiful liveries in aviation.",

      "votes.empty": "No votes yet",

      "community.title": "Community top aircraft",
      "community.empty": "No votes yet. Be the first to rank an aircraft!",
      "community.viewall": "View full rankings",

      "now.title": "Trending now",
      "now.empty": "No trends to show yet.",

      "suggest.eyebrow": "Suggest content",
      "suggest.title": "Help shape VirtualSkyList",
      "suggest.sub": "Help shape VirtualSkyList by suggesting new tier lists or aircraft we're missing.",
      "suggest.form1.title": "Suggest a Tier List",
      "suggest.form1.placeholder": "e.g., Best Cargo Aircraft",
      "suggest.form1.category": "Category",
      "suggest.opt.airliners": "Airliners",
      "suggest.opt.ga": "General Aviation",
      "suggest.opt.airports": "Airports",
      "suggest.opt.addons": "Sim Add-ons",
      "suggest.opt.liveries": "Liveries",
      "suggest.submit": "Submit Suggestion",
      "suggest.or": "OR",
      "suggest.form2.title": "Suggest an Aircraft",
      "suggest.form2.placeholder": "e.g., Boeing 777-8",
      "suggest.form2.type": "Aircraft Type",
      "suggest.opt.airliner": "Airliner",
      "suggest.opt.gaSingle": "General Aviation",
      "suggest.opt.heli": "Helicopter",
      "suggest.opt.military": "Military",
      "suggest.opt.cargo": "Cargo",

      "footer.copyright": "© 2026 VirtualSkyList. All rights reserved.",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.contact": "Contact",
      "footer.credit": "Made by LLCenLive",

      "nav.admin": "Admin",

      "toast.tierlist": "Thanks! Your tier list suggestion was sent.",
      "toast.aircraft": "Thanks! Your aircraft suggestion was sent.",

      /* ---- Tier Lists page ---- */
      "tierlists.page.title": "All Tier Lists",
      "tierlists.page.sub": "Browse community rankings and vote for your favorites.",
      "tierlists.search.placeholder": "Search tier lists…",
      "tierlists.filter.all": "All",
      "tierlists.filter.airliners": "Airliners",
      "tierlists.filter.airlines": "Airlines",
      "tierlists.filter.ga": "General Aviation",
      "tierlists.filter.airports": "Airports",
      "tierlists.filter.liveries": "Liveries",
      "tierlists.filter.addons": "MSFS Add-ons",
      "tierlists.empty": "No tier lists match your search.",
      "tierlists.badge.msfs": "MSFS 2024",

      "tl.airlines.title": "Best Airlines",
      "tl.airlines.desc": "Service, comfort, and reliability: the community's ranking of the best airlines.",

      "tl.msfsAirliners.title": "Payware Airliners — MSFS 2024",
      "tl.msfsAirliners.desc": "Eleven studios, one verdict: Fenix, FSLabs, PMDG, iniBuilds, Aerosoft, ToLiss, TFDi, Fokker and more.",

      "tl.msfsGA.title": "Payware General Aviation — MSFS 2024",
      "tl.msfsGA.desc": "Payware single and twin-engine aircraft: A2A, BlackSquare, Just Flight, Carenado, Milviz, SimWorks Studios and more.",

      "tl.msfsStudios.title": "Payware & Freeware Studios — MSFS 2024",
      "tl.msfsStudios.desc": "Twenty publishers across every segment: liners, regional, GA, helicopters, warbirds.",

      /* ---- Trends page ---- */
      "trends.page.title": "Trends",
      "trends.page.sub": "What's rising (and falling) in community rankings.",
      "trends.range.week": "This week",
      "trends.range.month": "This month",
      "trends.range.all": "All time",
      "trends.podium.title": "This week's top 3",
      "trends.podium.empty": "No ranking yet this week.",
      "trends.risers.title": "Biggest risers",
      "trends.risers.empty": "No risers yet.",
      "trends.fallers.title": "Biggest fallers",
      "trends.fallers.empty": "No fallers yet.",
      "trends.chart.title": "Voting activity",
      "trends.chart.empty": "No voting data yet.",

      /* ---- Community page ---- */
      "community.page.title": "Community",
      "community.page.sub": "Meet the pilots shaping VirtualSkyList.",
      "community.seeTrends": "See trends",
      "stat.members.label": "Active members",
      "stat.lists.label": "Tier lists available",
      "stat.votes.label": "Total votes",
      "stat.aircraft.label": "Aircraft listed",

      "leaderboard.title": "Top contributors",
      "leaderboard.empty": "No contributors yet.",

      "activity.title": "Recent activity",
      "activity.empty": "No recent activity.",

      /* ---- Tier list builder page ---- */
      "builder.validate": "Submit my ranking",
      "builder.reset": "Reset",
      "builder.hangar": "Hangar",
      "builder.hangarHint": "Drag each item into a tier.",
      "builder.community": "Community ranking",
      "builder.empty": "Be the first to vote!",
      "builder.loading": "Loading…",
      "builder.error": "Couldn't load this tier list.",
      "builder.saved": "Thanks! Your ranking was saved.",
      "builder.saveError": "Saving failed. Please try again.",
      "builder.votesSuffix": "votes",
      "tier.s.label": "GOTY",
      "tier.a.label": "Superb",
      "tier.b.label": "Cool",
      "tier.c.label": "Correct",
      "tier.d.label": "Bad",

      /* ---- Auth modal ---- */
      "auth.title.signin": "Sign In",
      "auth.title.signup": "Create an account",
      "auth.email.label": "Email",
      "auth.password.label": "Password",
      "auth.submit.signin": "Sign In",
      "auth.submit.signup": "Create account",
      "auth.switch.toSignup": "No account yet? Create one",
      "auth.switch.toSignin": "Already have an account? Sign in",
      "auth.error.generic": "Something went wrong. Please try again.",
      "auth.success.signup": "Account created! Check your email to confirm.",
      "auth.signout": "Sign out",

      /* ---- Admin page ---- */
      "admin.page.title": "Admin",
      "admin.page.sub": "Manage tier lists and their items.",
      "admin.gate.needLogin.title": "Sign in required",
      "admin.gate.needLogin.body": "Sign in to access the admin area.",
      "admin.gate.notAdmin.title": "Access denied",
      "admin.gate.notAdmin.body": "Your account doesn't have admin rights.",
      "admin.notConfigured": "Backend not connected.",
      "admin.tierlists.title": "Tier Lists",
      "admin.addTierlist": "Add a tier list",
      "admin.field.slug": "Slug",
      "admin.field.titleFr": "Title (FR)",
      "admin.field.titleEn": "Title (EN)",
      "admin.field.descFr": "Description (FR)",
      "admin.field.descEn": "Description (EN)",
      "admin.save": "Save",
      "admin.cancel": "Cancel",
      "admin.delete": "Delete",
      "admin.edit": "Edit",
      "admin.items.title": "Items",
      "admin.addItem": "Add an item",
      "admin.field.name": "Name",
      "admin.field.subtitle": "Subtitle (optional)",
      "admin.confirmDeleteList": "Delete this tier list and all its items?",
      "admin.confirmDeleteItem": "Delete this item?",
      "admin.saved": "Saved.",
      "admin.deleted": "Deleted.",
      "admin.loadError": "Couldn't load data.",
      "admin.noItems": "No items yet.",

      /* ---- Legal / footer pages ---- */
      "legal.privacy.title": "Privacy Policy",
      "legal.privacy.p1": "VirtualSkyList is a non-commercial community project. We don't run ads and we don't sell any data.",
      "legal.privacy.p2": "If you create an account, we store your email and password (encrypted) via Supabase, our database host, solely so you can sign in and suggest content.",
      "legal.privacy.p3": "Voting on a tier list doesn't require an account: an anonymous id is generated in your browser to prevent duplicate votes, with no link to your identity.",
      "legal.privacy.p4": "For any question about your data, reach out to us on Discord.",
      "legal.terms.title": "Terms of Use",
      "legal.terms.p1": "VirtualSkyList is a community site made by aviation and flight-sim enthusiasts, with no official link to the manufacturers, airlines, or studios mentioned on the site.",
      "legal.terms.p2": "Rankings reflect community votes and don't represent VirtualSkyList's own assessment of the actual quality of the products or services mentioned.",
      "legal.terms.p3": "Please stay respectful in your suggestions and in your exchanges with the community. Content deemed inappropriate may be removed.",
      "legal.terms.p4": "This site is a work in progress; these terms may be updated over time.",
      "legal.contact.title": "Contact",
      "legal.contact.p1": "The best way to reach us is our Discord server.",
      "legal.contact.cta": "Join the Discord",

      /* ---- Suggestions ---- */
      "suggest.needLogin": "Sign in to suggest content.",
      "admin.nav.suggestions": "Suggestions",
      "admin.suggestions.title": "Community suggestions",
      "admin.suggestions.tierlists": "Suggested tier lists",
      "admin.suggestions.aircraft": "Suggested aircraft",
      "admin.suggestions.empty": "No suggestions yet.",
      "admin.nav.tierlists": "Tier Lists",
      "admin.nav.clash": "The Clash",

      /* ---- Tier board (builder) ---- */
      "tier.untested.label": "Untested",
      "builder.export": "Export as PNG",
      "builder.exporting": "Generating…",

      /* ---- The Clash ---- */
      "nav.clash": "The Clash",
      "clash.page.title": "The Clash",
      "clash.page.sub": "Every week, two aircraft go head to head. Vote for your favorite!",
      "clash.vs": "VS",
      "clash.vote": "Vote",
      "clash.voted": "Thanks for voting!",
      "clash.results": "Results",
      "clash.empty": "No active clash right now.",
      "clash.loadError": "Couldn't load the clash.",
      "admin.clash.title": "The Clash",
      "admin.clash.current": "Current round",
      "admin.field.itemA": "Contender A",
      "admin.field.itemB": "Contender B",
      "admin.field.imageUrl": "Image URL (optional)",
      "admin.clash.publish": "Publish this round",
      "admin.field.category": "Category",
      "day.sun": "Sun", "day.mon": "Mon", "day.tue": "Tue", "day.wed": "Wed",
      "day.thu": "Thu", "day.fri": "Fri", "day.sat": "Sat",

      "activity.newTierlist": "New tier list: {label}",
      "activity.newMember": "A new member has joined",
      "activity.newSuggestion": "{actor} suggested: {label}",
      "leaderboard.suggestions": "{n} suggestion(s)",
      "time.justNow": "Just now",
      "time.minutesAgo": "{n} min ago",
      "time.hoursAgo": "{n}h ago",
      "time.daysAgo": "{n}d ago"
    }
  };

  let currentLang = "fr";

  /* =======================================================
     Language persistence across navigation.
     A full static multi-page site has no shared JS state
     between page loads, so the chosen language is carried in
     a `?lang=` URL param instead: every internal link on the
     page gets rewritten to include it, and each page reads it
     back on load. Works with no storage permissions needed and
     keeps URLs shareable/bookmarkable in the right language.
     ======================================================= */
  function getLangFromUrl() {
    const val = new URLSearchParams(location.search).get("lang");
    return val === "en" ? "en" : "fr";
  }

  function withLang(href, lang) {
    const hashIndex = href.indexOf("#");
    const hash = hashIndex === -1 ? "" : href.slice(hashIndex);
    const pathAndQuery = hashIndex === -1 ? href : href.slice(0, hashIndex);
    const qIndex = pathAndQuery.indexOf("?");
    const path = qIndex === -1 ? pathAndQuery : pathAndQuery.slice(0, qIndex);
    const query = qIndex === -1 ? "" : pathAndQuery.slice(qIndex + 1);
    const params = new URLSearchParams(query);
    params.set("lang", lang);
    return `${path}?${params.toString()}${hash}`;
  }

  function syncInternalLinks(lang) {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (/^([a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      a.setAttribute("href", withLang(href, lang));
    });
  }

  function syncCurrentUrl(lang) {
    const params = new URLSearchParams(location.search);
    params.set("lang", lang);
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);
  }

  function applyTranslations(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = translations[lang][key];
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = translations[lang][key];
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    document.title =
      lang === "fr"
        ? "VirtualSkyList — Classez l'aviation. Découvrez les favoris de la communauté."
        : "VirtualSkyList — Rank aviation. Discover the community's favorites.";

    syncInternalLinks(lang);
    syncCurrentUrl(lang);

    document.dispatchEvent(new CustomEvent("vsl:langchange", { detail: { lang } }));
  }

  // Small public API so page-specific module scripts (e.g. the tier list
  // builder, which talks to Supabase) can reuse this same dictionary
  // instead of maintaining their own copy.
  window.VSL_I18N = {
    t(key) {
      return translations[currentLang]?.[key] ?? key;
    },
    get lang() {
      return currentLang;
    }
  };

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => applyTranslations(btn.dataset.lang));
  });

  /* =======================================================
     Toast
     ======================================================= */
  const toastEl = document.getElementById("toast");
  const toastTextEl = document.getElementById("toast-text");
  let toastTimer = null;

  function showToast(key) {
    const msg = translations[currentLang][key] || "";
    toastTextEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 3200);
  }

  document.querySelectorAll("[data-toast]").forEach((el) => {
    const kind = el.getAttribute("data-toast");
    if (el.tagName === "FORM") {
      el.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast(`toast.${kind}`);
        el.reset();
      });
    } else {
      el.addEventListener("click", () => showToast(`toast.${kind}`));
    }
  });

  /* =======================================================
     Active nav link on scroll (homepage only — maps in-page
     sections to their matching header link by href)
     ======================================================= */
  const sectionToHref = {
    "#top": "index.html",
    "#trending": "tier-lists.html",
    "#sidebar": "trends.html",
    "#suggest": "index.html#suggest"
  };
  const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
  const sections = Object.keys(sectionToHref)
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const targetHref = sectionToHref["#" + entry.target.id];
          navLinks.forEach((a) => a.classList.remove("is-active"));
          const match = navLinks.find((a) => a.getAttribute("href") === targetHref);
          if (match) match.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* =======================================================
     Generic pill tab groups (category filters, time ranges)
     ======================================================= */
  document.querySelectorAll(".filter-tabs").forEach((group) => {
    const tabs = Array.from(group.querySelectorAll(".filter-tab"));
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        group.dispatchEvent(new CustomEvent("tabchange", { detail: { value: tab.dataset.filter } }));
      });
    });
  });

  applyTranslations(getLangFromUrl());
})();
