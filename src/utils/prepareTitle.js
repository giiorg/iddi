const prepareTitle = title => {
  if (title === '') {
    return ''
  }

  let preparedTitle = ''
  let isPreviousWhitespace = false

  for (let i = 0; i < title.length; i++) {
    const charCode = title.charCodeAt(i)

    if (charCode === 32) {
      isPreviousWhitespace = true

      continue
    }

    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
      const isStartOfWord = isPreviousWhitespace || preparedTitle.length === 0

      if (isStartOfWord && isPreviousWhitespace) {
        preparedTitle += ' '
      }

      if (charCode > 64 && charCode < 91) {
        preparedTitle += isStartOfWord
          ? title[i]
          : String.fromCharCode(charCode + 32)
      }

      if (charCode > 96 && charCode < 123) {
        preparedTitle += isStartOfWord
          ? String.fromCharCode(charCode - 32)
          : title[i]
      }

      isPreviousWhitespace = false
    }
  }

  return preparedTitle
}

export default prepareTitle
