import * as inputs from '../src/inputs'
import { getLabels, repository } from '../src/inputs'

describe('repository', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  it('should parse default repository properly', () => {
    process.env.GITHUB_REPOSITORY = 'owner/repo'
    jest.spyOn(inputs, 'repositoryInput').mockReturnValue('')

    expect(repository()).toEqual({ owner: 'owner', repo: 'repo' })
  })

  it('should parse input repository properly', () => {
    process.env.GITHUB_REPOSITORY = 'owner/repo'
    jest.spyOn(inputs, 'repositoryInput').mockReturnValue('foo/bar')

    expect(repository()).toEqual({ owner: 'foo', repo: 'bar' })
  })

  it('should throw an error if owner or repo is empty', () => {
    jest.spyOn(inputs, 'repositoryInput').mockReturnValue('foo')
    expect(() => repository()).toThrow()

    jest.spyOn(inputs, 'repositoryInput').mockReturnValue('/bar')
    expect(() => repository()).toThrow()
  })
})

describe('getLabels', () => {
  it('processes labels properly', () => {
    jest.spyOn(inputs, 'labelsInput').mockReturnValue('foo,bar,,baz,foo,foo,')

    expect(getLabels()).toHaveLength(5)
    expect(getLabels()).toEqual([
      { name: 'foo', color: 'e65213' },
      { name: 'bar', color: 'c11635' },
      { name: 'baz', color: '61dedb' },
      { name: 'foo', color: 'e65213' },
      { name: 'foo', color: 'e65213' }
    ])
  })
})
