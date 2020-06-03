
const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const path=require("path");


const app=express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({extended:true}));


// Static folder
app.use(express.static(path.join(__dirname, "public")))

// Signup Route
app.post("/signup",(req,res)=>{
    const {firstName, lastName,email}=req.body;

    // Ascertain input values not empty
    if(!firstName ||!lastName||!email){
        res.redirect("/fail.html");
        return;
    }


    //Construct req data
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    const postData=JSON.stringify(data);

    

    const options={
        url:"https://us10.api.mailchimp.com/3.0/lists/8fe2326e3f",
        method:"POST",
        headers:{
            Authorization:"auth b06f5c293c248a77eff4e23370c70d7d-us10"
        },
        body:postData
        
    }



    request(options,(err,response,body)=>{

        if(err){
            res.redirect("/fail.html")
        }else{
            if(response.statusCode===200){
                res.redirect("/success.html")
            }else{
                res.redirect("/fail.html")
            }
        }

    })

})

const PORT=process.env.PORT ||5500;

app.listen(PORT,console.log(`Server started on ${PORT}`));
