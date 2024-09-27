/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as inputs from '../src/inputs'
import * as labeler from '../src/labeler'
import * as main from '../src/main'

// Mock the GitHub Actions core library
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()

    jest.spyOn(inputs, 'issueNumberInput').mockReturnValue(1)
    jest.spyOn(inputs, 'failOnErrorInput').mockReturnValue(false)
    jest.spyOn(inputs, 'getLabels').mockReturnValue([])
    jest.spyOn(labeler, 'createMissingRepoLabels').mockImplementation()
    jest.spyOn(labeler, 'ensureLabelsForIssue').mockImplementation()
  })

  it('should run the action successfully', async () => {
    await main.run()

    expect(setFailedMock).not.toHaveBeenCalled()
  })

  it('should run successfully even if an error occurs', async () => {
    jest
      .spyOn(labeler, 'createMissingRepoLabels')
      .mockRejectedValue(new Error('test error'))

    await main.run()

    expect(setFailedMock).not.toHaveBeenCalled()
  })

  it('should fail if an error occurs and failOnError is true', async () => {
    jest.spyOn(inputs, 'failOnErrorInput').mockReturnValue(true)
    jest
      .spyOn(labeler, 'createMissingRepoLabels')
      .mockRejectedValue(new Error('test error'))

    await main.run()

    expect(setFailedMock).toHaveBeenCalled()
  })
})
