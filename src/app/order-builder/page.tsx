"use client";

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
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const currentStep = useSelector((state: RootState) => state.order.activeStep);
  const [activeStep, setActiveStep] = useState(currentStep || 0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(steps.length).fill(false)
  );

  // Handles moving to the next step
  const handleNext = () => {
    setCompletedSteps((prev) => {
      const updated = [...prev];
      updated[activeStep] = true;
      return updated;
    });
    setActiveStep((prev) => prev + 1);
  };

  // Handles moving back
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Handles finalizing the order
  const handleFinalizeOrder = () => {
    setCompletedSteps(new Array(steps.length).fill(true)); // Mark all steps as completed
    alert("Order successfully confirmed!");
  };

  // Renders step content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CustomerInfo handleNext={handleNext} />;
      case 1:
        return <ProductSelection />;
      case 2:
        return <ContractTerms />;
      case 3:
        return <ReviewFineTune />;
      default:
        return null;
    }
  };

  return (
    <Container style={{ marginTop: 200 }}>
      <h1>Order Builder</h1>
      <Stepper activeStep={activeStep} sx={{ marginBottom: 3 }}>
        {steps.map((label, index) => (
          <Step key={index} completed={completedSteps[index]}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>{renderStepContent()}</Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            color="success"
            onClick={handleFinalizeOrder}
          >
            Finalize Order
          </Button>
        ) : activeStep === 0 ? (
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
