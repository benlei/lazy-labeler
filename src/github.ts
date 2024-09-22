import { getOctokit } from '@actions/github'
import {
  defaults as defaultGitHubOptions,
  GitHub
} from '@actions/github/lib/utils'
import { retry } from '@octokit/plugin-retry'
import { githubTokenInput, repository } from './inputs'
import { LabelResponse } from './types'

const RetryAttempts = 3
const ExemptStatusCodes = [400, 401, 403, 404, 422]

const octokit = (): InstanceType<typeof GitHub> =>
  getOctokit(
    githubTokenInput(),
    {
      retry: {
        enabled: true,
        doNotRetry: ExemptStatusCodes
      },
      request: {
        ...defaultGitHubOptions.request,
        retries: RetryAttempts
      }
    },
    retry
  )

export const getRepoLabels = async (): Promise<LabelResponse> =>
  await octokit().rest.issues.listLabelsForRepo({
    ...repository()
  })

export const getLabelsForIssue = async (
  issueNumber: number
): Promise<LabelResponse> =>
  await octokit().rest.issues.listLabelsOnIssue({
    ...repository(),
    issue_number: issueNumber
  })

export const createLabel = async (
  name: string,
  color: string
): Promise<void> => {
  await octokit().rest.issues.createLabel({
    ...repository(),
    name,
    color
  })
}

export const addLabelsToIssue = async (
  issueNumber: number,
  labels: string[]
): Promise<void> => {
  await octokit().rest.issues.addLabels({
    ...repository(),
    issue_number: issueNumber,
    labels
  })
}
