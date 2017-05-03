var Candidate = require('./models/Candidate');
var Votante = require('./models/Votante');
var User = require('./models/User');
var votingBallot = require('./models/votingBallot');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require("nodemailer-smtp-transport");
var passport = require('passport');
var async = require('async');
var crypto = require('crypto');
//Configuration NodeMailer SMTP
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'protocolovoto@gmail.com',
        accessToken: 'ya29.Gls2BLlNKcFRs4ayaIv1N8Wgf9ODu9Sx-j9Ce-xNy4kKn4dU2vvYjiQp_Ni4Nkt3o-00cyocyhCU54bvVQ3IRwNsvyycBYdTE-659sq9IlKvBoev0vA1S4zs89IO'
    }
});
//Date format
var dateFormat = require('dateformat');
// Variables for image uploader
var uuid = require('node-uuid');
var multiparty = require('multiparty');
var fs = require('fs');

module.exports = function(app) {

    	app.route('/')
      .get(function(req, res) {
        res.send('Get Response');
      })
      .post(function(req, res) {
        res.send('Post Response');
      })
      .put(function(req, res) {
        res.send('Put Response');
      });

      //Display all users
      app.route('/api/users')
      .get(function (req,res) {
        User.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      })
      .post(function (req,res) {
        User.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });

      //Register new user
      app.post('/api/user/register',function (req,res) {
        var user = new User();
          user.personalData.RFC = req.body.rfc;
          user.personalData.userType = req.body.range;
          user.personalData.Sex = req.body.sex;
          user.personalData.Name = req.body.name;
          user.personalData.lastName = req.body.lastname;
          user.personalData.Email = req.body.email;
          user.personalData.Address = req.body.address;
          user.personalData.Telephone = req.body.tel;
          user.isActive = req.body.isactive;
          user.setPassword(req.body.password);
          user.save(function (error,data,callback) {
            if (error) {
              res.status(500).json(error);
            } else {
              /*var mailOptions = {
                    to: user.personalData.Email,
                    from: 'protocolovoto@gmail.com',
                    subject: 'Bienvenido a iVoto',
                    text: 'Hola ' + user.personalData.Name + user.personalData.lastName +',\n\n'+
                    'Gracias por registrarse en iVoto, ahora puede acceder a su cuenta, \n\n Email: ' + user.personalData.Email +
                    ' \n\n Password:' + user.personalData.Password};

              transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  return console.log('Mail no enviado error: $s',error);
              }
              console.log('Mail Enviado a %s con la respuesta %s: ', user.personalData.Email,info.response);
              });*/
              res.status(200).json(data);
            }
          });
      });
      //Update UserProfile by id
      app.post('/api/user/editProfile',function(req,res) {
        //console.log(req.body);
        var modifySomething = false;
        User.findById({_id: req.body.id}, function(error,user){
          if(error){
            res.status(500).json(err);
          }
          //console.log("User: " + user);
          if(req.body.rfc != ""){
            console.log("New RFC: " +req.body.rfc);
            user.personalData.RFC = req.body.rfc;
            modifySomething = true;
          }
          if(req.body.name != ""){
            console.log("New name: "+req.body.name);
            user.personalData.Name = req.body.name;
            modifySomething = true;
          }
          if(req.body.lastname != ""){
            console.log("New lastname: "+req.body.lastname);
            user.personalData.lastName = req.body.lastname;
            modifySomething = true;
          }
           if(req.body.sex != ""){
            console.log("New sex: " +req.body.sex);
            user.personalData.Sex = req.body.sex;
            modifySomething = true;
          }
          if(req.body.tel != ""){
            console.log("New tel: "+req.body.tel);
            user.personalData.Telephone = req.body.tel;
            modifySomething = true;
          }
          if(req.body.address != ""){
            console.log("New address: "+req.body.address);
            user.personalData.Address = req.body.address;
            modifySomething = true;
          }
          if(req.body.email != ""){
            console.log("New email: "+req.body.email);
            user.personalData.Email = req.body.email;
            modifySomething = true;
          }
          if(req.body.password != ""){
            console.log("New password: "+req.body.password);
            user.setPassword(req.body.password);
            modifySomething = true;
          }

          if(modifySomething){
            //console.log('saving user');
            user.save(function(error, data){
              if(error){
                res.status(500).json(error);
              }else{
                res.send('Actualización Exitosa');
              }
            });
          }else{
            res.send('No hay nada que modificar');
          }
        }); 
      });
      //Update User by id
      app.patch('/api/user/update/:id',function(req,res) {
        User.findByIdAndUpdate(req.params.id,{
                        '$set':{
                            'personalData.Name':req.body.name,
                            'personalData.lastName': req.body.lastname,
                            'personalData.Sex': req.body.sex,
                            'personalData.Email':req.body.email,
                            'personalData.Address':req.body.adrress,
                            'personalData.Telephone':req.body.tel,
                            /*'personalData.Password':req.bodypass,*/
                            'isActive':req.body.isactive,
                            'personalData.userType': req.body.range
                            }
                        },function (error,data) {
                          if(error){
                                 res.status(500).json(error);
                            }
                            else{
                               res.status(200).json(data);
                            }
        });
      });
      //Find user by id
      app.get('/api/user/find/:id',function (req,res) {
          User.findById(req.params.id,function(error,data){
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json(data);
            }
        });
      });
      //Find one user by email
      app.get('/api/user/findEmail/:email',function(req,res){
          User.findOne({'personalData.Email':req.params.email},function(error,data){
              if(!data){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });
      //Login for users
      app.post('/api/user/login',function (req,res) {
        passport.authenticate('local', function(error, user, info){
            var token;
            // If Passport throws/catches an error
            if (error) {
                res.status(404).json(error);
                return;
            }
            // If a user is found
            if(user){
                token = user.generateJwt();
                res.status(200);
                    res.json({
                    "token" : token
                });
            } else {
                // If user is not found
                res.status(500).json(info);
            }
        })(req, res);
      });
      //Register Votes News 
      app.post('/api/vote/register',function (req,res) {
        var votante = new Votante();
        votante.personalData.Boleta = req.body.boleta;
        votante.personalData.Name = req.body.name;
        votante.personalData.lastName = req.body.lastname;
        votante.personalData.Sex = req.body.sex;
        votante.personalData.Email = req.body.email;
        votante.isActive = req.body.isactive;
        votante.save(function (error, data, callback) {
          if(error){
            res.status(500).json(error);
          }
          else{
            res.status(200).json(data);
          }
        });
      });
      //Update Vote  by id
      app.patch('/api/vote/update/:id',function(req,res) {
        Votante.findByIdAndUpdate(req.params.id,{
                        '$set':{
                           'personalData.Boleta':req.body.boleta,
                            'personalData.Name':req.body.name,
                            'personalData.lastName': req.body.lastname,
                            'personalData.Sex': req.body.sex,
                            'personalData.Email':req.body.email,
                            'isActive':req.body.isactive
                            } 
                        },function (error,data) {
                          if(error){
                                 res.status(500).json(error);
                            }
                            else{
                               res.status(200).json(data);
                            }
        });
      });
      //Find Votes by id
      app.get('/api/vote/find/:id',function (req,res) {
          Votante.findById(req.params.id,function(error,data){
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json(data);
            }
        });
      });
      //Find Votes by No. Boleta
      app.route('/api/vote/findBoleta/:boleta')
      .get(function(req, res) {
        Votante.findOne({'personalData.Boleta': req.params.boleta},function(error,data){
              if(!data){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      })
      .post(function(req, res) {
        res.send('Post Response');
      })
      .put(function(req, res) {
        res.send('Put Response');
      });
      //Display all votes
      app.route('/api/votes')
      .get(function (req,res) {
        Votante.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      })
      .post(function (req,res) {
        Votante.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });
      //Route for uploading image for Candidates

      app.post('/api/candidate/upload/image/add',function (req,res) {
        var form = new multiparty.Form();
            form.parse(req, function(error, fields, files) {
            var author = fields.author;
            var file = files.file[0];
            var date = fields.date[0];
            date = dateFormat(date, "mediumDate");
            var contentType = file.headers['content-type'];
            var tmpPath = file.path;
            var extIndex = tmpPath.lastIndexOf('.');
            var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
            // UUID para identificar cada imagen
            var fileName = uuid.v4() + extension;
            var destPath = './public/profileImages/'+ fileName;
            var publicVenueURL =  '/profileImages/'+ fileName;;
            // Verifico si el formato es correcto
            if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
                fs.unlink(tmpPath);
                return res.status(500).send('Solo png ó jpg');
            }
            else{
                //Renombro el archivo
                fs.rename(tmpPath, destPath, function(error) {
                    if (error) {
                        res.status(500).send('Imagen no guardada');
                    }
                    else{
                        res.json(publicVenueURL);
                    }
                });
            }
        });
      });
      //Register New Candidate
      app.post('/api/candidate/register',function (req,res) {
        var candidate = new Candidate();
        candidate.personalData.RFC = req.body.rfc;
        candidate.personalData.userType = "Candidate";
        candidate.personalData.profileImageUrl = req.body.image;
        candidate.personalData.Deegre = req.body.deegre;
        candidate.personalData.Name = req.body.name;
        candidate.personalData.lastName = req.body.lastname;
        candidate.personalData.Sex = req.body.sex;
        candidate.personalData.Email = req.body.email;
        candidate.personalData.Address = req.body.address;
        candidate.personalData.Telephone = req.body.tel;
        candidate.personalData.Ext = req.body.ext;
        candidate.isActive = req.body.isactive;
        candidate.save(function (error, data, callback) {
          if(error){
            res.status(500).json(error);
          }
          else{
            res.status(200).json(data);
          }
        });
      });
      //Update Candidate by id
      app.patch('/api/candidate/update/:id',function(req,res) {
        Candidate.findByIdAndUpdate(req.params.id,{
                        '$set':{
                            'personalData.RFC': req.body.rfc,
                            'personalData.Name':req.body.name,
                            'personalData.lastName': req.body.lastname,
                            'personalData.Sex': req.body.sex,
                            'personalData.Email': req.body.email,
                            'personalData.Address': req.body.address,
                            'personalData.Ext': req.body.ext,
                            'personalData.Telephone': req.body.tel,
                            'isActive': req.body.isactive
                            } 
                        },function (error,data) {
                          if(error){
                                 res.status(500).json(error);
                            }
                            else{
                               res.status(200).json(data);
                            }
        });
      });
      //Find Candidate by id
      app.get('/api/candidate/find/:id',function (req,res) {
          Candidate.findById(req.params.id,function(error,data){
            if(error){
                res.status(500).json(error);
            }else{
                res.status(200).json(data);
            }
        });
      });
      //Find Candidate by Email
      app.route('/api/candidate/findEmail/:email')
      .get(function(req, res) {
        Candidate.findOne({'personalData.Email': req.params.email},function(error,data){
              if(!data){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      })
      .post(function(req, res) {
        res.send('Post Response');
      })
      .put(function(req, res) {
        res.send('Put Response');
      });
      //Display all votes
      app.route('/api/candidates')
      .get(function (req,res) {
        Candidate.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      })
      .post(function (req,res) {
        Candidate.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });

      // Route for create voting ballot
      app.post('/api/votingBallot/register', function(req,res){
        //console.log(req.body);
        var vB = new votingBallot();
        vB.Name = req.body.name;
        vB.Description = req.body.desc;
        vB.dateInit = req.body.init;
        vB.dateEnd = req.body.end;
        vB.save(function (error, data, callback) {
          if(error){
            res.status(500).json(error);
          }
          else{
            res.status(200).json(data);
          }
        });
      });

      //Route for delete voting ballot
      app.delete('/api/votingBallot/delete/:id',function(req, res) {
        votingBallot.findByIdAndRemove(req.params.id, function(error, data){
            if(error){
              res.status(500).json(error);
            }
            else{
                res.status(200).json(data);
            }
        });
      });

      // Route for insert candidates to voting ballot
      app.post('/api/votingBallot/addCandidate', function(req,res){
        votingBallot.findOne({_id: req.body.idvb}, function(error, vb) {
            if(error){
                res.status(500).json(error);
            }
            if (!vb) {
                res.status(500).send({msg:"No exist voting ballot whit this id"});
            }else{
                for (var i = 0; i <= req.body.arrCandidates.length; i++)
                {
                  if(i == req.body.arrCandidates.length){
                    vb.Created = false;
                    //console.log("Plantilla a guardar: " + vb);
                    vb.save(function (error, data) {
                      if(error){
                        res.status(500).json(error);
                      }
                      else{
                        res.status(200).send({msg:"Candidate Saved!!!"});
                      }
                    });
                  }
                  else{
                     vb.candidates.push(req.body.arrCandidates[i].id);
                  }
                }
            }
        });
      });

      //Display all VotingBallots populate
      app.route('/api/votingBallots/Voting')
      .get(function (req,res) {
        var DateTemp = Date.now();
        var DateEnd = DateTemp.getHours();
        console.log("Horas Restantes para que termine  el dia: " + DateEnd); 

        /*votingBallot.find(function (error,data,callback) {
            Candidate.populate(data, {path: "candidates._id"},function(error, data){
              if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
            });    
          });*/
      })
      .post(function (req,res) {
        votingBallot.find(function (error,data,callback) {
            Candidate.populate(data, {path: "candidates._id"},function(error, data){
              if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
            });    
          });
      });

      //Display all VotingBallots
      app.route('/api/votingBallots')
      .get(function (req,res) {
        votingBallot.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      })
      .post(function (req,res) {
        votingBallot.find(function (error,data,callback) {
            if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });

      //Forgot your password
      app.post('/api/forgot', function(req,res,next){
        async.waterfall([
          function (done) {
            console.log("Entrando a la primera función");
            crypto.randomBytes(20, function (error, buf) {
              var token = buf.toString('hex');
              console.log("Genere Token: " + token);
              done(error, token);
            });
          },
          function (token, done) {
            console.log("Entrando a la segunda función");
            User.findOne({'personalData.RFC': req.body.RFC}, function (error, user) {
              if (!user) {
                return res.status(500).send({msg:"No encontre el usuario con este RFC"});
              }
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
              user.save(function (error) {
                console.log("Usuario Guardado");
                if (error) {
                  console.log(error);
                }
                done(error, token, user);
              });
            });
          },
          function (token, user, done) {
            console.log("Entrando a la tercera funcion");
            var mailOptions = {
              to: user.personalData.Email,
              from: 'protocolovoto@gmail.com',
              subject: 'Reestablece tu contraseña iVoto',
              text: 'Hola ' + user.personalData.Name + " " + user.personalData.lastName +',\n\n'+
              'Está recibiendo esto porque usted (o alguien más) ha solicitado el restablecimiento de la contraseña de su cuenta.\n\n'+
              'Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso: \n\n' +
              'http://' + req.headers.host + '/api/reset/' + token + '\n\n' +
              'Si no lo solicitó, ignore este correo electrónico y su contraseña permanecerá sin cambios. \n'
            };
            console.log("Mail a enviarse: " + mailOptions.to + '\n\n' + mailOptions.text);
            //Send mail with defined transport object
            /*transporter.sendMail(mailOptions, function(error, info){
              if(error){
                return console.log('Mail no enviado error: $s',error);
              }
              console.log('Mail Enviado a %s con la respuesta %s: ', user.personalData.Email,info.response);
              done(error, 'Exito');
            });*/
            done(null,'Exito');
          }
        ], function (error, result) {
          if (error) {
            return next(error);
          }
          res.status(200).send(result);
        });
      });

      //Redirect to change form password
      app.get('/api/reset/:token', function(req, res) {
          User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
              if (!user) {
                  return res.redirect('/#/resetPassword');
              }
              res.redirect('/#/reset/'+req.params.token);
          });
      });

      //Reset Password
      app.post('/reset', function(req, res) {
        User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(error, user) {
            if (!user) {
                return res.redirect('/#/resetPassword');
            }else{
                user.setPassword(req.body.Password);
                user.save(function(error) {
                    if (error) {
                        res.status(500).json(error);
                        return;
                    }else{
                        // setup e-mail data with unicode symbols
                        var mailOptions = {
                            to: user.personalData.Email,
                            from: 'protocolovoto@gmail.com',
                            subject: 'Confirmación de cambio de contraseña - iVoto',
                            text: 'Tu contraseña se modifico de manera exitosa. \n\n' +
                            'Tu nueva contraseña es: \n\n' +
                            req.body.Password + '\n\n' +
                            'Guarde esta información en un lugar seguro\n' +
                            'Pueden ingresar en: http://' + req.headers.host + '/#/Login'
                        };
                        console.log("Envie Mail a: " + user.personalData.Email + " Con contraseña: " + req.body.Password);
                        //Send mail with defined transport object
                        /*transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        });*/
                    }
                });
                res.redirect('/#/Login');
            }

            if(error){
                res.status(500).json(error);
                return;
            }

        });
      });
};

