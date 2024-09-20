export interface Repository {
  owner: string
  repo: string
}

export interface Label {
  name: string
  color: string
}

export interface LabelResponse {
  data: {
    name: string
  }[]
}
