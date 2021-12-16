const Course = require("../model/course");
const mongoose = require("mongoose");
const listeCourse = async () => {
  const liste = await Course.find();
  return liste;
};

const idCourse = async (id) => {
  const identifiant = await Course.find();
  const idtf = identifiant[id];
  return idtf;
};

const creerCourse = async (objCourse) => {
  try {
    const course = await Course.create(objCourse);
    return course;
  } catch (err) {
    console.error(err);
    return err;
  }
};
const deleteCourse = async (idCourse) => {
  let identifiant = await Course.find();
  identifiant = identifiant.filter((co) => co !== identifiant[idCourse]);
  return identifiant;
};
const updateCourse = async (idCourse,update) => {
  let identifiant = await Course.find();
  let change = identifiant.filter((co) => co === identifiant[idCourse]);
  let objet = change[0]
  let doc = await Course.findOneAndUpdate(objet, update, {
    new: true,
  });
  return doc;
};

module.exports = {
  listeCourse,
  idCourse,
  creerCourse,
  deleteCourse,
  updateCourse
};
