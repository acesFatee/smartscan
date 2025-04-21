# 🧾 Smartscan

Smartscan is an AI-powered receipt management web application that allows users to upload receipt images, automatically extract metadata using OpenAI, and store, filter, edit, and export receipt information securely.

Built with modern tools like **Next.js**, **Kinde Auth**, **Firebase**, and **Algolia**, Smartscan makes it effortless to keep track of personal and business expenses.

---

## 🚀 Features

- 📸 **Drag & Drop Uploads**  
  Upload your receipts directly on the homepage.

- 🤖 **AI-Powered Extraction**  
  Extracts vendor name, date, total, category, and item details using the **OpenAI API**.

- 🔐 **Secure Authentication**  
  Login and user session management powered by **Kinde Auth**.

- 🗂️ **Receipt Dashboard**  
  View all your receipts with pagination and quick access to receipt metadata and images.

- 🔍 **Smart Search & Filters**  
  Use Algolia-powered full-text search and filter receipts by date range.

- ✏️ **Edit & Delete Receipts**  
  Easily update or delete saved receipts.

- 📤 **Export Functionality**  
  Export filtered or all receipts as **CSV** or **Excel** for bookkeeping or tax filing.

---

## 🧱 Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | [Next.js](https://nextjs.org/)      |
| Auth          | [Kinde Auth](https://kinde.com/)    |
| Backend       | [Firebase Firestore](https://firebase.google.com/products/firestore) |
| File Storage  | [Firebase Storage](https://firebase.google.com/products/storage)     |
| AI Extraction | [OpenAI API](https://platform.openai.com/) |
| Search        | [Algolia](https://www.algolia.com/) |
| Styling       | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) |
| Hosting       | [Vercel](https://vercel.com/)       |

---

## 📸 Screenshots

### 🧾 Upload Receipt Page
![Upload Page](https://github.com/user-attachments/assets/c1261ca6-bdcb-44dc-9522-5b2535015a01)

### 📊 Dashboard with Filters and Export
![Dashboard](https://github.com/user-attachments/assets/885521fe-08dc-4073-b0c8-aae122f92c64)

### 🧍 Detailed Receipt View with Metadata
![Receipt Details](https://github.com/user-attachments/assets/51e7879f-30db-4cce-b0c0-bcf75b74ce16)

---

## 🧑‍💼 Why Smartscan?

This project was built to solve a real-world problem—helping my dad manage his business receipts easily and digitally. With Smartscan, he can:
- Snap a photo of a receipt
- Let AI extract important information
- Store, search, and export reports without manual work.

---

## 🛠️ Running Locally

```bash
# Clone the repository
git clone https://github.com/acesFatee/smartscan.git
cd smartscan

# Install dependencies
npm install

# Create a `.env.local` file with your API keys and config
cp .env.example .env.local

# Start the development server
npm run dev
