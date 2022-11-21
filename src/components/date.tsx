import classnames from 'classnames'
import { CalendarInfo } from './calendar'
import { useEffect, useMemo, useState } from 'react'

export default function Date({
  date,
  firstDay,
  onClick,
  info,
  target
}: {
  date: number
  firstDay: number
  onClick: () => void
  info: CalendarInfo
  target: any
}) {
  const [isTarget, setIsTarget] = useState(false)

  useEffect(() => {
    // if (target[0] === info.year && target[1] === info.month - 1 && target[2] === date) {
    //   setIsTarget(true)
    // }
    setIsTarget(target.year() === info.year && target.month() === info.month - 1 && target.date() === date)
  }, [date, info.month, info.year, target])

  return (
    <div
      className={classnames('relative text-center cursor-pointer', {
        'col-start-2': date === 1 && firstDay === 1,
        'col-start-3': date === 1 && firstDay === 2,
        'col-start-4': date === 1 && firstDay === 3,
        'col-start-5': date === 1 && firstDay === 4,
        'col-start-6': date === 1 && firstDay === 5,
        'col-start-7': date === 1 && firstDay === 6
      })}
      onClick={onClick}
    >
      {date}
      {/* 日期的樣式 */}

      <div className="absolute h-7 w-7 hover:bg-gray-300/30 inset-0 -left-0.5 -top-1 rounded-full"></div>
      <div
        className={classnames(
          'absolute h-7 w-7 inset-0 -left-0.5 -top-1 rounded-full',
          isTarget ? 'bg-green-500/30' : 'hover:bg-gray-300/30'
        )}
      ></div>
    </div>
  )
}
