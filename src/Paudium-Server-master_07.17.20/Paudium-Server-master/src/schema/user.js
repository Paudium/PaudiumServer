export const types = `
type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
`;


export const mutations = `

    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
`;

