const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../util/check-auth");
// const Post = require('../../models/Post');
const Chapter = require("../models/Chapter");
module.exports = {
  Mutation: {
    createNote: async (_, { chapterId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty note", {
          errors: {
            body: "note body must not empty",
          },
        });
      }

      const chapter = await chapter.findById(chapterId);

      if (chapter) {
        chapter.notes.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await chapter.save();
        return chapter;
      } else throw new UserInputError("Chapter not found");
    },
    async deleteNote(_, { chapterId, noteId }, context) {
      const { username } = checkAuth(context);

      const chapter = await chapter.findById(chapterId);

      if (chapter) {
        const noteIndex = Chapter.notes.findIndex((c) => c.id === noteId);

        if (Chapter.notes[noteIndex].username === username) {
          Chapter.notes.splice(noteIndex, 1);
          await chapter.save();
          return chapter;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("chapter not found");
      }
    },
  },
};
