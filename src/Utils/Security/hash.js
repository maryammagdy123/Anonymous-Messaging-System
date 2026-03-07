import pkg from "bcrypt";

//implementing hashing password
//installing bcrypt npm i bcrypt
//plaintext here is refers to the password
export async function hash(plaintext) {
  //(dataToBeHashed,saltRounds)
  return await pkg.hash(plaintext, 16);
}
export async function compare(plaintext, hashedValue) {
  return await pkg.compare(plaintext, hashedValue);
}
