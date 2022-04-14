export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    admin_username: process.env.ADMIN_USERNAME,
    admin_password: process.env.ADMIN_PASSWORD,
    email_host: process.env.EMAIL_HOST,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS,
    email_to: process.env.EMAIL_TO
  });