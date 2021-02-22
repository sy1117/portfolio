import { TField, CustomValidationRules } from "../Field";
import {
  equal,
  notEqual,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
} from "./validators";

const validationFnMap = {
  equal,
  notEqual,
  greaterThan,
  greaterThanOrEqual,
  lessThan,
  lessThanOrEqual,
};

export const mixCustomValidate = (
  control: any,
  type: TField,
  rules?: CustomValidationRules,
): CustomValidationRules => {
  let result: any = {};
  let validate: any = {};
  if (rules) {
    if (rules.validate) {
      return rules;
    }

    for (const [key, value] of Object.entries(rules)) {
      if (
        key === "equal" ||
        key === "notEqual" ||
        key === "greaterThan" ||
        key === "greaterThanOrEqual" ||
        key === "lessThan" ||
        key === "lessThanOrEqual"
      ) {
        validate.lessThan = validationFnMap[key](control, type, value);
      } else {
        result[key] = value;
      }
    }
  }

  result.validate = validate;
  return result;
};
