/* =========================================================
   EBISU ATACADO GEEK
   MAIN.JS — PARTE 1
   MENU MOBILE + FOOTER + EVENTOS DE CLIQUE
========================================================= */


/* =========================================================
   UTILITÁRIOS
========================================================= */

const $ = (selector, scope = document) => {
    return scope.querySelector(selector);
};

const $$ = (selector, scope = document) => {
    return [...scope.querySelectorAll(selector)];
};


/* =========================================================
   ANO AUTOMÁTICO NO FOOTER
========================================================= */

const currentYear = $("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle = $(".menu-toggle");
const mobileMenu = $("#mobile-menu");

if (menuToggle && mobileMenu) {

    const openMenu = () => {

        mobileMenu.classList.add("is-open");

        menuToggle.classList.add("is-active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Fechar menu"
        );

        document.body.classList.add(
            "menu-open"
        );

    };


    const closeMenu = () => {

        mobileMenu.classList.remove("is-open");

        menuToggle.classList.remove("is-active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        document.body.classList.remove(
            "menu-open"
        );

    };


    const toggleMenu = () => {

        const isOpen =
            mobileMenu.classList.contains(
                "is-open"
            );

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    };


    menuToggle.addEventListener(
        "click",
        toggleMenu
    );


    /* Fecha ao clicar em qualquer link */

    const mobileLinks =
        $$("a", mobileMenu);

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* Fecha com ESC */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains(
                    "is-open"
                )
            ) {
                closeMenu();
            }

        }
    );


    /* Fecha se voltar para desktop */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 980 &&
                mobileMenu.classList.contains(
                    "is-open"
                )
            ) {
                closeMenu();
            }

        }
    );

}


/* =========================================================
   FUNÇÃO BASE DE TRACKING
========================================================= */

/*
   IMPORTANTE:

   Essa função ainda NÃO envia nada diretamente
   para Google Analytics ou Google Ads.

   Primeiro estamos estruturando os eventos.

   Depois, quando configurarmos GA4 / GTM / Google Ads,
   conectaremos esses mesmos eventos aos serviços.
*/

const trackEvent = (
    eventName,
    parameters = {}
) => {

    if (!eventName) {
        return;
    }


    /* =====================================================
       GOOGLE TAG MANAGER / DATA LAYER
    ====================================================== */

    window.dataLayer =
        window.dataLayer || [];

    window.dataLayer.push({

        event: eventName,

        ...parameters

    });

/* =====================================================
   GOOGLE ANALYTICS 4
===================================================== */

if (typeof gtag === "function") {

    gtag(
        "event",
        eventName,
        parameters
    );

}

    /* =====================================================
       DEBUG LOCAL

       Durante o desenvolvimento,
       você poderá ver os eventos no Console.
    ====================================================== */

    console.log(
        "[EBISU EVENT]",
        eventName,
        parameters
    );

};


/* =========================================================
   EVENTOS DOS CTAs
========================================================= */

const trackedLinks =
    $$("[data-event]");

trackedLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            const eventName =
                link.dataset.event;

            const location =
                link.dataset.location || "unknown";

            const destination =
                link.href || "";

            trackEvent(
                eventName,
                {
                    location,
                    destination
                }
            );

        }
    );

});


/* =========================================================
   EVENTOS ESPECÍFICOS — WHATSAPP
========================================================= */

const whatsappLinks =
    $$(".js-whatsapp-link");

whatsappLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            const location =
                link.dataset.location || "unknown";

            /* Evento interno / dataLayer */
            trackEvent(
                "contact_whatsapp",
                {
                    location
                }
            );

            /* Google Ads — conversão WhatsApp */
            if (typeof gtag === "function") {

                gtag(
                    "event",
                    "conversion",
                    {
                        send_to:
                            "AW-18251587548/o_OSCNvKsegcENy_hP9D",

                        event_category:
                            "WhatsApp",

                        event_label:
                            location
                    }
                );

            }

        }
    );

});


/* =========================================================
   EVENTOS ESPECÍFICOS — SITE
========================================================= */

const siteLinks =
    $$(".js-site-link");

siteLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            const location =
                link.dataset.location || "unknown";

            trackEvent(
                "visit_store",
                {
                    location
                }
            );

        }
    );

});


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);

console.log(
    "Ebisu Atacado Geek — Landing carregada."
);
