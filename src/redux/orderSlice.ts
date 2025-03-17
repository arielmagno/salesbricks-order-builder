import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderState {
  // Order step
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

const initialState: OrderState = {
  activeStep: 0,
  customerName: "",
  customerAddress: {
    line1: "",
    line2: "",
    city: "",
    state: "NY",
    zip: "",
    country: "US",
  }, // Default empty address object
  product: "",
  plan: "",
  planPrice: 0, // Default price
  contractDuration: 12,
  addOns: [],
  isFinalized: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    finalizeOrder: (state) => {
      state.isFinalized = true;
    },
    updateCustomerInfo: (
      state,
      action: PayloadAction<{
        customerName: string;
        customerAddress?: Address;
      }>
    ) => {
      state.customerName = action.payload.customerName;
      state.customerAddress = action.payload.customerAddress || {
        line1: "",
        line2: "",
        city: "",
        state: "NY",
        zip: "",
        country: "US",
      };
    },
    setProductSelection: (
      state,
      action: PayloadAction<{ product: string; plan: string; price: number }>
    ) => {
      state.product = action.payload.product;
      state.plan = action.payload.plan;
      state.planPrice = action.payload.price;
    },
    setContractTerms: (state, action: PayloadAction<number>) => {
      state.contractDuration = action.payload;
    },
    setAddOns: (
      state,
      action: PayloadAction<
        { id: string; name: string; price: number; quantity: number }[]
      >
    ) => {
      state.addOns = action.payload;
    },
  },
});

export const {
  updateCustomerInfo,
  setProductSelection,
  setContractTerms,
  setAddOns,
  finalizeOrder,
  setActiveStep,
} = orderSlice.actions;

export default orderSlice.reducer;
