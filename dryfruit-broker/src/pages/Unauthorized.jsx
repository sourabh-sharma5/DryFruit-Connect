import { Box, Typography } from "@mui/material";

function Unauthorized() {
  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" color="error">Access Denied</Typography>
      <Typography>You don't have permission to view this page.</Typography>
    </Box>
  );
}

export default Unauthorized;
