const songDeleteMutation = (id) => `
mutation {
  deleteSong(id: "${id}")
}
`

export default songDeleteMutation;