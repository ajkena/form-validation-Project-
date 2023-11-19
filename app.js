const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassoword = document.getElementById('confirm-password');

//Show input error message

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';                     
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show success outline

function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Check required fields

const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
};

//Email validation

const isValidEmail = (input) => {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

//Check input length

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

//Check if passwords match

const checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};

//Get field name

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassoword]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 25);
  isValidEmail(email);
  checkPasswordMatch(password, confirmPassoword);
});
