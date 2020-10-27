const Job = require('./../models/jobModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllJobs = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(Job.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const jobs = await features.query;

    // Send response
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      data: {
        jobs
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        job
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        job: newJob
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: { job }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
