import express from "express";
import bodyparser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";
const __dirName = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended :true}));

app.get("/",(req,res)=>{
    res.render( __dirName + "/view/index.ejs");
});


app.get("/create",(req,res)=>{
    res.render( __dirName + "/view/create.ejs");
});


app.get("/read",(req,res)=>{
    res.render( (__dirName + "/view/read.ejs"),{
        blogs :array,
    });
});

app.listen(port,(req,res)=>{
    console.log(`You are on server ${port}`);
});

const array = new Array();

app.post("/submit",(req,res)=>{
    
    let author = req.body["bloggerName"];
    let title = req.body["title"];
    let content = req.body["blogContent"];

    if(author && title && content){
        array.push({
            author,
            title,
            content,
        });
        res.redirect("/read")
    }else{
        res.redirect("/create");
    }

    
});

app.post("/update",(req,res)=>{
    let author_update = req.body["bloggerName"];
    let title_update = req.body["title"];
    let content_update = req.body["blogContent"];
    let idx_update = req.body["blogIdx"];

    res.render((__dirName + "/view/update.ejs"),{
        author_upd : author_update,
        title_upd : title_update,
        content_upd : content_update,
        idx_upd : idx_update,
    })
})

app.post("/read",(req,res)=>{
    let point = Number(req.body["index_UPDATE"]);
    
    array[point].author = req.body["bloggerName"];
    array[point].title = req.body["title"];
    array[point].content = req.body["blogContent"];
    res.redirect("/read");
    });
