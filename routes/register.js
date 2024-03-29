const User=require('../models/User');
exports.form = (req, res) => {
  res.render("register", { title: "Register" });
};
exports.submit = (req, res, next) => {
  const data = req.body.user;
  User.getByName(data.name, (err, user) => {
    if (err) return next(err);
    // redis использует значение по умолчанию
    if (user.id) {
      res.error("Username already taken!");
      res.redirect("back");
    } else {
 
       user = new User({
        name: data.name,
        pass: data.pass, 
      });
   
      user.save((err) => {
        if (err) return next(err);
        req.session.uid = user.id;
        res.redirect("/");
      }); 
    }
  });
};
