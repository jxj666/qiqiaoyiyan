/*
 * @LastEditTime: 2021-02-24 11:35:40
 * @LastEditors: jinxiaojian
 */

// 总结 promise.all 的特点
// 1. 接收一个 Promise 实例的数组或具有 Iterator 接口的对象，

// 2. 如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象

// 3. 如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调

// 4. 只要有一个失败，状态就变为 rejected，返回值将直接传递给回调

// 5. all() 的返回值也是新的 Promise 对象

let p1 = Promise.resolve(1),
  p2 = Promise.resolve(2),
  p3 = Promise.resolve(3);
Promise.all([p1, p2, p3]).then(function (results) {
  console.log(results);  // [1, 2, 3]
});

function promiseAll (promises) {
  return new Promise(function (resolve, reject) {
    if (!isArray(promises)) {
      return reject(new TypeError('arguments must be an array'));
    }
    let resolvedCounter = 0;
    let promiseNum = promises.length;
    let resolvedValues = new Array(promiseNum);
    for (let i = 0; i < promiseNum; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(function (value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        }, function (reason) {
          return reject(reason)
        })
      })(i)
    }
  })
}