"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductSelection } from "../redux/orderSlice";
import { RootState } from "../redux/store";

const ProductSelection = () => {
  const dispatch = useDispatch();
  const { product, plan } = useSelector((state: RootState) => state.order);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    {
      id: "ITEM_03",
      name: "Product C",
      plans: [
        { name: "Basic", price: 24.99 },
        { name: "Enterprise", price: 79.99 },
      ],
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(product);
  const [availablePlans, setAvailablePlans] = useState<
    { name: string; price: number }[]
  >([]);

  /** Populate available plans based on the selected product */
  useEffect(() => {
    const selected = products.find((p) => p.id === product);
    setSelectedProduct(product);
    setAvailablePlans(selected ? selected.plans : []);
  }, [product, products]);

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const selected = products.find((p) => p.id === event.target.value);
    setSelectedProduct(event.target.value);
    setAvailablePlans(selected ? selected.plans : []);

    dispatch(
      setProductSelection({
        product: event.target.value,
        plan: "",
        price: 0,
      })
    );
  };

  const handlePlanChange = (event: SelectChangeEvent<string>) => {
    const selectedPlan = availablePlans.find(
      (p) => p.name === event.target.value
    );
    if (selectedPlan) {
      dispatch(
        setProductSelection({
          product: selectedProduct,
          plan: selectedPlan.name,
          price: selectedPlan.price,
        })
      );
    }
  };

  return (
    <Box>
      <h2>Product & Plan Selection</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel>Product</InputLabel>
        <Select value={selectedProduct} onChange={handleProductChange}>
          {products.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        margin="normal"
        disabled={availablePlans.length === 0}
      >
        <InputLabel>Plan</InputLabel>
        <Select value={plan} onChange={handlePlanChange}>
          {availablePlans.map((p, index) => (
            <MenuItem key={index} value={p.name}>
              {p.name} - ${p.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductSelection;
