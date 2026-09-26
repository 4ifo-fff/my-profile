(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`),t=0;e.innerHTML=`
  <div class="counter-card">
    <h1>カウンター</h1>
    <p id="count" class="count" aria-live="polite">0</p>
    <div class="button-row">
      <button id="decrease" type="button" class="btn btn-secondary" aria-label="減らす">−</button>
      <button id="increase" type="button" class="btn btn-primary" aria-label="増やす">＋</button>
      <button id="reset" type="button" class="btn btn-reset" aria-label="リセット">リセット</button>
    </div>
  </div>
`;var n=document.querySelector(`#count`),r=document.querySelector(`#increase`),i=document.querySelector(`#decrease`),a=document.querySelector(`#reset`),o=()=>{n.textContent=String(t)};r.addEventListener(`click`,()=>{t+=1,o()}),i.addEventListener(`click`,()=>{--t,o()}),a.addEventListener(`click`,()=>{t=0,o()}),o();