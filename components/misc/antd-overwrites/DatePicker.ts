// https://github.com/vercel/next.js/blob/HEAD/examples/with-ant-design/components/DatePicker.js
// https://ant.design/docs/react/replace-moment

import { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker from 'antd/lib/date-picker/generatePicker'
import 'antd/lib/date-picker/style/index'

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)

export default DatePicker