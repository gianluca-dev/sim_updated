import { simState } from './state.js';

export const sendNotificationMail = (mail) => {
    simState.mails.push(mail);
};

export const renderMails = () => {
    const inboxCtn = document.getElementById('mail-inbox-ctn');

    if (inboxCtn) {
        simState.mails.forEach(mail => {
            const senderAvatar = document.createElement('img');
            senderAvatar.src = mail.sender.avatar.src;
            senderAvatar.alt = mail.sender.avatar.alt;
            senderAvatar.loading = 'lazy';

            const senderAvatarCtn = document.createElement('div');
            senderAvatarCtn.className = 'sender-avatar-ctn';
            senderAvatarCtn.appendChild(senderAvatar);

            const senderUsername = document.createElement('p');
            senderUsername.innerText = mail.sender.username;

            const senderCtn = document.createElement('div');
            senderCtn.className = 'sender-ctn';
            senderCtn.appendChild(senderAvatarCtn);
            senderCtn.appendChild(senderUsername);

            const subject = document.createElement('p');
            subject.innerText = mail.subject;

            const subjectCtn = document.createElement('div');
            subjectCtn.className = 'subject';
            subjectCtn.appendChild(subject);

            const mailDate = document.createElement('p');
            mailDate.innerText = '24.06';

            const mailMarker = document.createElement('img');
            mailMarker.src = '/src/assets/sim_icons/star.svg';
            mailMarker.alt = 'star-icon';
            mailMarker.loading = 'eager';

            const mailMarkerCtn = document.createElement('div');
            mailMarkerCtn.className = 'mail-marker-ctn';
            mailMarkerCtn.appendChild(mailMarker);

            const mailEndCtn = document.createElement('div');
            mailEndCtn.className = 'mail-end-ctn';
            mailEndCtn.appendChild(mailDate);
            mailEndCtn.appendChild(mailMarkerCtn);

            const mailElm = document.createElement('div');
            mailElm.className = 'mail-elm';
            mailElm.appendChild(senderCtn);
            mailElm.appendChild(subjectCtn);
            mailElm.appendChild(mailEndCtn);

            mailElm.addEventListener('click', () => {
                readMails(mail);
            })

            inboxCtn.appendChild(mailElm);
        });
    }
};

export const readMails = (mail) => {
    const mailViewCtn = document.getElementById('mail-view-ctn');

    if (mailViewCtn) {
        mailViewCtn.innerHTML = `
            <header class="mail-view-header">
                <div class="mail-utility-wrapper">
                    <img src="/src/assets/sim_icons/arrow-left.svg" loading="eager" alt="arrow-left-icon">
                    <img src="/src/assets/sim_icons/archive.svg" loading="eager" alt="archive-icon">
                    <img src="/src/assets/sim_icons/circle-alert.svg" loading="eager" alt="circle-alert-icon">
                    <img src="/src/assets/sim_icons/trash.svg" loading="eager" alt="trash-icon">
                    <div class="line-elm"></div>
                    <img src="/src/assets/sim_icons/ellipsis-vertical.svg" loading="eager" alt="ellipsis-vertical-icon">
                </div>
            </header>
            <main>
                <section class="mail-content-wrapper">
                    <header class="mail-content-header">
                        <div class="sender-avatar-ctn">
                            <img id="sender-avatar-elm" loading="lazy" alt="sender-avatar">
                        </div>
                        <div class="mail-information-ctn">
                            <p class="sender-username-elm" id="sender-username-elm">...</p>
                            <p class="recipient-username-elm">an Happinessmanager</p>
                        </div>
                    </header>
                    <main class="mail-content-main">
                        (/\/\/\)
                    </main>
                </section>
            </main>
        `;
    }

    document.getElementById('sender-avatar-elm').src = mail.sender.avatar.src;
    document.getElementById('sender-username-elm').innerText = mail.sender.username;
};