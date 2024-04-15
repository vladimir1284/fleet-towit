/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import nodemailer from 'nodemailer';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM } from '$env/static/private';

const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: false,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
});

export async function sendWelcomeEmail(
	email: string,
	tenantName: string,
	role: string,
	origin: string
) {
	const mailOptions = {
		from: EMAIL_FROM,
		to: email,
		subject: `You have been invited to join to ${tenantName} as ${role}`, // Subject line
		html: `
        <html>
            <head>
                <style>
                    body {
                        margin:   0;
                        padding:  0;
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height:  100vh;
                    }
                    .card {
                        width:  500px;
                        border:  1px solid #ccc;
                        border-radius: 8px;
                        box-shadow:  0  2px  4px rgba(0,  0,  0,  0.1);
                        padding:  20px;
                        background-color: white;
                        text-align: center;
                    }
                    .card h1 {
                        margin-top:  0;
                    }
                    .card p {
                        margin-bottom:  20px;
                    }
                    .card a {
                        display: inline-block;
                        padding:  10px  20px;
                        color: #fff;
                        background-color: #007BFF;
                        border-radius:  5px;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Welcome to ${tenantName}</h1>
                    <p>You have been invited to join <strong>${tenantName}</strong> as a <strong>${role}</strong>.</p>
                    <p>Click the button below to login:</p>
                    <a href=${origin}>Accept Invitation</a>
                </div>
            </body>
        </html>
        
        `
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log(`Email sended`);
	} catch (error) {
		console.error(`Error sending email:`, error);
	}
}
