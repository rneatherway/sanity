/* eslint-disable no-console */

import chalk from 'chalk'
import {_loadConfig} from '../../config'

export function runCommand(): void {
  const config = _loadConfig({packagePath: process.cwd()})

  if (!config) {
    console.log(chalk.red('Missing Config! run `sanity-test init` to create a config'))
    return
  }

  console.log(config)
}
