export const loginRule = {
  regex: /^(?=[\S]+)(?=.*[^0-9 ].*)[a-zA-Z0-9_-]{3,20}$/,
  messageError: 'Please enter correct login',
};

export const passwordRule = {
  regex: /^(?=\D*\d)(?=.*[A-Z]).{8,40}$/,
  messageError: 'Please enter correct password',
};

export const emailRule = {
  regex: /^\S+@\S+\.\S+$/,
  messageError: 'Please enter correct email',
};

export const nameRule = {
  regex: /^(?=[\S])[A-Z]{1}[A-Za-z-]*$/,
  messageError: 'Please enter correct name',
};

export const phoneRule = {
  regex: /^\+?[\d]{10,15}$/,
  messageError: 'Please enter correct phone',
};
