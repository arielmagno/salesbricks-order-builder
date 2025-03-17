"use client";

import { setActiveStep, updateCustomerInfo } from "@/redux/orderSlice";
import { RootState } from "@/redux/store";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomerInfo = ({ handleNext }: { handleNext: () => void }) => {
  const dispatch = useDispatch();

  const defaultCustomerName = useSelector(
    (state: RootState) => state.order.customerName
  );

  const [customerName, setCustomerName] = useState(defaultCustomerName || "");
  const [customerNameError, setCustomerNameError] = useState(false);
  const [showPrepopulated, setShowPrepopulated] = useState(false);
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "NY",
    zip: "",
    country: "US",
  });

  const handleSave = () => {
    if (!customerName.trim()) {
      setCustomerNameError(true);
      return;
    }

    setCustomerNameError(false);

    dispatch(
      updateCustomerInfo({
        customerName,
        customerAddress: showPrepopulated ? address : undefined,
      })
    );

    handleNext();

    dispatch(setActiveStep(1));
  };

  return (
    <div>
      <h2>Customer Information</h2>

      <TextField
        label="Customer Name"
        variant="outlined"
        fullWidth
        required
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        error={customerNameError}
        helperText={customerNameError ? "Customer name is required" : ""}
        sx={{ marginBottom: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showPrepopulated}
            onChange={() => setShowPrepopulated(!showPrepopulated)}
          />
        }
        label="Pre-populate customer information"
      />

      {showPrepopulated && (
        <Grid
          container
          spacing={2}
          sx={{ backgroundColor: "#faf9f4", padding: 2, borderRadius: 2 }}
        >
          <Grid item xs={12}>
            <TextField
              label="Address line 1"
              fullWidth
              value={address.line1}
              onChange={(e) =>
                setAddress({ ...address, line1: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address line 2 (Optional)"
              fullWidth
              value={address.line2}
              onChange={(e) =>
                setAddress({ ...address, line2: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="City"
              fullWidth
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              value={address.state}
              fullWidth
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            >
              <MenuItem value="NY">NY</MenuItem>
              <MenuItem value="CA">CA</MenuItem>
              <MenuItem value="TX">TX</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Zip code"
              fullWidth
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
          </Grid>
        </Grid>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2, float: "inline-end" }}
      >
        Next
      </Button>
    </div>
  );
};

export default CustomerInfo;
