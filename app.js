const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const emailId = req.body.eId;

    const data = {
        members : [
            {
                email_address : emailId,
                status : "subscribed",
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/2c1de4d264";

    const options = {
        method: "POST",
        auth: "aquel911:ad7020d136a00356672a6590a82236f8-us12"
    }

    const request = https.request(url,options,function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname +"/success.html")
        } else {
            res.sendFile(__dirname +"/failure.html")
        }



        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();



});


app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen("3000",function(req,res){
    console.log("This server is running on port 3000");
});


// api Key
// ad7020d136a00356672a6590a82236f8-us12

// audience id
// 2c1de4d264