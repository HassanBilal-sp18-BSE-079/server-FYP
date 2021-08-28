var express = require('express');
var router = express.Router();
let {Feedback} = require('../../model/feedbackModel');
let {validation} = require('../../middleWares/validation/validateFeedback');
let {auth} = require('../../middleWares/authentication/auth');
let adminAuth = require('../../middleWares/authentication/adminAuth');


/* GET feedbacks. */
router.get('/', async function(req, res, next) {
  let feedbacks = await Feedback.find();
  return res.send(feedbacks);
});

//get singel feedback
router.get('/:id', async function(req, res, next) {
    let feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).send('feedback on this given id not found');
    return res.send(feedback);
  });


  //post a feedback
  router.post('/', validation ,async function(req, res, next) {
    let feedback = new Feedback();
    feedback.name = req.body.name; 
    feedback.email = req.body.email; 
    feedback.description = req.body.description; 

    await feedback.save();

    return res.send(feedback);

  });



  // approve feedback

  router.put('/approve:id',auth , adminAuth ,async function(req, res, next) {
    
    let feedback = await Feedback.findById(req.params.id);

    feedback.name = feedback.name;
    feedback.email = feedback.name;
    feedback.description   = feedback.description;
    feedback.approved = true;

    await feedback.save();

    return  res.send(feedback);

  });


  //delete feedback

  router.delete('/:id', async function(req, res, next) {
    
    let feedback = Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) return res.status(404).send('Feedback on this given id not found');

    return res.send(feedback);
  });




module.exports = router;
