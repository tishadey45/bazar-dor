# 🛒 বাজার দর (Bazar Dor)

**নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে!**

বাজার দর একটি responsive web application, যেখানে ব্যবহারকারীরা চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিমসহ বিভিন্ন নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম, দামের পরিবর্তন এবং বাজারভিত্তিক মূল্য সম্পর্কে জানতে পারবেন।

🔗 **Live Website:** https://bazar-dor-tau.vercel.app

📦 **GitHub Repository:** https://github.com/tishadey45/bazar-dor

---

## ✨ Features

- 🏠 **Responsive Homepage:** মোবাইল, ট্যাবলেট ও ডেস্কটপের জন্য উপযোগী আধুনিক ডিজাইন।
- 📊 **Price Overview:** আজ যেসব পণ্যের দাম বেড়েছে বা কমেছে, সেগুলোর তালিকা।
- 🛍️ **Product Cards:** পণ্যের নাম, ছবি, ক্যাটাগরি, একক, আজকের দাম এবং দামের পরিবর্তন।
- 🔎 **Category Filtering:** ক্যাটাগরি অনুযায়ী পণ্য দেখা।
- ↕️ **Price Sorting:** ডিফল্ট, কম থেকে বেশি এবং বেশি থেকে কম দামে পণ্য সাজানো।
- 📄 **Product Details:** পণ্যের বিস্তারিত তথ্য এবং বাজারভিত্তিক দামের বিবরণ।
- 🔐 **Authentication:** Better Auth ব্যবহার করে ইমেইল ও পাসওয়ার্ড, Google এবং GitHub authentication।
- 👤 **User Profile:** ব্যবহারকারীর প্রোফাইল এবং তথ্য আপডেট করার সুবিধা।
- 🔔 **Toast Notifications:** Login, signup, logout এবং error-এর জন্য notification।
- ⏳ **Loading States:** ডেটা লোড হওয়ার সময় loading indicator বা skeleton UI।
- 🧭 **Navigation & Breadcrumbs:** সহজ navigation এবং homepage-এ ফিরে যাওয়ার সুবিধা।
- ❌ **Error & Empty States:** Invalid route বা পণ্য না পাওয়া গেলে ব্যবহারকারীকে উপযুক্ত বার্তা দেখানো।
- 📱 **Responsive Navigation:** বিভিন্ন screen size-এ ব্যবহারযোগ্য navbar ও price ticker।

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Application development |
| React | UI components |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| DaisyUI | UI components |
| Better Auth | Authentication and user management |
| MongoDB | Database integration |
| React Hot Toast | Toast notifications |
| React Marquee Text | Scrolling price ticker |
| Next.js Image | Image optimization |
| Vercel | Deployment |

---

## 🔌 API Endpoints

**Base API URL:**

`https://openapi.programming-hero.com/api/bazardor`

| Endpoint | Description |
|---|---|
| `/products` | সব পণ্যের তালিকা |
| `/products?category=chal` | ক্যাটাগরি অনুযায়ী পণ্য |
| `/products/1` | নির্দিষ্ট পণ্যের বিস্তারিত |
| `/categories` | সব ক্যাটাগরির তালিকা |
| `/categories/chal` | নির্দিষ্ট ক্যাটাগরির বিস্তারিত |

**Alternative API URLs:**

- `https://api.api-store.workers.dev/api/bazardor`
- `https://api.abcz.workers.dev/api/bazardor`

---

## 🚀 Getting Started

লোকালি project-টি চালানোর জন্য নিচের ধাপগুলো অনুসরণ করুন।

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/tishadey45/bazar-dor.git
```

### 2. Navigate to the Project

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Project root-এ `.env.local` ফাইল তৈরি করে প্রয়োজনীয় environment variables সেট করুন।

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
```

Better Auth, database এবং Google/GitHub login-এর জন্য তোমার project configuration অনুযায়ী প্রয়োজনীয় অতিরিক্ত environment variables যোগ করুন। Secret key বা OAuth credentials কখনো GitHub-এ commit করবেন না।

### 5. Start the Development Server

```bash
npm run dev
```

এবার browser-এ ভিজিট করুন:

`http://localhost:3000`

---

## 📂 Project Structure

```text
bazar-dor/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── categories/
│   │   ├── products/
│   │   ├── signin/
│   │   ├── signup/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Banner.tsx
│   │   ├── Products.tsx
│   │   ├── Navbar.tsx
│   │   └── ...
│   └── lib/
├── public/
├── .env.local
├── package.json
└── README.md
```

---

## 🎯 Project Goals

- বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর সহজে উপস্থাপন করা।
- ব্যবহারকারীদের দ্রুত পণ্য খুঁজে পেতে সহায়তা করা।
- Category filtering এবং price sorting-এর মাধ্যমে browsing সহজ করা।
- Authentication-এর মাধ্যমে protected pages এবং user profile পরিচালনা করা।
- Responsive ও user-friendly interface তৈরি করা।

---

## 🌐 Deployment

এই application Vercel-এ deploy করা হয়েছে।

- **Live Website:** https://bazar-dor-tau.vercel.app
- **Source Code:** https://github.com/tishadey45/bazar-dor
