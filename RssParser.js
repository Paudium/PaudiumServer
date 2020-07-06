let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  let feed = await parser.parseURL(
    "https://feeds.buzzsprout.com/1100960.rss"
  );
  console.log(feed.title);
  console.log("Podcast title", feed.image.title);
  console.log("Podcat Image URL", feed.image.url);
  console.log("Podcast Link", feed.image.link);

  // let result = feed.items.map(({title,enclosure:{url,length,type}})=>({title,url,length,type}))
    console.log("Number of item is ",feed.items.length);
  let newArray = feed.items.map((item) => ({
    podTitle: feed.image.title,
    podURL: feed.image.link,
    title: item.title,
    audioURL: item.enclosure.url,
    length: item.enclosure.length,
    type: item.enclosure.type,
  }));
  console.log("++++++++++++++++");
  console.log(newArray);
})();
