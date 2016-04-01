/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `QuestionController.create()`
   */
    create: function (req, res) {
        var question = {
            nombre: req.param('nombre'),
            test: req.param('test')
        }
    
        Question.create(question,function (err,question){
            if(err) {
                console.log(err)
                return res.json({success: 'false'});
            } 
            console.log("Pregunta creadA existosamente");
            return res.json({success: 'true'});
        })
    
    },
  
    showAll: (req,res) => {
     
        Question.find().populate('answers').exec(function(err,questions){
            if (err)
			    return res.json({success: 'false'});
			return res.json(questions);
        })
        
    },


  /**
   * `QuestionController.addAnswer()`
   */
    addAnswer: function (req, res) {
        return res.json({todo: 'addAnswer() is not implemented yet!'});
    }
};

