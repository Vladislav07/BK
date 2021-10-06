const redis = require("ioredis");
const db = new redis({
  host: "redis-17625.c1.eu-west-1-3.ec2.cloud.redislabs.com",
  port: "17625",
  password: "6En1mDA2ie8AaDGHxAw0iIDKfNTeOXE7",
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
