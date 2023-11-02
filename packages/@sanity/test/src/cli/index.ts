import cac from 'cac'
import {version} from '../../package.json'

const cli = cac()

/**
 * Command to scaffold playwright
 */
cli.command('init').action(async () => {
  const {initCommand} = await import('./commands/init')

  await initCommand()
})

cli.help()
cli.version(version)
cli.parse()
