import {defineConfig} from '@playwright/test'
import {createPlaywrightConfig} from '@sanity/test'

const config = createPlaywrightConfig()

export default defineConfig(config)
