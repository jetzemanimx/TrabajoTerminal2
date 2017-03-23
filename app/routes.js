var Candidate = require('./models/Candidate');
var Votante = require('./models/Votante');
var User = require('./models/User');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require("nodemailer-smtp-transport");
var passport = require('passport');
//Configuration NodeMailer SMTP
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'protocolovoto@gmail.com',
        accessToken: 'ya29.Glv0A4vWkYDU5U7cagj5kFVwsSwqZ5sDPwgBojKg2gu5E9GLDNPRRsneSQioeFNalNP8hVljNbZAdV5Y0khdrAepdzCIESbu6GodFD7kLfCXpgZTpbRpIIbf_Sbm'
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
          user.personalData.userType = 'Admin';
          user.personalData.Sex = req.body.sex;
          user.personalData.Name = req.body.name;
          user.personalData.lastName = req.body.lastname;
          user.personalData.Email = req.body.email;
          user.personalData.Address = req.body.address;
          user.personalData.Telephone = req.body.tel;
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
};

