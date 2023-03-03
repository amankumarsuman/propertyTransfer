import { useContract, useContractRead } from "@thirdweb-dev/react";

export default function ContractOwner() {
  const { contract } = useContract(
    "0x0e700F25B207941BD7D5A7d0a196A10BCfA568Fc"
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
