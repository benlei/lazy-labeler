import * as core from '@actions/core'
import { failOnErrorInput, getLabels, issueNumberInput } from './inputs'
import { createMissingRepoLabels, ensureLabelsForIssue } from './labeler'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const labels = getLabels()
    await createMissingRepoLabels(labels)
    await ensureLabelsForIssue(issueNumberInput(), labels)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (failOnErrorInput()) core.setFailed(`Received error: ${error}`)
    else core.warning(`Received error: ${error}`)
  }
}
