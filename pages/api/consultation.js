import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { full_name, email, phone, interest } = req.body;

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

    // 2. Append to Sheet
    console.log('📝 Appending to sheet...');
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[full_name, email, phone, interest, new Date().toLocaleString()]],
      },
    });
    console.log('✅ Sheet updated successfully');

    // 3. Email Notification - FIXED CONFIGURATION
    console.log('📧 Sending email...');
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail service shorthand
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Additional options for better reliability
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Simplified - Gmail requires this format
      to: process.env.EMAIL_TO,
      subject: `🔥 New Lead: ${full_name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>New Consultation Request</h2>
          <p><strong>Name:</strong> ${full_name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });
    console.log('✅ Email sent successfully');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Error details:', error);
    
    // If sheets succeeded but email failed, still return success
    // You can log the email error but don't fail the entire submission
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