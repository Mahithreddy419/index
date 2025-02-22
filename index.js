const express = require("express")
var app = express()
const bodyparser = require("body-parser");
let students =[{
    "id":"1",
    "name": "John",
    "age": 20,
},
{
    "id":"2",
    "name": "Ram",
    "age": 30,
}]
app.use(bodyparser.json());

app.get("/students", (req, res) => {
    res.json(students)
    })
    
   app.get("/student/:id",(req,res)=>{
    const id = req.params.id;
    const student = students.find( s=> s.id === id);
    if (student) {
        res.status(200).json({ message: "Student found",student });
    }
    else{
        res.status(404).json({ message: "Student not found",student });
    }
   });

   app.listen(3000, () => {
    console.log("Server is running on port 3000");
    })

    // delete method
    app.delete("/deletestudent/:id",(req,res)=>{
        const id = req.params.id;
        const index = students.findIndex(s=>s.id===id);
        if(index !== -1){
            students.splice(index,1);
            res.status(200).json({message:"Student deleted" });
            }
            else{
                res.status(404).json({message:"Student not found" });
                }
                });

    // post
    app.post("/addstudent",(req,res)=>{
        const {id,name,age}=req.body;
        const newStudent = {id,name,age};
        students.push(newStudent);
        res.status(201).json({message:"Student added",newStudent});
        });

// update 
app.put("/updatestudent/:id",(req,res)=>{
    const id = req.params.id;
    const {name,age}=req.body;
    const student = students.find(s=>s.id===id);
    if(student){
        student.name=name;
        student.age=age;
        res.status(200).json({message:"Student updated",student});
    }
    else{
        res.status(404).json({message:"Student not found",student});
        }
    });

    

        


