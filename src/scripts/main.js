import { simState } from './state.js';

import { initMainChart } from './charts.js';
import { createAppView } from './apps.js';
import { sendNotificationMail } from './mails.js';

if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
    document.getElementById('start-btn').addEventListener('click', () => {
        window.location = 'sim.html';
    });
}

let simData;

const loadData = async () => {
    try {
        const response = await fetch('./sim.json');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const saveSimState = () => {
    localStorage.setItem('simState', JSON.stringify(simState));
};

const loadSavedSimState = () => {
    const savedSimState = JSON.parse(localStorage.getItem('simState'));

    if (savedSimState) {
        Object.assign(simState, savedSimState);
    }
};

// initializes simulator
const initSim = async () => {
    simData = await loadData();

    loadSavedSimState();
    createSimView();

    if (simState.activeCrises.length > 0) {
        selectCrisis();
    } else {
        generateCrisis();
    }

    initMainChart(simState, simState.currentYear);
};

const createSimView = () => {
    const simViewCtn = document.getElementById('sim-view-ctn');
    simViewCtn.innerHTML = '';

    if (simViewCtn) {
        simViewCtn.innerHTML = `
            <!--Header-->
            <header class="sim-view-header">
                <div class="logo-ctn">
                    <img src="/src/assets/sim/logo.svg" loading="lazy" alt="logo">
                </div>
                <div class="coin-display-ctn" id="coin-display-ctn">
                    <p class="coin-display-elm" id="coin-display-elm">...</p>
                </div>
            </header>
            <section class="sim-view-content">
                <!--Side-Nav-->
                <aside class="sim-view-sidenav" id="sim-view-sidenav">
                    <!--Event-Ctn-->
                    <div class="event-ctn-wrapper" id="event-ctn-wrapper">
                        <div class="event-ctn" id="event-economic"><img src="/src/assets/sim_icons/coins.svg" loading="eager" alt=""></div>
                        <div class="event-ctn" id="event-political"><img src="/src/assets/sim_icons/landmark.svg" loading="eager" alt=""></div>
                        <div class="event-ctn" id="event-social"><img src="/src/assets/sim_icons/user-round-group.svg" loading="eager" alt=""></div>
                        <div class="event-ctn" id="event-health"><img src="/src/assets/sim_icons/heart-pulse.svg" loading="eager" alt=""></div>
                    </div>
                    <!--Nav-Icons-->
                    <div class="nav-icon"><img src="/src/assets/sim_icons/flask.svg" loading="eager" alt="flask-icon"></div>
                    <div class="nav-icon settings"><img src="/src/assets/sim_icons/settings.svg" loading="eager" alt="settings-icon"></div>
                </aside>
                <main class="sim-view-main">
                    <section class="sim-view-map-section">
                        <div class="swap-map-btn-ctn">
                            <button type="button" class="swap-map-btn" id="swap-map-btn"><img src="/src/assets/sim_icons/swap.svg" loading="eager" alt="swap-icon"></button>
                        </div>
                        <img src="/src/assets/images/map_europe.avif" loading="lazy" alt="map" class="map-img">
                    </section>
                    <section class="sim-view-info-section">
                        <div class="main-chart-ctn">
                            <canvas id="main-chart-canvas"></canvas>
                        </div>
                    </section>
                </main>
            </section>
            <section class="side-elm-view inactive" id="side-elm-view">
                <h1>Hi!!!</h1>
            </section>
            <footer class="sim-view-footer">
                <div class="app-ctn-wrapper" id="app-ctn-wrapper">
                    <div class="app-icon" id="mail"><img src="/src/assets/sim_icons/mail.svg" loading="eager" alt="mail-icon"></div>
                    <div class="app-icon" id="comp"><img src="/src/assets/sim_icons/earth.svg" loading="eager" alt="earth-icon"></div>
                </div>
            </footer>
            <!--App-Wrapper-(Mails, etc.)-->
            <section class="sim-view-app-wrapper inactive" id="sim-view-app-wrapper"></section>
        `;

        initAppListeners();
    }
};

const initAppListeners = () => {
    document.getElementById('app-ctn-wrapper').addEventListener('click', (e) => {
        const clickedElm = e.target.closest('.app-icon');

        if (clickedElm) {
            createAppView(clickedElm.id);
        }
    });

    document.getElementById('event-ctn-wrapper').addEventListener('click', (e) => {
        const clickedEvent = e.target.closest('.event-ctn');

        if (clickedEvent) {
            createSideElmView(clickedEvent.id.replace('event-', ''));
        }
    });
};

const generateCrisis = () => {
    const maxMonthlyCrises = Math.floor(Math.random() * 3);
    simState.activeCrises = [];

    for (let i = 0; i < maxMonthlyCrises; i++) {
        const crisisIndex = Math.floor(Math.random() * simData.crises.length);
        simState.activeCrises.push(simData.crises[crisisIndex]);
    }

    saveSimState();
    selectCrisis();
};

const selectCrisis = () => {
    if (simState.activeCrises.length === 0) {
        console.log('End of the month!');
        return;
    }

    const selectedCrisis = simState.activeCrises[0];
    console.log('current crisis: ', selectedCrisis);

    const mail = filterMail(selectedCrisis);
    console.log('mail: ', mail);

    sendNotificationMail(mail); // noch Platzhalter!!!
};

const resolveCrisis = () => {
    simState.activeCrises.shift();

    saveSimState();
    selectCrisis();
};

const filterMail = (selectedCrisis) => {
    return simData.mails.find(mail => mail.id === selectedCrisis.mail.id);
};

const createSideElmView = (type) => {
    const sideElm = document.getElementById('side-elm-view');
    sideElm.classList.toggle('inactive');

    const sidenavElm = document.getElementById('sim-view-sidenav');
    sidenavElm.classList.toggle('radius-inactive');

    fillSideElmView(type);
};

const fillSideElmView = (type) => {
    const sideElmCtn = document.getElementById('side-elm-view');

    if (sideElmCtn) {
        sideElmCtn.innerHTML = `
            <section class="side-elm-content-wrapper" id='side-elm-content-wrapper'>
                <!--Side-Elm-Header-->
                <header class="side-elm-header-ctn" id="side-elm-header-ctn"></header>
                <!--Side-Elm-Main-->
                <main class="side-elm-main-ctn" id='${type}'></main>
            </section>
        `;
    }

    const headerCtn = document.getElementById('side-elm-header-ctn');
    const mainCtn = document.querySelector('.side-elm-main-ctn');

    const filteredEvents = simData.events.filter(event => event.type === type);

    filteredEvents.forEach(event => {
        const eventElm = document.createElement('div');
        eventElm.className = 'event-elm';
        eventElm.innerText = event.title;

        mainCtn.appendChild(eventElm);
    });
};

if (window.location.pathname.includes('sim.html')) {
    initSim();
}