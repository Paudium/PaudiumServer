const { AuthenticationError, UserInputError } = require("apollo-server");
const Cat = require("./models/Cat");
const Podcast = require("./models/Podcast");
const Chapter = require("./models/Chapter");
const PodGroup = require("./models/PodGroup");

let Parser = require("rss-parser");
let parser = new Parser();

module.exports = {
  Query: {
    hello: () => "looks greate",
    cats: () => Cat.find(),

    podgroups: () => PodGroup.find(),
    async podgroup(_, { podgroupId }) {
      try {
        const podGroup = await PodGroup.findById(podgroupId);
        if (podGroup) {
          return podGroup;
        } else {
          throw new Error("PodGroup not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getpodGroupByCategory(_, { category }) {
      try {
        const podGroup = (await PodGroup.find()).filter(
          (item) => item.category === category
        );
        if (podGroup) {
          return podGroup;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    // getPodGroupByCategory: ()=>_.mapValues(_.groupBy(PodGroup,'category'),clist=>clist.map(item=>_.omit(item,'category'))),

    podcasts: () => Podcast.find(),
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

    getPodcastByTitle: () => Podcast.find({ podTitle: /john/i }),
    chapters: () => Chapter.findById(postId),
  },

  Mutation: {
    // createPodcast: async (_, { rssURL }) => {
    //   let feed = await parser.parseURL(rssURL);

    //   let newPodcast = await feed.items.map((item) => ({
    //     podTitle: feed.image.title,
    //     podURL: feed.image.link,
    //     imageURL: feed.image.url,
    //     rssURL: rssURL,
    //     title: item.title,
    //     description:item.itunes.summary,
    //     audioURL: item.enclosure.url,
    //     length: item.itunes.duration,
    //     type: item.enclosure.type,
    //     createdAt: new Date().toISOString(),
    //   }));
    //   await PodGroup.insertMany(newPodcast);
    //   return newPodcast;
    // },

    createPodGroup: async (_, { rssURL, category }) => {
      let feed = await parser.parseURL(rssURL);

      let basicInfo = {
        podTitle: feed.title,
        rssURL: rssURL,
        podImage: feed.image.url,
        category: category,
      };



      let newPodcasts = await feed.items.map((item) => ({
        podTitle: feed.image.title,
        podURL: feed.image.link,
        imageURL: feed.image.url,
        rssURL: rssURL,
        title: item.title,
        description: item.itunes.summary,
        audioURL: item.enclosure.url,
        length: item.itunes.duration,
        type: item.enclosure.type,
        createdAt: new Date().toISOString(),
      }));

      let myPodcast = await Podcast.insertMany(newPodcasts);
      let newPodGroup = new PodGroup({
        ...basicInfo,
        podcasts: myPodcast,
      });
      const podGroup = newPodGroup.save();
      return podGroup;
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

    likePodcast: async (_, { podcastId }) => {
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
          createdAt: new Date().toISOString(),
        });
        //   }

        await podcast.save();
        return podcast;
      } else throw new UserInputError("Post not found");
    },

    createCat: async (_, { name }) => {
      const kitty = new Cat({ name });
      await kitty.save();
      return kitty;
    },
  },
};
