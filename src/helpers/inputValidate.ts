import { regexpEmail, regexpBirthday, regexpPhone } from '../const'

enum RulesType {
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

type InputValidateType = (props: InputValidatePropsType) => {
  isValid: boolean
  name: string | undefined
  error: string
}

export const inputValidate: InputValidateType = ({
  validationRules,
  name,
  value,
}) => {
  if (validationRules) {
    const rules = validationRules.split('|')

    for (let i = 0; i < rules.length; i++) {
      const current = rules[i]

      const stringValue = String(value).toLowerCase()

      if (current === RulesType.Required) {
        if (!value) {
          return {
            isValid: false,
            name,
            error: 'Необходимо заполнить это поле',
          }
        }
      }

      if (current === RulesType.Email) {
        if (!regexpEmail.test(stringValue)) {
          return {
            isValid: false,
            name,
            error: 'Введите корректный email',
          }
        }
      }

      if (current === RulesType.Birthday) {
        if (!regexpBirthday.test(stringValue)) {
          return {
            isValid: false,
            name,
            error: 'Введите корректную дату',
          }
        }
      }

      if (current === RulesType.Phone) {
        if (!regexpPhone.test(stringValue)) {
          return {
            isValid: false,
            name,
            error: 'Введите корректный телефон',
          }
        }
      }

      const pair = current.split(':')

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

  return { isValid: true, name: '', error: '' }
}
