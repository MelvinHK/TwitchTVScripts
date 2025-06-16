// ==UserScript==
// @name         Twitch Mobile Redirect to Following
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirects to Following list on initial index page load
// @author       MelvinHK
// @match        *://m.twitch.tv
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  const sessionKey = "followingListRedirect";
  const redirected = sessionStorage.getItem(sessionKey);

  if (!redirected && location.pathname === "/") {
    location.replace("/directory/following");
    sessionStorage.setItem(sessionKey, "redirected");
  }
})();