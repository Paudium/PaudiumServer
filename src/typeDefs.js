const { gql } = require("apollo-server-express");

module.exports = gql`
  type PodGroup {
    id: ID!
    podTitle: String!
    rssURL: String!
    podImage: String!
    category: String!
    podcasts: [Podcast]!
  }

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

  type LikePodcast {
    id: ID!
    createdAt: String!
    userName: String!
  }

  type Chapter {
    id: ID!
    title: String!
    startTimeStamp: String!
    endTimeStamp: String!
    notes: [Note]!
    likes: [Like]!
    likeCount: Int!
  }

  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }

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

  type Note {
    id: ID!
    created: String!
    notedTimeStamp: String!
    userName: String!
    body: String!
  }

  type Cat {
    id: ID!
    name: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!

    createPodGroup(rssURL: String!, category: String!):PodGroup!
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

    createChapter(
      startTimeStamp: String!
      endTimeStamp: String!
      title: String!
      podcastId: String!
    ): Chapter!

    createAllChapters(
      startTimeStamp: String!
      endTimeStamp: String!
      title: String!
    ): [Chapter!]!

    createNote(chapterId: String!, body: String!): Chapter!
    deleteNote(chapterId: ID!, noteId: ID!): Chapter!

    likePodcast(podcastId: ID!): Podcast!
    dislikePodcast(podcastID: ID!): Podcast!
    likeChapter(chapterId: ID!): Chapter!
    dislikeChapter(chapterID: ID!): Chapter!

    createCat(name: String!): Cat!
  }

  type Query {
    hello: String!
    cats: [Cat!]!

    podgroups: [PodGroup!]!
    podgroup(podgroupId: ID!): PodGroup
    getpodGroupByCategory(category: String!): [PodGroup!]!

    podcasts: [Podcast!]!
    getPodcast(podcastId: ID!): Podcast!
    chapters: [Chapter!]!
  }
`;
