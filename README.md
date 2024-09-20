# Create a GitHub Action Using TypeScript

[![GitHub Super-Linter](https://github.com/benlei/add-labels-deterministically/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/benlei/add-labels-deterministically/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/benlei/add-labels-deterministically/actions/workflows/check-dist.yml/badge.svg)](https://github.com/benlei/add-labels-deterministically/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/benlei/add-labels-deterministically/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/benlei/add-labels-deterministically/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

This action will fist try to see if any of the labels you want to add exist in
your repo. If it doesn't, it'll try to create it for you with a determinstic
color. This will allow you to ensure all your labels with the same name will be
consistent across all your repos.

Then it'll try to add any labels that are not currently present on the issue.

## Inputs

<!-- markdownlint-disable MD013 -->

| Input Name      | Required | Default                            | Description                                                                                                   |
| --------------- | -------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `repository`    | no       | `${{ github.repository }}`         | The repository to find issue in, if trying to fetch an issue's body                                           |
| `token`         | no       | `${{ github.token }}`              | The GitHub token to use for searching for issue                                                               |
| `issue-number`  | yes      | `${{ github.event.issue.number }}` | The issue number to try to fetch the body from for parsing. Ignored if `body` input is specified/has content. |
| `labels`        | yes      | n/a                                | Comma separated list of labels to add to issue/repo                                                           |
| `fail-on-error` | no       | `false`                            | Whether or not to fail action if any error occurs                                                             |

<!-- markdownlint-enable MD013 -->

## Outputs

N/A

## Example

```yaml
- name: Test Local Action - Issue Number
  id: test
  uses: benlei/add-labels-deterministically@v1
  with:
    issue-number: 3
    labels: foo, bar, baz
```
