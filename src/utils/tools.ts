// function addZeroBeforeMonth(e) {
//   return e.length > 1 ? e : '0' + e
// }

import type { IDateResponse } from '@/types/DateResponse'

export function isValidDate(day: number, month: number, year: number): Boolean {
  var d: Date = new Date(year, month - 1, day)
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
//   isLetter(e) {
//     let char = String.fromCharCode(e.keyCode)
//     if (/^[A-Z]+$/.test(char) && char.length <= 2) return true
//     e.preventDefault()
//   },
//   priceFormat(price) {
//     if (price) {
//       let strPrice = price.toString()
//       let strArr = []
//       while (strPrice.length > 3) {
//         strArr.push(strPrice.slice(strPrice.length - 3, strPrice.length))
//         strPrice = strPrice.slice(0, strPrice.length - 3)
//       }
//       strArr.push(strPrice)
//       return strArr.reverse().join(' ')
//     }
//   },
//   phoneSpaceRemover(phone) {
//     phone = phone.includes('+') > 0 ? phone.substring(1) : phone
//     return `+${phone.split(' ').join('')}`
//   },
//   phoneFormatter(phone) {
//     if (phone && phone.length > 0) {
//       phone = phone.includes('+') > 0 ? phone.substring(1) : phone
//       let match = phone.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/)
//       return `+(${match[1]})${match[2]} ${match[3]}-${match[4]}`
//     }
//     return 'Unknown'
//   },
//   camelize(str) {
//     return str
//       .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
//         return index === 0 ? word.toLowerCase() : word.toUpperCase()
//       })
//       .replace(/\s+/g, '')
//   },
//   getDateTime(stringdate) {
//     let date = new Date(stringdate)
//     let year = date.getFullYear()
//     let month = addZeroBeforeMonth((1 + date.getMonth()).toString())
//     let day = addZeroBeforeMonth(date.getDate().toString())
//     let hours = addZeroBeforeMonth(date.getHours().toString())
//     let minutes = addZeroBeforeMonth(date.getMinutes().toString())
//     return `${day}.${month}.${year} ${hours}:${minutes}`
//   },
//   getDate(stringdate) {
//     let date = new Date(stringdate)
//     let year = date.getFullYear()
//     let month = addZeroBeforeMonth((1 + date.getMonth()).toString())
//     let day = addZeroBeforeMonth(date.getDate().toString())
//     return `${day}.${month}.${year}`
//   },
//   focusI(a) {
//     document.getElementById(a).focus()
//   }
