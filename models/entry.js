const redis = require("ioredis");

const home=require('../home');

const db = new redis({
 host:home.HOST, 
 port:home.PORT,
 password:home.PASSWORD,
});
db.on("connect", () => console.log("yyyyyyyyyyyy"));
db.on("error", (err) => console.error("redis", err));
db.on("error", function (error) {
  console.error(error);
});

class Entry {
  static getRange(from, to, cb) {
    db.lrange("entries", from, to, (err, items) => {
      if (err) return cb(err);
      let entries = [];
      items.forEach((item) => {
        entries.push(JSON.parse(item));
      });
      cb(null, entries);
    });
  }
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }
  save(cb) {
    const entryJSON = JSON.stringify(this);
    db.lpush("entries", entryJSON, (err) => {
      if (err) return cb(err);
      cb();
    });
  }
}
module.exports = Entry;
