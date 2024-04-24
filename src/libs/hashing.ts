import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function getPasswordHash(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function isMatchPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}
