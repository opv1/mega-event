import { regexpEmail, regexpBirthday, regexpPhone } from '@constants'

enum RULE_TYPE {
  Required = 'required',
  Email = 'email',
  Birthday = 'birthday',
  Phone = 'phone',
}

type InputValidatePropsType = {
  validationRules: string | undefined
  name: string | undefined
  value: string | number | readonly string[] | undefined
}

export type InputValidateReturnType = {
  isValid: boolean
  name: string | undefined
  error: string | undefined
}

type InputValidateType = (
  props: InputValidatePropsType,
) => InputValidateReturnType

export const inputValidate: InputValidateType = ({
  validationRules,
  name,
  value,
}) => {
  if (validationRules) {
    const rules = validationRules.split('|')

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]

      const stringValue = `${value}`.toLowerCase()

      if (rule === RULE_TYPE.Required) {
        if (!value) {
          return {
            isValid: false,
            name,
            error: 'Необходимо заполнить это поле',
          }
        }
      }

      if (rule === RULE_TYPE.Email) {
        if (!regexpEmail.test(stringValue)) {
          return {
            isValid: false,
            name,
            error: 'Введите корректный email',
          }
        }
      }

      if (rule === RULE_TYPE.Birthday) {
        if (!regexpBirthday.test(stringValue)) {
          return {
            isValid: false,
            name,
            error: 'Введите корректную дату',
          }
        }
      }

      if (rule === RULE_TYPE.Phone) {
        if (!regexpPhone.test(stringValue)) {
          return {
            isValid: false,
            name,
            error: 'Введите корректный телефон',
          }
        }
      }

      const pair = rule.split(':')

      switch (pair[0]) {
        case 'min':
          if (typeof value === 'string' && value.length < +pair[1]) {
            return {
              isValid: false,
              name,
              error: `Должно быть от ${pair[1]} символов`,
            }
          }
          break
        case 'max':
          if (typeof value === 'string' && value.length > +pair[1]) {
            return {
              isValid: false,
              name,
              error: `Должно быть до ${pair[1]} символов`,
            }
          }
          break
        case 'coincidence':
          if (value !== pair[1]) {
            return {
              isValid: false,
              name,
              error: 'Пароли должны совпадать',
            }
          }
          break
        default:
          break
      }
    }
  }

  return { isValid: true, name, error: '' }
}
