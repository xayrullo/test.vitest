import type { IDateResponse } from '@/types/DateResponse'

export function isValidDate(day: number, month: number, year: number): Boolean {
  const d: Date = new Date(year, month - 1, day)
  if (d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day) {
    return true
  }
  return false
}
export function stringToDate(date: string, format: string = 'DD.MM.YYYY'): IDateResponse {
  if (!date) return { success: false, message: 'You must send date in string format', data: null }
  const errorMessage = 'Wrong date format'
  const successMessage = 'Success'
  const warningMessage = "Success, but format date wrong. That's why we use 'DD.MM.YYYY"
  let message: string = successMessage
  if (date.length > 10) return { success: false, message: errorMessage, data: null }
  let parses: string[] = []
  if (date.includes('.')) {
    if (date.match(/\./g)?.length !== 2)
      return { success: false, message: errorMessage, data: null }
    parses = date.split('.')
  } else if (date.includes('/')) {
    if (date.match(/\//g)?.length !== 2)
      return { success: false, message: errorMessage, data: null }
    parses = date.split('/')
  } else if (date.includes('-')) {
    if (date.match(/\-/g)?.length !== 2)
      return { success: false, message: errorMessage, data: null }
    parses = date.split('-')
  }
  let formatParses: string[] = []
  format = format.toUpperCase()
  if (format.includes('.')) {
    if (format.match(/\./g)?.length !== 2) {
      message = warningMessage
      format = 'DD.MM.YYYY'
    }
    formatParses = format.split('.')
  }
  if (format.includes('/')) {
    if (format.match(/\//g)?.length !== 2) {
      message = warningMessage
      format = 'DD/MM/YYYY'
    }
    formatParses = format.split('/')
  }
  if (format.includes('-')) {
    if (format.match(/\-/g)?.length !== 2) {
      message = warningMessage
      format = 'DD-MM-YYYY'
    }
    formatParses = format.split('-')
  }
  let dayIndex = 0
  let monthIndex = 1
  let yearIndex = 2

  for (let index = 0; index < formatParses.length; index++) {
    if (formatParses[index] === 'DD') dayIndex = index
    if (formatParses[index] === 'MM') monthIndex = index
    if (formatParses[index] === 'YYYY') yearIndex = index
  }
  const day = parses[dayIndex]
  const month = parses[monthIndex]
  const year = parses[yearIndex]
  const isValid = isValidDate(Number(day), Number(month), Number(year))
  return {
    success: isValid,
    message: isValid ? message : errorMessage,
    data: isValid ? new Date(`${month}/${day}/${year}`) : null
  }
}
export function isLetter(e: any) {
  if (/^[a-zA-Z]{1}$/.test(e)) return true
  return false
}
export function priceFormat(price: number) {
  let strPrice = price.toString()
  const strArr = []
  while (strPrice.length > 3) {
    strArr.push(strPrice.slice(strPrice.length - 3, strPrice.length))
    strPrice = strPrice.slice(0, strPrice.length - 3)
  }
  strArr.push(strPrice)
  return strArr.reverse().join(' ')
}
export function phoneFormatter(phone: string) {
  phone = phone.includes('+') ? phone.substring(1) : phone
  const match: RegExpMatchArray | null = phone.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/)
  if (Array.isArray(match) && match.length > 0) {
    return `+(${match[1]})${match[2]} ${match[3]}-${match[4]}`
  } else {
    return 'Is not phone template'
  }
}
export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

function addZeroBeforeMonth(e: string) {
  return e.length > 1 ? e : '0' + e
}

export function getDateTime(stringdate: Date) {
  const date = new Date(stringdate)
  const year = date.getFullYear()
  const month = addZeroBeforeMonth((1 + date.getMonth()).toString())
  const day = addZeroBeforeMonth(date.getDate().toString())
  const hours = addZeroBeforeMonth(date.getHours().toString())
  const minutes = addZeroBeforeMonth(date.getMinutes().toString())
  return `${day}.${month}.${year} ${hours}:${minutes}`
}
export function getDate(stringdate: Date) {
  const date = new Date(stringdate)
  const year = date.getFullYear()
  const month = addZeroBeforeMonth((1 + date.getMonth()).toString())
  const day = addZeroBeforeMonth(date.getDate().toString())
  return `${day}.${month}.${year}`
}
//   focusI(a) {
//     document.getElementById(a).focus()
//   }
