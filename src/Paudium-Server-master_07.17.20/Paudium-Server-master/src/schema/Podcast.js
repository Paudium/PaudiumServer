export const types = `

  type Podcast {
    id: ID!
    podTitle: String!
    podURL: String!
    imageURL: String!
    title: String!
    description: String!
    length: String!
    audioURL: String!
    type: String!
    createdAt: String!
    chapters: [Chapter]!
    likePodcasts: [LikePodcast]!
    notes: [Note]!
  }

`;

export const queries = `
    podcasts: [Podcast!]!
    getPodcast(podcastId: ID!): Podcast!
`;

export const mutations = `
createPodcast(
      podTitle: String!
      podURL: String!
      imageURL: String!
      title: String!
      description: String!
      length: String!
      audioURL: String!
      type: String!
      createdAt: String!
    ): [Podcast]!


    likePodcast(podcastId: ID!): Podcast!
    dislikePodcast(podcastID: ID!): Podcast!
`;
