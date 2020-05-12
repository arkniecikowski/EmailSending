const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log('4444');
});


app.post('/api/v1', (req,res) => {
    var data = req.body;
    console.log('x')
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'email-user',
            pass: 'email-pass'
        }
    });

    var mailOptions = {
        from: data.email,
        to: 'email-where-send',
        subject: 'email-topic',
        html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
    };

    smtpTransport.sendMail(mailOptions,
        (error, response) => {
            if(error) {
                res.send(error)
            }else {
                res.send('Success')
            }
            smtpTransport.close();
        });
})