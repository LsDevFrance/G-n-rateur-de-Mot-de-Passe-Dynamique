import { prompt } from "./prompt.js";

const options = [
  { type: "LOWERCASE", value: "abcdefghijklmnopqrstuvwxyz" },
  { type: "UPPERCASE", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { type: "SPECIALS", value: "!@#$%^&*();" },
  { type: "NUMBERS", value: "0123456789" },
];

const promptLength = (message) => {
  let value = Number(prompt(`${message}\n`));
  if (!Number.isNaN(value) && value >= 8 && value <= 36) return value;
  console.error(
    "La longueur du mot de passe doit être comprise entre 8 et 36 caractères."
  );
  return promptLength(message);
};

const promptBoolean = (message) => {
  const value = prompt(`${message}\n`);
  if (value === "y" || value === "n") return value === "y";
  console.error('Veuillez répondre par "y" pour oui ou "n" pour non.');
  return promptBoolean(message);
};

const passwordLength = promptLength("Combien de caracteres ? (8-36)");
const specialChars = promptBoolean("Caracteres speciaux ? (y/n)");
const number = promptBoolean("Chiffres ? (y/n)");
const uppercase = promptBoolean("Majuscules ? (y/n)");

const genereChar = (option) => {
  const length = option.value.length;
  const index = Math.floor(Math.random() * length);
  return option.value[index];
};

const selectOptions = () => {
  let allowedOptions = [options[0]];
  if (specialChars) allowedOptions.push(options[2]);
  if (number) allowedOptions.push(options[3]);
  if (uppercase) allowedOptions.push(options[1]);

  const randomOptionIndex = Math.floor(Math.random() * allowedOptions.length);
  return allowedOptions[randomOptionIndex];
};

const generePassword = () => {
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const option = selectOptions();
    password += genereChar(option);
  }
  return password;
};

console.log("Password: " + generePassword());
