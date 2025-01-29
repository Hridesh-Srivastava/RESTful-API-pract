import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

const API_URL = "https://secrets-api.appbrewery.com";
const myBearerToken = "9dbdfbc1-aef3-4750-8e9d-39fb77dd64c0";

const config = {
    headers : {
        Authorization : `Bearer ${myBearerToken}`
    }
};

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req , res) => {
    res.render("index.ejs" , {
        content : "Waiting for response from server..."
    })
});

//get req.
app.post("/get-secret" , async(req , res) => {
    const searchId = req.body.id;
    try {
        const response = await axios.get(API_URL + "/secrets/" + searchId , config);
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
    } catch (error) {
        res.render("index.ejs" , {
            content : JSON.stringify(error.response.data)
        })
    }
});

//post req.
app.post("/post-secret" , async(req, res) => {
    try {
        const response = await axios.post(API_URL + "/secrets" , req.body , config);
        //req.body is the body of the form data
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
    } catch (error) {
        res.render("index.ejs" , {
            content : JSON.stringify(error.response.data)
        })
    }
});

//put req. (we provide all of the data here that we want to change in our backend).
app.post("/put-secret" , async(req , res) => {
    const searchId = req.body.id;
    try {
        const response = await axios.put(API_URL + "/secrets/" + searchId , req.body , config);
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
    } catch (error) {
        res.render("index.ejs", {
            content : JSON.stringify(error.response.data)
        })
    }
});

//patch req. (we provide here some bits of data to change in backend and else remain same in 
// resources as it is)
app.post("/patch-secret" , async(req , res) => {
    const searchId = req.body.id;
    try {
        const response = await axios.patch(API_URL + "/secrets/" + searchId , req.body , config);
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
    } catch (error) {
        res.render("index.ejs", {
            content : JSON.stringify(error.response.data)
        })
    }
});

//delete req.
app.post("/delete-secret" , async(req , res) => {
    const searchId = req.body.id;
    try {
        const response = await axios.delete(API_URL + "/secrets" + searchId , config);
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
    } catch (error) {
        res.render("index.ejs", {
            content : JSON.stringify(error.response.data)
        })
    }
});

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
});

export default app;