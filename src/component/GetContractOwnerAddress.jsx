import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function ContractOwner() {
  const { contract } = useContract(
    "0x70b15CA40D2a2dAE97Df7CA9e2dFcf0e05e802fD"
  );
  const { data, isLoading } = useContractRead(contract, "contractOwner");

  return (
    <>
      <h4>
        <span style={{ color: "green" }}>Contract Owner:-</span>
        <span style={{ color: "white" }}>
          {isLoading ? "Loading....." : data}
        </span>
      </h4>
    </>
  );
}
