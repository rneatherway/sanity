import cac from 'cac'
import {version} from '../../package.json'

const cli = cac()

/**
 * Command to scaffold a `sanity.test.ts` file
 */
cli.command('init').action(async () => {
  const {initCommand} = await import('./commands/init')

  await initCommand()
})

/**
 * Command to run tests
 */
cli.command('run').action(async () => {
  const {runCommand} = await import('./commands/run')

  await runCommand()
})

cli.help()
cli.version(version)
cli.parse()
