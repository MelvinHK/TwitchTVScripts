// ==UserScript==
// @name         Twitch Mobile Skip Buttons
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds ±10s skip buttons to Twitch mobile website video player
// @author       MelvinHK
// @match        *://m.twitch.tv/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function onVideoReady(callback) {
    let lastVideo;

    const observer = new MutationObserver(() => {
      const video = document.querySelector('video');
      if (video && video !== lastVideo) {
        lastVideo = video;
        callback(video);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function createSkipButtons(video) {
    const controlGroup = document.querySelector('.player-controls__left-control-group');

    const btnBack = document.createElement('button');
    const btnFwd = document.createElement('button');

    [btnBack, btnFwd].forEach(btn => {
      btn.style.pointerEvents = 'auto';
      btn.style.fontSize = '18px';
      btn.style.padding = '8px 12px';
      btn.style.color = 'white';
      btn.style.border = 'none';
    });

    btnBack.textContent = '-10s';
    btnFwd.textContent = '+10s';

    btnBack.onclick = () => { video.currentTime -= 10; };
    btnFwd.onclick = () => { video.currentTime += 10; };

    controlGroup.appendChild(btnBack);
    controlGroup.appendChild(btnFwd);
  }

  onVideoReady((video) => {
    const isLive = document.querySelector('#channel-live-overlay');
    if (isLive) return;
    setTimeout(() => createSkipButtons(video), 500);
  });
})();