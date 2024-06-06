import Result from "../models/resultModel.js";
import APIFeatures from "../utils/apiFeatures.js";

const top3Csa = (req,res,next)=>{
  req.query.limit = '3';
  req.query.sort = '-CSA'
  req.query.fields = 'name,roll,CSA'
  next();
}

const getALLStudents = async (req, res) => {
  try {

    let queryFeatures = new APIFeatures(Result.find(), req.query).filter().sort().fields().pagination();

    const results = await queryFeatures.query;

    res.status(200).json({
      message: "successfull",
      number: results.length,
      results,
    });
  } catch (error) {
    res.status(400).json({
      message: error || "something went wrong",
    });
  }
};

const getStudent = async (req, res) => {

  try{
    const specificResult = await Result.find({ roll: req.params.roll * 1 });
  
    if (specificResult.length === 0) {
      return res.status(404).json({
        message: "failed - there is no data with such roll number",
      });
    }
  
    res.status(200).json({
      message: "successfull",
      specificResult,
    });
  }
  catch(error){
    res.status(400).json({
      message: "failed",
      error
    })
  }
};

const createStudent = async (req, res) => {
  try {
    const newStudent = await Result.create(req.body);
    res.status(201).json({
      message: "successfull",
      newStudent,
    });
  } catch(error) {
    console.log(error)
    res.status(403).json({
      message: "something went wrong" || error,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Result.findOneAndUpdate(
      { roll: req.params.roll * 1 },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "succesfull",
      updateStudent
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "something went wrong",
    });
  }
};

const deleteStudent = async(req, res) => {
  try {
    await Result.findOneAndDelete({roll: req.params.roll * 1});
    res.status(200).json({
      message: "deletion successfull",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "something went wrong",
    });
  }
};

const getMFCSStats = async(req,res)=>{
  try{
    const stats = await Result.aggregate([
      {
        $match: {
          $and: [
            { roll : { $gte: 65 } },
            { roll : {$lte : 85 } },
          ]
        }
      },
      {
        $group: {
          _id: "$semester",
          avgMFCS : { $avg: '$MFCS' },
          minMFCS : { $min: '$MFCS' },
          maxMFCS : { $max: '$MFCS' },
          doc : { $sum : 1 }
        }
      },
      {
        $set: { semester : "$_id"}
      },
      {
        $unset: "_id"
      }
    ])

    res.status(200).json({
      message: "successfull",
      stats,
    });
  }
  catch(error){
    res.status(400).json({
      message: error.message || "something went wrong",
    });
  }
}

export {
  getALLStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  top3Csa,
  getMFCSStats
};