import {ThemeExtension} from '../../models/app/extensions.js'
import {readFile, glob} from '@shopify/cli-kit/node/fs'
import {joinPath, relativePath, dirname} from '@shopify/cli-kit/node/path'

const ignoredFilePatterns = [
  '.git',
  '.hg',
  '.bzr',
  '.svn',
  '_darcs',
  'CVS',
  '.sublime-(project|workspace)',
  '.DS_Store',
  '.sass-cache',
  'Thumbs.db',
  'desktop.ini',
  'config.yml',
  'node_modules',
]

export interface ThemeExtensionConfig {
  theme_extension: {
    files: {[key: string]: string}
  }
}

export async function themeExtensionConfig(themeExtension: ThemeExtension): Promise<ThemeExtensionConfig> {
  const files: {[key: string]: string} = {}
  const themeFiles = await glob(joinPath(themeExtension.directory, '*/*'), {ignore: ignoredFilePatterns.map((pattern) => joinPath(themeExtension.directory, '*', pattern))})
  await Promise.all(
    themeFiles.map(async (filepath) => {
      const relativePathName = relativePath(themeExtension.directory, filepath)
      const directoryName = dirname(relativePathName)
      const encoding = directoryName === 'assets' ? 'binary' : 'utf8'
      const fileContents = await readFile(filepath, {encoding})
      files[relativePathName] = Buffer.from(fileContents, encoding).toString('base64')
    }),
  )
  return {theme_extension: {files}}
}
