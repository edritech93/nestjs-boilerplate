import Mail from 'nodemailer/lib/mailer';

export function getAttachmentMail(): Mail.Attachment[] {
  return [
    {
      filename: 'logo.png',
      path: 'http://localhost:3000/assets/twillink-logo.png',
      cid: 'icon-logo',
    },
    {
      filename: 'linkedin.png',
      path: 'http://localhost:3000/assets/linkedin.png',
      cid: 'icon-linkedin',
    },
    {
      filename: 'twitter.png',
      path: 'http://localhost:3000/assets/twitter.png',
      cid: 'icon-twt',
    },
    {
      filename: 'instagram.png',
      path: 'http://localhost:3000/assets/instagram.png',
      cid: 'icon-ig',
    },
    {
      filename: 'youtube.png',
      path: 'http://localhost:3000/assets/youtube.png',
      cid: 'icon-yt',
    },
  ];
}
