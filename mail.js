var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'protocolovoto@gmail.com',
        accessToken: 'ya29.Glv0A4C61eNJ8Xa0gS4zLY2W8PnZ7wekBnxiarGxEWsvogbKT4m4cGcViasgmPFT553tAN9s0qjRbP09QbhojlgFts5pZHFrMGJ-sgnBtTC8wVPx-CbdqTJZ7Jme'
    }
});

function SendMail (Name, LastName, Email, Password) {
  var mailOptions = {
                    to: Email,
                    from: 'protocolovoto@gmail.com',
                    subject: 'Bienvenido a iVoto',
                    text: 'Hola \t'+ Name +' '+ LastName +',\n\n'+
                    'Gracias por registrarse en iVoto, ahora puede acceder a su cuenta. \n\n Email:\t' + Email +
                    ' \n\n Password:\t' + Password};

              transporter.sendMail(mailOptions, function(error, info){
              if(error){
                  console.log('Mail no enviado error: ',error);
                  return 0;
              }
              else{
                return 1;
              }
              });
}

SendMail('Jetzemani','Sanchez','jetzemanisanchez@gmail.com','Admin1Admin1');
