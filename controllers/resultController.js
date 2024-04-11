import fs from 'fs'
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url))

import Result from '../models/resultModel.js';

// Reading results file data
// var results = JSON.parse(fs.readFileSync(`${__dirname}/../data/results.json`))

const getALLStudents = async(req,res)=>{
    const results = await Result.find({});
    try{
        res.status(200).json({
        message: 'successfull',
        number: results.length,
        results
        })
    }
    catch(error){
        res.status(200).json({
            message: error || 'something went wrong'
        })
    }
}

const getStudent = (req,res)=>{
    const specificResult = results.find((res) => res.roll === (req.params.roll * 1))

    if(!specificResult){
        return res.status(404).json({
            message: "failed - there is no data"
        })
    }

    res.status(200).json({
        message: "successfull",
        specificResult
    })
}

const createStudent = (req,res)=>{
    try{
        const newStudent = req.body;
        results.push(newStudent);

        fs.writeFileSync(`${__dirname}/../data/results.json`, JSON.stringify(results));
        res.status(201).json({
            message: 'successfull',
            newStudent
        })
    }
    catch{
        res.status(403).json({
            message: 'something went wrong'
        })
    }
}

const updateStudent = (req,res)=>{
    const roll = req.params.roll * 1;
    const studentIndex = results.findIndex(s => s.roll === roll);

    try{
         if(studentIndex === -1){
            return res.status(400).json({
            message: 'fail - there is no such student'
        })
        }
        for(const x in req.body){
            results[studentIndex][x] = req.body[x];
        }
        
        fs.writeFileSync(`${__dirname}/../data/results.json`, JSON.stringify(results));

        res.status(200).json({
            message: 'succesfull'
        })
    }
    catch(error){
        res.status(400).json({
            message: error.message || 'something went wrong',
        })
    }
}

const deleteStudent = (req,res)=>{
    const roll = req.params.roll * 1;
    try{
        results = results.filter(r => r.roll !== roll)
        fs.writeFileSync(`${__dirname}/../data/results.json`, JSON.stringify(results))
        res.status(200).json({
            message: 'deletion successfull'
        })
    }
    catch(error){
        res.status(400).json({
            message: error.message || 'something went wrong'
        })
    }
}

export {getALLStudents, getStudent, createStudent, updateStudent, deleteStudent}