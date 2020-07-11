const mongoose = require('mongoose');

module.exports = mongoose.model("PodGroup",{
    podTitle: String,
    rssURL: String,
    podImage:String,
    rssURL: String,
    category: String,
   
    podcasts:[
        {
            podTitle:String,
            podURL:String,
            imageURL:String,
            title:String,
            description: String,
            length: String,
            audioURL: String,
            type: String,
            createdAt: String,

        }
    ],
    
});