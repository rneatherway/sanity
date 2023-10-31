import path from 'path'
import {_fileExists} from './_fileExists'

const CONFIG_FILE_NAMES = [
  'sanity.test.js',
  'sanity.test.jsx',
  'sanity.test.mjs',
  'sanity.test.cjs',
  'sanity.test.ts',
  'sanity.test.tsx',
]

/**
 * @internal
 */
export function _findConfigFile(options: {packagePath: string}): string | undefined {
  const {packagePath} = options

  for (const fileName of CONFIG_FILE_NAMES) {
    const file = path.resolve(packagePath, fileName)

    if (_fileExists(file)) return file
  }

  return undefined
}
