var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {name: "Salmon Creek", image:"https://images.unsplash.com/photo-1475564481606-0f9f5d97c047?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c8e032b27c71d96a59bb540347343ea&auto=format&fit=crop&w=500&q=60"},
        {name: "Alton Water's", image:"https://images.unsplash.com/photo-1482376292551-03dfcb8c0c74?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b556fbaeeab2170e3bc8a0c44c2eb2dc&auto=format&fit=crop&w=500&q=60"},
        {name: "Tuna Lake", image:"https://images.unsplash.com/photo-1519395612667-3b754d7b9086?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2408b72d00a5efaf0f2e14d02f144790&auto=format&fit=crop&w=500&q=60"},
        {name: "East Lagoon", image:"https://images.unsplash.com/photo-1505232530843-7e94d7faac73?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c57fb6c7ac06a378656f493f96592ef5&auto=format&fit=crop&w=750&q=80"}
    ] 



app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res){

    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   
   campgrounds.push(newCampground);
   //redirect back to campgrounds page
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Yelp Camp server has started");
});