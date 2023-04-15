const express = require("express");

const app = express();

const PORT = process.env.PORT || 4000

// swagger documents
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

// file upload
const fileupload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// for post route
app.use(express.json());

// for file route
app.use(fileupload());

let courses = [
    {
        id : "11",
        name : "Learn React",
        price : 299
    },
    {
        id : "22",
        name : "Learn Angular",
        price : 399
    },
    {
        id : "33",
        name : "Learn Django",
        price : 499
    }
];

app.get("/", (req, res) =>{
    res.status(200).send("Hello from Manthan")
});

app.get("/api/v1/lco",(req,res) =>{
    res.send("Hello from LCO docs");
});

app.get("/api/v1/lcoobject",(req,res) =>{
    res.send({ id : "33", name: "Learn Backend", price : 999 });
});

app.get("/api/v1/courses",(req,res) =>{
    res.send(courses)
});

app.get("/api/v1/mycourse/:courseId",(req,res) =>{
    const myCourse = courses.find((course) => course.id === req.params.courseId);
res.send(myCourse);
});

app.post("/api/v1/addCourse", (req,res) =>{
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/coursequery", (req,res) =>{
    let location = req.query.location;
    let device = req.query.device;

    res.send({location, device});
});

app.post("/api/v1/courseupload",(req,res) => {
    console.log(req.headers)
    const file = req.files.file
    let path =  __dirname + "/images/"+ Date.now() + ".jpg"
    file.mv(path,(err) =>{
        res.send(true);
    });
});

app.listen(PORT, () => {
    console.log(`Server is runing at port 4000`)
});
