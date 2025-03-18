import { setActiveStep, setContractTerms } from "@/redux/orderSlice";
import { RootState } from "@/redux/store";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { addMonths, format, isValid, parseISO } from "date-fns";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/** Enum for predefined contract periods */
enum ContractDuration {
  SIX_MONTHS = 6,
  TWELVE_MONTHS = 12,
  TWENTY_FOUR_MONTHS = 24,
  THIRTY_SIX_MONTHS = 36,
  CUSTOM = "custom",
}

/** Interface for form state */
interface ContractForm {
  startDate: string;
  contractPeriod: ContractDuration | number;
  endDate: string;
}

const contractOptions = [
  { value: ContractDuration.SIX_MONTHS, label: "6 months" },
  { value: ContractDuration.TWELVE_MONTHS, label: "12 months" },
  { value: ContractDuration.TWENTY_FOUR_MONTHS, label: "24 months" },
  { value: ContractDuration.THIRTY_SIX_MONTHS, label: "36 months" },
  { value: ContractDuration.CUSTOM, label: "Custom" },
];

const ContractTerms: React.FC = () => {
  const dispatch = useDispatch();
  const contractPeriodFromRedux =
    useSelector((state: RootState) => state.order.contractDuration) ||
    ContractDuration.TWELVE_MONTHS;

  const [formData, setFormData] = useState<ContractForm>({
    startDate: format(new Date(), "yyyy-MM-dd"),
    contractPeriod: contractPeriodFromRedux,
    endDate: format(
      addMonths(new Date(), contractPeriodFromRedux),
      "yyyy-MM-dd"
    ),
  });

  const [customMonths, setCustomMonths] = useState<number | "">("");

  /** Helper function to auto-calculate end date */
  const updateEndDate = (startDate: string, months: number): string => {
    if (isValid(parseISO(startDate))) {
      return format(addMonths(parseISO(startDate), months), "yyyy-MM-dd");
    }
    return "";
  };

  /** Handles Start Date change */
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStartDate = event.target.value;
    const months =
      formData.contractPeriod === ContractDuration.CUSTOM
        ? Number(customMonths) || 0
        : Number(formData.contractPeriod);

    setFormData((prev) => ({
      ...prev,
      startDate: newStartDate,
      endDate: updateEndDate(newStartDate, months),
    }));
  };

  /** Handles Contract Period selection */
  const handleContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ContractDuration | number;

    if (value === ContractDuration.CUSTOM) {
      setFormData((prev) => ({ ...prev, contractPeriod: value }));
    } else {
      setCustomMonths(""); // Reset custom input when switching back
      dispatch(setContractTerms(Number(value)));
      setFormData((prev) => ({
        ...prev,
        contractPeriod: Number(value),
        endDate: updateEndDate(prev.startDate, Number(value)),
      }));
    }
  };

  /** Handles Custom Duration input */
  const handleCustomMonthsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const months = Number(event.target.value);
    if (months >= 1) {
      setCustomMonths(months);
      setFormData((prev) => ({
        ...prev,
        endDate: updateEndDate(prev.startDate, months),
      }));
    }

    dispatch(setContractTerms(months));
    dispatch(setActiveStep(3));
  };

  return (
    <Box>
      <Typography variant="h6">Enter Contract Terms</Typography>

      {/* Start Date Field */}
      <TextField
        label="Start Date"
        type="date"
        fullWidth
        value={formData.startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{ shrink: true }}
        sx={{ mt: 2 }}
      />

      {/* Contract Period Dropdown */}
      <TextField
        select
        label="Contract Period"
        fullWidth
        value={formData.contractPeriod}
        onChange={handleContractChange}
        sx={{ mt: 2 }}
      >
        {contractOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {formData.contractPeriod === ContractDuration.CUSTOM && (
        <TextField
          label="Custom Duration (months)"
          type="number"
          fullWidth
          value={customMonths}
          onChange={handleCustomMonthsChange}
          inputProps={{ min: 1 }}
          sx={{ mt: 2 }}
        />
      )}

      {/* End Date Field */}
      <TextField
        label="End Date"
        type="date"
        fullWidth
        value={formData.endDate}
        InputProps={{ readOnly: true }}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default ContractTerms;
