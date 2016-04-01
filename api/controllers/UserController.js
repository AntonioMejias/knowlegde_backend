/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	hola : function (req,res) {
	    res.json({success:"true"});
	},
	
	create: function (req, res) {
		var fs = require('fs');
		var crypto = require('crypto');
		var imageTypeRegularExpression      = /\/(.*?)$/; 
		var userUploadedImagePath ="";
	    if(req.body.file!="")
	    {
	    	//console.log("recibido:"+req.body.file);
			var matches = req.body.file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
		    var type = matches[1];
		    var imageBuffer = new Buffer(matches[2], 'base64'); 
	        var seed                            = crypto.randomBytes(20);
	        var uniqueSHA1String                = crypto.createHash('sha1').update(seed).digest('hex');
		    var uniqueRandomImageName            = 'image-' + uniqueSHA1String;
	        var imageTypeDetected                = type.match(imageTypeRegularExpression);
	        userUploadedImagePath           = '/images/'+uniqueRandomImageName+'.'+imageTypeDetected[1];
			fs.writeFile("assets"+userUploadedImagePath, imageBuffer, function(err) 
			{
				if (err)
					console.log("error image upload:"+err);
			});
	    }
        var usuario = {
            login: req.param('login'),
            name: req.param('name'),
            edad: req.param('edad'),
            password: req.param('password'),
            email: req.param('email'),
            urlFoto : userUploadedImagePath
        }
        
        User
	        .findOne()
	        .where({
	        	or: [
	        		    {login: usuario.login},
	        			{email: usuario.email}
	        		]
	        })
	        .exec(function(err, user){
	        	if (user)
	        		return res.json({success: false, mensaje:'Ya existe un usuario con ese nombre o correo', titulo:'¡Lo Sentimos!'});
	        		
	        	 User.create(usuario,function (err,usuario) {
		            if(err) {
		                console.log(err)
		                return res.json({success: false,mensaje:'Ha ocurrido un error, intente de nuevo', titulo:'¡Lo Sentimos!'});
		            } 
		            console.log("Usuario creado existosamente");
		            console.log(usuario);
		            return res.json({success: true, mensaje:'Usuario creado exitosamente', titulo:'¡Felicidades!'});
		        })
	        })
    
       
    
    },
    update: function (req, res) {
    	
    		var fs = require('fs');
			var crypto = require('crypto');
			var imageTypeRegularExpression      = /\/(.*?)$/; 
			var userUploadedImagePath ="";
			
		    if(req.body.file && req.body.file !="")
		    {
		    	//console.log("recibido:"+req.body.file);
				var matches = req.body.file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
			    var type = matches[1];
			    var imageBuffer = new Buffer(matches[2], 'base64'); 
		        var seed                            = crypto.randomBytes(20);
		        var uniqueSHA1String                = crypto.createHash('sha1').update(seed).digest('hex');
			    var uniqueRandomImageName            = 'image-' + uniqueSHA1String;
		        var imageTypeDetected                = type.match(imageTypeRegularExpression);
		        userUploadedImagePath           = '/images/'+uniqueRandomImageName+'.'+imageTypeDetected[1];
				fs.writeFile("assets"+userUploadedImagePath, imageBuffer, function(err) 
				{
					if (err)
						console.log("error image upload:"+err);
				});
		    }

			var usuarioUpdate = {
            	name: req.param('name'),
            	edad: req.param('edad'),
            	password: req.param('password'),
            	urlFoto : userUploadedImagePath
			}
			
			User.update(req.param('id'), usuarioUpdate, function(err, user) {
				if (err) {
					return res.json({success: false,mensaje:'Ha ocurrido un error, intente de nuevo', titulo:'¡Lo Sentimos!'});

				}

				return res.json({success: true, mensaje:'Usuario actualizado exitosamente', titulo:'¡Felicidades!'});

			})
	},
    login: function(req,res) {
    	//res.header("Access-Control-Allow-Origin", "*");
	    User
	        .findOne()
	        .where({
	        	or: [
	        		    {login: req.param('login')},
	        			{email: req.param('login')}
	        		]
	        })
	        .where({
	            password:req.param('password')
	        })
	        .exec(function (err,user) {
	        	if(err)
	        		res.json({success:false,mensaje:"Ha ocurrido un error, intente de nuevo",titulo:'¡Lo Sentimos!'});
	        		
	        	if(!user)
	        	    res.json({UserNotFoundException:true,mensaje:"Contraseña ó usuario invalido, intente de nuevo",titulo:'¡Lo Sentimos!'});
	        	else
					res.json({success:true, usuario:user});
					
	        })
	},
		
    
    showAll: (req,res) => {
     
        User.find().populate('tests').exec(function(err,users){
            if (err)
			    return res.json({success: 'false'});
			return res.json(users);
        })
        
    },
	
    
};

