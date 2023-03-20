export type ContractFragment = {
  name: string;
  type: string;
} & Partial<FunctionFragment>;

export type args = {
  internalType: string;
  name: string;
  type: string;
};

export type FunctionFragment = {
  name: string;
  stateMutability: StateMutability;
  inputs?: args[];
  outputs?: args[];
  type: fn
};

export type view = "view";
export const view = "view";

export type nonpayable = "nonpayable";
export const nonpayable = "nonpayable";

export type payable = "payable";
export const payable = "payable";

export type fn = "function";
export const fn = "function";

export type StateMutability = view | nonpayable | payable;
