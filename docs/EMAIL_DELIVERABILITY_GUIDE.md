# 📧 Email Deliverability Guide: Fixing Spam Folder Issues

If emails from your Infinity Helios contact form are landing in the Spam/Junk folder, it is almost always due to **Domain Reputation** and **Sender Configuration** in WordPress.

Since our React app and Node.js backend simply pass the message to WordPress (Contact Form 7), the email is technically sent by your WordPress hosting server.

Here are the 3 steps to fix this:

## 1. Fix the "From" Address (Crucial)
This is the most common reason for spam flagging.

**The Problem:**
If your Contact Form 7 "Mail" settings use `[your-email]` in the **From** field, you are telling Gmail/Outlook that you are sending *as* the visitor (e.g. `user@gmail.com`), but the email is actually coming from your hosting server (`infinityhelios.com`). This mismatch is flagged as spoofing.

**The Solution:**
1. Log in to **WordPress Admin**.
2. Go to **Contact** > **Contact Forms** > **Edit** your form.
3. Switch to the **Mail** tab.
4. Change the **From** field to an email address that belongs to YOUR domain:
   - ❌ Incorrect: `[your-email]`
   - ✅ Correct: `Infinity Helios <noreply@infinityhelios.com>` or `wordpress@infinityhelios.com`
5. In the **Additional Headers** field, add:
   - `Reply-To: [your-email]`

*Result: The email is correctly authenticated as coming from your server, but hitting "Reply" still goes to the customer.*

## 2. Install "WP Mail SMTP" Plugin
By default, WordPress uses PHP `mail()`, which is unauthenticated and often blocked by spam filters.

**The Solution:**
1. Install the **WP Mail SMTP** plugin in WordPress.
2. Connect it to a real email service:
   - **Gmail** (if you use Google Workspace)
   - **Hostinger SMTP** (if you use Hostinger Email)
   - **Brevo** or **SendGrid** (Free tier available for transactional email)

*Result: Emails are sent via a trusted, authenticated server instead of a generic web server script.*

## 3. Verify DNS Records (SPF & DKIM)
Ensure your domain (`infinityhelios.com`) has valid SPF and DKIM records in your DNS Management console (e.g., Hostinger).

- **SPF Record:** Should look like `v=spf1 include:_spf.mail.hostinger.com ~all` (if using Hostinger).

## Summary
The backend code (`server.js`) is working correctly because the email **is being delivered** (status `mail_sent`). To move it from Spam to Inbox, simply adjust the **From Address** in WordPress and consider using **SMTP**.
