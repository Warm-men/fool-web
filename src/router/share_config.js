const urlTimestamp = url => {
  const getTimestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000)
  return url.indexOf('?') > -1
    ? `${url}&timestamp=${getTimestamp}${randomNum}`
    : `${url}?timestamp=${getTimestamp}${randomNum}`
}

export const shareConfig = {
  title: '',
  link: urlTimestamp(''),
  imgUrl: '',
  desc: ''
}
