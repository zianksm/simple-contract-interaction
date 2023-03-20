import {
  FunctionFragment,
  ContractFragment,
  fn,
  args,
  StateMutability,
} from "./type";

export class Parser {
  public static parse(text: string): FunctionFragment[] {
    const fragments: ContractFragment[] = JSON.parse(text);

    const arr: FunctionFragment[] = [];

    for (const fragment of fragments) {
      if (fragment.type !== fn) continue;
      
      const functionFragment: FunctionFragment = {
        inputs: fragment.inputs,
        outputs: fragment.outputs,
        name: fragment.name,
        stateMutability: fragment.stateMutability as StateMutability,
        type: fragment.type,
      };

      arr.push(functionFragment);
    }

    return arr;
  }
}
