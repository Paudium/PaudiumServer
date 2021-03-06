const PodGroup = require("../models/PodGroup");
const Podcast = require("../models/Podcast");
const feedURLs = require("../asset/Podgroups.json");


let Parser = require("rss-parser");
const { split } = require("lodash");
let parser = new Parser();

module.exports = {
  Query: {
    podgroups: () => PodGroup.find().limit(1),

    async getCategories() {
      try {
        const podCategories = await PodGroup.find().distinct("category");
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

    async searchPodTitle(_, { text }) {
      try {
        var output = text.split(" ");
        var searchKeys = '"' + output.join('" "') + '"';
        let podGroup = PodGroup.find({ $text: { $search: searchKeys } });
        return podGroup;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPodGroup: async (_, { rssURL, category }) => {
      let feed = await parser.parseURL(rssURL);

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

      const podcasts =  await Podcast.insertMany(newPodcasts);

      console.log("Inputed Podcast",podcasts);

      podcasts.map(async (podcast) => {
        await PodGroup.updateOne(PodGroup.findOne({ rssURL: rssURL }), {
          $push: { podcasts: podcast },
        });
      });

      return podGroup;
    },
  },
};