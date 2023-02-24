import { regexpEmail, regexpPhone } from '../const'

export const inputValidate = (
  validationRules: string | undefined,
  name: string | undefined,
  value: string | number | readonly string[] | undefined,
) => {
  if (validationRules) {
    const rules = validationRules.split('|')

    for (let i = 0; i < rules.length; i++) {
      const current = rules[i]

      if (current === 'required') {
        if (!value) {
          return {
            isValid: false,
            name,
            error: 'Необходимо заполнить это поле',
          }
        }
      }

      if (current === 'email') {
        if (!regexpEmail.test(String(value).toLowerCase())) {
          return {
            isValid: false,
            name,
            error: 'Введите корректный email',
          }
        }
      }

      if (current === 'phone') {
        if (!regexpPhone.test(String(value).toLowerCase())) {
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
