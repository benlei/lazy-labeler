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
    jest
      .spyOn(inputs, 'labelsInput')
      .mockReturnValue(
        `     foo   ,bar,,baz,foo,   ${new Array(52).join('a')}   , ${new Array(51).join('b')} ,foo,`
      )

    expect(getLabels()).toHaveLength(4)
    expect(getLabels()).toEqual([
      { name: 'foo', color: 'e65213' },
      { name: 'bar', color: 'c11635' },
      { name: 'baz', color: '61dedb' },
      { name: new Array(51).join('b'), color: '4072c6' }
    ])

    jest.spyOn(inputs, 'labelsInput').mockReturnValue('foo')
    expect(getLabels()[0]).toEqual({ name: 'foo', color: 'e65213' })
  })
})
