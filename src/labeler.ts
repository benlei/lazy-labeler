import * as github from './github'
import { Label } from './types'

export const createMissingRepoLabels = async (
  labels: Label[]
): Promise<string[]> => {
  const repoLabels = await github.getRepoLabels()
  const result: string[] = []
  for (const label of labels) {
    if (!repoLabels.data.some(l => l.name === label.name)) {
      await github.createLabel(label.name, label.color)
      result.push(label.name)
    }
  }

  return result
}

export const ensureLabelsForIssue = async (
  issueNumber: number,
  labels: Label[]
): Promise<string[]> => {
  const issueLabels = await github.getLabelsForIssue(issueNumber)
  const result: string[] = []
  for (const label of labels) {
    if (!issueLabels.data.some(l => l.name === label.name)) {
      result.push(label.name)
    }
  }

  if (result.length) {
    await github.addLabelsToIssue(issueNumber, result)
  }

  return result
}
