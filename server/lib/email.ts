import { appTransporter } from "./transporter";

export const sendMailFromApp = async (
  recipient: string,
  subject: string,
  message: string,
  cc: string[],
  bcc: string[],
) => {
  const transporter = await appTransporter();

  const mailOptions = {
    to: recipient,
    subject: subject,
    html: message,
    cc: cc,
    bcc: bcc,
  };
  await transporter.sendMail(mailOptions);
  console.log("Email Sent To: ", recipient);
};
