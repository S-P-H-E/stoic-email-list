import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import juice from 'juice';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'stoic.newsletter@outlook.com',
          pass: 'SpheC-137',
        },
      });

      const emailTemplatePath = path.join(process.cwd(), 'public', 'email.html');
      const htmlContent = fs.readFileSync(emailTemplatePath, 'utf-8');
      const inlinedHTML = juice(htmlContent);

      const options = {
        from: 'stoic.newsletter@outlook.com',
        to: email,
        subject: 'Welcome to the Stoic Community',
        html: inlinedHTML,
      };

      await transporter.sendMail(options);

      return res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
      console.error('Error subscribing:', error);
      return res.status(500).json({ message: 'Error subscribing. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
