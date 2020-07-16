export const types = `
  type PodGroup {
    id: ID!
    podTitle: String!
    rssURL: String!
    podImage: String!
    category: String!
    podcasts: [Podcast]!
  }
`;

export const queries = `
    podgroups: [PodGroup!]!
    podgroup(podgroupId: ID!): PodGroup
    getpodGroupByCategory(category: String!): [PodGroup!]!
`;

export const mutations = `
    createPodGroup(rssURL: String!, category: String!):PodGroup!

`;
