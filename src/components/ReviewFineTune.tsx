"use client";

import {
  Box,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAddOns } from "../redux/orderSlice";
import { RootState } from "../redux/store";

const ReviewFineTune = () => {
  const dispatch = useDispatch();
  const {
    customerName,
    customerAddress,
    product,
    plan,
    planPrice,
    contractDuration,
    addOns,
  } = useSelector((state: RootState) => state.order);

  const availableAddOns = [
    { id: "A1", name: "Extra Storage", price: 10 },
    { id: "A2", name: "Premium Support", price: 20 },
    { id: "A3", name: "Diamond Support", price: 50 },
  ];

  const handleToggleAddOn = (
    id: string,
    name: string,
    price: number,
    checked: boolean
  ) => {
    const updatedAddOns = checked
      ? [...addOns, { id, name, price, quantity: 1 }]
      : addOns.filter((addOn) => addOn.id !== id);
    dispatch(setAddOns(updatedAddOns));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedAddOns = addOns.map((addOn) =>
      addOn.id === id ? { ...addOn, quantity } : addOn
    );
    dispatch(setAddOns(updatedAddOns));
  };

  const total = parseFloat(
    (
      planPrice +
      addOns.reduce((sum, addOn) => sum + addOn.price * addOn.quantity, 0)
    ).toFixed(2)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Review & Fine Tune
      </Typography>

      <Grid container spacing={3}>
        {/* Customer Info Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight={600}>
            Customer Information
          </Typography>
          <p>
            <strong>Name:</strong> {customerName}
          </p>
        </Grid>

        {/* Address Details Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight={600}>
            Address Details
          </Typography>
          <p>
            <strong>Street:</strong> {customerAddress?.line1}
          </p>
          <p>
            <strong>City:</strong> {customerAddress?.city}
          </p>
          <p>
            <strong>State:</strong> {customerAddress?.state}
          </p>
          <p>
            <strong>ZIP Code:</strong> {customerAddress?.zip}
          </p>
          <p>
            <strong>Country:</strong> {customerAddress?.country}
          </p>
        </Grid>

        {/* Product and Plan Column */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight={600}>
            Product & Plan
          </Typography>
          <p>
            <strong>Product:</strong> {product}
          </p>
          <p>
            <strong>Plan:</strong> {plan}
          </p>
          <p>
            <strong>Plan Price:</strong> ${planPrice}
          </p>
          <p>
            <strong>Contract Duration:</strong> {contractDuration} months
          </p>
        </Grid>
      </Grid>

      {/* Add-Ons Section */}
      <Box mt={4}>
        <Typography variant="h6">Add-Ons</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableAddOns.map((addOn) => (
                <TableRow key={addOn.id}>
                  <TableCell>
                    <Checkbox
                      checked={addOns.some((a) => a.id === addOn.id)}
                      onChange={(e) =>
                        handleToggleAddOn(
                          addOn.id,
                          addOn.name,
                          addOn.price,
                          e.target.checked
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>{addOn.name}</TableCell>
                  <TableCell>${addOn.price}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      value={
                        addOns.find((a) => a.id === addOn.id)?.quantity || 0
                      }
                      onChange={(e) =>
                        handleQuantityChange(
                          addOn.id,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      disabled={!addOns.some((a) => a.id === addOn.id)}
                      inputProps={{ min: 1 }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Total Price */}
      <Typography variant="h6" mt={3}>
        Total Price: ${total}
      </Typography>
    </Box>
  );
};

export default ReviewFineTune;
