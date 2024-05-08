const uppercase = Array(90 - 64).fill(1).map((x, i) => String.fromCharCode(i+65))
const lowercase = Array(122 - 96).fill(1).map((x, i) => String.fromCharCode(i+97))
const numbers = ["0","1","2","3","4","5","6","7","8","9"]
const specials = ["/", "+"]
const base64Char = [...uppercase, ...lowercase, ...numbers, ...specials]
const rndNbr = (from: number, to: number) => Math.floor(Math.random() * (to - from) + from)
const rndBase64Char = () => base64Char[rndNbr(0,base64Char.length)]
export function generateSecretKey (size: number) {
    return Array(size).fill(1).map(() => rndBase64Char()).reduce((acc, elem) => acc + elem,"")
}