export type ContractFragment = {
  name: string;
  type: string;
};

export type StateMutability = "view" | "nonpayable" | "payable";

export type args = {
  internalType: string;
  name: string;
  type: string;
};

export type FunctionFragment = {
  name: string;
  stateMutability: StateMutability;
  inputs: args[];
  outputs: args[];
};
