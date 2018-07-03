var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user}); 
       }
    });
});

//CREATE - add new campground to db
router.post("/",middleware.isLoggedIn, function(req, res){
   // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: desc, author: author};
    //create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //redirect back to campgrounds page
           console.log(newlyCreated);
          res.redirect("/campgrounds"); 
       }
    });
});

//NEW show for to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            console.log(foundCampground);
            //render show page with 
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT campground
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE campground
router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Your campground has been updated");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
   //redirect to the showpage
});

//DESTROY campground
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Your campground has been deleted");
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;