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
      "hero.sub": "Créez des tier lists pour les avions, compagnies aériennes, aéroports et add-ons de simulateur de vol. Les données de notre communauté révèlent les favoris et les valeurs montantes.",
      "hero.cta1": "Créer une tier list",
      "hero.cta2": "Explorer les classements",

      "featured.label": "Tier list en vedette",
      "featured.title": "Avions de ligne commerciaux",
      "featured.meta.by": "Créée par",
      "featured.meta.votes": "12,4k votes",
      "featured.view": "Voir la tier list complète",
      "featured.rankedby": "Classé par les votes de la communauté",
      "featured.updated": "Mis à jour il y a 2h",

      "trending.title": "Tier lists tendance",
      "trending.viewall": "Voir tout",

      "card1.title": "Meilleurs avions de ligne",
      "card1.votes": "18,7k votes",
      "card1.desc": "Classement des meilleurs avions de ligne commerciaux de tous les temps.",

      "card2.title": "Meilleurs add-ons MSFS",
      "card2.votes": "15,2k votes",
      "card2.desc": "Avions payware et studios pour MSFS 2024\u00a0: PMDG, Fenix, iniBuilds, ToLiss, A2A, Just Flight, Carenado et plus.",

      "card3.title": "Meilleurs aéroports",
      "card3.votes": "12,3k votes",
      "card3.desc": "Les meilleurs aéroports du monde, pour l’exploitation comme pour l’expérience.",

      "card4.title": "Meilleures livrées",
      "card4.votes": "9,8k votes",
      "card4.desc": "Les livrées les plus iconiques et les plus belles de l’aviation.",

      "community.title": "Top avions de la communauté",
      "community.based": "Basé sur 50k+ votes de la communauté",
      "community.viewall": "Voir tous les classements",

      "now.title": "Tendances du moment",
      "now.thisweek": "Cette semaine",
      "now.fastmovers": "Mouvements rapides de popularité",

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

      "toast.create": "Bientôt disponible : la création de tier list arrive !",
      "toast.tierlist": "Merci ! Ta suggestion de tier list a bien été envoyée.",
      "toast.aircraft": "Merci ! Ta suggestion d’avion a bien été envoyée.",

      /* ---- Tier Lists page ---- */
      "tierlists.page.title": "Toutes les tier lists",
      "tierlists.page.sub": "Explore les classements de la communauté ou lance-toi dans un nouveau classement.",
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
      "tl.airlines.votes": "7,5k votes",
      "tl.airlines.desc": "Service, confort et fiabilité\u00a0: le classement des meilleures compagnies aériennes par la communauté.",

      "tl.msfsAirliners.title": "Avions de ligne payware — MSFS 2024",
      "tl.msfsAirliners.votes": "9,4k votes",
      "tl.msfsAirliners.desc": "Onze studios, un seul verdict\u00a0: Fenix, FSLabs, PMDG, iniBuilds, Aerosoft, ToLiss, TFDi, Fokker et plus.",

      "tl.msfsGA.title": "Aviation générale payware — MSFS 2024",
      "tl.msfsGA.votes": "6,1k votes",
      "tl.msfsGA.desc": "Monomoteurs et bimoteurs payware\u00a0: A2A, BlackSquare, Just Flight, Carenado, Milviz, SimWorks Studios et plus.",

      "tl.msfsStudios.title": "Studios payware & freeware — MSFS 2024",
      "tl.msfsStudios.votes": "8,3k votes",
      "tl.msfsStudios.desc": "Vingt éditeurs, tous segments confondus\u00a0: liners, régional, GA, hélico, warbirds.",

      /* ---- Trends page ---- */
      "trends.page.title": "Tendances",
      "trends.page.sub": "Ce qui grimpe (et ce qui chute) dans les classements de la communauté cette semaine.",
      "trends.range.week": "Cette semaine",
      "trends.range.month": "Ce mois",
      "trends.range.all": "Toujours",
      "trends.podium.title": "Top 3 de la semaine",
      "trends.risers.title": "Plus fortes progressions",
      "trends.fallers.title": "Plus fortes baisses",
      "trends.chart.title": "Activité de vote — 7 derniers jours",
      "day.mon": "Lun", "day.tue": "Mar", "day.wed": "Mer", "day.thu": "Jeu",
      "day.fri": "Ven", "day.sat": "Sam", "day.sun": "Dim",

      /* ---- Community page ---- */
      "community.page.title": "Communauté",
      "community.page.sub": "Découvre les pilotes qui façonnent VirtualSkyList.",
      "community.seeTrends": "Voir les tendances",
      "stat.members.value": "8 400+",
      "stat.members.label": "Membres actifs",
      "stat.lists.value": "1 260+",
      "stat.lists.label": "Tier lists créées",
      "stat.votes.value": "50k+",
      "stat.votes.label": "Votes total",
      "stat.aircraft.value": "640+",
      "stat.aircraft.label": "Avions référencés",

      "leaderboard.title": "Meilleurs contributeurs",
      "lb.row1.role": "Créateur de tier lists", "lb.row1.score": "2 840 pts",
      "lb.row2.role": "Votant assidu", "lb.row2.score": "1 920 pts",
      "lb.row3.role": "Créateur de tier lists", "lb.row3.score": "1 510 pts",
      "lb.row4.role": "Votant assidu", "lb.row4.score": "1 180 pts",
      "lb.row5.role": "Membre actif", "lb.row5.score": "940 pts",

      "activity.title": "Activité récente",
      "act1.text": "AeroRanker a mis à jour Avions de ligne commerciaux", "act1.time": "Il y a 2h",
      "act2.text": "SkyMarshal a voté sur Meilleurs aéroports", "act2.time": "Il y a 4h",
      "act3.text": "Nouveau membre : RunwayReady", "act3.time": "Il y a 6h",
      "act4.text": "ILS_Approach a proposé un avion : Boeing 777-8", "act4.time": "Il y a 9h",
      "act5.text": "HeavyMetalHeli a créé Meilleures livrées", "act5.time": "Il y a 1j",

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
      "tier.s.label": "Références",
      "tier.a.label": "Excellents",
      "tier.b.label": "Solides",
      "tier.c.label": "Corrects",
      "tier.d.label": "À éviter"
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
      "hero.sub": "Create tier lists for aircraft, airlines, airports, and flight sim add-ons. Our community data reveals the overall favorites and biggest risers.",
      "hero.cta1": "Create a Tier List",
      "hero.cta2": "Explore Rankings",

      "featured.label": "Featured tier list",
      "featured.title": "Commercial Airliners",
      "featured.meta.by": "Created by",
      "featured.meta.votes": "12.4K votes",
      "featured.view": "View Full Tier List",
      "featured.rankedby": "Ranked by community votes",
      "featured.updated": "Updated 2h ago",

      "trending.title": "Trending tier lists",
      "trending.viewall": "View all",

      "card1.title": "Best Airliners",
      "card1.votes": "18.7K votes",
      "card1.desc": "Ranking the best commercial airliners of all time.",

      "card2.title": "Best MSFS Add-ons",
      "card2.votes": "15.2K votes",
      "card2.desc": "Payware aircraft and studios for MSFS 2024: PMDG, Fenix, iniBuilds, ToLiss, A2A, Just Flight, Carenado and more.",

      "card3.title": "Best Airports",
      "card3.votes": "12.3K votes",
      "card3.desc": "The world's greatest airports for ops and experience.",

      "card4.title": "Best Airline Liveries",
      "card4.votes": "9.8K votes",
      "card4.desc": "The most iconic and beautiful liveries in aviation.",

      "community.title": "Community top aircraft",
      "community.based": "Based on 50K+ community votes",
      "community.viewall": "View full rankings",

      "now.title": "Trending now",
      "now.thisweek": "This week",
      "now.fastmovers": "Fast movers in popularity",

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

      "toast.create": "Coming soon: tier list creation is on its way!",
      "toast.tierlist": "Thanks! Your tier list suggestion was sent.",
      "toast.aircraft": "Thanks! Your aircraft suggestion was sent.",

      /* ---- Tier Lists page ---- */
      "tierlists.page.title": "All Tier Lists",
      "tierlists.page.sub": "Browse community rankings or start ranking something new.",
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
      "tl.airlines.votes": "7.5K votes",
      "tl.airlines.desc": "Service, comfort, and reliability: the community's ranking of the best airlines.",

      "tl.msfsAirliners.title": "Payware Airliners — MSFS 2024",
      "tl.msfsAirliners.votes": "9.4K votes",
      "tl.msfsAirliners.desc": "Eleven studios, one verdict: Fenix, FSLabs, PMDG, iniBuilds, Aerosoft, ToLiss, TFDi, Fokker and more.",

      "tl.msfsGA.title": "Payware General Aviation — MSFS 2024",
      "tl.msfsGA.votes": "6.1K votes",
      "tl.msfsGA.desc": "Payware single and twin-engine aircraft: A2A, BlackSquare, Just Flight, Carenado, Milviz, SimWorks Studios and more.",

      "tl.msfsStudios.title": "Payware & Freeware Studios — MSFS 2024",
      "tl.msfsStudios.votes": "8.3K votes",
      "tl.msfsStudios.desc": "Twenty publishers across every segment: liners, regional, GA, helicopters, warbirds.",

      /* ---- Trends page ---- */
      "trends.page.title": "Trends",
      "trends.page.sub": "What's rising (and falling) in community rankings this week.",
      "trends.range.week": "This week",
      "trends.range.month": "This month",
      "trends.range.all": "All time",
      "trends.podium.title": "This week's top 3",
      "trends.risers.title": "Biggest risers",
      "trends.fallers.title": "Biggest fallers",
      "trends.chart.title": "Voting activity — last 7 days",
      "day.mon": "Mon", "day.tue": "Tue", "day.wed": "Wed", "day.thu": "Thu",
      "day.fri": "Fri", "day.sat": "Sat", "day.sun": "Sun",

      /* ---- Community page ---- */
      "community.page.title": "Community",
      "community.page.sub": "Meet the pilots shaping VirtualSkyList.",
      "community.seeTrends": "See trends",
      "stat.members.value": "8,400+",
      "stat.members.label": "Active members",
      "stat.lists.value": "1,260+",
      "stat.lists.label": "Tier lists created",
      "stat.votes.value": "50K+",
      "stat.votes.label": "Total votes",
      "stat.aircraft.value": "640+",
      "stat.aircraft.label": "Aircraft listed",

      "leaderboard.title": "Top contributors",
      "lb.row1.role": "Tier list creator", "lb.row1.score": "2,840 pts",
      "lb.row2.role": "Top voter", "lb.row2.score": "1,920 pts",
      "lb.row3.role": "Tier list creator", "lb.row3.score": "1,510 pts",
      "lb.row4.role": "Top voter", "lb.row4.score": "1,180 pts",
      "lb.row5.role": "Active member", "lb.row5.score": "940 pts",

      "activity.title": "Recent activity",
      "act1.text": "AeroRanker updated Commercial Airliners", "act1.time": "2h ago",
      "act2.text": "SkyMarshal voted on Best Airports", "act2.time": "4h ago",
      "act3.text": "New member: RunwayReady", "act3.time": "6h ago",
      "act4.text": "ILS_Approach suggested an aircraft: Boeing 777-8", "act4.time": "9h ago",
      "act5.text": "HeavyMetalHeli created Best Airline Liveries", "act5.time": "1d ago",

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
      "tier.s.label": "Legendary",
      "tier.a.label": "Excellent",
      "tier.b.label": "Solid",
      "tier.c.label": "Decent",
      "tier.d.label": "Avoid"
    }
  };

  let currentLang = "fr";

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
     Trending carousel dots (visual only)
     ======================================================= */
  const dots = Array.from(document.querySelectorAll(".carousel-dots .dot"));
  let activeDot = 0;

  function setActiveDot(index) {
    dots[activeDot]?.classList.remove("is-active");
    activeDot = (index + dots.length) % dots.length;
    dots[activeDot]?.classList.add("is-active");
  }

  dots.forEach((dot, i) => dot.addEventListener("click", () => setActiveDot(i)));
  document.querySelector('.carousel-nav[aria-label="Previous"]')
    ?.addEventListener("click", () => setActiveDot(activeDot - 1));
  document.querySelector('.carousel-nav[aria-label="Next"]')
    ?.addEventListener("click", () => setActiveDot(activeDot + 1));

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

  /* =======================================================
     Tier Lists browse page: search + category filter
     ======================================================= */
  const browseGrid = document.querySelector(".browse-grid");
  if (browseGrid) {
    const cards = Array.from(browseGrid.querySelectorAll(".list-card"));
    const emptyState = document.querySelector(".empty-state");
    const searchInput = document.querySelector(".search-field input");
    const categoryTabs = document.querySelector('.filter-tabs[data-group="category"]');
    let activeCategory = "all";

    function refreshGrid() {
      const query = (searchInput?.value || "").trim().toLowerCase();
      let visibleCount = 0;
      cards.forEach((card) => {
        const matchesCategory = activeCategory === "all" || card.dataset.category === activeCategory;
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const matchesQuery = !query || title.includes(query);
        const show = matchesCategory && matchesQuery;
        card.classList.toggle("is-hidden", !show);
        if (show) visibleCount += 1;
      });
      if (emptyState) emptyState.style.display = visibleCount ? "none" : "flex";
    }

    categoryTabs?.addEventListener("tabchange", (e) => {
      activeCategory = e.detail.value;
      refreshGrid();
    });
    searchInput?.addEventListener("input", refreshGrid);
    refreshGrid();
  }

  applyTranslations("fr");
})();
