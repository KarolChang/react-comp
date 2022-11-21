import { useEffect, useState } from 'react'
// import dayjs from 'dayjs'
import { dayjs } from '../utils/dayjs'
import classnames from 'classnames'
import Date from './date'

export interface CalendarInfo {
  year: number
  month: number
  monthDays: number
  firstDay: number
}

export default function Calendar() {
  const [info, setInfo] = useState<CalendarInfo>({
    year: dayjs().year(),
    month: dayjs().month() + 1,
    monthDays: dayjs().daysInMonth(),
    firstDay: dayjs(`${dayjs().year()}-${dayjs().month() + 1}-01`).day()
  })
  const [target, setTarget] = useState(dayjs())
  // const [target, setTarget] = useState<number[]>(dayjs().toArray())

  console.log('info', info)

  // useEffect(() => {
  //   console.log('test', dayjs('2022-11-20').day())
  // }, [])

  const changeMonth = (mode: 'down' | 'up') => {
    let year
    let month
    if (mode === 'down') {
      year = info.month === 1 ? info.year - 1 : info.year
      month = info.month === 1 ? 12 : info.month - 1
    } else {
      year = info.month === 12 ? info.year + 1 : info.year
      month = info.month === 12 ? 1 : info.month + 1
    }
    setInfo({
      year,
      month,
      monthDays: dayjs(`${year}-${month}-01`).daysInMonth(),
      firstDay: dayjs(`${year}-${month}-01`).day()
    })
  }

  const dateClick = (date: number) => {
    const nowDate = `${info.year}-${info.month}-${date < 10 ? `0${date}` : date}`
    console.log('nowDate', nowDate)
    setTarget(dayjs(nowDate))
  }

  return (
    <>
      <div className="p-6 border border-gray-500 rounded w-[300px] flex flex-col gap-4">
        <div className="flex justify-between">
          <span onClick={() => changeMonth('down')}>Q</span>
          <span>{`${info.year}年 ${info.month}月`}</span>
          <span onClick={() => changeMonth('up')}>Q</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>日</span>
          <span>一</span>
          <span>二</span>
          <span>三</span>
          <span>四</span>
          <span>五</span>
          <span>六</span>
        </div>
        <div className="grid grid-cols-7 gap-4 text-sm">
          {Array.from({ length: info.monthDays }, (_, i) => (
            <Date date={i + 1} firstDay={info.firstDay} info={info} target={target} onClick={() => dateClick(i + 1)} />
          ))}
        </div>
      </div>
    </>
  )
}
