var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema setup

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b556fbaeeab2170e3bc8a0c44c2eb2dc&auto=format&fit=crop&w=500&q=60",
//         description: "This is a huge granite hill"
//     },
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("newly created campground");
//             console.log(campground);
//         }
//     }
// );

app.get("/", function(req, res){
   res.render("landing"); 
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("index", {campgrounds: allcampgrounds}); 
       }
    });
});

//CREATE - add new campground to db
app.post("/campgrounds", function(req, res){
   // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //create new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
           //redirect back to campgrounds page
          res.redirect("/campgrounds"); 
       }
    });
});

//NEW show for to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show page with 
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp server has started");
});