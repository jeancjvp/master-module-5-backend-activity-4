const nodemailer = require('nodemailer');

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: email,
		pass: password,
	},
	tls: {
        rejectUnauthorized: false
    }
});

module.exports.sendValitionEmail = (user) => {
	transporter.sendMail({
		from: `"Arquitectura de Servidores" <${email}>`,
		to: user.email,
		subject: 'Welcome to Arq. Servidores',
		html: `
		<h1>Welcome to Arq. Servidores</h1>
		<a href='http://localhost:8000/api/users/${user.id}/activate'>Activate you account</a>
		`,
	})
	.then(() => {
		console.log('Email sent');
	})
	.catch((err) => {
		console.error('Error sending email', err);
	});
};