import bcrypt from "bcrypt";

import userRepository, {
  CreateUserData,
} from "../repositories/userRepository.js";

async function create(data: CreateUserData) {
  const { email, password } = data;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw { type: "conflict" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  await userRepository.insert({ email, password: hashedPassword });
}

export default {
  create,
};
