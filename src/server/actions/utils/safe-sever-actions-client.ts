import { createSafeActionClient } from "next-safe-action"

// see https://next-safe-action.dev/docs/safe-action-client
export const serverActionClient = createSafeActionClient()

export default serverActionClient
