const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
exports.sendEmail=(mailId,message)=>{

    let otp="1234"
    const msg = {
        to: mailId,
        from: 'visakhsanthosh69@gmail.com', // Use the email address or domain you verified above
        subject:message,
        text: 'Your otp is'+otp,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };
      //ES6
      sgMail
        .send(msg)
        .then(() => {}, error => {
         
          if (error) {
           
            console.log(error.body.response);
            return false
          }
          else{
            return true
          }
        });
      
}



