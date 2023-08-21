const userCreateMutation = (name) => `
  mutation {
    createUser(name: "${name}", email: "${name}@example.com") {
      id
      name
      email
    }
  }
  `;

export default userCreateMutation;