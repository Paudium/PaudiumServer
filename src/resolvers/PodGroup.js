const PodGroup = require("../models/PodGroup");
const Podcast = require ("../models/Podcast");

let Parser = require("rss-parser");
let parser = new Parser();

module.exports = {
  Query: {
    podgroups: () => PodGroup.find().limit(1),

    async getCategories() {
      try {
        const podCategories = await PodGroup.find().distinct('category');
        if (podCategories) {
          return podCategories;
        } else {
          throw new Error("PodGroup not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

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

      let newPodGroup = new PodGroup({
        podTitle: feed.title,
        rssURL: rssURL,
        podImage: feed.image.url,
        category: category,
      });

      let podGroup = newPodGroup.save();

      let newPodcasts = await feed.items.map((item) => ({
        podTitle: feed.image.title,
        podURL: feed.image.link,
        imageURL: feed.image.url,
        title: item.title,
        description: item.itunes.summary,
        audioURL: item.enclosure.url,
        length: item.itunes.duration,
      }));

      await Podcast.insertMany(newPodcasts);

      newPodcasts.map(async (podcast) => {
        await PodGroup.updateOne(PodGroup.findOne({rssURL:rssURL}), {
          $push: { podcasts: podcast },
        });
      });

      return podGroup;
    },
  },
};
