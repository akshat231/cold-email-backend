# 📬 Cold Email Backend

A Node.js backend that manages email leads, company data, and automates personalized cold email campaigns.  
It includes APIs to add and manage contacts, send cold mails, and a cron job to automate mail delivery.

---

## 🚀 Features

- 📥 **Add Emails & Companies** — Store new leads and associated company details.
- 💌 **Personalized Cold Mailing** — Send tailored emails to each contact using dynamic templates.
- ⏰ **Automated Cron Jobs** — Schedule and automate cold mail campaigns.
- 📊 **Scalable Architecture** — Modular and easy to extend for additional features.
- 🧠 **Custom Templates** — Generate dynamic email content based on company or user data.

---

## 🏗️ Tech Stack

- **Runtime:** Node.js (Express.js)
- **Database:** PostgreSQL
- **Mailer:** Nodemailer
- **Scheduler:** Node Cron (`node-cron`)
- **Environment Config:** dotenv

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cold-mailer-backend.git

# Go inside the folder
cd cold-mailer-backend

# Install dependencies
npm install

# Create a .env file
cp .env.example .env

# Start the server
npm run start
```

## 🧩 Environment Variables

Create a .env file in the root directory and add the following:
```bash
PORT=5000
HOST=localhost
EMAIL_USER=email@gmail.com
EMAIL_PASS=juan app password 
EMAIL_FROM_NAME=Name
```

## 🧠 API Endpoints

➕ **Add Email & Company**

POST /api/mail/insert

Body Example:

```bash
{
   mail:"mail@gmailcom"
   company: "company1"
}
```

💌 **Send Cold Email**

GET /api/mail/send



## 🕒 Cron Job

Automatically runs based on your defined schedule (e.g., every day at 9 AM) to send pending emails where email has not been sent for last 30 days.

## 🛡️ License

This project is licensed under the MIT License
