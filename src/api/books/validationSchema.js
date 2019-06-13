import * as Yup from 'yup'

const bookValidationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  author: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
})

export default bookValidationSchema
