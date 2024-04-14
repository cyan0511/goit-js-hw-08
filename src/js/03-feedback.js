import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const form = document.querySelector('form.feedback-form');
const emailEl = document.querySelector('[name=email]');
const messageEl = document.querySelector('[name=message]');
const localState = localStorage.getItem(FORM_STATE_KEY);

const formData = localState
  ? JSON.parse(localState)
  : {
      email: '',
      message: '',
    };

const { email, message } = formData;
emailEl.value = email;
messageEl.value = message;

const onInput = () => {
  const email = emailEl.value;
  const message = messageEl.value;
  localStorage.setItem(FORM_STATE_KEY, JSON.stringify({ email, message }));
};

const onSubmit = e => {
  e.preventDefault();
  const email = emailEl.value;
  const message = messageEl.value;
  console.log({ email, message });
  form.reset();
  localState.removeItem(FORM_STATE_KEY);
};

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);
