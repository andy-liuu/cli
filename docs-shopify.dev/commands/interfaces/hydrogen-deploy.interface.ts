// This is an autogenerated file. Don't edit this file manually.
export interface hydrogendeploy {
  /**
   * Generate an authentication bypass token, which can be used to perform end-to-end tests against the deployment.
   * @environment AUTH_BYPASS_TOKEN
   */
  '--auth-bypass-token'?: ''

  /**
   * Specify the duration (in hours) up to 12 hours for the authentication bypass token. Defaults to `2`
   * @environment AUTH_BYPASS_TOKEN_DURATION
   */
  '--auth-bypass-token-duration <value>'?: string

  /**
   * Specify a build command to run before deploying. If not specified, `shopify hydrogen build` will be used.
   *
   */
  '--build-command <value>'?: string

  /**
   * Entry file for the worker. Defaults to `./server`.
   * @environment SHOPIFY_HYDROGEN_FLAG_ENTRY
   */
  '--entry <value>'?: string

  /**
   * Specifies the environment to perform the operation using its handle. Fetch the handle using the `env list` command.
   *
   */
  '--env <value>'?: string

  /**
   * Specifies the environment to perform the operation using its Git branch name.
   * @environment SHOPIFY_HYDROGEN_ENVIRONMENT_BRANCH
   */
  '--env-branch <value>'?: string

  /**
   * Path to an environment file to override existing environment variables for the deployment.
   *
   */
  '--env-file <value>'?: string

  /**
   * Forces a deployment to proceed if there are uncommited changes in its Git repository.
   * @environment SHOPIFY_HYDROGEN_FLAG_FORCE
   */
  '-f, --force'?: ''

  /**
   * Create a JSON file containing the deployment details in CI environments. Defaults to true, use `--no-json-output` to disable.
   *
   */
  '--json-output'?: ''

  /**
   * Checks that there is exactly one valid lockfile in the project. Defaults to `true`. Deactivate with `--no-lockfile-check`.
   * @environment SHOPIFY_HYDROGEN_FLAG_LOCKFILE_CHECK
   */
  '--lockfile-check'?: ''

  /**
   * Description of the changes in the deployment. Defaults to the commit message of the latest commit if there are no uncommited changes.
   * @environment SHOPIFY_HYDROGEN_FLAG_METADATA_DESCRIPTION
   */
  '--metadata-description <value>'?: string

  /**
   * User that initiated the deployment. Will be saved and displayed in the Shopify admin
   * @environment SHOPIFY_HYDROGEN_FLAG_METADATA_USER
   */
  '--metadata-user <value>'?: string

  /**
   * Skip the routability verification step after deployment.
   *
   */
  '--no-verify'?: ''

  /**
   * The path to the directory of the Hydrogen storefront. Defaults to the current directory where the command is run.
   * @environment SHOPIFY_HYDROGEN_FLAG_PATH
   */
  '--path <value>'?: string

  /**
   * Deploys to the Preview environment.
   *
   */
  '--preview'?: ''

  /**
   * Shop URL. It can be the shop prefix (janes-apparel) or the full myshopify.com URL (janes-apparel.myshopify.com, https://janes-apparel.myshopify.com).
   * @environment SHOPIFY_SHOP
   */
  '-s, --shop <value>'?: string

  /**
   * Oxygen deployment token. Defaults to the linked storefront's token if available.
   * @environment SHOPIFY_HYDROGEN_DEPLOYMENT_TOKEN
   */
  '-t, --token <value>'?: string
}
