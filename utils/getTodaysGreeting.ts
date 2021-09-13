import dayjs from "dayjs"

export const getTodaysGreeting = () =>  Math.ceil(dayjs().date() / 2)