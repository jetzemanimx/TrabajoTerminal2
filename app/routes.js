var User = require('./models/User');
var Candidate = require('./models/Candidate');
var Votante = require('./models/Votante');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require("nodemailer-smtp-transport");

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
      app.route('/api/user/register/:rfc/:sex/:name/:lastname/:email/:address/:tel/:password')
      .get(function(req, res) {
         var user = new User();
          user.personalData.RFC = req.params.rfc;
          user.personalData.userType = 'Admin';
          user.personalData.Sex = req.params.sex;
          user.personalData.Name = req.params.name;
          user.personalData.lastName = req.params.lastname;
          user.personalData.Email = req.params.email;
          user.personalData.Address = req.params.address;
          user.personalData.Telephone = req.params.tel;
          user.personalData.Password = req.params.password;
          user.save(function (error,data,callback) {
            if (error) {
              res.status(500).json(error);
            } else {
              /*var mailOptions = {
                    to: user.personalData.Email,
                    from: 'protocolovoto@gmail.com',
                    subject: 'Bienvenido a iVoto',
                    text: 'Hola ' + user.personalData.Name + user.personalData.lastName +',\n\n'+
                    'Gracias por registrarse en iVoto, ahora puede acceder a su cuenta, \n\n Email:' + user.personalData.Email +
                    ' \n Password:' + user.personalData.Password};

              transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  return console.log('Mail no enviado error: $s',error);
              }
              console.log('Mail Enviado a %s con la respuesta %s: ', user.personalData.Email,info.response);
              });*/
              res.status(200).json(data);
            }
          });
      })
      .post(function(req, res) {
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
              var mailOptions = {
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
              });
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
      app.get('/api/user/find/:email',function(req,res){
          User.findOne({'personalData.Email':req.params.email},function(error,data){
              if(error){
                  res.status(500).json(error);
              }else{
                  res.status(200).json(data);
              }
          });
      });
      //Login for users
      app.route('/api/user/login/:rfc/:password')
      .get(function(req, res) {
        User.findOne({'personalData.RFC':req.params.rfc,'personalData.Password':req.params.password},function(error,data){
              if(error){
                  res.status(500).json(error);
              }
              if(!data){
                res.status(404).json(data);
              }
              else{
                res.status(200).json(data);
              }
          });
      })
      .post(function(req, res) {
        User.findOne({'personalData.RFC':req.body.rfc,'personalData.Password':req.body.password},function(error,data){
              if(error){
                  res.status(500).json(error);
              }
              if(!data){
                res.status(404).json(data);
              }
              else{
                res.status(200).json(data);
              }
          });
      })
      .put(function(req, res) {
        res.send('Put Response');
      });
      //Register Votes News 
      app.route('/api/vote/register/:boleta/:name/:lastname/:sex/:email')
      .get(function(req, res) {
        var votante = new Votante();
        votante.personalData.Boleta = req.params.boleta;
        votante.personalData.Name = req.params.name;
        votante.personalData.lastName = req.params.lastname;
        votante.personalData.Sex = req.params.sex;
        votante.personalData.Email = req.params.email;
        votante.save(function (error, data, callback) {
          if(error){
            res.status(500).json(error);
          }
          else{
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
      app.route('/api/vote/find/:boleta')
      .get(function(req, res) {
        Votante.findOne({'personalData.Boleta':req.params.boleta},function(error,data){
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
};

