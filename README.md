## Project Overview
This document outlines the design and architecture of the Salesbricks Order Builder application. The project is a React-based web application using Material-UI and Redux for state management.

## Technologies Used
- **React** (with Next.js)
- **Material-UI** for UI components
- **Redux Toolkit** for state management
- **TypeScript** (if applicable)

## Directory Structure
```
/src
  /app
    /order-builder                # Main feature directory for order building
      - page.tsx                  # Entry point for the order builder page
      - favicon.ico                # Favicon for the app
      - globals.css                # Global styles
      - layout.tsx                 # Layout wrapper for the order builder
      - page.module.css            # Scoped styles for the order builder page
      - page.tsx                   # Main page component for order builder
      /components                  # UI components used in order builder
        - ContractTerms.tsx        # Component for contract terms selection
        - CustomerInfo.tsx         # Component for collecting customer details
        - ProductSelection.tsx     # Component for selecting products
        - ReviewFineTune.tsx       # Component for reviewing and fine-tuning orders
        - StoreProvider.tsx        # Provider for managing global state within order builder
  /redux
    - orderSlice.ts                # Redux slice managing order state
    - store.ts                      # Redux store configuration
  - .gitignore                      # Git ignore rules
  - eslint.config.mjs               # ESLint configuration for linting
  - next-env.d.ts                   # TypeScript environment declarations for Next.js
  - next.config.ts                   # Next.js configuration file
  - package-lock.json                # Dependency lock file for npm
```

## Redux State Management

### **State Slice: orderSlice.ts**
The application uses Redux to store order-related information, including product selection, plan, pricing, and contract details.

```typescript
interface OrderState {
  activeStep: number;
  customerName: string;
  customerAddress?: Address;
  product: string;
  plan: string;
  planPrice: number;
  contractDuration: number;
  addOns: { id: string; name: string; price: number; quantity: number }[];
  isFinalized: boolean;
}
```

### **Actions & Reducers**
- `setProductSelection({ product, plan, price })` → Saves the selected product, plan, and price in Redux.
- `setActiveStep(step: number)` → Updates the current step of the order process.
- `finalizeOrder()` → Marks the order as completed.

## UI Components
## Component Breakdown
### `Home`
- Displays a welcome message.
- Implements an automatic redirect to `/order-builder` with a loading indicator.

### `CustomerInfo`
- Collects customer **name** and **address** if pre-populate is clicked.
- Stores customer details in **Redux**.

### `ProductSelection`
- Allows users to select a product and a corresponding plan.
- Updates the selected product, plan name, and plan price in the Redux store.
- Fetches available plans based on the selected product.

### `Contract Terms`
- Allows customer to select custom contract start date. By default, it will be the current date. 
- Customer can select either a fixed term or custom contract period
- If Custom contract is selected, customer can enter the months of his term.
- End date will be autocomputed based on the number of months entered regardless if its custom or fixed term contract. 

 ### `Review Order`
- Displays the customer info, address, selected product, plan, and pricing details.
- Provides a summary before proceeding to finalization.
- Allows customer to select from a list of add-ons before finalizing the order 
- Total price will be autocomputed based on the updated add-ons. 

### `orderSlice` (Redux Store)
- Stores order-related state, including selected product, plan, price, and contract details.
- Includes actions to update state such as `setProductSelection`, `setActiveStep`, and `finalizeOrder`.


## API & Data Structure
### Product & Plans Data Structure
```typescript
const products = [
  {
    id: "ITEM_01",
    name: "Product A",
    plans: [
      { name: "Basic", price: 29.99 },
      { name: "Pro", price: 49.99 },
      { name: "Enterprise", price: 99.99 },
    ],
  },
  {
    id: "ITEM_02",
    name: "Product B",
    plans: [
      { name: "Starter", price: 19.99 },
      { name: "Advanced", price: 39.99 },
    ],
  },
];
```

### Redux Store Structure
```typescript
interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
```

```typescript
interface OrderState {
  activeStep: number;
  product: string;
  plan: string;
  planPrice: number;
  contractDuration: number;
  addOns: { id: string; name: string; price: number; quantity: number }[];
  isFinalized: boolean;
}
```

## Error Handling
- **Required field validation**: If a user did not enter his name in the customer info form, an error is triggered.
- **Redux State Validation**: Ensures only valid data is stored in the Redux store.

## Design Decisions
- **Material-UI for UI Components**: Provides a consistent and accessible UI design.
- **Redux for State Management**: Ensures a global state for managing order selections.
- **Client-Side Data Handling**: Stores product data in a static structure for simplicity.
- **Automatic Redirection**: Improves UX by guiding users to the order builder page.
- **Separate Plan Pricing**: Allows flexibility in pricing for different plans.

## Assumptions
- Products and plans are predefined and do not change dynamically.
- Redux state persists user selections across the checkout process.
- Pricing remains fixed for the session duration.
- Users navigate through steps sequentially without skipping.

---

## Future Enhancements
- Implement backend API integration for product pricing.
- Add unit tests with Jest and React Testing Library.
- Improve UX with animations and transitions.
- Use standard form library for better form handling and validation

## Contributors
- **Ariel Magno** - Lead Developer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
