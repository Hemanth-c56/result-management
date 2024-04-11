import express from "express"
import {createStudent, getALLStudents, getStudent, updateStudent, deleteStudent} from "../controllers/resultController.js"

const studentRouter = express.Router();

studentRouter.route('/').get(getALLStudents).post(createStudent)

studentRouter.route('/:roll').get(getStudent).patch(updateStudent).delete(deleteStudent)

export default studentRouter