export default function TestProxy() {
  let argvs = process.argv;
  console.log(argvs);
  let result = {};
  let REG = /^--[a-zA-Z0-9]+=[a-zA-Z0-9]+$/;
  argvs.map(function(item) {
    if (!REG.test(item)) return;

    let arr = item.split('=');
    let key = arr[0].slice(2);

    result[key] = arr[1];
  });
  if (result.env == 'test') {
    // Array mode
    const proxy = [];
    this.options.proxy.forEach((p) => {
      if (Array.isArray(p)) {
        if (p[1] && p[1].test_target) {
          p[1].target = p[1].test_target
          proxy.push([p[0], p[1]])
        } else {
          proxy.push(p)
        }
      }
    })
    this.options.proxy = proxy;
    console.log(this.options.proxy)
  }
}
module.exports = TestProxy;
