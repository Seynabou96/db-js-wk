const Student = require("../model/student");
const mongoose = require("mongoose");
const listeStudent = async () => {
  const liste = await Student.find();
  return liste;
};

const idStudent = async (id) => {
  const identifiant = await Student.find();
  const idtf = identifiant[id];
  return idtf;
};

const creerStudent = async (objStudent) => {
  try {
    const student = await Student.create(objStudent);
    return student;
  } catch (err) {
    console.error(err);
    return err;
  }
};
const deleteStudents = async (idStudent) => {
  let identifiant = await Student.find();
  identifiant = identifiant.filter((stu) => stu !== identifiant[idStudent]);
  return identifiant;
};
const updateStudents = async (idStudent,update) => {
  let identifiant = await Student.find();
  let change = identifiant.filter((stu) => stu === identifiant[idStudent]);
  let objet = change[0]
  let doc = await Student.findOneAndUpdate(objet, update, {
    new: true,
  });
  return doc;
};

module.exports = {
  listeStudent,
  idStudent,
  creerStudent,
  deleteStudents,
  updateStudents,
};
