export function getSignUpEmail(email: string, otp: string): string {
  const html: string = `
              <!doctype html>
              <html lang="en">
                <head>
                  <title>Activate Account</title>
                  <style>
                    .container {
                      width: 900px;
                      height: 800px;
                      overflow: auto;
                    }
              
                    .body-container {
                      width: 670px;
                      height: 701px;
                      margin-left: 161.5px;
                      position: relative;
                      background: #FFFFFF;
                      border-radius: 10px;
                    }
              
                    .body-content {
                      width: 670px;
                      height: 701px;
                      position: absolute;
                      top: 0;
                      left: 0;
                    }
              
                    .box-header {
                      padding: 25px 10px;
                      gap: 15px;
                      width: 650px;
                      height: 70px;
                      background: #F2F8FF;
                      order: 0;
                      text-align: center;
                    }
              
                    .logo {
                      margin-top: 10px;
                      margin-left: 36px;
                      width: 154px;
                      height: 50px;
                      object-fit: contain;
                    }
              
                    .box-body {
                      width: 670px;
                      height: auto;
                      padding: 15px 0px;
                    }
              
                    .header-title {
                      font-family: 'Roboto', sans-serif;
                      font-style: normal;
                      font-weight: 700;
                      font-size: 24px;
                      line-height: 120%;
                      letter-spacing: 0.0075em;
                      color: #000000;
                      margin-bottom: 16px;
                      margin-left: 36px;
                      padding-top: 32px
                    }
              
                    .intro-content {
                      font-family: 'Roboto', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 140%;
                      letter-spacing: 0.0075em;
                      color: #000000;
                      margin-bottom: 24px;
                      margin-left: 36px;
                    }
              
                    .title {
                      width: 620px;
                      height: 29px;
                      font-family: 'Roboto', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 24px;
                      line-height: 29px;
                      color: #403F63;
                      flex: none;
                      order: 0;
                      align-self: stretch;
                      flex-grow: 0;
                    }
              
                    .section {
                      font-family: 'Roboto', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 20px;
                      line-height: 22px;
                      letter-spacing: 0.01em;
                      text-align: center;
                      width: 630px;
                      height: 45px;
                      background: #F2F8FF;
                      padding-top: 20px;
                      margin: 0 auto;
                    }
              
                    .start-content {
                      font-family: 'Roboto', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 15px;
                      line-height: 22px;
                      letter-spacing: 0.02em;
                      color: #403F63;
                      flex: none;
                      order: 3;
                      flex-grow: 0;
                    }
              
                    .closing-content {
                      width: 620px;
                      height: 198px;
                      font-family: 'Roboto', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      font-size: 15px;
                      line-height: 22px;
                      letter-spacing: 0.02em;
                      color: #403F63;
                      flex: none;
                      order: 3;
                      flex-grow: 0;
                      margin-bottom: 24px;
                      margin-left: 36px;
                    }
              
                    .box-footer {
                      padding: 15px 10px;
                      width: 650px;
                      height: 121.72px;
                      background: #F2F8FF;
                      order: 2;
                    }
              
                    .box-sosmed {
                      margin-top: 10px;
                      height: 28.6px;
                      left: 68.7%;
                      right: 25.48%;
                      top: 20.18px;
                      text-align: center;
                    }
              
                    .barrier-sosmed {
                      margin-left: 6px;
                      margin-right: 6px;
                      width: 100px;
                      height: 100px;
                    }
              
                    .box-company {
                      margin-top: 16px;
                      height: 17.9px;
                      left: 32.09%;
                      right: 32.09%;
                      top: 63.54px;
                      font-family: 'Roboto';
                      font-style: normal;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 17px;
                      text-align: center;
                      margin-bottom: 0px;
                      padding: 0;
                      pointer-events: none; 
                      text-decoration: none !important;
                      color: inherit !important;
                    }
              
                    .box-copyright {
                      margin-top: 8px;
                      height: 16.85px;
                      font-family: 'Inter';
                      font-style: normal;
                      font-weight: 400;
                      font-size: 13px;
                      line-height: 16px;
                      text-align: center;
                      color: #262626;
                      margin-bottom: 0px;
                      padding: 0;
                    }
              
                    a {
                      color: inherit;
                      text-decoration: none;
                    }

                    .box-sosmed img {
                      max-width: 100%;
                      max-height: 100%;
                    }
                  </style>
                  <link rel="preconnect" href="https://fonts.googleapis.com" />
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"
                  />
                </head>
                <body>
                  <div class="container">
                    <div class="body-container">
                      <div class="body-content">
                        <div class="box-header">
                          <img src="cid:icon-logo" class="logo" />
                        </div>
                        <div class="box-body">
                          <div class="intro-content">
                            <div class="title">Activate Your Account - OTP Required</div>
                            <div class="start-content">
                              <br />
                              Dear ${email} <br />
                              <br />Activate your account now! Enter the One-Time Password
                              (OTP) below to get started:
                            </div>
                          </div>
                          <div class="section">OTP: ${otp}</div>
                          <br />
                          <br />
                          <div class="closing-content">
                            Activate within the app and unlock a world of possibilities for
                            connecting with clients and sharing your expertise. Reach out to
                            our support team if you need any assistance during the process.
                            <br />
                            <br />
                            Welcome to Photo Web, the ultimate social media app for
                            consultation!
                            <br />
                            <br />
                            Best regards, <br />
                            <br />
                            The Photo Web Team
                          </div>
                        </div>
                        <div class="box-footer">
                          <div class="box-sosmed">
                            <a href="${process.env.URL_LINKEDIN}" class="barrier-sosmed">
                              <img src="cid:icon-linkedin" />
                            </a>
                            <a href="${process.env.URL_TWT}" class="barrier-sosmed">
                              <img src="cid:icon-twt" />
                            </a>
                            <a href="${process.env.URL_IG}" class="barrier-sosmed">
                              <img src="cid:icon-ig" />
                            </a>
                            <a href="${process.env.URL_YT}" class="barrier-sosmed">
                              <img src="cid:icon-yt" />
                            </a>
                          </div>
                          <div class="box-company">photo.web</div>
                          <div class="box-copyright">© 2024</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </body>
              </html>
              `;
  return html;
}
