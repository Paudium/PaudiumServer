import { AuthenticationError, UserInputError } from "apollo-server";
import { Cat } from "./models/Cat";
import { Podcast } from "./models/Podcast";
import { Chapter } from "./models/Chapter";

let Parser = require("rss-parser");
let parser = new Parser();

export const resolvers = {
  Query: {
    hello: () => "looks greate",
    cats: () => Cat.find(),
    podcasts: () => Podcast.find(),
    async getPodcast(_, { podcastId }) {
      try {
        const podcast = await Podcast.findById(podcastId);
        if (podcast) {
          return podcast;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    getPodcastByTitle: ()=>Podcast.find({ podTitle: /john/i }),
    chapters: () => Chapter.findById(postId),
  },

  Mutation: {
    createPodcast: async (_, { rssURL }) => {
      let feed = await parser.parseURL(rssURL);
      let newPodcast = await feed.items.map((item) => ({
        podTitle: feed.image.title,
        podURL: feed.image.link,
        imageURL: feed.image.url,
        rssURL: rssURL,
        title: item.title,
        audioURL: item.enclosure.url,
        length: item.enclosure.length,
        type: item.enclosure.type,
        createdAt: new Date().toISOString(),
      }));

      await Podcast.insertMany(newPodcast);
      return newPodcast;
    },

    createChapter: async (
      _,
      { startTimeStamp, endTimeStamp, title, podcastId }
    ) => {
      const podcast = await Podcast.findById(podcastId);

      if (podcast) {
        podcast.chapters.unshift({
          title,
          startTimeStamp,
          endTimeStamp,
        });
        await podcast.save();
        return podcast;
      } else throw new UserInputError("Podcast not found");
    },

    createAllChapters: async (_, { startTimeStamp, endTimeStamp, title }) => {
      const podcasts = await Podcast.find();

      if (podcasts) {
        // let newPodcast = podcasts.map((podcast) => ({
        //   ...podcast,
        //   chapters: [startTimeStamp, endTimeStamp, title],
        // }));
        // await podcast.save();
        const secondTime = "4:00";
        const sendEndtime = "6:00";
        const secondTitle = "second part";

        await Podcast.updateMany(Podcast.find(), {
          chapters: [
            { startTimeStamp, endTimeStamp, title },
            { secondTime, sendEndtime, secondTitle },
          ],
        });

        return podcasts;
      } else throw new UserInputError("Podcast not found");
    },

    likePodcast: async (_, { podcastId })=> {
        // const { username } = checkAuth(context);
        const username = "tom";
        const podcast = await Podcast.findById(podcastId);
        if (podcast) {
        //   if (post.likes.find((like) => like.username === username)) {
        //     // Post already likes, unlike it
        //     post.likes = post.likes.filter((like) => like.username !== username);
        //   } else {
            // Not liked, like post
            podcast.likePodcasts.push({
              username,
              createdAt: new Date().toISOString()
            });
        //   }
  
          await podcast.save();
          return podcast;
        } else throw new UserInputError('Post not found');
      },

    createCat: async (_, { name }) => {
      const kitty = new Cat({ name });
      await kitty.save();
      return kitty;
    },
  },
};
