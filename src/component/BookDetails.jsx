import {
  useContractRead,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { Button, Grid, Paper } from "@mui/material";
import ContractOwner from "./GetContractOwnerAddress";
import TransferOwnership from "./TransferOwnership";
// Your smart contract address
// const contractAddress = "{{contract_address}}";
const contractAddress = "0x0e700F25B207941BD7D5A7d0a196A10BCfA568Fc";

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

function BookDetails() {
  const init = {
    id: 1,
    names: "",
    owner: "",
    value: "",
    area: "",
  };

  const [input, setInput] = useState(init);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const { contract } = useContract(contractAddress);
  const [index, setIndex] = useState(1);
  const { data, isLoading, error } = useContractRead(
    contract,
    "properties",
    index
  );

  //write fn context
  const { mutateAsync, isLoadings, errors } = useContractWrite(
    contract,
    "addProperty"
  );

  if (error) {
    console.error("failed to read contract", error);
  }
  console.log(Number(data?.value), error);

  return (
    <>
      <Paper
        sx={{
          padding: "10px",
          background: "#1b2129",
          marginBottom: "50px",
        }}
        elevation={6}
      >
        <Grid sx={{ textAlign: "center" }} container spacing={2}>
          <Grid item xs={12} md={12}>
            <h3 style={{ color: "green" }}>Add Book Details</h3>
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter ID"
              fullWidth
              name="id"
              type="number"
              value={input?.id}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              // placeholder="enter index"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter Name"
              name="names"
              value={input?.names}
              fullWidth
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              // placeholder="enter index"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter Student Name"
              name="owner"
              fullWidth
              value={input?.owner}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              // placeholder="enter index"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter Price "
              name="value"
              fullWidth
              value={input?.value}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              // placeholder="enter index"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CssTextField
              variant="outlined"
              label="Enter area "
              name="area"
              fullWidth
              value={input?.area}
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              sx={{ input: { color: "white" } }}
              // placeholder="enter index"
              onChange={handleInput}
            />
          </Grid>
          <Grid item xs={12} md={4}></Grid>

          <Grid item xs={12} md={4}>
            <Web3Button
              contractAddress={contractAddress}
              action={() =>
                mutateAsync(
                  // Place your arguments here in an array, in the same order as your smart contract function
                  [
                    input?.id,
                    input?.names,
                    input?.owner,
                    input?.value,
                    input?.area,
                  ]
                )
              }
            >
              Add
            </Web3Button>
          </Grid>
        </Grid>
      </Paper>

      {/* transfer ownership */}
      <TransferOwnership />
      <Paper
        sx={{
          background: "#1b2129",
          padding: "10px 20px",
          marginBottom: "20px",
        }}
        elevation={6}
      >
        <ContractOwner />
      </Paper>
      <CssTextField
        variant="outlined"
        label="Enter Index"
        name="index"
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        sx={{ input: { color: "white" } }}
        // placeholder="enter index"
        onChange={(e) => setIndex(e.target.value)}
      />
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="grid">
              <a href="https://portal.thirdweb.com/" className="card">
                <h2>Book {index} Details &rarr;</h2>
                <p> Name: {data?.name}</p>
                <p> Owner: {data?.owner}</p>
                <p> Amount: ${Number(data?.value)}</p>
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export { BookDetails };
