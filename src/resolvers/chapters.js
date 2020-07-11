const Chaper = require("../models/Chapter");
const Podcast  = require("../models/Podcast");

module.exports = {
  Query: {},
  Mutation: {
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
        let chapter = { startTimeStamp, endTimeStamp, title };
        // podcasts.chapters.push({ startTimeStamp, endTimeStamp, title });
        // podcasts.save();
        await Podcast.updateMany(Podcast.find(), {
          $push:{chapters: chapter},  
        });

        return podcasts;
      } else throw new UserInputError("Podcast not found");
    },
  },
};
