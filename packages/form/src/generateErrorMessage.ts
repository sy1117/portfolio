import { CustomValidationRules } from "./Field";

type TValidationRules = keyof CustomValidationRules;

const generateMessage = (
  ruleName: TValidationRules,
  label: string,
  value?: string | number,
) => {
  const MessageMap: Partial<Record<TValidationRules, string>> = {
    required: `${label} 을(를) 입력해주세요.`,
    min: `${label} 은(는) ${value} 보다 커야 합니다.`,
    max: `${label} 은(는) ${value} 보다 작아야 합니다.`,
    maxLength: `${label} 은(는) ${value}자 이내로 작성해주세요.`,
    minLength: `${label} 은(는) ${value} 자 이상이어야 합니다.`,
    pattern: `${label} 이(가) 형식에 맞지 않습니다.`,
    validate: `${label} 이(가) 유효하지 않습니다.`,
    equal: `${label} 이(가) ${value} 와 일치하지 않습니다.`,
    notEqual: `${label} 은(는) ${value} 와 같을 수 없습니다.`,
    greaterThan: `${label} 은(는) ${value} 보다 커야 합니다.`,
    greaterThanOrEqual: `${label} 은(는) ${value} 보다 크거나 같아야 합니다`,
    lessThan: `${label} 은(는) ${value} 보다 작아야 합니다.`,
    lessThanOrEqual: `${label} 은(는) ${value} 보다 작거나 같아야 합니다`,
  };
  return MessageMap[ruleName];
};

const generateErrorMessage = (
  label: string,
  name: string,
  rules: CustomValidationRules,
) => {
  let result: any = {};
  for (let [key, value] of Object.entries(rules)) {
    const ruleName = key as TValidationRules;
    const ruleValue = value as any;
    switch (typeof ruleValue) {
      case "boolean":
        result[ruleName] = generateMessage(ruleName, label || name);
        break;
      case "string":
        result[ruleName] = {
          value: ruleName,
          message: ruleValue,
        };
        break;
      case "number":
        result[ruleName] = {
          value: ruleValue,
          message: generateMessage(ruleName, label || name, ruleValue),
        };
        break;
      case "object":
        const { message } = ruleValue;
        if (message) {
          result[ruleName] = {
            ...ruleValue,
            message: ruleValue.message,
          };
        } else {
          result[ruleName] = {
            ...ruleValue,
            message: generateMessage(ruleName, label || name, ruleValue as any),
          };
        }
        break;
      default:
        result[ruleName] = ruleValue;
        break;
    }
  }
  return result;
};

export default generateErrorMessage;
