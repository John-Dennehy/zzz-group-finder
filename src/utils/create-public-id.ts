import { customAlphabet } from "nanoid/non-secure"

const VALID_CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz"
const DEFAULT_LENGTH = 6

export function createPublicId() {
  const nanoId = customAlphabet(VALID_CHARACTERS, DEFAULT_LENGTH)
  return nanoId()
}
