export const otphtml = (otp, emailType) => {
    const siteName = 'IGNOU-X';
    const senderEmail = 'noreply@ignou.sidsharma.in';
    const otpText = `Your OTP for ignou-x is: ${otp}`;
  
    return `
      <html>
        <head>
          <style>
            /* Define your styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f5f5f5;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .otp {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${siteName}</h1>
            </div>
            <div class="otp">${otpText}</div>
            <div class="footer">
              <p>This email was sent from ${siteName}. Do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  