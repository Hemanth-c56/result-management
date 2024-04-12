import Result from "../models/resultModel.js";

const getALLStudents = async (req, res) => {
  const results = await Result.find({});
  try {
    res.status(200).json({
      message: "successfull",
      number: results.length,
      results,
    });
  } catch (error) {
    res.status(200).json({
      message: error || "something went wrong",
    });
  }
};

const getStudent = async (req, res) => {
  const specificResult = await Result.find({ roll: req.params.roll * 1 });
  console.log(specificResult)

  if (specificResult.length === 0) {
    return res.status(404).json({
      message: "failed - there is no data with such roll number",
    });
  }

  res.status(200).json({
    message: "successfull",
    specificResult,
  });
};

const createStudent = async (req, res) => {
  try {
    const newStudent = await Result.create(req.body);
    res.status(201).json({
      message: "successfull",
      newStudent,
    });
  } catch {
    res.status(403).json({
      message: "something went wrong",
    });
  }
};

const updateStudent = async (req, res) => {
  const updatedStudent = await Result.findOneAndUpdate(
    { roll: req.params.roll * 1 },
    req.body,
    {
      new: true,
    }
  );
  try {
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
    await Result.findOneAndDelete({roll: req.params.roll * 1});
  try {
    res.status(200).json({
      message: "deletion successfull",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "something went wrong",
    });
  }
};

export {
  getALLStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};