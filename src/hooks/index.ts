import Moment from 'moment'

Moment().locale('en')
export const getMoment = (format: string) => {
  return (date: Date): string => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return date ? Moment(date).format(format) : 'Missing'
  }
}

export const toDateString: (date: Date) => string = getMoment('YYYY-MM-DD')
