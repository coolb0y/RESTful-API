const express  = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
const port = process.env.PORT;


PersonSchema = new mongoose.Schema({
    name: String,
    quality: String
})

const Person = mongoose.model("Person",PersonSchema);

mongoose.connect("mongodb://localhost:27017/personDB",{useNewUrlParser:true, useUnifiedTopology: true });

const ankur = new Person({
    name:"Ankur Narayan Singh",
    quality: "I am a web developer and Student at MNIT"
})
ankur.save();

const abhay = new Person({
    name: "Abhay Kumar",
    quality: "He is Engineering Student and Athlete and Long Jumper"
})
abhay.save();

app.get("/user",(req,res)=>{
    Person.find(function(err,person){
        if(err){
            console.log(err);
        }
        else{
            person.forEach(function(element){
                console.log(element.name);
            })
        }
    })
});

app.post("/User",function(req,res){

    const newPerson = new Person({
        name: req.body.name,
        quality: req.body.quality
    })
    newPerson.save();
    console.log("1 person added");
})


app.route("/User/:id")
    .get((req,res)=>{
        Person.findById(ObjectId(req.params.id),function(){
            if(err){
                console.log("error");
            }
            else{
                console.log(req.body.quality);
            }
        })
        
    })

    .put((req,res)=>{
        //edit details  of user 
        Person.findByIdAndUpdate({_id:req.params.id},
            {
            name:req.body.name,
            quality: req.body.quality
        },function(err,docs){
            if(err) res.json(err);
            else{
                res.send("successfully update");
            }
        })
        
    })

    .delete((req,res)=>{
        //to delete a user
        Person.deleteOne({_id:req.body.params},function(err){
            if(err){
                res.json(err);
            }
            else{
                res.send("1 document deleted");
            }
        })
    
    })

app.listen(3000 || port,function(){
    console.log(`server is running on port 3000 or ${port}`);
})








