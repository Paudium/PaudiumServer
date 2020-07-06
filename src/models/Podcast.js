import mongoose from 'mongoose';

export const Podcast = mongoose.model("Podcast",{
    podTitle: String,
    podURL: String,
    imageURL:String,
    rssURL: String,
    title: String,
    audioURL:String,
    length: String,
    type: String,
    createdAt: String,
    chapters:[
        {
            title:String,
            startTimeStamp: String,
            endTimeStamp: String
        }
    ],
    likePodcasts:[
        {
            createdAt:String,
            userName:String,
        }
    ]
});