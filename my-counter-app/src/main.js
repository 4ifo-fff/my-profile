import './style.css';

const app = document.querySelector('#app');
let count = 0;

app.innerHTML = `
  <div class="counter-card">
    <h1>カウンター</h1>
    <p id="count" class="count" aria-live="polite">0</p>
    <div class="button-row">
      <button id="decrease" type="button" class="btn btn-secondary" aria-label="減らす">−</button>
      <button id="increase" type="button" class="btn btn-primary" aria-label="増やす">＋</button>
      <button id="reset" type="button" class="btn btn-reset" aria-label="リセット">リセット</button>
    </div>
  </div>
`;

const countEl = document.querySelector('#count');
const increaseBtn = document.querySelector('#increase');
const decreaseBtn = document.querySelector('#decrease');
const resetBtn = document.querySelector('#reset');

const renderCount = () => {
  countEl.textContent = String(count);
};

increaseBtn.addEventListener('click', () => {
  count += 1;
  renderCount();
});

decreaseBtn.addEventListener('click', () => {
  count -= 1;
  renderCount();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  renderCount();
});

renderCount();