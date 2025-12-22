# ResearchScoutAI

**Premium Lead Research & Approval Dashboard**

ResearchScoutAI is a high-performance dashboard designed for vetting and approving sales leads. It features a premium UI, automated data handling, and a monetization layer via PayPal.

## Features

- **Premium UI**: Modern, dark-mode design with glassmorphism and animations.
- **Lead Verification**: Review and approve leads with a single click.
- **Monetization**:
  - First 3 leads are free.
  - **Paywall**: Leads 4+ are blurred and locked.
  - **PayPal Integration**: Unlock all leads for a one-time payment of $99.00.
- **Email Integration**: Draft personalized emails instantly.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env.local` file with your PayPal Client ID:
   ```env
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Deployment

This project is optimized for Vercel.

**Important**: Add `NEXT_PUBLIC_PAYPAL_CLIENT_ID` to your Vercel Environment Variables for the payment gateway to function in production.
