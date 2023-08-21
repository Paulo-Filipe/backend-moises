const songCreateMutation = (userId, name) => `
mutation {
  createSong(name: "${name}", userId: "${userId}") {
    id
    name
  }
}
`

export default songCreateMutation;