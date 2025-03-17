"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      router.push("/order-builder");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main style={{ padding: "200px", textAlign: "center" }}>
      {loading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Redirecting to Order Builder...
          </Typography>
        </Box>
      ) : (
        <>
          <h1>Welcome to Salesbricks Order Builder</h1>
          <p>Start building your order by navigating to the order builder.</p>
        </>
      )}
    </main>
  );
}
