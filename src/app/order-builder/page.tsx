"use client";

import { setActiveStep } from "@/redux/orderSlice";
import { RootState } from "@/redux/store";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomerInfo = dynamic(() => import("../../components/CustomerInfo"), {
  ssr: false,
});
const ProductSelection = dynamic(
  () => import("../../components/ProductSelection"),
  { ssr: false }
);
const ContractTerms = dynamic(() => import("../../components/ContractTerms"), {
  ssr: false,
});
const ReviewFineTune = dynamic(
  () => import("../../components/ReviewFineTune"),
  { ssr: false }
);

const steps = [
  "Customer Info",
  "Product Selection",
  "Contract Terms",
  "Review & Fine Tune",
];

const OrderBuilder = () => {
  const curStep = useSelector((state: RootState) => state.order.activeStep);
  const dispatch = useDispatch();

  // Ensure Redux state is at least 1
  const normalizedStep = curStep > 0 ? curStep : 1;
  const [currentStep, setCurrentStep] = useState(normalizedStep);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );

  // Sync Redux state on mount
  useEffect(() => {
    if (curStep === 0) {
      dispatch(setActiveStep(1));
    }
  }, [curStep, dispatch]);

  // Sync Redux state whenever currentStep changes
  useEffect(() => {
    dispatch(setActiveStep(currentStep));
  }, [currentStep, dispatch]);

  // Handles moving to the next step
  const handleNext = useCallback(() => {
    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[currentStep - 1] = true; // Mark current step as completed
      return updated;
    });

    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  }, [currentStep]);

  // Handles moving back
  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1)); // Prevent going below 1
  }, []);

  // Handles finalizing the order
  const handleFinalizeOrder = () => {
    setCompletedSteps(new Array(steps.length).fill(true)); // Mark all steps as completed
    alert("Order successfully confirmed!");
  };

  // Renders step content based on active step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CustomerInfo handleNext={handleNext} />;
      case 2:
        return <ProductSelection />;
      case 3:
        return <ContractTerms />;
      case 4:
        return <ReviewFineTune />;
      default:
        return null;
    }
  };

  return (
    <Container style={{ marginTop: 200 }}>
      <h1>Order Builder</h1>
      <Stepper activeStep={currentStep - 1} sx={{ marginBottom: 3 }}>
        {steps.map((label, index) => (
          <Step key={index} completed={completedSteps[index]}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>{renderStepContent()}</Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={currentStep === 1} onClick={handleBack}>
          Back
        </Button>
        {currentStep === steps.length ? (
          <Button
            variant="contained"
            color="success"
            onClick={handleFinalizeOrder}
          >
            Finalize Order
          </Button>
        ) : currentStep === 1 ? (
          <></>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default OrderBuilder;
