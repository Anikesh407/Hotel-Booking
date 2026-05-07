import nodemailer from 'nodemailer'

const host = process.env.SMTP_HOST || "smtp-relay.brevo.com";
const port = Number(process.env.SMTP_PORT || 587);
const secure = port === 465; // SMTPS

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 50,
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
  tls: {
    minVersion: "TLSv1.2",
  },
});

export default transporter;