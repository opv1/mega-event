import ru from 'date-fns/locale/ru'
import { addDays, format } from 'date-fns'

const getDates = (): string[] => {
  const today = new Date()
  const array = []

  for (let i = 0; i < 4; i++) {
    const date = addDays(today, i)
    const formatDate = `${format(date, 'd MMMM yyyy', { locale: ru })} года`
    array.push(formatDate)
  }

  return array
}

export default getDates
