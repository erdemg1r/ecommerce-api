import bcrypt from "bcrypt"

const hash = await bcrypt.hash("bubenimilksifreoluşturmam",12)

console.log(hash)

const ok = await bcrypt.compare("bubenimilksifreoluşturmam",hash)
console.log(ok)

const no = await bcrypt.compare("bubenimilksifreoluştur",hash)
console.log(no)