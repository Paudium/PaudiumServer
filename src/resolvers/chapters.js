const Chaper = require("../models/Chapter");

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
  },
};
