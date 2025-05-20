import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.target.elements;
  const delayValue = Number(delay.value);

  const shouldResolve = state.value === 'fulfilled';

  createPromise(delayValue, shouldResolve)
    .then(showSuccessToast)
    .catch(showErrorToast);
}

function createPromise(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldResolve ? resolve(delay) : reject(delay);
    }, delay);
  });
}

function showSuccessToast(delay) {
  iziToast.success({
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
}

function showErrorToast(delay) {
  iziToast.error({
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
  });
}
