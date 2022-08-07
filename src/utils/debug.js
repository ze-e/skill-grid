export function debug ({ ...args }) {
  let str = ''
  Object.keys(args).forEach(a => {
    str += '====' + a + '====' + JSON.stringify(args[a], null, 2)
  })
  console.log(str)
}
