import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  console.log('📥 Received contact form data:', { name, email, phone, subject });

  try {
    // Handle private key format
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    privateKey = privateKey.replace(/\\n/g, '\n').trim();

    // 1. Google Sheets Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Append to Sheet2
    console.log('📝 Appending to Sheet2...');
    console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);
    
    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet2!A:F', // Using Sheet2
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[name, email, phone || 'N/A', subject, message, new Date().toLocaleString()]],
      },
    });
    
    console.log('✅ Sheet2 updated successfully');
    console.log('Update details:', appendResult.data);

    // 3. Email Notification
    console.log('📧 Sending email...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.verify();
    console.log('✅ SMTP connection verified');

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `📩 New Contact Form: ${subject}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #dc2626; margin-bottom: 20px;">New Contact Form Message</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;">${phone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Subject:</td>
              <td style="padding: 10px;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });
    console.log('✅ Email sent successfully');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Error type:', error.constructor.name);
    console.error('Full error:', error);
    
    // If sheets succeeded but email failed, still return success
    if (error.message.includes('Greeting') || error.message.includes('SMTP')) {
      console.warn('⚠️  Email failed but sheet was updated. Returning success anyway.');
      return res.status(200).json({ 
        success: true, 
        warning: 'Data saved but email notification failed' 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: error.message || 'Submission failed'
    });
  }
}