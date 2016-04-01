/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `TestController.create()`
   */
    create: function (req, res) {
        var test = {
            nombre: req.param('nombre')
        }
    
        Test.create(test,function (err,test) {
            if(err) {
                 console.log(err)
                return res.json({success: 'false'});
            } 
            console.log("Test creado existosamente");
            return res.json({success: 'true'});
        })
    
    },
    
    showAllTests : function (req, res){
        Test
            .find()
            .exec(function(err, tests){
                if (err)
                     return res.json({success: 'false'});
                
                return res.json({success:'true',tests:tests});
            })
        
    },
    
    upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});						
			//	Call to /upload via GET is error

		var uploadFile = req.file('uploadFile');
		console.log(uploadFile);
	    
	    uploadFile.upload({ dirname: '../../assets/images'},function onUploadComplete (err, files) {				
            // Earlier it was ./assets/images .. Changed to ../../assets/images
            //	Files will be uploaded to ./assets/images
            // Access it via localhost:1337/images/file-name
        
        	    	if (err) return res.serverError(err);									
        	    	//	IF ERROR Return and send 500 error
        			
        	    	console.log(files);
        	    	res.json({status:200,file:files});
        	    });
	},
  
    getTestData: function (req,res)  {
        console.log(req.param('id'));
        Test
            .findOne(req.param("id"))
            //.populateAll()
            .exec(function(err,test){
                if (err)
    			    return res.json({success: 'false'});
    			   
        
    		     Question
                        .find({test:test.id})
                        .populate('answers')
                        .then( (questions) => {
                            test.preguntas = questions;
                            //console.log(test);
                            return res.json(test);
                        })
                                
                /*console.log(questions);  			
    			var testGame = {};
    			testGame.test = test;
    			testGame.test.preguntas = questions;*/
             });
    },
    
    validateQuiz: (req,res) => {
	 var userQuiz = {
	 	user :  req.param("user"),
	 	test : 	req.param("test"),
	 	answers : req.param("respuestas")
	 }

	 Answer
		.find({id:userQuiz.answers.map(function (answer) {
			 return answer.idanswer;
		})})
		.exec(function (err, answers) {
		    
		    if(err)
		        res.json({success:false})
		        
			var correctas = answers.filter(function (answer) {
				 return answer.correcta;
			}).length;

			var resultadoQuiz = {
				aciertos: correctas ,
				fallos: (4-correctas),
				user: userQuiz.user,
				test: userQuiz.test
			}
			Usertest.create(resultadoQuiz).exec(function(){});
			console.log(resultadoQuiz);

			res.json(resultadoQuiz);
		})

        

    },
    
    getStatistics : function (req,res) {
			 Usertest
			 	.find(req.param('iduser'))
			 	.max('createdAt')
			 	.exec(function (err, userStats) {
			 		if (err)
			 			return res.json({success:false});
			 		return res.json(userStats);
			 	})
		},
    
    


  /**
   * `TestController.addQuestion()`
   */
    addQuestion: function (req, res) {
        return res.json({todo: 'addQuestion() is not implemented yet!'});
    }
};

