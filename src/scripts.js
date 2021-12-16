// stoootse : Mettre des await au debut de chaque utilisation de fonction natif
// stoootse : Mettre des async au debut de chaque declaration de fonction

(async () => {
  const Course = require("./model/course");
  const Student = require("./model/student");
  const mongoose = require("mongoose");

  const uri = "mongodb://localhost:27017/db";

  //pour gérer la connection

  const connecter = async () => {
    try {
      await mongoose.connect(uri);
      console.log("YOU ARE CONNECTED TO THE DATABASE");
    } catch (e) {
      console.error(e.message);
    }
  };
  await connecter();

  //création de cours

  //  const creerCours = async()=>{
  //      try {
  //          const course = await Course.create({
  //             id : "cours3",
  //             label:"javascript",
  //             volume: 70,
  //          })
  //         console.log(course)
  //      } catch (err) {
  //          console.log(err)
  //      }
  //  }

  // creerCours();

  //   const creerStudents = async () => {
  //     try {
  //       const student = await Student.create({
  //         INE: "student3",
  //         FirstName: "Mbagnick",
  //         LastName: "Diaw",
  //         tel: "000027",
  //         courses: ["61b7d28b54155e0164d19879","61b7d2e6f70857323d791713","61b7d31fd8d0b09506d6c7df"],
  //       });
  //       console.log(student);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   creerStudents();

  // //mettre mes cours et mes participants dans des arrays.
  // let stu =await Student.find({});
  // let cours = await Course.find({})

  //  //.log((await (Course.find({}))).forEach(element=>console.log('1'+element)))
  //  const recuplabel = async(id)=>{

  //     //try{
  //       const  h = await Course.findById(id)
  //       const f = await (h.label)
  //       return f
  //    // }
  //     //catch(err){
  //       //console.log(err)
  //     //}
  //    }
  //    const recupvol = async(id)=>{

  //     try{
  //       const  h = await Course.findById(id)
  //       const f = await (h.volume)
  //       return f
  //     }
  //     catch(err){
  //       console.log(err)
  //     }
  //    }
  // const trytobe=async()=>{

  //   const gf = stu.map(element=>console.log(`
  //   totaux:,
  //   label:${(element.courses).map(async ele=>await recuplabel(ele))},
  //   volume:${(element.courses).map(ele=>recupvol(ele))}

  // `))
  //  console.log(gf)
  // }
  //  await trytobe()

  // //avec for

  //   const reqCourses = async (id) => {
  //       try {
  //           let queryC = await Course.findById(id);
  //           return queryC;
  //       }
  //       catch (error) {
  //           console.log(error.message);
  //       }
  //   }

  //   const reqCumul = async () => {
  //       try {
  //           let req = await Student.find({})
  //           let arrCourseId = [];
  //           // console.log(req);
  //           for (let j = 0; j < req.length; j++) {
  //               arrCourseId.push(req[j]._id);
  //           }
  //           console.log(arrCourseId);
  //           for (let k = 0; k < arrCourseId.length; k++) {
  //               let vol = 0;
  //               let label = [];
  //               let array = (await reqStudents(arrCourseId[k])).courses;
  //               for (let i = 0; i < array.length; i++) {
  //                   const element = array[i];
  //                   label.push((await reqCourses(element)).label)
  //                   vol += (await reqCourses(element)).volume;
  //               }
  //               console.log('________________________Student list_____________________________');
  //               console.log("       Student : " + req[k].FirstName + " " + req[k].LastName);
  //               console.log("       label : " + label);
  //               console.log("       Volume Horaire : " + vol);
  //           }
  //       } catch (error) {
  //           console.log(error.message)
  //       }
  //   }
  //   const reqStudents = async (id) => {
  //       try {
  //           let queryS = await Student.findById(id);
  //           return queryS;
  //       } catch (error) {
  //           console.log(error.message);
  //       }
  //   }
  //   await reqCumul();

  const express = require("express");
  const fonctionsStudents = require("./lib/data.layer_student");
  const app = express();
  const port = 3000;
  const host = "http://localhost";
  //console.log(express)

  //liste des participants
  app.get("/students", async (req, res) => {
    const students = await fonctionsStudents.listeStudent();
    res.json(students);
  });

  //retourner le participant dont l'id a été passé en paramétre
  app.get("/students/:id", async (req, res) => {
    id = req.params.id;
    const idStudents = await fonctionsStudents.idStudent(id);
    res.json(idStudents);
  });

  //création nvx Student
  app.post("/students", async (req, res) => {
    let student4 = {
      INE: "student12",
      FirstName: "Maman Farmata",
      LastName: "Laye Taye",
      tel: "000030",
      courses: ["61b7d2e6f70857323d791713", "61b7d31fd8d0b09506d6c7df"],
    };

    const creer = await fonctionsStudents.creerStudent(student4)

    res.json(creer);
  });
  //Supprimer via l'id
  app.delete("/students/:id", async (req, res) => {
   let  id =parseInt(req.params.id) ;
    const delStudents = await fonctionsStudents.deleteStudents(id);
    res.json(delStudents);
  });
  app.patch("/students/:id", async (req, res) => {
   let id =parseInt(req.params.id) ;
     req.body = {
       "FirstName":"Dazouda"
     }
    const upStudents = await fonctionsStudents.updateStudents(id,req.body);
    res.json(upStudents);
  });
  app.listen(port, function () {
    console.log(`Server listening  on ${host}:${port}`);
  });
})();
