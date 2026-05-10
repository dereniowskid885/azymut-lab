export const contactEmailTemplate = ({
  fullName,
  subject,
  sender,
  phone,
  message,
}: {
  fullName: string
  subject: string
  sender: string
  phone?: string
  message: string
}) => `
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e0dfd8;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 32px;border-bottom:1px solid #e0dfd8;">
              <p style="margin:0;font-size:10px;letter-spacing:0.15em;color:#aaa;text-transform:uppercase;">
                Nowa wiadomość z formularza
              </p>
              <p style="margin:6px 0 0;font-size:20px;color:#1a1a18;font-weight:500;">
                Azymut Lab
              </p>
            </td>
          </tr>

          <!-- Dane kontaktowe -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #e0dfd8;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;">
                      Imię i nazwisko
                    </p>
                    <p style="margin:0;font-size:14px;color:#1a1a18;">${fullName}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;">
                      E-mail
                    </p>
                    <a href="mailto:${sender}" style="margin:0;font-size:14px;color:#1a1a18;text-decoration:none;border-bottom:1px solid #e0dfd8;">
                      ${sender}
                    </a>
                  </td>
                </tr>

                ${
                  phone
                    ? `
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;">
                      Telefon
                    </p>
                    <a href="tel:${phone}" style="margin:0;font-size:14px;color:#1a1a18;text-decoration:none;border-bottom:1px solid #e0dfd8;">
                      ${phone}
                    </a>
                  </td>
                </tr>
                `
                    : ''
                }

                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;">
                      Temat
                    </p>
                    <p style="margin:0;font-size:14px;color:#1a1a18;">${subject}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Wiadomość -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #e0dfd8;">
              <p style="margin:0 0 10px;font-size:10px;letter-spacing:0.1em;color:#aaa;text-transform:uppercase;">
                Wiadomość
              </p>
              <p style="margin:0;font-size:14px;color:#1a1a18;line-height:1.8;white-space:pre-wrap;">
                ${message}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#f5f4f0;">
              <p style="margin:0;font-size:10px;color:#aaa;letter-spacing:0.08em;">
                Wiadomość wysłana przez formularz na azymutlab.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
