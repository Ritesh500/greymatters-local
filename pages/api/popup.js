import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { full_name, email, phone, interest } = req.body;

  console.log('🎉 Popup submission received:', { full_name, email, phone, interest });

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

    // 2. Append to Popup sheet (Sheet3 or create a new sheet called "Popup")
    console.log('📝 Appending to Popup sheet...');
    
    const appendResult = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Popup!A:E', // Use "Popup" sheet to track popup leads separately
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[full_name, email, phone, interest, new Date().toLocaleString()]],
      },
    });
    
    console.log('✅ Popup sheet updated successfully');

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
      subject: `🎯 New Popup Lead: ${full_name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #f9fafb;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="color: white; margin: 0;">🎯 New Popup Lead!</h2>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px;">${full_name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Phone:</td>
              <td style="padding: 10px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px; font-weight: bold;">Interest:</td>
              <td style="padding: 10px;">${interest}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Source:</td>
              <td style="padding: 10px;"><span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">POPUP</span></td>
            </tr>
          </table>
          <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
            <strong>Action:</strong> Contact within 24 hours for best conversion rate!
          </p>
        </div>
      `,
    });
    console.log('✅ Popup email sent successfully');

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('❌ POPUP API ERROR:', error.message);
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