import {chromium} from '@playwright/test'
import {getStorageStateForProjectId} from '../../config/getStorageStateForProjectId'

export async function codegenCommand(): Promise<void> {
  // Make sure to run headed.
  const browser = await chromium.launch({headless: false})

  // Setup context however you like.
  const context = await browser.newContext({
    /* pass any options */
    storageState: getStorageStateForProjectId({
      projectId: process.env.SANITY_E2E_PROJECT_ID!,
      token: process.env.SANITY_E2E_SESSION_TOKEN!,
      baseUrl: process.env.SANITY_E2E_BASE_URL!,
    }),
  })

  await context.route('**/*', (route) => route.continue())

  // Pause the page, and start recording manually.
  const page = await context.newPage()

  await page.goto(process.env.SANITY_E2E_BASE_URL!)
  await page.pause()
}
