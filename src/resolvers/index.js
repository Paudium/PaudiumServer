const podGroupResolver = require("./PodGroup");
const podcastResolver = require("./podcasts");
const chapterResover = require("./chapters");
const noteResolver = require("./Note");

const usersResolvers = require("./users");

module.exports = {
  // Post: {
  //   likeCount: (parent) => parent.likes.length,
  //   commentCount: (parent) => parent.comments.length,
  // },
  Query: {
    // ...postsResolvers.Query
    ...podGroupResolver.Query,
    ...podcastResolver.Query,
    ...chapterResover.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...podGroupResolver.Mutation,
    ...podcastResolver.Mutation,
    ...chapterResover.Mutation,
    ...noteResolver.Mutation,
  },

};
