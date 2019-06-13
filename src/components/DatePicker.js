import React, { useState } from 'react'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

const CustomDatePicker = ({ field, form: { setFieldValue } }) => {
  const [selectedDate, handleDateChange] = useState(field.value)

  return (
    <MuiPickersUtilsProvider utils={DayjsUtils}>
      <DatePicker
        name="date"
        required
        value={selectedDate}
        onChange={handleDateChange}
        onBlur={field.onBlur}
        format="DD/MM/YYYY"
        label="Date"
        onAccept={date => {
          setFieldValue('date', date ? date.toDate() : null)
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default CustomDatePicker
