import {TransformOptions} from 'esbuild'
import {_findConfigFile} from './_findConfigFile'
import {SanityTestConfigOptions} from './types'

/**
 * @internal
 */
export function _loadConfig(options: {packagePath: string}): SanityTestConfigOptions | undefined {
  const {packagePath} = options

  const configPath = _findConfigFile({packagePath})

  if (!configPath) {
    return undefined
  }

  const {register} = require('esbuild-register/dist/node')

  const esbuildOptions: TransformOptions = {
    // eslint options
    jsx: 'automatic',
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    jsxImportSource: 'react',
    logLevel: 'silent',
  }

  const {unregister} = globalThis.__DEV__ ? {unregister: () => undefined} : register(esbuildOptions)

  // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require
  const config = require(configPath)

  // Unregister the require hook if you don't need it anymore
  unregister()

  return config?.default || config
}
