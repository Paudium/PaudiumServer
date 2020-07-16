export const types = `
  type Note {
    id: ID!
    created: String!
    notedTimeStamp: String!
    userName: String!
    body: String!
  }
`;

export const queries = `
`;

export const mutations = `

    createNote(chapterId: String!, body: String!): Chapter!
    deleteNote(chapterId: ID!, noteId: ID!): Chapter!

`;
