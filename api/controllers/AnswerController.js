/**
 * AnswerController
 *
 * @description :: Server-side logic for managing answers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `AnswerController.create()`
   */
    create: function (req, res) {
         var answer = {
            nombre: req.param('nombre'),
            question: req.param('question'),
            correcta: req.param('correcta')
        }
    
        Answer.create(answer,function (err,answer) {
            
            if(err) {
                console.log(err)
                return res.json({success: 'false'});
            } 
            console.log("Respuesta creada existosamente");
            return res.json({success: 'true'});
        })
    
    },
    
    showAll: (req,res) => {
     
        Answer.find().populate('question').exec(function(err,answers) {
            if (err)
			    return res.json({success: 'false'});
			return res.json(answers);
        })
    },
    
    delete: (req, res) => {
		Answer.destroy(req.param('id'), function(err) {})
	}
};

