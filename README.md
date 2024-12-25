# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c47fcfc2-d9db-46f1-ac66-956812d69051

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c47fcfc2-d9db-46f1-ac66-956812d69051) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c47fcfc2-d9db-46f1-ac66-956812d69051) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)




# CodeCrafter - Internal Management System

## Overview
CodeCrafter is an internal management system designed to streamline promotional campaign activities and agent performance tracking for our business. The system enables administrators to generate and assign promo codes, track redemptions, and manage agents efficiently. Agents can log in with their mobile number and pre-assigned passwords to view assigned promo codes and track redemption statuses.

## Features

### Admin Features
1. **Dashboard**: 
   - Overview of promo codes generated, assigned, and redeemed.
   - Key metrics displayed in graphs and charts.
2. **Promo Code Management**:
   - Generate unique promo codes in bulk (e.g., COOL1 to COOL100).
   - Assign promo codes to agents.
   - Track redemption status of promo codes.
3. **Agent Management**:
   - Add and manage agents.
   - View agents' assigned promo codes and performance metrics.
4. **Reports**:
   - Detailed reports on promo code usage and agent performance.
   - Export data to Excel.
5. **Manual Redemption Logging**:
   - Log promo code redemptions manually with customer details.
   - Update redemption status in the system.
6. **Notifications**:
   - Send targeted notifications to agents about updates or tasks.

### Agent Features
1. **Login**:
   - Secure login using mobile number and password.
2. **Dashboard**:
   - View assigned promo codes.
   - Track redemption status of codes in real-time.
   - Performance summary showing total redemptions.
3. **Forgot Password**:
   - Reset password via OTP-based mobile verification.

### Additional Functionalities
- **Excel Sync**:
   - Import/export promo codes and agent data to/from Excel files.
   - Sync uploaded Excel data with Firestore.
- **Real-Time Updates**:
   - Automatic updates for dashboards using Firebase Firestore.

## Technology Stack
1. **Frontend**: AI-generated web pages using Lovable.dev.
2. **Backend**: Firebase Cloud Functions and Firebase Authentication.
3. **Database**: Firebase Firestore for real-time database management.
4. **Hosting**: Firebase Hosting for deployment.

## Firebase Integration
1. **Authentication**:
   - Admins log in using email/password.
   - Agents log in using mobile number/password.
2. **Database Structure**:
   - **PromoCodes**: Stores promo code details.
   - **Agents**: Stores agent details.
   - **Redemptions**: Logs promo code redemptions.
   - **Notifications**: Stores admin notifications.
3. **Cloud Functions**:
   - For promo code generation and management.
   - For syncing Excel uploads.
4. **Hosting**:
   - Deployment with HTTPS support and optimized performance.

## Setup Instructions
1. Clone the repository and open it in your code editor.
2. Install Firebase SDK:
   ```bash
   npm install firebase
   ```
3. Initialize Firebase:
   - Add Firebase project credentials.
   - Enable Authentication and Firestore in the Firebase console.
4. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```
5. Test all features before going live.

## Future Enhancements
1. Fully online redemption system with a customer-facing interface.
2. Advanced reporting and analytics.
3. Role-based access for different admin levels.
4. Integration with third-party APIs for automation.

## What technologies are used for this project?
This project is built with Lovable and Windsurf.

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

---

This README file provides a comprehensive overview of the CodeCrafter project, guiding both development and future improvements. Ensure all features and integrations align with the described specifications.