import {BrowserContext} from '@playwright/test'

/**
 * Returns a storage state with an auth token injected to the localstorage for the given project ID
 *
 * @param projectId - The ID of the project the auth token belongs to
 * @returns A storage state object
 * @internal
 */
export function getStorageStateForProjectId({
  projectId,
  token,
  baseUrl,
}: {
  projectId: string
  token: string
  baseUrl: string
}): Awaited<ReturnType<BrowserContext['storageState']>> {
  return {
    cookies: [],
    origins: [
      {
        origin: baseUrl,
        localStorage: [
          {
            name: `__studio_auth_token_${projectId}`,
            value: JSON.stringify({
              token: token,
              time: new Date().toISOString(),
            }),
          },
        ],
      },
    ],
  }
}
