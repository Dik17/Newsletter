const express=require("express");
// const mailchip=require("mailchimp");
const bodyParser=require("body-parser");
// const mailchimp = require("@mailchimp/mailchimp_marketing");
const request=require("request");
const https=require("https")
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true }));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")

})
app.post("/",function(req,res){
var firstName=req.body.fname;
var lastname=req.body.lname;
var email=req.body.email;
var data={
  members:
  [{
    email_address:email,
  status:"subscribed",
  merge_fields:{
    FNAME:firstName,
    LNAME:lastname
  }
}
]
};
const jsonData=JSON.stringify(data);
const url=" https://us5.api.mailchimp.com/3.0/lists/5e2355b9ff"
const option={
  method:"POST",
  auth:"diksha:3d9148a95969ff20207970f800259fc8-us5"
}
const request=https.request(url,option,function(response){
if( response.statusCode===200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failure.html");
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
app.listen(process.env.PORT||3000,function(){
  console.log ("server is runing at port 3000");
})
//135b321186d4ea56b029860d47be29c1-us5
//5e2355b9ff
