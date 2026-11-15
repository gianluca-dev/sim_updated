import { renderMails } from './mails.js';

export const createAppView = (app) => {
    const appCtn = document.getElementById('sim-view-app-wrapper');
    appCtn.innerHTML = '';

    if (appCtn) {
        appCtn.innerHTML = `
            <!--App-Side-Menu-->
            <aside class="app-aside-ctn" id="app-aside-ctn"></aside>
            <section class="app-content-wrapper" id="app-content-wrapper">
                <!--App-Header-->
                <header class="app-header-ctn" id="app-header-ctn"></header>
                <!--App-Main-->
                <main class="app-main-ctn" id="app-main-ctn"></main>
            </section>
        `;

        const asideCtn = document.getElementById('app-aside-ctn');
        const headerCtn = document.getElementById('app-header-ctn');
        const mainCtn = document.getElementById('app-main-ctn');

        if (app === 'mail') {
            asideCtn.innerHTML = `
                <header class="aside-header-elm">
                    <div class="app-logo-ctn">
                        <img src="/src/assets/images/mail_logo.svg" loading="lazy" alt="app-logo">
                    </div>
                </header>
                <main class="aside-main-elm">
                    <section class="aside-options-ctn">
                        <img src="/src/assets/sim_icons/inbox.svg" loading="eager" alt="inbox-icon">
                        <img src="/src/assets/sim_icons/send.svg" loading="eager" alt="send-icon">
                        <img src="/src/assets/sim_icons/circle-alert.svg" loading="eager" alt="alert-icon">
                        <img src="/src/assets/sim_icons/trash.svg" loading="eager" alt="trash-icon">
                    </section>
                </main>
            `;

            headerCtn.innerHTML = `
                <div class="app-search-ctn">
                    <i class="app-search-icon">
                        <img src="/src/assets/sim_icons/search.svg" alt="search-icon">
                    </i>
                    <input type="text" id="app-search-ctn" placeholder="Suche...">
                </div>
                <div class="app-return-ctn" id="app-return-ctn">
                    <img src="/src/assets/sim_icons/close.svg" loading="eager" alt="close-icon">
                </div>
            `;

            mainCtn.innerHTML = `
                <section class="mail-inbox-wrapper">
                    <div class="mail-inbox-ctn" id="mail-inbox-ctn"></div>
                </section>
                <section class="mail-view-wrapper">
                    <div class="mail-view-ctn" id="mail-view-ctn"></div>
                </section>
            `;
        }
    }

    appCtn.classList.remove('inactive');

    document.getElementById('app-return-ctn').addEventListener('click', () => {
        appCtn.classList.add('inactive');
    });

    renderMails();
};