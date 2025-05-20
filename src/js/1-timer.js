import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;
const button = document.querySelector('button[data-start]');
const input = document.querySelector('input#datetime-picker');

button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const selectedDate = selectedDates[0];
    const isValid = selectedDate > currentDate;
    button.disabled = !isValid;

    console.log(selectedDate);
    console.log(currentDate);

    if (isValid) {
      userSelectedDate = selectedDate.getTime();
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }
  },
};

flatpickr('input#datetime-picker', options);

button.addEventListener('click', () => {
  button.disabled = true;
  input.disabled = true;
  const timerId = setInterval(() => {
    const now = Date.now();
    const deltaTime = userSelectedDate - now;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      button.disabled = false;
      input.disabled = false;
      return;
    }

    updateTimerDisplay(convertMs(deltaTime));
  }, 1000);
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent =
    addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
