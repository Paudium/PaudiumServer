let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  let feed = await parser.parseURL(
    "https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/14a43378-edb2-49be-8511-ab0d000a7030/d1b9612f-bb1b-4b85-9c0c-ab0d004ab37a/podcast.rss"
  );
  console.log(feed.title);
  console.log("Podcast title", feed.image.title);
  console.log("Podcat Image URL", feed.image.url);
  
  console.log("*******************************");

  let newPodGrop = {
    podTitle:feed.title,
    podImage:feed.image.url,
  }

  // let result = feed.items.map(({title,enclosure:{url,length,type}})=>({title,url,length,type}))
    console.log("Number of item is ",feed.items.length);
  let newArray = feed.items.map((item) => ({
    podTitle: feed.image.title,
    podURL: feed.image.link,
    title: item.title,
    publicDate :item.pubDate,
    audioURL: item.enclosure.url,
    length: item.enclosure.length,
    type: item.enclosure.type,
  }));
  console.log("++++++++++++++++");
  newPodGrop = {...newPodGrop,podcasts:newArray};
  console.log(newPodGrop);
})();




