import express from "express"
import {createStudent, getALLStudents, getStudent, updateStudent, deleteStudent, top3Csa, getMFCSStats} from "../controllers/resultController.js"

const studentRouter = express.Router();

studentRouter.route('/stats/MFCS').get(getMFCSStats)

studentRouter.route('/top3csa').get(top3Csa, getALLStudents)

studentRouter.route('/').get(getALLStudents).post(createStudent)

studentRouter.route('/:roll').get(getStudent).patch(updateStudent).delete(deleteStudent)

export default studentRouter