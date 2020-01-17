import crypto from 'crypto'
export default function setrsaPassword(info){
  const md5 = crypto.createHash('md5')
  md5.update(info.toString())
  let password = md5.digest('hex')
  return password;
}