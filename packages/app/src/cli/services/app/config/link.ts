import {AppConfiguration, AppInterface} from '../../../models/app/app.js'
import {OrganizationApp} from '../../../models/organization.js'
import {selectConfigName} from '../../../prompts/config.js'
import {loadExtensionsSpecifications} from '../../../models/extensions/load-specifications.js'
import {load} from '../../../models/app/loader.js'
import {InvalidApiKeyErrorMessage, fetchOrCreateOrganizationApp} from '../../context.js'
import {fetchAppFromApiKey} from '../../dev/fetch.js'
import {Config} from '@oclif/core'
import {renderSuccess} from '@shopify/cli-kit/node/ui'
import {fileExists, writeFileSync} from '@shopify/cli-kit/node/fs'
import {joinPath} from '@shopify/cli-kit/node/path'
import {encodeToml} from '@shopify/cli-kit/node/toml'
import {ensureAuthenticatedPartners} from '@shopify/cli-kit/node/session'
import {AbortError} from '@shopify/cli-kit/node/error'

export interface LinkOptions {
  commandConfig: Config
  directory: string
  apiKey?: string
  configName?: string
}

export default async function link(options: LinkOptions): Promise<void> {
  const localApp = await loadLocalApp(options)
  const remoteApp = await loadRemoteApp(localApp, options.apiKey)
  const defaultConfigName = options.configName || remoteApp.title
  const configName = await selectConfigName(options.directory, defaultConfigName)
  const configFileName = `shopify.app.${configName}.toml`
  const configFilePath = joinPath(options.directory, configFileName)
  const fileAlreadyExists = await fileExists(configFilePath)

  const configuration = mergeAppConfiguration(localApp, remoteApp)

  writeFileSync(configFilePath, encodeToml(configuration))

  renderSuccess({
    headline: `App "${remoteApp.title}" connected to this codebase, file ${configFileName} ${
      fileAlreadyExists ? 'updated' : 'created'
    }`,
  })
}

async function loadLocalApp(options: LinkOptions): Promise<AppInterface> {
  const specifications = await loadExtensionsSpecifications(options.commandConfig)
  return load({specifications, directory: options.directory, mode: 'report'})
}

async function loadRemoteApp(localApp: AppInterface, apiKey: string | undefined): Promise<OrganizationApp> {
  const token = await ensureAuthenticatedPartners()
  if (!apiKey) {
    return fetchOrCreateOrganizationApp(localApp, token)
  }
  const app = await fetchAppFromApiKey(apiKey, token)
  if (!app) {
    const errorMessage = InvalidApiKeyErrorMessage(apiKey)
    throw new AbortError(errorMessage.message, errorMessage.tryMessage)
  }
  return app
}

function mergeAppConfiguration(localApp: AppInterface, remoteApp: OrganizationApp): AppConfiguration {
  const mergedApp = localApp

  mergedApp.configuration.credentials = {clientId: remoteApp.apiKey}
  mergedApp.configuration.appInfo = {name: remoteApp.title}
  mergedApp.configuration.web = {appUrl: remoteApp.applicationUrl}

  return mergedApp.configuration
}
