import * as core from '@actions/core'
import { context } from '@actions/github'
import { String2HexCodeColor } from 'string-to-hex-code-color'
import { Label, Repository } from './types'

export const repositoryInput = (): string =>
  core.getInput('repository', {
    required: false,
    trimWhitespace: true
  })

export const issueNumberInput = (): number =>
  parseInt(
    core.getInput('issue-number', {
      required: true,
      trimWhitespace: true
    })
  )

export const githubTokenInput = (): string =>
  core.getInput('token', {
    required: false
  })

export const failOnErrorInput = (): boolean =>
  core.getInput('fail-on-error', {
    required: false,
    trimWhitespace: true
  }) !== 'false'

export const labelsInput = (): string =>
  core.getInput('labels', {
    required: false,
    trimWhitespace: true
  })

export const repository = (): Repository => {
  const input =
    repositoryInput() || `${context.repo.owner}/${context.repo.repo}`
  const [owner, repo] = input.split('/', 2)
  if (!owner || !repo) {
    throw new Error(`Invalid repository input: ${input}`)
  }

  return { owner, repo }
}

export const getLabels = (): Label[] => {
  const string2HexCodeColor = new String2HexCodeColor()

  return labelsInput()
    .split(',')
    .map(l => l.trim())
    .filter(l => l)
    .map(label => ({
      name: label.trim(),
      color: string2HexCodeColor.stringToColor(label.trim()).substring(1)
    }))
}
