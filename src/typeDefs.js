import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Podcast {
    id: ID!
    podTitle: String!
    podURL: String!
    imageURL: String!
    rssURL: String!
    title: String!
    length: String!
    audioURL: String!
    type: String!
    createdAt: String!
    chapters: [Chapter]!
    likePodcasts:[LikePodcast]!
  }

  type LikePodcast {
    id:ID!
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
    createPodcast(rssURL: String!): [Podcast]!
    deletePost(postId: ID!): String!

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
    podcasts: [Podcast!]!
    getPodcast(podcastId:ID!):Podcast!
    getPodcastByTitle:[Podcast!]!
    chapters: [Chapter!]!
  }
`;
