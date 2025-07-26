import { addDays, format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const getDates = (): string[] => {
  const today = new Date()
  const array = []

  for (let i = 0; i < 4; i++) {
    const date = addDays(today, i)
    const formatDate = `${format(date, 'd MMMM yyyy', { locale: ru })} года`

    array.push(formatDate)
  }

  return array
}
