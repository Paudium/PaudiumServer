const PodGroup = require("../models/PodGroup");

let Parser = require("rss-parser");
let parser = new Parser();

module.exports = {
  Query: {
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
  },
  Mutation: {
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
  },
};