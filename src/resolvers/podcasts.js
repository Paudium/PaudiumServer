const Podcast = require("../models/Podcast");
const PodGroup = require("../models/PodGroup");

let Parser = require("rss-parser");
let parser = new Parser();

module.exports = {
  Query: {
    podcasts: () => Podcast.find().limit(10),
    async getPodcast(_, { podcastId }) {
      try {
        const podcast = await Podcast.findById(podcastId);
        if (podcast) {
          return podcast;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    chapters: () => Chapter.findById(postId),
  },
  Mutation: {
    likePodcast: async (_, { podcastId }) => {
      // const { username } = checkAuth(context);
      const username = "tom";
      const podcast = await Podcast.findById(podcastId);
      if (podcast) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //   Not liked, like post
          podcast.likePodcasts.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await podcast.save();
        return podcast;
      } else throw new UserInputError("Post not found");
    },
  },
};
