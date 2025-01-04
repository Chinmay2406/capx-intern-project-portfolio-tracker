# capx-intern-project-portfolio-tracker
https://capxunstopchinmaydeshmukh.netlify.app/ link of deployment
The project contains the following files and directories relevant to building a README:

### **Key Files:**
- **`package.json`**: Indicates the project uses Node.js (likely with TypeScript).
- **`vite.config.ts`**: Suggests the project is built using Vite as a bundler.
- **`tailwind.config.js`**: Tailwind CSS is used for styling.
- **`.env`**: Contains environment variables (sensitive information, so it shouldn't be shared publicly).
- **Supabase Setup**: The project interacts with Supabase (based on the `supabase` folder and library files).
- **Components**: Several React components for functionalities like dashboard, stock management, and authentication.


# **Project Bolt**

A stock management platform that allows users to interact with stock data, perform stock selection, and manage their portfolio seamlessly.

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Steps to Run the Project Locally](#steps-to-run-the-project-locally)
5. [Assumptions and Limitations](#assumptions-and-limitations)
6. [Links](#links)

---

## **Introduction**
Project Bolt is a modern stock management platform built using React, TypeScript, and Tailwind CSS. It integrates with Supabase for authentication and database management, while also fetching stock data using external APIs.

---

## **Features**
- User authentication via Supabase.
- Interactive stock dashboard.
- Real-time stock data fetching using external APIs.
- Tailored random stock suggestions.
- Responsive design using Tailwind CSS.

---

## **Technologies Used**
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase
- **API Integration**: Finnhub
- **Build Tool**: Vite

---

## **Steps to Run the Project Locally**

### **Prerequisites**
1. Ensure you have the following installed:
   - Node.js (v16 or later)
   - npm or yarn
2. Clone the repository:
   ```bash
   git clone <repository-link>
   cd project
   ```

### **Setup Instructions**
1. Install project dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   - Copy the `.env` file (provided in the repository) and configure it with your Supabase credentials and Finnhub API key.

3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:3000`.

---

## **Assumptions and Limitations**
- The project assumes valid Supabase credentials and Finnhub API keys are provided in the `.env` file.
- Limited to environments where Node.js is installed.
- No deployment setup instructions included.

---

## **Links**
- **Deployed Application**: [https://capxunstopchinmaydeshmukh.netlify.app/]
