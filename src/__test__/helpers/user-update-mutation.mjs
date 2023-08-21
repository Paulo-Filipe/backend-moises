
const userUpdateMutation = (id, email) => `
mutation {
  updateUser(id: "${id}", email: "${email}") {
    id
    name
    email
  }
}
`;

export default userUpdateMutation;