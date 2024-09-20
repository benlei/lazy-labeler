import * as github from '../src/github'
import { createMissingRepoLabels, ensureLabelsForIssue } from '../src/labeler'

describe('createMissingRepoLabels', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })
  it('creates missing labels', async () => {
    const labels = [
      { name: 'foo', color: 'e65213' },
      { name: 'bar', color: 'c11635' },
      { name: 'baz', color: '61dedb' }
    ]
    const repoLabels = { data: [{ name: 'foo' }, { name: 'baz' }] }
    jest.spyOn(github, 'getRepoLabels').mockResolvedValue(repoLabels)
    jest.spyOn(github, 'createLabel').mockImplementation()

    expect(await createMissingRepoLabels(labels)).toEqual(['bar'])
  })

  it('creates nothing if they all exist', async () => {
    const labels = [
      { name: 'foo', color: 'e65213' },
      { name: 'baz', color: '61dedb' }
    ]
    const repoLabels = { data: [{ name: 'foo' }, { name: 'baz' }] }
    jest.spyOn(github, 'getRepoLabels').mockResolvedValue(repoLabels)

    expect(await createMissingRepoLabels(labels)).toEqual([])
  })
})

describe('ensureLabelsForIssue', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('adds missing labels', async () => {
    const labels = [
      { name: 'foo', color: 'e65213' },
      { name: 'bar', color: 'c11635' },
      { name: 'baz', color: '61dedb' }
    ]
    const issueLabels = { data: [{ name: 'foo' }, { name: 'baz' }] }
    jest.spyOn(github, 'getLabelsForIssue').mockResolvedValue(issueLabels)
    jest.spyOn(github, 'addLabelsToIssue').mockImplementation()

    expect(await ensureLabelsForIssue(1, labels)).toEqual(['bar'])
  })

  it('adds nothing if they all exist', async () => {
    const labels = [
      { name: 'foo', color: 'e65213' },
      { name: 'baz', color: '61dedb' }
    ]
    const issueLabels = { data: [{ name: 'foo' }, { name: 'baz' }] }
    jest.spyOn(github, 'getLabelsForIssue').mockResolvedValue(issueLabels)

    expect(await ensureLabelsForIssue(1, labels)).toEqual([])
  })
})
