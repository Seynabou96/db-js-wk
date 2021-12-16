// stoootse : Mettre des await au debut de chaque utilisation de fonction natif
// stoootse : Mettre des async au debut de chaque declaration de fonction 

(async () => {
  const Course = require('./model/course');
  const Student = require('./model/student');
  const mongoose = require("mongoose");



  const uri = "mongodb://localhost:27017/db";



  const connecter = async () => {
      try {
          await mongoose.connect(uri);
          console.log("YOU ARE CONNECTED TO THE DATABASE");

      } catch (e) {
          console.error(e.message);
      }
  }

  const reqCourses = async (id) => {
      try {
          let queryC = await Course.findById(id);
          return queryC;
      }
      catch (error) {
          console.log(error.message);
      }
  }

  const reqCumul = async () => {
      try {
          let req = await Student.find({})
          let arrCourseId = [];
          // console.log(req);
          for (let j = 0; j < req.length; j++) {
              arrCourseId.push(req[j]._id);
          }
          console.log(arrCourseId);
          for (let k = 0; k < arrCourseId.length; k++) {
              let vol = 0;
              let label = [];
              let array = (await reqStudents(arrCourseId[k])).courses;
              for (let i = 0; i < array.length; i++) {
                  const element = array[i];
                  label.push((await reqCourses(element)).label)
                  vol += (await reqCourses(element)).volume;
              }
              console.log('________________________Student list_____________________________');
              console.log("       Student : " + req[k].FirstName + " " + req[k].LastName);
              console.log("       label : " + label);
              console.log("       Volume Horaire : " + vol);
          }
      } catch (error) {
          console.log(error.message)
      }
  }
  const reqStudents = async (id) => {
      try {
          let queryS = await Student.findById(id);
          return queryS;
      } catch (error) {
          console.log(error.message);
      }
  }




  await connecter();

  const idStudent3 = '61b220b6436d7914b8c22138';

  let studentOb = await reqStudents(idStudent3);
  let courseObjh = (await reqCourses(studentOb.courses[0])).volume;
  // console.log(courseObjh);
  let array = studentOb.courses;

  // let req = await Student.find({})
  // let arrCourseId = [];
  // // console.log(req);
  // for (let j = 0; j < req.length; j++) {
  //     arrCourseId.push(req[j]._id);
  // }
  // console.log(arrCourseId);
  // for (let k = 0; k < arrCourseId.length; k++) {
  //     let vol = 0;
  //     let label = [];
  //     let array = (await reqStudents(arrCourseId[k])).courses;
  //     for (let i = 0; i < array.length; i++) {
  //         const element = array[i];
  //         label.push((await reqCourses(element)).label)
  //         vol += (await reqCourses(element)).volume;
  //     }
  //     console.log('________________________Student list_____________________________');
  //     console.log("       Student : " + req[k].FirstName + " " + req[k].LastName);
  //     console.log("       label : " + label);
  //     console.log("       Volume Horaire : " + vol);
  // }
  await reqCumul();

  // QVEC LA METHODE MAP()
  let req = await Student.find({})
  let arrCourse = {};
  let tab = [];
  let cptVol ;
  let objectsStud = req.map(object => {
      arrCourse.name = object.FirstName+' '+object.LastName;
      arrCourse.courses = object.courses;
      tab.push(arrCourse)
      arrCourse = {};
      return tab;
  });
  objectsStud = objectsStud[0];
  console.log(objectsStud)

  let arrayCourses = objectsStud.map(function(object) {   
      let arraysId = object.courses.map(tabUn => {
          return tabUn;
      });
      return arraysId
  });
  console.log(arrayCourses)
  // let objArrC = [];
  // let labCourses = arrayCourses.map(async idArray => {
  //     let objectArr = await idArray.forEach(async element => {
  //         let objectC = await Course.findById(element);
  //         objArrC.push(objectC);
  //         return objArrC;
  //     });
  //     return objectArr;
  // });
  // console.log(labCourses)

  

})();