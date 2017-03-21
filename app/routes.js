var User = require('./models/User');
var Candidate = require('./models/Candidate');
var Votante = require('./models/Votante');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require("nodemailer-smtp-transport");
//Hola
//Configuration NodeMailer SMTP
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'protocolovoto@gmail.com',
        accessToken: 'ya29.Glv0A4vWkYDU5U7cagj5kFVwsSwqZ5sDPwgBojKg2gu5E9GLDNPRRsneSQioeFNalNP8hVljNbZAdV5Y0khdrAepdzCIESbu6GodFD7kLfCXpgZTpbRpIIbf_Sbm'
    }
});

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
          user.personalData.Password = req.body.password;
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
                            'personalData.Password':req.body.pass,
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
              if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });
      //Login for users
      app.post('/api/user/login',function (req,res) {
         User.findOne({'personalData.RFC':req.body.rfc,'personalData.Password':req.body.password},function(error,data){
              if(error){
                  res.status(500).json(error);
              }
              if(!data){
                res.status(404).json(data);
              }
              else{
                res.status(200).json(data);
                //console.log(req.headers.path);
                //res.redirect('/registerVote');
              }
          });
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
              if(error){
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
      //Register New Candidate
      app.post('/api/candidate/register',function (req,res) {
        var candidate = new Candidate();
        candidate.personalData.RFC = req.body.RFC;
        candidate.personalData.userType = "Candidate";
        candidate.personalData.Name = req.body.name;
        candidate.personalData.lastName = req.body.lastname;
        candidate.personalData.Sex = req.body.sex;
        candidate.personalData.Email = req.body.email;
        candidate.personalData.Address = req.body.address;
        candidate.personalData.Telephone = req.body.tel;
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
                            'personalData.Name':req.body.name,
                            'personalData.lastName': req.body.lastname,
                            'personalData.Sex': req.body.sex,
                            'personalData.Email': req.body.email,
                            'personalData.Address': req.body.address,
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
              if(error){
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

