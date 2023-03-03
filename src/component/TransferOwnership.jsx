import { Grid, Paper, TextField } from "@mui/material";
import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { alpha, styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      color: "white",
    },
    "& .MuiInput-input": {
      color: "white",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

function TransferOwnership() {
  const transferInit = {
    id: 0,
    owner: "",
  };

  const contractAddress = "0x0e700F25B207941BD7D5A7d0a196A10BCfA568Fc";

  const { contract } = useContract(contractAddress);

  const [transferInput, setTransferInput] = useState(transferInit);
  const handleTransferInput = (e) => {
    const { name, value } = e.target;
    setTransferInput({ ...transferInput, [name]: value });
  };

  //write fn context
  const { mutateAsync, isLoadings, errors } = useContractWrite(
    contract,
    "transferPropertyOwnership"
  );

  const handleTransfer = () => {
    setTransferInput(transferInit);
  };
  return (
    <>
      <Paper
        sx={{
          background: "#1b2129",
          padding: "10px 20px",
          marginBottom: "20px",
        }}
        elevation={6}
      >
        <Grid sx={{ textAlign: "center" }} container spacing={2}>
          <Grid item xs={12} md={12}>
            <h3 style={{ color: "green" }}>Transfer Ownership</h3>
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter ID "
              name="id"
              fullWidth
              value={transferInput?.id}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              onChange={handleTransferInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter New Owner Name "
              name="owner"
              fullWidth
              value={transferInput?.owner}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              onChange={handleTransferInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Web3Button
              contractAddress={contractAddress}
              action={() =>
                mutateAsync(
                  // Place your arguments here in an array, in the same order as your smart contract function
                  [transferInput?.id, transferInput?.owner]
                )
              }
              onClick={handleTransfer}
            >
              Transfer
            </Web3Button>
          </Grid>
        </Grid>
        {/* <ContractOwner /> */}
      </Paper>
    </>
  );
}

export default TransferOwnership;
