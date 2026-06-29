# JavaScript 高频面试题

> [!NOTE]
>
> **必考（几乎必问）**  
>
> 1. **数据类型**（原始类型 vs 引用类型）  
> 2. **变量声明**（`var`、`let`、`const` 区别）  
> 3. **作用域 & 闭包**  
> 4. **`this` 指向 & 绑定方式**  
> 5. **原型 & 原型链**  
> 6. **事件循环（Event Loop）**  
> 7. **Promise & 异步编程**  
> 8. **ES6+ 核心语法**（箭头函数、解构、模板字符串等）  
>
> **高频（大概率会问）**  
>
> 1. **防抖 & 节流**  
> 2. **深拷贝 & 浅拷贝**  
> 3. **继承方式**（原型链、组合继承、ES6 `class`）  
> 4. **`call`/`apply`/`bind` 实现**  
> 5. **`==` vs `===` 区别**  
> 6. **数组常用方法**（`map`、`filter`、`reduce` 等）  
> 7. **模块化**（CommonJS vs ES Module）  
> 8. **垃圾回收机制**（标记清除、引用计数）  
>
> **加分（高阶/原理性题目）**  
>
> 1. **手写 Promise**  
> 2. **手写 `new` 操作符**  
> 3. **发布-订阅模式（EventEmitter）**  
> 4. **函数柯里化**  
> 5. **V8 引擎优化（如隐藏类、内联缓存）**  
> 6. **Web Worker & 多线程**  
> 7. **TypeScript 核心概念**（类型、泛型、装饰器）  
> 8. **性能优化**（内存泄漏、懒加载、虚拟列表）  
>



## 基础概念

### **解释 JavaScript 中的数据类型**

- 基本类型：Number, String, Boolean, Null, Undefined, Symbol, BigInt
- 引用类型：Object (包括 Array, Function, Date 等)

  

### **let、const 和 var 的区别**

- 作用域：var 是函数作用域，let/const 是块级作用域
- 变量提升：var 会提升，let/const 不会
- 重复声明：var 允许，let/const 不允许
- const 声明必须初始化且不能重新赋值

  

### **== 和 === 的区别**

- == 会进行类型转换后比较
- === 严格比较，类型和值都必须相同

  

## 函数与作用域

### 什么是闭包？举例说明

**闭包**（Closure）是指一个函数能够访问并记住其**词法作用域**（lexical scope），即使该函数在其作用域外执行。  



**核心概念**  

1. **函数嵌套**：闭包通常发生在函数内部返回另一个函数时。  

2. **变量持久化**：内部函数可以访问外部函数的变量，即使外部函数已经执行完毕。  

3. **私有变量**：闭包可以模拟私有变量，避免全局污染。

     

**示例代码**  

```javascript
function outer() {
  let count = 0; // 外部函数的变量
  
  return function inner() { // 内部函数（闭包）
    count++; // 访问并修改外部变量
    return count;
  };
}

const counter = outer(); // 返回 inner 函数
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

- `count` 变量不会被销毁，因为 `inner` 函数仍然持有对它的引用。  

  

**闭包的应用场景**  

1. **数据封装（私有变量）**  

   ```javascript
   function createCounter() {
     let count = 0;
     return {
       increment() { count++; },
       getCount() { return count; }
     };
   }
   const counter = createCounter();
   counter.increment();
   console.log(counter.getCount()); // 1
   ```

2. **防抖（debounce）和节流（throttle）**  

3. **模块化（早期 JS 没有 `class` 时用闭包模拟）**  

   

**闭包的缺点**  

- **内存泄漏**：如果闭包长期持有变量，可能导致内存无法释放。***需要及时解除引用（如 `null` 赋值）***

- **性能影响**：比普通函数占用更多内存，频繁使用可能影响性能。  

  

### **this 关键字的指向问题**

- 普通函数：调用时决定，默认指向 window (严格模式 undefined)
- 对象方法：指向调用它的对象
- 构造函数：指向新创建的实例
- call/apply/bind：显式绑定
- 箭头函数：继承外层函数的 this

  

### **箭头函数与普通函数的区别**

- 语法更简洁
- **没有自己的 this、arguments、super 或 new.target**
- 不能用作构造函数
- 没有 prototype 属性
- **call()、apply()、bind()等方法不能改变箭头函数中this的指向**

  

## 异步编程

### **Promise 的原理和使用** ★

- 三种状态：pending, fulfilled, rejected
- 方法：then(), catch(), finally()
- 静态方法：Promise.resolve(), Promise.reject(), Promise.all(), Promise.allSettled(), Promise.race(), Promise.any()

  


  **1. Promise 是什么？**

  Promise 是 JavaScript 中处理异步操作的解决方案，比传统的回调函数更优雅，解决了异步处理嵌套导致的"回调地狱"问题。它代表一个**异步操作的最终完成（或失败）及其结果值**。

  

  **2. Promise 的三种状态**

  - **`pending`（进行中）**：初始状态，既不是成功，也不是失败。
  - **`fulfilled`（已成功）**：操作成功完成，返回结果值（`resolve` 触发）。
  - **`rejected`（已失败）**：操作失败，返回错误原因（`reject` 触发）。

  **状态一旦改变，就不可逆：**
  - `pending` → `fulfilled`
  - `pending` → `rejected`

    

  **3. 基本用法**

  ```javascript
  const promise = new Promise((resolve, reject) => {
    // 异步操作（如 AJAX、setTimeout）
    if (/* 成功 */) {
      resolve("成功结果"); // 状态变为 fulfilled
    } else {
      reject("失败原因");  // 状态变为 rejected
    }
  });
  
  promise
    .then((result) => console.log(result)) // 成功回调
    .catch((error) => console.error(error)) // 失败回调
    .finally(() => console.log("无论成功失败都会执行"));
  ```

  

  **4. Promise 链式调用**

  Promise 的 `then` 可以链式调用，避免回调嵌套：
  ```javascript
  fetchData()
    .then((data) => processData(data))
    .then((result) => saveData(result))
    .catch((error) => console.error(error));
  ```

  

  **5. 静态方法**

| 方法                           | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| `Promise.resolve(value)`       | 返回一个已成功的 Promise                                     |
| `Promise.reject(error)`        | 返回一个已失败的 Promise                                     |
| `Promise.all([p1, p2])`        | 所有 Promise 成功才返回结果数组，有一个失败就立即返回错误    |
| `Promise.allSettled([p1, p2])` | 所有 Promise 完成（无论成功/失败）才返回结果数组             |
| `Promise.race([p1, p2])`       | 哪个 Promise 先**完成**就返回它的结果（无论成功/失败）       |
| `Promise.any([p1, p2])`        | 哪个 Promise 先**成功**就返回它的结果，所有都失败时返回一个包含拒绝原因数组的AggregateError |

  **示例：`Promise.all`**

  ```javascript
  Promise.all([
    fetch("/api/user"),
    fetch("/api/posts")
  ])
    .then(([user, posts]) => console.log(user, posts))
    .catch((error) => console.error("至少一个请求失败"));
  ```

  

  **6. 错误处理**

  - **`catch`**：捕获 `reject` 或 `then` 中的错误。
  - **`try/catch` + `async/await`**（更现代的方式）：
  ```javascript
  async function loadData() {
    try {
      const data = await fetchData();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  ```

  

  **7. 手写简易 Promise（面试常考）**

  [跳转到Promse实现](#Promise简易版)




  **8. 总结**

  ✅ **优点**：
  - 解决回调地狱，代码更清晰。
  - 支持链式调用，易于维护。
  - 错误处理更直观（`catch` / `try-catch`）。

  ❌ **缺点**：
  - 无法取消 Promise（除非手动封装）。
  - 如果不加 `catch`，错误可能被静默吞掉。

  

### **async/await 的工作原理** ★

- async 函数返回 Promise
- await 暂停执行直到 Promise 解决
- 错误处理使用 try/catch



**1. 基本概念**

`async/await` 是 ES2017 引入的异步编程语法糖，它基于 **Promise** 和 **Generator** 实现，**让异步代码看起来像同步代码**，更易读和维护。

**(1) `async` 函数**

- 声明一个异步函数，**总是返回 Promise**：
  ```javascript
  async function foo() {
    return 1; // 等价于 Promise.resolve(1)
  }
  foo().then(console.log); // 1
  ```
- 如果抛出错误，返回 `Promise.reject(error)`：
  ```javascript
  async function bar() {
    throw new Error("Oops!");
  }
  bar().catch(console.error); // Error: Oops!
  ```

**(2) `await` 表达式**

- **只能在 `async` 函数内部使用**。
- **暂停 `async` 函数的执行**，等待 Promise 完成：
  ```javascript
  async function fetchData() {
    const data = await fetch("/api/data"); // 等待 fetch 完成
    return data.json();
  }
  ```
- 如果 `await` 的不是 Promise，会被转成 `Promise.resolve(value)`：
  ```javascript
  async function test() {
    const num = await 42; // 相当于 await Promise.resolve(42)
    console.log(num); // 42
  }
  ```



**2. 底层原理（基于 Generator + Promise）**

`async/await` 本质上是 **Generator + 自动执行器** 的语法糖：

```javascript
// 模拟 async/await 的实现
function spawn(generatorFunc) {
  return new Promise((resolve, reject) => {
    const gen = generatorFunc();
    
    function step(nextFn) {
      let next;
      try {
        next = nextFn();
      } catch (err) {
        return reject(err);
      }
      
      if (next.done) {
        return resolve(next.value);
      }
      
      Promise.resolve(next.value).then(
        (v) => step(() => gen.next(v)), // 继续执行 Generator
        (e) => step(() => gen.throw(e))  // 抛出错误
      );
    }
    
    step(() => gen.next()); // 启动 Generator
  });
}

// 使用示例（相当于 async/await）
function* mockAsync() {
  const data = yield fetch("/api/data");
  const json = yield data.json();
  return json;
}

spawn(mockAsync).then(console.log);
```

**关键点**

1. **`async` 函数会被编译成 Generator 函数**。
2. **`await` 相当于 `yield`，暂停执行**。
3. **自动执行器（如 `spawn`）处理 Promise 并恢复 Generator**：
   - 如果 Promise 成功，调用 `gen.next(value)` 继续执行。
   - 如果 Promise 失败，调用 `gen.throw(error)` 抛出错误。



**3. 执行流程（Event Loop 角度）**

```javascript
async function example() {
  console.log(1);
  await Promise.resolve(2).then(console.log);
  console.log(3);
}

console.log(4);
example();
console.log(5);

// 输出顺序：4 → 1 → 5 → 2 → 3
```
**执行步骤**

1. `console.log(4)` 同步执行 → **4**
2. 调用 `example()`：
   - `console.log(1)` 同步执行 → **1**
   - `await Promise.resolve(2)` 暂停 `example`，将 `then(console.log)` 放入微任务队列
3. `console.log(5)` 同步执行 → **5**
4. **同步代码执行完毕，开始执行微任务**：
   - 执行 `then(console.log)` → **2**
   - 恢复 `example`，执行 `console.log(3)` → **3**




**4. 错误处理**

**(1) `try/catch` 捕获错误**

```javascript
async function fetchData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("请求失败:", err);
  }
}
```

**(2) 在调用处 `.catch()`**

```javascript
fetchData().catch(err => console.error("外部捕获:", err));
```




**5. 对比 Promise 的优势**

| **场景**          | **Promise**               | **async/await**               |
|------------------|--------------------------|------------------------------|
| **代码可读性**    | 链式调用，可能嵌套       | 类似同步代码，更直观          |
| **错误处理**      | `.catch()` 链式处理      | `try/catch` 结构化处理        |
| **调试**          | 断点难跟踪 `.then` 链    | 可直接按顺序调试              |
| **流程控制**      | 手动管理 Promise 链      | 自动暂停/恢复，更简洁         |



**6. 注意事项**

1. **`await` 会阻塞当前 `async` 函数**，但不会阻塞主线程（非同步阻塞）。
2. **避免滥用 `await`**，多个无依赖的异步操作可并行：
   ```javascript
   // ❌ 顺序执行（慢）
   const a = await fetchA();
   const b = await fetchB();
   
   // ✅ 并行执行（快）
   const [a, b] = await Promise.all([fetchA(), fetchB()]);
   ```
3. **`await` 只能在 `async` 函数中使用**，顶层可用 IIFE 或 ES2022 的 **Top-Level Await**：
   
   ```javascript
   (async () => {
     const data = await fetchData();
     console.log(data);
   })();
   ```



**总结**

- `async/await` 是 **Generator + Promise 的语法糖**，让异步代码更易读。
- **`async` 函数返回 Promise**，`await` 暂停执行直到 Promise 完成。
- **底层通过自动执行器管理 Generator 的暂停/恢复**。
- **错误处理推荐 `try/catch`**，比 `.catch()` 更直观。
- **合理使用并行 `Promise.all`** 提升性能。
  
  
  

### **事件循环 (Event Loop) 机制** ★

- 调用栈、任务队列、微任务队列
- 执行顺序：同步代码 > 微任务(Promise) > 宏任务(setTimeout)



**1. 核心概念**

事件循环是 JavaScript 实现异步的核心机制，它决定了代码的执行顺序，让单线程的 JS 能够高效处理异步任务。

**(1) 为什么需要事件循环？**

- JavaScript 是单线程的，同一时间只能做一件事。
- 但浏览器/Node.js 有大量异步任务（网络请求、定时器、文件读写等）。
- **事件循环让 JS 在等待异步任务时不被阻塞**，通过回调机制处理任务。

**(2) 基本组成**

| **组成部分**                     | **作用**                                                     |
| -------------------------------- | ------------------------------------------------------------ |
| **调用栈 (Call Stack)**          | 执行同步代码的地方，遵循 LIFO（后进先出，指同步代码存在嵌套时） |
| **任务队列 (Task Queue)**        | 存放异步任务的回调（宏任务），如 `setTimeout`、`DOM 事件`、`I/O` 操作 |
| **微任务队列 (Microtask Queue)** | 存放更高优先级的回调（微任务），如 `Promise.then`、`MutationObserver` |
| **Web APIs**                     | 浏览器提供的异步 API（如 `setTimeout`、`fetch`），任务完成后回调入队列 |



**2. 执行流程**

**事件循环**是一个单线程循环，用于**监视调用堆栈**并检查是否有工作即将在任务队列中完成。如果**调用堆栈为空**并且**任务队列中有回调函数**，则将回调函数出队并推送到调用堆栈中执行。

**事件循环的步骤**

1. **执行同步代码**（调用栈）：
   - 遇到同步代码立即执行。
   - 遇到异步任务交给 Web APIs 处理，继续执行后续代码。
   
2. **调用栈清空后**：
   - 先检查**微任务队列**，依次执行所有微任务（直到队列为空）。
   - 然后从**宏任务队列**取出**第一个任务**执行。

3. **重复循环**：
   - 每次执行一个宏任务后，再次检查微任务队列并清空。

**可视化流程**

```
同步代码 → 微任务 → 渲染（如有需要）→ 宏任务 → 微任务 → ...
```



**3. 代码示例分析**

```javascript
console.log("1"); // 同步

setTimeout(() => console.log("2"), 0); // 宏任务

Promise.resolve().then(() => console.log("3")); // 微任务

console.log("4"); // 同步
```
**输出顺序：1 → 4 → 3 → 2**

**执行步骤解析**

1. **同步代码**：
   - `console.log("1")` → 输出 `1`
   - `setTimeout` 回调交给 Web APIs，计时结束后回调进入**宏任务队列**。
   - `Promise.then` 回调进入**微任务队列**。
   - `console.log("4")` → 输出 `4`

2. **调用栈清空后**：
   - 先执行**微任务队列**：`console.log("3")` → 输出 `3`
   - 再执行**宏任务队列**：`console.log("2")` → 输出 `2`



**4. 任务分类**

**(1) 宏任务 (Macrotasks)**

| 任务类型                   | 示例                        |
| -------------------------- | --------------------------- |
| `setTimeout`/`setInterval` | `setTimeout(() => {}, 0)`   |
| DOM 事件回调               | `button.addEventListener()` |
| I/O 操作                   | 文件读写（Node.js）         |
| `requestAnimationFrame`    | 动画回调（浏览器）          |

**(2) 微任务 (Microtasks)**

| 任务类型                         | 示例                          |
| -------------------------------- | ----------------------------- |
| `Promise.then`/`catch`/`finally` | `Promise.resolve().then(...)` |
| `MutationObserver`               | 监听 DOM 变化                 |
| `queueMicrotask`                 | `queueMicrotask(() => {})`    |



**5. 关键规则**

1. **微任务优先级高于宏任务**：
   
   - 每次调用栈清空后，先执行所有微任务，再执行一个宏任务。
   ```javascript
   setTimeout(() => console.log("宏任务"), 0);
   Promise.resolve().then(() => console.log("微任务"));
   // 输出顺序：微任务 → 宏任务
   ```
   
2. **微任务会阻塞渲染**：
   
   - 浏览器渲染（UI 更新）发生在宏任务之间，如果微任务过多，会导致页面卡顿。
   ```javascript
   // 大量微任务示例（可能卡死页面）
   function loop() {
     Promise.resolve().then(loop);
   }
   loop();
   ```
   
3. **同类型任务的执行顺序**：
   - 宏任务按入队顺序执行（如多个 `setTimeout`），（不一定按顺序吧？）。
   - 微任务按入队顺序执行（如多个 `Promise.then`）。



**6. 复杂场景分析**

**示例 1：嵌套任务**

```javascript
setTimeout(() => console.log("timeout1"), 0);

Promise.resolve()
  .then(() => {
    console.log("promise1");
    setTimeout(() => console.log("timeout2"), 0);
  })
  .then(() => console.log("promise2"));

// 输出顺序：promise1 → promise2 → timeout1 → timeout2
```
**解析**：

1. 外层 `setTimeout` 回调进入宏任务队列。
2. `Promise.then` 先执行 `promise1`，内层 `setTimeout` 回调进入宏任务队列。
3. 第二个 `then` 输出 `promise2`。
4. 最后按顺序执行宏任务 `timeout1` 和 `timeout2`。

**示例 2：`async/await` 与微任务**

```javascript
async function foo() {
  console.log("2");
  await Promise.resolve(); // 相当于 .then(() => {})
  console.log("4");
}

console.log("1");
foo();
console.log("3");

// 输出顺序：1 → 2 → 3 → 4
```
**解析**：

1. `console.log("1")` 同步执行。
2. `foo()` 执行 `console.log("2")`，`await` 后的代码相当于 `Promise.then` 回调（微任务）。
3. `console.log("3")` 同步执行。
4. 最后执行微任务 `console.log("4")`。



**7. Node.js 与浏览器的差异**

| **特性**           | **浏览器**                 | **Node.js**                       |
| ------------------ | -------------------------- | --------------------------------- |
| **微任务执行时机** | 每个宏任务后清空微任务队列 | 分阶段（如 `nextTick` 优先）      |
| `process.nextTick` | 不支持                     | 优先级高于微任务                  |
| `setImmediate`     | 不支持                     | 特殊的宏任务（在 I/O 回调后执行） |



**8. 总结**

- **事件循环流程**：同步代码 → 微任务 → 渲染 → 宏任务 → 循环。
- **微任务**：`Promise.then`、`MutationObserver`，优先级高。
- **宏任务**：`setTimeout`、`DOM 事件`、`I/O`，优先级低。
- **避免阻塞**：不要在一个微任务中执行耗时操作，否则会延迟渲染。

  


## 面向对象

### **原型与原型链**

- 每个对象都有 __proto__ 属性指向其原型
- 函数有 prototype 属性
- 访问属性时沿着原型链查找



### new操作符的实现原理

`new` 操作符用于创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。以下是它的内部工作原理和手动实现：

**1. `new` 操作符的核心步骤**

当执行 `new Constructor()` 时，JavaScript 引擎会依次执行以下操作：

1. **创建一个新对象**  
   - 创建一个空的普通 JavaScript 对象（即 `{}`）

2. **绑定原型链**  
   - 将该对象的 `__proto__` 指向构造函数的 `prototype` 属性  
   - `obj.__proto__ = Constructor.prototype`

3. **绑定 `this` 并执行构造函数**  
   - 将构造函数内部的 `this` 指向这个新对象  
   - 执行构造函数内部的代码（初始化属性/方法）

4. **处理返回值**  
   - 如果构造函数返回一个**对象**，则返回该对象  
   - 否则返回步骤 1 创建的新对象



**2. 手动实现 `new`**

```javascript
function myNew(Constructor, ...args) {
  // 1. 创建新对象并绑定原型
  const obj = Object.create(Constructor.prototype);

  // 2. 执行构造函数（绑定 this）
  const result = Constructor.apply(obj, args);

  // 3. 处理返回值
  return result instanceof Object ? result : obj;
}
```

**使用示例**

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 原生 new
const p1 = new Person('Alice', 25);
console.log(p1.name); // 'Alice'

// 手动实现
const p2 = myNew(Person, 'Bob', 30);
console.log(p2.age); // 30
```



**3. 关键细节解析**

**(1) 原型链绑定**

```javascript
// 等效于：
const obj = {};
obj.__proto__ = Constructor.prototype;

// 更标准的写法：
const obj = Object.create(Constructor.prototype);
```

**(2) 构造函数返回值处理**

- **返回对象**：覆盖默认的新对象  
  ```javascript
  function Car() {
    this.name = 'BMW';
    return { name: 'Tesla' }; // 返回对象会替换 this
  }
  console.log(new Car().name); // 'Tesla'
  ```
- **返回非对象**：忽略返回值  
  ```javascript
  function Bike() {
    this.name = 'Yamaha';
    return 123; // 基本类型被忽略
  }
  console.log(new Bike().name); // 'Yamaha'
  ```

**(3) 箭头函数不能作为构造函数**

```javascript
const Foo = () => {};
const bar = new Foo(); // TypeError: Foo is not a constructor
```
**原因**：箭头函数没有 `prototype` 属性和 `this` 绑定。



**4. 完整流程图**

```
new Constructor()
  │
  ├─ 1. 创建 obj = {}
  │     │
  │     └─ 绑定 obj.__proto__ = Constructor.prototype
  │
  ├─ 2. 执行 Constructor.call(obj, ...args)
  │     │
  │     ├─ 若构造函数返回对象 → 返回该对象
  │     │
  │     └─ 否则 → 返回 obj
  │
  └─ 3. 返回结果
```



**5. 面试常见问题**

**Q1: `new` 操作符做了什么？**

- 创建空对象 → 绑定原型 → 执行构造函数 → 处理返回值。

**Q2: 如何判断函数是否通过 `new` 调用？**

- **ES5**: `this instanceof Constructor`  
  
  ```javascript
  function Foo() {
    if (!(this instanceof Foo)) {
      throw new Error('必须用 new 调用');
    }
  }
  ```
- **ES6**: `new.target`  
  ```javascript
  function Bar() {
    if (!new.target) {
      throw new Error('必须用 new 调用');
    }
  }
  ```

**Q3: 手动实现 `new` 时为什么用 `Object.create`？**

- 比直接赋值 `__proto__` 更标准，且避免 `__proto__` 可能被禁用的情况。



### **实现继承的几种方式** ★

- 原型链继承
- 构造函数继承
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承
- ES6 class extends



> [!NOTE]
>
> 总结：
>
> - 原型链+构造函数+两者组合
> - 原型式+寄生式（类似于Object.create(), 不需要创建自定义类型）
> - 寄生组合式（最优解）
> - ES6 Class(底层依然是寄生组合式)



在 JavaScript 中，继承可以通过多种方式实现，每种方式各有优缺点。以下是常见的 6 种继承方式：

**1. 原型链继承**

**核心**：子类的原型指向父类的实例  
**优点**：简单  
**缺点**：引用类型属性共享，无法向父类传参。 （在父类的构造函数中定义的引用类型的实例属性，会变成子类的原型属性，被所有子类型实例所共享）

```javascript
function Parent() {
  this.name = 'Parent';
  this.arr = [1, 2, 3];
}
Parent.prototype.say = function() {
  console.log(this.name);
};

function Child() {}
Child.prototype = new Parent(); // 原型链继承

const child = new Child();
child.say(); // "Parent"
```

**问题**

```javascript
// 此时Child.prototype.arr = [1, 2, 3];
const child1 = new Child();
const child2 = new Child();
child1.arr.push(4);
console.log(child2.arr); // [1, 2, 3, 4]（引用共享）
```



**2. 构造函数继承（经典继承）**

**核心**：在子类构造函数中调用父类构造函数  
**优点**：避免引用共享，可传参  
**缺点**：无法继承父类原型上的方法  

```javascript
function Parent(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}

function Child(name) {
  Parent.call(this, name); // 构造函数继承
}

const child1 = new Child("Child1");
const child2 = new Child("Child2");
child1.arr.push(4);
console.log(child2.arr); // [1, 2, 3]（引用不共享）
```

**问题**

```javascript
Parent.prototype.say = function() { console.log(this.name); };
child1.say(); // Error: child1.say is not a function（无法继承原型方法）
```



**3. 组合继承（最常用）**

**核心**：原型链 + 构造函数  
**优点**：既能继承属性，又能继承原型方法  
**缺点**：父类构造函数被调用两次  

```javascript
function Parent(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}
Parent.prototype.say = function() {
  console.log(this.name);
};

function Child(name) {
  Parent.call(this, name); // 第 1 次调用 Parent
}
Child.prototype = new Parent(); // 第 2 次调用 Parent（原型链继承）
Child.prototype.constructor = Child; // 修正 constructor

const child = new Child("Child");
child.say(); // "Child"（可继承原型方法）
child.arr.push(4);
console.log(child.arr); // [1, 2, 3, 4]（引用不共享）
```



**4. 原型式继承（类似 `Object.create`）**

**核心**：基于已有对象创建新对象
**优点**：简单 （这种继承方式不会创建自定义类型，并且所有对象都是Object的实例）
**缺点**：引用类型属性共享  

```javascript
// 相当于使用 Object.create()
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

const parent = { name: "Parent", arr: [1, 2, 3] };
const child1 = createObj(parent);
const child2 = createObj(parent);
child1.arr.push(4);
console.log(child2.arr); // [1, 2, 3, 4]（引用共享）
```



**5. 寄生式继承**

**核心**：在原型式继承基础上增强对象
**优点**：可添加额外方法 
**缺点**：引用类型属性共享  

```javascript
function createEnhancedObj(o) {
  const clone = Object.create(o);
  clone.say = function() {
    console.log(this.name);
  };
  return clone;
}

const parent = { name: "Parent" };
const child = createEnhancedObj(parent);
child.say(); // "Parent"
```



**6. 寄生组合式继承（最优解）**

**核心**：组合继承 + `Object.create` 优化  
**优点**：只调用一次父类构造函数，避免引用共享  
**缺点**：实现稍复杂  

```javascript
function inheritPrototype(Child, Parent) {
  const prototype = Object.create(Parent.prototype); // 创建父类原型的副本
  prototype.constructor = Child; // 修正 constructor
  Child.prototype = prototype; // 赋值给子类原型
}

function Parent(name) {
  this.name = name;
  this.arr = [1, 2, 3];
}
Parent.prototype.say = function() {
  console.log(this.name);
};

function Child(name) {
  Parent.call(this, name); // 只调用一次 Parent
}
inheritPrototype(Child, Parent); // 寄生组合继承

const child = new Child("Child");
child.say(); // "Child"
child.arr.push(4);
console.log(child.arr); // [1, 2, 3, 4]（引用不共享）
```



**7. ES6 `class` 继承（语法糖）**

**核心**：`extends` + `super`  
**优点**：语法简洁，最推荐  
**缺点**：底层仍是寄生组合继承  

```javascript
class Parent {
  constructor(name) {
    this.name = name;
    this.arr = [1, 2, 3];
  }
  say() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor(name) {
    super(name); // 调用父类构造函数
  }
}

const child = new Child("Child");
child.say(); // "Child"
```



**总结对比**

| **继承方式**     | **优点**                       | **缺点**             | **适用场景**         |
| ---------------- | ------------------------------ | -------------------- | -------------------- |
| 原型链继承       | 简单                           | 引用共享，无法传参   | 不推荐               |
| 构造函数继承     | 可传参，避免引用共享           | 无法继承原型方法     | 需要隔离属性时       |
| 组合继承         | 可继承属性和方法               | 父类构造函数调用两次 | 传统项目常用         |
| 原型式继承       | 简单                           | 引用共享             | 类似 `Object.create` |
| 寄生式继承       | 可增强对象                     | 引用共享             | 扩展对象时           |
| **寄生组合继承** | 最优解，只调用一次父类构造函数 | 实现稍复杂           | 推荐使用             |
| **ES6 `class`**  | 语法简洁，底层最优             | 需支持 ES6           | 现代项目首选         |

**推荐**：
- 现代项目用 **ES6 `class`**（最简洁）。
- 兼容旧代码用 **寄生组合继承**（最优性能）。



### **ES6 class 与原型继承的关系**

- class 是语法糖，底层基于原型
- constructor 相当于构造函数
- static 定义静态方法

  

## ES6+ 新特性

### **解构赋值的应用**

```javascript
const { name, age } = person;
const [first, second] = arr;
```



解构赋值（Destructuring Assignment）是 ES6 引入的语法，可以**从数组或对象中提取值，并赋值给变量**，使代码更简洁清晰。以下是常见应用场景：

**1. 数组解构**

**(1) 基本用法**

```javascript
const arr = [1, 2, 3];

// 传统写法
const a = arr[0];
const b = arr[1];

// 解构赋值
const [x, y, z] = arr;
console.log(x, y, z); // 1 2 3
```

**(2) 跳过某些值**

```javascript
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3
```

**(3) 默认值**

```javascript
const [a = 10, b = 20] = [1];
console.log(a, b); // 1 20（b 使用默认值）
```

**(4) 剩余参数**

```javascript
const [first, ...rest] = [1, 2, 3, 4];
console.log(first, rest); // 1 [2, 3, 4]
```

**(5) 交换变量**

```javascript
let a = 1, b = 2;
[a, b] = [b, a]; // 交换 a 和 b
console.log(a, b); // 2 1
```



**2. 对象解构**

**(1) 基本用法**

```javascript
const user = { name: "Alice", age: 25 };

// 传统写法
const name = user.name;
const age = user.age;

// 解构赋值
const { name, age } = user;
console.log(name, age); // "Alice" 25
```

**(2) 重命名变量**

```javascript
const { name: userName, age: userAge } = user;
console.log(userName, userAge); // "Alice" 25
```

**(3) 默认值**

```javascript
const { name = "Anonymous", gender = "unknown" } = { name: "Bob" };
console.log(name, gender); // "Bob" "unknown"
```

**(4) 嵌套解构**

```javascript
const person = {
  name: "Charlie",
  address: {
    city: "Beijing",
    street: "Main St",
  },
};

const {
  name,
  address: { city },
} = person;
console.log(name, city); // "Charlie" "Beijing"
```

**(5) 函数参数解构**

```javascript
function greet({ name, age }) {
  console.log(`Hello, ${name}! You are ${age} years old.`);
}

greet({ name: "Dave", age: 30 }); // "Hello, Dave! You are 30 years old."
```



**3. 混合解构（数组 + 对象）**

```javascript
const data = [
  { id: 1, value: "A" },
  { id: 2, value: "B" },
];

const [, { value }] = data; // 跳过第一个元素，解构第二个对象的 value
console.log(value); // "B"
```



**4. 常见应用场景**

**(1) 函数返回多个值**

```javascript
function getUser() {
  return { name: "Eve", age: 28 };
}

const { name, age } = getUser();
console.log(name, age); // "Eve" 28
```

**(2) 提取 API 响应数据**

```javascript
const response = {
  status: 200,
  data: {
    users: [{ id: 1, name: "Frank" }],
  },
};

const {
  data: { users },
} = response;
console.log(users); // [{ id: 1, name: "Frank" }]
```

**(3) 导入模块的特定方法**

```javascript
// 传统写法
const fs = require("fs");
const readFile = fs.readFile;

// 解构赋值
const { readFile, writeFile } = require("fs");
```

**(4) React/Vue 的 Props 解构**

```jsx
// React 组件
function UserCard({ name, age }) {
  return <div>{name}, {age}</div>;
}

// Vue 3 的 setup
setup(props) {
  const { title, content } = props;
}
```



**5. 注意事项**

1. **对象解构的变量名必须匹配属性名**（除非重命名）。
2. **数组解构按顺序赋值**，可跳过不想要的元素。
3. **默认值仅在 `undefined` 时生效**（`null` 不会触发默认值）。
4. **解构 `undefined` 或 `null` 会报错**：
   
   ```javascript
   const { prop } = undefined; // TypeError
   const [item] = null; // TypeError
   ```
   解决方法：
   ```javascript
   const { prop } = undefined || {}; // 安全解构
   const [item] = null || []; // 安全解构
   ```



**总结**

| **场景**     | **示例**                                      |
| ------------ | --------------------------------------------- |
| 数组解构     | `const [a, b] = [1, 2];`                      |
| 对象解构     | `const { name, age } = user;`                 |
| 默认值       | `const { name = "Guest" } = {};`              |
| 函数参数解构 | `function log({ msg }) { console.log(msg); }` |
| 模块导入     | `const { useState } = React;`                 |



### **模板字符串的优势**

- 多行字符串
- 嵌入表达式
- 标签模板



模板字符串（Template Strings）是 ES6 引入的新语法，使用反引号 **`` ` ``** 定义，相比传统字符串有显著优势：

**1. 多行字符串（无需拼接）**

**传统方式**：需要用 `+` 或 `\n` 拼接多行字符串  
**模板字符串**：直接换行，保留格式  

```javascript
// 传统写法（繁琐）
const oldStr = '第一行\n' +
               '第二行\n' +
               '第三行';

// 模板字符串（简洁）
const newStr = `第一行
第二行
第三行`;
```

**输出效果**：
```
第一行
第二行
第三行
```



**2. 嵌入变量/表达式（`${}`插值）**

**传统方式**：需要用 `+` 拼接变量  
**模板字符串**：直接通过 `${}` 嵌入  

```javascript
const name = "Alice";
const age = 25;

// 传统写法
const oldMsg = "姓名：" + name + "，年龄：" + age;

// 模板字符串
const newMsg = `姓名：${name}，年龄：${age}`;
console.log(newMsg); // "姓名：Alice，年龄：25"
```

**支持任意表达式**：
```javascript
const a = 10;
const b = 20;
console.log(`合计：${a + b}`); // "合计：30"
```



**3. 标签模板（Tagged Templates）**

可以对模板字符串进行自定义处理：  
```javascript
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
  }, '');
}

const name = "Bob";
const age = 30;
const msg = highlight`姓名：${name}，年龄：${age}`;

console.log(msg); 
// "姓名：<mark>Bob</mark>，年龄：<mark>30</mark>"
```
**应用场景**：
- 国际化（i18n）
- HTML 转义（防止 XSS 攻击）
- 样式高亮（如 Markdown 解析）



**4. 与 HTML/DOM 结合更直观**

**传统方式**：拼接 HTML 易出错  
**模板字符串**：清晰嵌套  

```javascript
const user = { name: "Charlie", role: "Admin" };

// 传统写法（易错）
const oldHtml = '<div class="user">' +
                  '<span>' + user.name + '</span>' +
                  '<span>' + user.role + '</span>' +
                '</div>';

// 模板字符串（清晰）
const newHtml = `
  <div class="user">
    <span>${user.name}</span>
    <span>${user.role}</span>
  </div>
`;
```



**5. 支持嵌套使用**

```javascript
const items = ["Apple", "Banana", "Orange"];
const listHtml = `
  <ul>
    ${items.map(item => `<li>${item}</li>`).join('')}
  </ul>
`;
console.log(listHtml);
```
**输出**：
```html
<ul>
  <li>Apple</li>
  <li>Banana</li>
  <li>Orange</li>
</ul>
```



**6. 原始字符串（Raw Strings）**

通过 `String.raw` 忽略转义字符：
```javascript
const path = String.raw`C:\Users\Documents\file.txt`;
console.log(path); // "C:\Users\Documents\file.txt"（\ 不会被转义）
```



**总结：模板字符串 vs 传统字符串**

| **特性**         | **传统字符串**                     | **模板字符串**                     |
|------------------|----------------------------------|----------------------------------|
| 多行支持          | 需用 `+` 或 `\n` 拼接            | 直接换行                         |
| 变量嵌入          | `"Hello, " + name + "!"`        | `` `Hello, ${name}!` ``         |
| HTML 拼接         | 易错，代码冗长                   | 直观，保留格式                   |
| 标签处理          | 不支持                           | 支持自定义处理（如国际化、XSS 防护） |
| 原始字符串        | 需手动转义（`\\`）               | `String.raw` 直接保留原始格式    |




### **Symbol 类型的用途** ★

- 创建唯一值
- 作为对象属性键
- 内置 Symbol 值(Symbol.iterator 等)




Symbol 是 ES6 引入的**唯一、不可变、不可枚举**的**原始数据类型**，主要用途如下：

**1. 创建唯一属性键（避免命名冲突）**

Symbol 值唯一，适合作为对象属性名，防止属性被意外覆盖。

```javascript
const id = Symbol("id"); // "id" 是描述符（可选）
const user = {
  name: "Alice",
  [id]: 123, // Symbol 作为键
};

console.log(user[id]); // 123

// 以下方式无法访问 Symbol 键
console.log(Object.keys(user)); // ["name"]（Symbol 键不会被遍历）
```

**适用场景**：
- 为第三方库扩展对象属性时，避免与现有属性冲突。
- 定义对象的内部元数据（如 Vue/React 内部实现）。



**2. 模拟私有属性**

虽然 JavaScript 没有真正的私有属性，但 Symbol 可以间接实现类似效果：

```javascript
const _password = Symbol("password");

class User {
  constructor(name, password) {
    this.name = name;
    this[_password] = password; // "私有"属性
  }

  checkPassword(pwd) {
    return this[_password] === pwd;
  }
}

const user = new User("Bob", "123456");
console.log(user[_password]); // 仍可访问（非严格私有）
console.log(Object.keys(user)); // ["name"]（Symbol 键不可枚举）
```



**3. 内置 Symbol 值（Well-known Symbols）**

JavaScript 内置了一些 Symbol，用于控制语言内部行为：

| **内置 Symbol**      | **用途**                                           |
| -------------------- | -------------------------------------------------- |
| `Symbol.iterator`    | 定义对象的默认迭代器（使对象可被 `for...of` 遍历） |
| `Symbol.toStringTag` | 定制 `Object.prototype.toString()` 的输出          |
| `Symbol.hasInstance` | 自定义 `instanceof` 的行为                         |
| `Symbol.toPrimitive` | 控制对象转原始值（如 `+obj` 或 `String(obj)`）     |

**示例：实现可迭代对象**

```javascript
const myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const num of myIterable) {
  console.log(num); // 1, 2, 3
}
```



**4. 注册全局 Symbol（Symbol.for）**

通过 `Symbol.for(key)` **创建或获取**全局 Symbol，相同 `key` 返回同一个 Symbol：

```javascript
const globalSym1 = Symbol.for("app.unique");
const globalSym2 = Symbol.for("app.unique");

console.log(globalSym1 === globalSym2); // true

// 查询全局 Symbol 的 key
console.log(Symbol.keyFor(globalSym1)); // "app.unique"
```

**适用场景**：
- 跨模块共享 Symbol（如全局配置键）。



**5. 避免魔法字符串**

用 Symbol 代替字符串常量，提高代码可维护性：

```javascript
// 传统方式（魔法字符串）
const LOG_LEVEL = {
  DEBUG: "DEBUG",
  WARN: "WARN",
};

// Symbol 方式（唯一性保障）
const LOG_LEVEL = {
  DEBUG: Symbol("DEBUG"),
  WARN: Symbol("WARN"),
};

function log(message, level) {
  if (level === LOG_LEVEL.DEBUG) {
    console.debug(message);
  }
}
```



**6. 特性总结**

| **特性**     | **说明**                                                     |
| ------------ | ------------------------------------------------------------ |
| 唯一性       | `Symbol('a') !== Symbol('a')`（即使描述相同）                |
| 不可枚举     | 默认不出现在 `Object.keys()`、`for...in` 循环中              |
| 不可隐式转换 | 不能直接转数字（如 `+sym` 报错），但可显式转字符串（`String(sym)`） |
| 非真正私有   | 可通过 `Object.getOwnPropertySymbols()` 获取 Symbol 键       |



**常见面试问题**

**1. Symbol 是什么？**

- 唯一、不可变的原始数据类型，用于创建唯一的属性键。

**2. Symbol 的主要用途？**

- 避免属性名冲突、模拟私有属性、定义内置语言行为（如迭代器）。

**3. `Symbol('a') === Symbol('a')` 吗？**

- 不相等，每次调用 `Symbol()` 都会返回唯一值。

**4. 如何获取对象的所有 Symbol 键？**

- 使用 `Object.getOwnPropertySymbols(obj)`。



## 其他重要概念

### **防抖(debounce)与节流(throttle)** ★

- 防抖：连续触发只执行最后一次

- 节流：一段时间内只执行一次（降低执行频率）



防抖和节流是优化高频事件（如滚动、输入、点击）的两种常用技术，用于**控制函数执行频率**，避免性能问题。

**1. 防抖（Debounce）**

**核心思想**

- **延迟执行**：事件触发后，等待一段时间再执行函数。
- **如果在这段时间内事件再次触发，则重新计时**。
- **适用场景**：输入框搜索联想、窗口大小调整。

**代码实现**

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer); // 清除之前的定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用示例
const input = document.querySelector("input");
input.addEventListener("input", debounce(function() {
  console.log("搜索:", this.value);
}, 500));
```

**执行流程**

```
输入 "a" → 等待 500ms
输入 "ab"（300ms 时）→ 重新计时 500ms
输入 "abc"（200ms 时）→ 重新计时 500ms
最终：500ms 后执行一次搜索 "abc"
```



**2. 节流（Throttle）**

**核心思想**

- **固定频率执行**：无论事件触发多频繁，函数都会**每隔一段时间执行一次**。
- **适用场景**：滚动加载、按钮防重复点击。

**代码实现（定时器版）**

```javascript
function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

// 使用示例
window.addEventListener("scroll", throttle(function() {
  console.log("滚动事件");
}, 1000));
```

**执行流程**

```
滚动触发 → 立即执行一次 → 1s 内再次滚动不执行 → 1s 后再次允许执行
```

**时间戳版（立即执行）**

```javascript
function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
```



**3. 对比总结**

| **特性**     | **防抖（Debounce）**       | **节流（Throttle）**     |
| ------------ | -------------------------- | ------------------------ |
| **执行时机** | 事件停止触发后执行         | 固定间隔执行             |
| **重置计时** | 每次触发都会重置延迟       | 不会重置，按固定频率执行 |
| **适用场景** | 输入框搜索、窗口调整       | 滚动加载、按钮防重       |
| **用户感知** | 响应稍延迟（等待停止操作） | 响应更即时（但频率受限） |



**4. 常见问题**

**Q1: 如何选择防抖还是节流？**

- 需要**最后一次操作生效** → 防抖（如搜索联想）。
- 需要**定期执行** → 节流（如滚动加载）。

**Q2: Lodash 的 `_.debounce` 和 `_.throttle` 有什么区别？**

- Lodash 的实现更完善（如提供 `leading` 和 `trailing` 选项）。
- 例如：
  ```javascript
  // 首次立即执行，之后防抖
  _.debounce(fn, 500, { leading: true });
  
  // 禁止最后一次执行
  _.throttle(fn, 500, { trailing: false });
  ```

**Q3: 如何实现带立即执行选项的防抖？**

```javascript
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
```



**5. 实际应用场景**

**防抖案例**

- 搜索框输入联想（避免每次输入都请求 API）。
- 窗口 `resize` 事件（调整完成后计算布局）。

**节流案例**

- 无限滚动加载（每隔 500ms 检查一次滚动位置）。
- 按钮防重复提交（1 秒内只能提交一次）。



**总结**

- **防抖**：等待用户停止操作后执行（如搜索）。
- **节流**：控制函数执行频率（如滚动事件）。
- **面试要点**：能手写代码、理解差异、知道适用场景。



### **深拷贝与浅拷贝的区别与实现** ★

- 浅拷贝：Object.assign(), 展开运算符
- 深拷贝：JSON.parse(JSON.stringify()), 递归实现



**1. 基本概念**

**(1) 浅拷贝 (Shallow Copy)**

- **只拷贝对象的第一层属性**，如果属性是引用类型，拷贝的是内存地址（共享同一引用）。
- **修改嵌套对象会影响原对象**。

**(2) 深拷贝 (Deep Copy)**

- **递归拷贝对象的所有层级**，完全独立于原对象。
- **修改任何层级都不会影响原对象**。



**2. 实现方式对比**

**浅拷贝的实现方法**

| 方法 | 示例 | 说明 |
|------|------|------|
| **展开运算符 `...`** | `const copy = { ...obj }` | 适用于对象和数组 |
| **`Object.assign()`** | `const copy = Object.assign({}, obj)` | 只能拷贝对象 |
| **`Array.slice()`** | `const copy = arr.slice()` | 仅适用于数组 |
| **`Array.from()`** | `const copy = Array.from(arr)` | 仅适用于数组 |

**示例**：

```javascript
const obj = { a: 1, b: { c: 2 } };
const shallowCopy = { ...obj };

shallowCopy.b.c = 3; // 修改嵌套对象
console.log(obj.b.c); // 3（原对象也被修改）
```

---

**深拷贝的实现方法**

| 方法 | 示例 | 说明 |
|------|------|------|
| **`JSON.parse(JSON.stringify())`** | `const copy = JSON.parse(JSON.stringify(obj))` | 简单但会丢失函数、`undefined`、`Symbol` |
| **递归手动实现** | 见下方代码 | 最可靠，可处理所有类型 |
| **Lodash `_.cloneDeep`** | `const copy = _.cloneDeep(obj)` | 第三方库，推荐生产环境使用 |
| **`structuredClone()`（现代浏览器）** | `const copy = structuredClone(obj)` | 浏览器原生方法，支持循环引用 |

**(1) `JSON.parse(JSON.stringify())`**

```javascript
const obj = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(obj));

deepCopy.b.c = 3;
console.log(obj.b.c); // 2（原对象不受影响）
```
**缺点**：
- 不能拷贝 `函数`、`undefined`、`Symbol`、`RegExp`、`Date` 等特殊对象。
- 不能处理循环引用（如 `obj.self = obj` 会报错）。

**(2) 递归实现深拷贝**

```javascript
function deepClone(target, map = new WeakMap()) {
  // 基本类型直接返回
  if (typeof target !== "object" || target === null) {
    return target;
  }

  // 解决循环引用
  if (map.has(target)) {
    return map.get(target);
  }

  // 处理特殊对象
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);

  const clone = Array.isArray(target) ? [] : {};
  map.set(target, clone); // 缓存对象，防止循环引用

  // 递归拷贝所有属性
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = deepClone(target[key], map);
    }
  }

  return clone;
}

// 使用示例
const obj = { a: 1, b: { c: 2 }, d: new Date() };
const copy = deepClone(obj);
copy.b.c = 3;
console.log(obj.b.c); // 2（原对象不变）
```

**(3) `structuredClone()`（浏览器原生方法）**

```javascript
const obj = { a: 1, b: { c: 2 } };
const copy = structuredClone(obj); // 浏览器环境支持
copy.b.c = 3;
console.log(obj.b.c); // 2
```
**优点**：
- 支持循环引用、`Date`、`RegExp`、`Map`、`Set` 等。
- 性能比 `JSON.parse` 更好。



**3. 对比总结**

| **特性**       | **浅拷贝**                          | **深拷贝**                          |
|----------------|------------------------------------|------------------------------------|
| **拷贝层级**   | 仅第一层                           | 所有层级                           |
| **引用类型**   | 共享内存地址（修改会影响原对象）    | 完全独立（不影响原对象）           |
| **实现方式**   | `...`、`Object.assign()`、`slice`  | `JSON.parse`、递归、`structuredClone` |
| **性能**       | 快                                 | 慢（递归遍历所有属性）             |
| **适用场景**   | 简单对象，无嵌套引用               | 复杂对象，需完全独立拷贝           |



**4. 常见面试问题**

**Q1: 如何实现一个深拷贝？**

- **答**：递归遍历对象，处理基本类型、`Date`、`RegExp`、循环引用等特殊情况（参考上方代码）。

**Q2: `JSON.parse(JSON.stringify())` 的缺点？**

- **答**：不能拷贝函数、`undefined`、`Symbol`、循环引用，且会丢失 `Date` 和 `RegExp` 的类型。

**Q3: 如何判断是深拷贝还是浅拷贝？**

- **答**：修改拷贝后的对象的嵌套属性，如果原对象也被修改，则是浅拷贝；否则是深拷贝。

**Q4: `structuredClone` 能拷贝函数吗？**

- **答**：不能，它会抛出 `DOMException` 错误。



**5. 如何选择？**

- **简单数据** → `JSON.parse(JSON.stringify())`（不包含特殊类型时）。
- **生产环境** → Lodash `_.cloneDeep` 或 `structuredClone`（浏览器支持时）。
- **完全控制** → 手动实现递归深拷贝。




### **JS 模块化的发展历程**

- IIFE → CommonJS → AMD → CMD → UMD → ES Module



JavaScript 模块化经历了从"混乱"到"标准化"的演进过程，主要分为以下几个阶段：

**1. 原始阶段（无模块化）**

**问题**：全局变量污染，依赖关系混乱  
**典型代码**：
```javascript
// a.js
var name = 'foo';

// b.js
function hello() {
  console.log(name); // 依赖 a.js，但无法显式声明
}
```
**缺点**：
- 变量冲突（如多个文件定义同名变量）
- 依赖关系不清晰



**2. IIFE（立即执行函数）阶段**

**全称**：立即调用函数表达式（immediately invoked function expression）

**解决方案**：使用闭包隔离作用域 

**典型代码**：

```javascript
// moduleA.js
var ModuleA = (function() {
  var privateVar = 'internal';
  return {
    publicMethod: function() {
      console.log(privateVar);
    }
  };
})();

// moduleB.js
ModuleA.publicMethod(); // 调用暴露的方法
```
**优点**：
- 减少全局污染
- 实现简单的封装

**缺点**：
- 依赖管理仍不完善
- 模块通信仍需依赖全局变量



**3. CommonJS（Node.js 的模块化方案）**

**特点**：

- 同步加载（适用于服务端）
- `module.exports` 导出，`require()` 导入

**典型代码**：
```javascript
// math.js
module.exports = {
  add: function(a, b) {
    return a + b;
  }
};

// app.js
const math = require('./math');
console.log(math.add(1, 2)); // 3
```
**优点**：
- 真正的模块化标准
- 依赖管理清晰

**缺点**：
- 同步加载不适合浏览器环境



**4. AMD（异步模块定义，RequireJS 实现）**

**全称**：异步模块定义（Asynchronous Module Definition）

**特点**：

- 异步加载（适合浏览器）
- **依赖前置**：在定义模块时，必须提前声明其依赖的模块
- 使用 `define()` 定义模块，`require()` 加载

**典型代码**：

```javascript
// 定义模块
define(['dep1', 'dep2'], function(dep1, dep2) {
  return {
    method: function() {
      dep1.doSomething();
    }
  };
});

// 加载模块
require(['module'], function(module) {
  module.method();
});
```
**优点**：

- 浏览器友好
- 显式声明依赖

**缺点**：
- 语法复杂
- 不是原生支持



**5. CMD（通用模块定义，Sea.js 实现）**

**全称**：通用模块定义（Common Module Definition）

**特点**：

- 按需加载（与 AMD 主要区别）
- 推崇"**就近依赖**"，模块的依赖可以在需要时才进行声明，而不是一开始就声明

**典型代码**：

```javascript
define(function(require, exports, module) {
  var dep1 = require('./dep1'); // 需要时加载
  exports.method = function() {
    dep1.doSomething();
  };
});
```
**优点**：

- 更符合开发习惯
- 执行时机更灵活

**缺点**：
- 社区影响力不如 AMD



**6. UMD（通用模块定义）**

**全称**：通用模块定义（Universal Module Definition），也可以叫统一模块定义

**特点**：兼容 CommonJS 和 AMD

**典型代码**：

```javascript
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['dep1'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS
    module.exports = factory(require('dep1'));
  } else {
    // 全局变量
    root.Module = factory(root.dep1);
  }
})(this, function(dep1) {
  // 模块逻辑
  return {};
});
```
**优点**：

- 兼容多种环境
- 适合库的开发

**缺点**：
- 代码冗余



**7. ES Module（ES6 原生模块化）**

**特点**：
- 语言层面支持
- 静态分析（编译时加载）
- `export` 导出，`import` 导入

**典型代码**：

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from './math.js';
console.log(add(1, 2)); // 3
```
**优点**：
- 官方标准
- 静态分析利于优化
- 支持异步加载（`import()`）

**缺点**：
- 早期浏览器兼容性问题（现已被广泛支持）



**8. 现代打包工具链**

**解决方案**：
- **Webpack**：支持 CommonJS/AMD/ES Module
- **Rollup**：适合库开发，Tree-shaking
- **Vite**：基于 ES Module 的现代构建工具



**总结：模块化演进路线**

```
无模块化 → IIFE → CommonJS → AMD/CMD → UMD → ES Module
```



**各方案对比**

| 方案        | 环境       | 加载方式 | 特点                     |
|------------|-----------|--------|-------------------------|
| IIFE       | 浏览器     | -      | 简单作用域隔离           |
| CommonJS   | Node.js   | 同步   | `require/module.exports` |
| AMD        | 浏览器     | 异步   | RequireJS，提前执行      |
| CMD        | 浏览器     | 异步   | Sea.js，延迟执行         |
| UMD        | 通用       | 兼容   | 兼容 AMD/CommonJS        |
| ES Module  | 浏览器/Node | 静态   | 官方标准，`import/export` |



**现代开发建议**

1. **新项目**：直接使用 ES Module
2. **库开发**：ES Module + 打包工具（Rollup）
3. **旧项目兼容**：UMD 或 Webpack 转换



### **ES6 模块与 CommonJS 模块的异同** ★

区别：

- **CommonJS是对模块的浅拷⻉，ES6 Module是对模块的引⽤**，即ES6 Module只存只读，不能改变其值，也就是指针指向不能变，类似const；
- import的接⼝是read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，**但可以改变变量内部指针指向**，可以对commonJS对重新赋值（改变指针指向），但是对ES6 Module赋值会编译报错。

共同点：

- CommonJS和ES6 Module都可以对引⼊的对象进⾏赋值，即对对象内部属性的值进⾏改变。



**1. 相同点**

- 都用于 JavaScript 的模块化编程
- 都可以导出和导入功能
- 都支持默认导出和命名导出（语法不同）



**2. 核心差异**

| **特性**         | **ES6 模块 (ESM)**                                        | **CommonJS (CJS)**                |
| ---------------- | --------------------------------------------------------- | --------------------------------- |
| **语法**         | `import/export`                                           | `require/module.exports`          |
| **加载时机**     | 编译时静态分析（静态加载）                                | 运行时动态加载                    |
| **文件扩展名**   | `.mjs` 或 `type="module"` 的 `.js`                        | `.js` 或 `.cjs`                   |
| **顶层 `this`**  | `undefined`                                               | 指向 `module.exports`             |
| **循环引用处理** | **引用绑定（实时映射）**                                  | **值拷贝（浅拷贝，可能不完全）**  |
| **动态导入**     | `import()` 动态导入                                       | `require()` 本身就是动态的        |
| **浏览器支持**   | 原生支持（现代浏览器）                                    | 需打包工具转换（如 Webpack）      |
| **Node.js 支持** | 需 `.mjs` 扩展名或 `package.json` 设置 `"type": "module"` | 原生支持                          |
| **静态分析优化** | 支持 Tree-shaking                                         | 难以静态分析                      |
| **导出方式**     | 命名导出 + 默认导出                                       | `module.exports` 或 `exports.xxx` |
| **导入方式**     | 命名导入 + 默认导入                                       | `const mod = require('module')`   |
| **严格模式**     | 默认启用（不可关闭）                                      | 默认非严格模式（可手动启用）      |



**3. 代码示例对比**

**(1) 导出模块**

```javascript
// ES6 模块
export const name = 'ESM';
export default function() { console.log('Default Export'); }

// CommonJS
exports.name = 'CJS';
module.exports = function() { console.log('Default Export'); };
```

**(2) 导入模块**

```javascript
// ES6 模块
import { name } from './module.js';
import defFunc from './module.js';

// CommonJS
const { name } = require('./module');
const defFunc = require('./module');
```

**(3) 动态导入**

```javascript
// ES6 动态导入（返回 Promise）
import('./module.js').then(module => {
  console.log(module.name);
});

// CommonJS 动态加载（同步）
const mod = require(condition ? './a.js' : './b.js');
```



**4. 关键差异详解**

**(1) 加载时机**

- **ESM**：  
  - 在**代码解析阶段**（编译时）确定依赖关系  
  - 错误导入（如路径错误）在解析阶段就会报错  
- **CJS**：  
  - 在**代码运行时**加载模块  
  - 错误导入直到执行到 `require` 时才报错  

**(2) 循环引用处理**

```javascript
// ES6 模块（a.js）
import { b } from './b.js';
export const a = 'A';

// ES6 模块（b.js）
import { a } from './a.js';
export const b = 'B';
// 正常工作，互相引用的是实时绑定

// CommonJS（a.js）
const b = require('./b');
exports.a = 'A';

// CommonJS（b.js）
const a = require('./a');
exports.b = 'B';
// a.js 中的 `exports.a` 可能尚未初始化
```

**(3) 严格模式**

- **ESM** 默认强制严格模式，以下代码报错：
  ```javascript
  // ESM 中报错
  variable = 123; // ReferenceError
  ```
- **CJS** 默认非严格模式，除非手动添加 `'use strict'`



**5. 使用场景建议**

- **浏览器端/现代前端项目** → **ES6 模块**  
  - 配合 Webpack/Rollup 打包  
  - 利用 Tree-shaking 优化体积  
- **Node.js 服务端** → **根据环境选择**  
  - 新项目建议 ESM（`"type": "module"`）  
  - 旧项目或第三方库兼容用 CJS  
- **需要条件加载** → **ESM 的 `import()` 或 CJS 的 `require`**



**6. 互操作性**

- **ESM 中可以导入 CJS 模块**  
  ```javascript
  import cjsModule from 'commonjs-module'; // 默认导入
  import { named } from 'commonjs-module'; // 可能不准确（依赖 CJS 导出方式）
  ```
- **CJS 中不能直接导入 ESM 模块**  
  ```javascript
  // Node.js 中需用动态 import()
  const esmModule = await import('./esm-module.mjs');
  ```




### **垃圾回收机制** ★

- 标记清除
- 引用计数
- V8 的分代回收



JavaScript 使用自动垃圾回收（Garbage Collection）来管理内存，开发者无需手动释放内存。以下是核心机制和优化策略：

**1. 垃圾回收基本原理**

**核心概念**

- **可达性（Reachability）**：从根（全局变量、当前函数局部变量等）出发，能被访问到的对象就是"可达的"，否则视为垃圾。
- **根对象（Roots）**：
  - 全局变量（`window`/`global`）
  - 当前执行函数的局部变量和参数
  - DOM 节点（未被移除的）

**回收流程**

1. 标记所有从根可达的对象。
2. 删除所有不可达的对象。
3. 整理内存（可选，如压缩内存碎片）。



**2. 主要垃圾回收算法**

**(1) 标记-清除（Mark-and-Sweep）**

**步骤**：
1. 从根对象出发，标记所有可达对象。
2. 遍历堆内存，清除未标记的对象。

**图示**：
```
根 → 对象A → 对象B
      ↓
    对象C（不可达）→ 被回收
```

**优点**：
- 解决循环引用问题（传统引用计数的痛点）。

**缺点**：
- 内存碎片化。

---

**(2) 引用计数（Reference Counting）**

**原理**：每个对象记录被引用的次数，当引用数为 0 时回收。

**备注**：现代 JavaScript 引擎不再使用引用计数进行垃圾回收。

**示例**：

```javascript
let a = { x: 1 }; // 引用计数 = 1
let b = a;        // 引用计数 = 2
a = null;         // 引用计数 = 1
b = null;         // 引用计数 = 0 → 回收
```

**缺点**：
- 无法处理循环引用：
  ```javascript
  let obj1 = {};
  let obj2 = {};
  obj1.ref = obj2; // obj1 引用 obj2
  obj2.ref = obj1; // obj2 引用 obj1
  // 即使外部不再使用，引用计数永远 > 0
  ```

---

**(3) 分代收集（Generational Collection）**

现代JavaScript引擎使用分代收集来优化性能。它们将对象分为不同的“代”（generation），并基于假设：新创建的对象（新生代）更有可能在短时间内变成垃圾，而存活较长时间的对象（老生代）更有可能继续存活。因此，新生代和老生代分别使用不同的垃圾回收策略。新生代通常使用更高效的算法（如复制算法），而老生代则使用标记-清除算法。

**V8 引擎的优化策略**：

- **新生代（Young Generation）**：
  - 使用 **Scavenge 算法**（复制存活对象到另一半空间）。
  - 生命周期短的对象（如临时变量）。
- **老生代（Old Generation）**：
  - 使用 **标记-清除 + 标记-整理**。
  - 存活时间长的对象（如全局变量）。

---

**(4) 增量收集（Incremental collection）**

为了避免长时间的垃圾回收暂停，现代JavaScript引擎使用增量收集。这意味着垃圾回收器可以在JavaScript代码执行过程中进行多次短暂的回收操作，而不是一次性完成整个回收过程。增量收集使得垃圾回收对应用程序的性能影响更小。

---

**(5) 闲时收集（Idle-time collection）**

垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。



**3. 常见内存泄漏场景**

**(1) 意外的全局变量**

```javascript
function leak() {
  leakedVar = 'I am global!'; // 未用 var/let/const → 挂载到 window
}
```

**(2) 未清理的定时器/事件监听**

```javascript
const timer = setInterval(() => {}, 1000);
// 忘记 clearInterval(timer)

element.addEventListener('click', onClick);
// 忘记 removeEventListener
```

**(3) 闭包持有外部变量**

```javascript
function outer() {
  const largeData = new Array(1000000);
  return function inner() {
    // 持有 largeData 的引用
  };
}
const hold = outer(); // largeData 无法释放
```

**(4) 脱离的 DOM 引用**

```javascript
const elements = {
  button: document.getElementById('myButton'),
};

// 即使从 DOM 移除，JS 仍持有引用
document.body.removeChild(document.getElementById('myButton'));
```



**4. 内存优化实践**

**(1) 手动解除引用**

```javascript
let data = getHugeData();
processData(data);
data = null; // 不再需要时主动释放
```

**(2) 使用 WeakMap/WeakSet**

- 键是弱引用，不影响垃圾回收。
- 假设 `x` 被 `y` 弱引用，这意味着尽管你能通过 `y` 访问 `x` 的值，但如果 `x` 不再被*强引用*的话，标记清除算法不会认为 `x` 是可达的。
```javascript
const weakMap = new WeakMap();
weakMap.set(document.getElementById('myEl'), { data });
// DOM 移除后，关联数据自动回收
```

**(3) 避免频繁创建临时对象**

```javascript
// 坏：循环内重复创建对象
for (let i = 0; i < 1000; i++) {
  const temp = { x: i }; // 大量临时对象
}

// 好：复用对象
const temp = {};
for (let i = 0; i < 1000; i++) {
  temp.x = i;
}
```



**5. 调试内存问题**

**(1) Chrome DevTools**

1. **Memory 面板**：
   - Heap Snapshot：查看内存快照。
   - Allocation Timeline：跟踪内存分配。
2. **Performance 面板**：
   - 记录内存变化趋势。

**(2) Node.js 检测**

```bash
node --inspect app.js
# 使用 Chrome DevTools 连接调试
```



**6. 面试常见问题**

**Q1: JavaScript 如何管理内存？**

- 通过垃圾回收自动管理，主要算法是标记-清除和分代收集。

**Q2: 什么是内存泄漏？如何避免？**

- **答**：不再使用的内存未被释放。避免方法：
  1. 及时解除引用（如变量置 `null`）。
  2. 清理定时器/事件监听。
  3. 使用弱引用（`WeakMap`）。

**Q3: WeakMap 和 Map 的区别？**

- **WeakMap** 的键必须是对象或 symbol，且不阻止垃圾回收。（这是因为仅对象是可垃圾回收的——原始值总是被复制的）

**Q4: V8 引擎的垃圾回收策略？**

- 分代收集：新生代（Scavenge）、老生代（标记-清除+标记-整理）。



**总结**

| **机制**  | **描述**                          | **适用场景**               |
| --------- | --------------------------------- | -------------------------- |
| 标记-清除 | 从根标记可达对象，清除其余        | 通用                       |
| 引用计数  | 统计引用数，归零时回收            | 简单场景（不处理循环引用） |
| 分代收集  | 新生代（Scavenge）+老生代（标记） | V8 引擎优化                |




### TypeScript 与 JavaScript 的区别 ★

- 静态类型检查
- 接口和泛型
- 类装饰器等高级特性（@enumerable、@format("Hello, %s")）
- 编译时检查



TypeScript 是 JavaScript 的超集，主要增加了**静态类型系统**和**更强大的工具链支持**。以下是核心区别：

**1. 类型系统**

| **特性**               | **JavaScript**                     | **TypeScript**                     |
|------------------------|-----------------------------------|-----------------------------------|
| **变量类型**           | 动态类型（运行时确定）            | 静态类型（编译时检查）            |
| **类型注解**           | 不支持                            | 支持（如 `let age: number = 25`） |
| **类型推断**           | 无                                | 自动推断（如 `const name = "Alice"` 推断为 `string`） |
| **类型检查时机**       | 运行时可能报错                    | 编译时捕获类型错误                |

**示例：类型注解**

```typescript
// TypeScript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
greet(123); // 编译时报错：Argument of type 'number' is not assignable to parameter of type 'string'.

// JavaScript 等效代码（无类型检查）
function greet(name) {
  return `Hello, ${name}!`;
}
greet(123); // 运行时正常执行，可能引发后续问题
```



**2. 面向对象编程增强**

| **特性**               | **JavaScript**                     | **TypeScript**                     |
|------------------------|-----------------------------------|-----------------------------------|
| **接口（Interface）**  | 无                                | 支持定义对象结构：<br>`interface User { id: number; name: string }` |
| **类成员修饰符**       | 仅 `public`（默认）               | 支持 `public`/`private`/`protected`/`readonly` |
| **抽象类**             | 无                                | 支持 `abstract class` 和抽象方法   |

**示例：接口与类**

```typescript
// TypeScript
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}
  makeSound() {
    console.log("Woof!");
  }
}
```



**3. 高级类型工具**

| **特性**               | **TypeScript 示例**                | **用途**                          |
|------------------------|-----------------------------------|----------------------------------|
| **联合类型**           | `let id: number | string`          | 变量可以是多种类型                |
| **交叉类型**           | `type Admin = User & { role: string }` | 合并多个类型            |
| **泛型**               | `function identity<T>(arg: T): T` | 提高代码复用性                    |
| **类型别名**           | `type Point = { x: number; y: number }` | 简化复杂类型定义      |
| **字面量类型**         | `let direction: "left" | "right"` | 限制变量为特定值                  |

**示例：泛型函数**

```typescript
function reverse<T>(items: T[]): T[] {
  return items.reverse();
}
const numbers = reverse([1, 2, 3]); // T 推断为 number
const strings = reverse(["a", "b"]); // T 推断为 string
```



**4. 工具链支持**

| **特性**               | **JavaScript**                     | **TypeScript**                     |
|------------------------|-----------------------------------|-----------------------------------|
| **编译时错误检查**     | 无                                | 提前发现类型、语法问题            |
| **代码自动补全**       | 有限（依赖运行时信息）            | 基于类型系统的精准补全            |
| **重构支持**           | 基础                              | 重命名变量/接口时自动更新所有引用 |
| **文档生成**           | 需第三方工具（如 JSDoc）          | 类型注解可直接生成文档            |

**示例：VSCode 智能提示**

```typescript
// TypeScript 能推断出 user 的类型
const user = { name: "Alice", age: 25 };
user. // 输入 "." 后自动提示 name 和 age
```



**5. 兼容性**

| **特性**               | **说明**                          |
|------------------------|----------------------------------|
| **文件扩展名**         | `.js` → JavaScript<br>`.ts`/`.tsx` → TypeScript |
| **运行环境**           | TypeScript 需编译为 JavaScript 执行 |
| **渐进式采用**         | 可在 JavaScript 项目中逐步引入 TS |

**编译流程**

```
TypeScript 代码 (.ts) → tsc 编译器 → JavaScript 代码 (.js) → 浏览器/Node.js 执行
```



**6. 适用场景对比**

| **场景**               | **推荐选择**                      | **原因**                          |
|------------------------|----------------------------------|----------------------------------|
| 小型脚本/快速原型       | JavaScript                       | 无需编译，直接运行                |
| 大型企业级应用          | TypeScript                       | 类型安全，便于团队协作            |
| 库/框架开发            | TypeScript                       | 提供更好的类型定义和 API 文档     |
| 已有 JS 项目迁移        | 渐进式引入 TypeScript            | 部分文件改用 `.ts`，逐步覆盖      |



**7. 常见问题**

**Q1: TypeScript 比 JavaScript 慢吗？**

- **答**：开发时由于需要编译，体验稍慢；但运行时性能与 JavaScript 完全一致（因为最终编译为 JS）。

**Q2: 是否必须学习 TypeScript？**

- **答**：现代前端生态（如 React/Vue 3）已深度整合 TS，掌握 TS 能提升开发效率和代码质量。

**Q3: TypeScript 能完全替代 JavaScript 吗？**

- **答**：不能，TS 是 JS 的超集，最终仍需编译为 JS 运行。但新项目推荐优先使用 TS。



**总结**

| **维度**       | **JavaScript**                     | **TypeScript**                     |
|----------------|-----------------------------------|------------------------------|
| **核心差异**   | 动态类型                          | 静态类型 + 类型工具               |
| **错误检查**   | 运行时                            | 编译时                            |
| **面向对象**   | ES6 Class 基础支持                | 接口、抽象类、修饰符等完整特性    |
| **工具链**     | 依赖第三方                        | 原生支持类型检查、重构            |
| **学习曲线**   | 简单                              | 需掌握类型系统概念                |



**建议**：

- 新项目优先选择 TypeScript。
- 老项目可渐进式迁移（从配置文件 `tsconfig.json` 开始）。



### **柯里化函数的原理和使用** ★

柯里化（Currying）是一种**将多参数函数转换为一系列单参数函数**的技术，由数学家Haskell Curry命名。这是函数式编程中的核心概念，下面我将从多个维度为您解析它的本质和应用。

**一、柯里化的本质特征**

1. **参数分解**  
   将`f(a,b,c)`转换为`f(a)(b)(c)`的形式，每次只处理一个参数。

2. **闭包特性**  
   每个柯里化层级都保留对之前参数的引用：
   
   ```javascript
   function sum(a) {
     return function(b) { // 闭包记住a的值
       return a + b;
     };
   }
   ```
   
3. **延迟执行**  
   函数不会立即执行，直到收到所有必需参数：
   ```javascript
   const add5 = sum(5); // 不计算，等待b
   console.log(add5(3)); // 8
   ```



**二、柯里化的实现方式**

**基础手动实现**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}
const curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
```

**ES6箭头函数简化版**

```javascript
const curry = fn => 
  curried = (...args) =>
    args.length >= fn.length 
      ? fn(...args)
      : (...more) => curried(...args, ...more);
```



**三、柯里化的核心优势**

| 优势         | 传统函数 | 柯里化函数   | 示例                           |
| ------------ | -------- | ------------ | ------------------------------ |
| **参数复用** | 重复传参 | 固定部分参数 | `check(/regex/)(text)`         |
| **延迟计算** | 立即执行 | 分阶段执行   | `fetchAPI('GET')('/users')`    |
| **函数组合** | 嵌套调用 | 管道式组合   | `compose(filter, map)(data)`   |
| **动态适配** | 硬编码   | 运行时生成   | `createValidator(rule)(input)` |

---

**1. 参数复用（减少重复传参）**

**场景示例：校验函数**

```javascript
// 普通函数
function check(regExp, text) {
  return regExp.test(text);
}

// 柯里化后
const curryCheck = regExp => text => regExp.test(text);

// 复用正则参数
const checkPhone = curryCheck(/^1\d{10}$/);
const checkEmail = curryCheck(/^\w+@\w+\.\w+$/);

console.log(checkPhone('13800138000')); // true
console.log(checkEmail('test@example.com')); // true
```
**优势**：避免重复传入 `regExp` 参数。

---

**2. 延迟执行（按需调用）**

**场景示例：日志函数**

```javascript
// 普通函数
function log(date, level, message) {
  console.log(`[${date}] [${level}] ${message}`);
}

// 柯里化后
const curryLog = date => level => message => 
  console.log(`[${date}] [${level}] ${message}`);

// 固定日期和级别
const todayLog = curryLog(new Date())('DEBUG');
todayLog('初始化完成'); // [2023-01-01] [DEBUG] 初始化完成
todayLog('数据加载完毕'); // [2023-01-01] [DEBUG] 数据加载完毕
```
**优势**：先部分配置，后续只需传递动态参数。

---

**3. 函数组合（Functional Composition）**

**场景示例：数据处理流水线**

```javascript
// 工具函数
const add = x => y => x + y;
const multiply = x => y => x * y;

// 组合函数
const compose = (f, g) => x => f(g(x));

// 先乘2再加10
const processValue = compose(add(10), multiply(2));
console.log(processValue(5)); // 20 (5*2 + 10)
```
**优势**：柯里化后的函数更易于组合，形成清晰的数据流。

---

**4. 动态生成新函数**

**场景示例：权限检查**

```javascript
const hasPermission = permission => user => 
  user.permissions.includes(permission);

// 生成特定权限检查函数
const canEdit = hasPermission('edit');
const canDelete = hasPermission('delete');

const user = { permissions: ['edit', 'view'] };
console.log(canEdit(user)); // true
console.log(canDelete(user)); // false
```
**优势**：根据运行时条件动态生成专用函数。

---

**5. 兼容函数式编程范式**

**场景示例：配合高阶函数**

```javascript
// 柯里化的 map 回调
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

// 普通写法
const names = users.map(user => user.name);

// 柯里化后
const prop = key => obj => obj[key];
const names = users.map(prop('name'));
```
**优势**：与 `map`/`filter`/`reduce` 等高阶函数无缝配合。

---

**6. 提升代码可读性**

**场景示例：API 请求**

```javascript
// 普通函数
function fetchApi(method, url, body, headers) {
  // ...
}

// 柯里化后
const fetchApi = method => url => body => headers => {
  // ...
};

// 清晰的分步调用
const get = fetchApi('GET');
const getUser = get('/api/user');
getUser(null, { auth: true });
```
**优势**：链式调用更符合人类阅读习惯。

---

**7. 类型推导优化（TypeScript）**

```typescript
// 非柯里化函数类型复杂
declare function request(
  method: string,
  url: string,
  data?: unknown,
  headers?: Record<string, string>
): Promise<Response>;

// 柯里化后类型更清晰
declare function request(
  method: string
): (url: string) => (data?: unknown) => (headers?: Record<string, string>) => Promise<Response>;
```
**优势**：类型提示更精准，减少参数混淆。

---

**何时使用柯里化？**

| **场景**               | **是否推荐** | **原因**                 |
| ---------------------- | ------------ | ------------------------ |
| 参数复用率高           | ✅            | 避免重复传参             |
| 需要延迟执行           | ✅            | 先配置后执行             |
| 函数组合需求           | ✅            | 便于管道式操作           |
| 高频调用的小型工具函数 | ✅            | 提升性能（避免重复计算） |
| 参数顺序灵活           | ❌            | 柯里化要求参数顺序固定   |

**总结**

柯里化的核心价值在于：
1. **降低代码重复**（参数复用）  
2. **增强灵活性**（延迟执行、动态生成）  
3. **提升组合性**（函数式编程基石）  



**四、经典应用场景**

**1. 参数预设（Partial Application）**

```javascript
// 创建通用的日志函数
const log = level => source => message =>
  console.log(`[${level}] [${source}]: ${message}`);

// 生成专用日志器
const appErrorLog = log('ERROR')('Frontend');
appErrorLog('Timeout occurred'); // [ERROR] [Frontend]: Timeout occurred
```

**2. 函数管道（Function Pipeline）**

```javascript
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const cleanText = str => str.trim();
const capitalize = str => str.toUpperCase();
const exclaim = str => `${str}!`;

// 传统写法
const process1 = text => exclaim(capitalize(cleanText(text)));

// 柯里化组合
const process2 = pipe(cleanText, capitalize, exclaim);

console.log(process2(' hello ')); // "HELLO!"
```

**3. 接口抽象**

```javascript
// API请求构造器
const apiRequest = method => endpoint => data =>
  fetch(`https://api.com${endpoint}`, {
    method,
    body: JSON.stringify(data)
  });

// 创建特定请求
const getUsers = apiRequest('GET')('/users');
const createUser = apiRequest('POST')('/users');

// 实际调用
getUsers().then(/*...*/);
createUser({ name: 'Alice' }).then(/*...*/);
```



**五、高级技巧与注意事项**

**1. 参数占位符（Lodash风格）**

```javascript
import _ from 'lodash';

function greet(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const curriedGreet = _.curry(greet);
console.log(curriedGreet('Hello')('Alice')('!')); // Hello, Alice!
console.log(curriedGreet('Hi', _, '?')('Bob'));   // Hi, Bob?
```

**2. 性能优化**

- **记忆化（Memoization）**：缓存固定参数的运算结果
  ```javascript
  const memoizedCurry = fn => {
    const cache = new Map();
    return function curried(...args) {
      const key = args.join('-');
      if (cache.has(key)) return cache.get(key);
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  };
  ```

**3. 避免过度柯里化**

- **参数顺序设计**：将最可能变化的参数放在最后
  ```javascript
  // 反例：URL在最后导致无法复用
  const badCurry = data => callback => url => /*...*/;
  
  // 正例：URL在前便于复用
  const goodCurry = url => callback => data => /*...*/;
  ```



**六、与其他技术的对比**

| 技术         | 柯里化        | 部分应用           | 函数绑定         |
| ------------ | ------------- | ------------------ | ---------------- |
| **参数处理** | 严格单参      | 允许多参           | 固定this+参数    |
| **执行时机** | 全参执行      | 部分执行           | 立即执行         |
| **典型实现** | `a => b => c` | `bind(null, arg1)` | `func.bind(ctx)` |



**七、现代JavaScript中的发展**

1. **可选链式调用**降低柯里化必要性：
   ```javascript
   // 传统柯里化
   const getProp = obj => key => obj[key];
   
   // 现代替代方案
   // ?. 是可选链运算符（ES2020）,用于在访问对象属性或调用方法时，简化处理 null 或 undefined 的情况
   const safeGet = (obj, key) => obj?.[key];
   ```
   
2. **管道操作符提案**（Stage 1）：
   
   ```javascript
   const result = x |> foo |> bar |> baz;
   // 等价于 baz(bar(foo(x)))
   ```

柯里化仍然是函数式编程的利器，但在实际开发中应根据场景权衡使用。当需要**参数复用**、**延迟执行**或**函数组合**时，它是无可替代的解决方案。



### **JavaScript 设计模式有哪些** ★

总体来说设计模式分为三大类：

1. **创建型模式**，处理**对象创建**，共五种：**工厂方法模式**、抽象工厂模式、**单例模式**、建造者模式、**原型模式**。
2. **结构型模式**，处理**对象组合**，共七种：**适配器模式**、**装饰器模式**、**代理模式**、外观模式、桥接模式、组合模式、享元模式。
3. **行为型模式**，处理**对象交互**，共十一种：**策略模式**、模板方法模式、**观察者模式/发布订阅模式**、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。



设计模式是解决软件设计中常见问题的可复用方案。以下是 JavaScript 中常用的设计模式分类及实现：

**一、创建型模式（处理对象创建）**

**1. 单例模式 (Singleton)**

确保一个类只有一个实例，并提供全局访问点。
```javascript
class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = this;
    }
    return Logger.instance;
  }
}
const logger1 = new Logger();
const logger2 = new Logger();
console.log(logger1 === logger2); // true
```

**2. 工厂模式 (Factory)**

封装对象创建过程，根据输入返回不同类型对象。
```javascript
class Car {
  constructor(options) {
    this.type = options.type;
  }
}

class CarFactory {
  create(type) {
    return new Car({ type });
  }
}
const factory = new CarFactory();
const sedan = factory.create('sedan');
```

**3. 建造者模式 (Builder)**

分步骤构建复杂对象。
```javascript
class Pizza {
  constructor(builder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
  }
}

class PizzaBuilder {
  constructor(size) {
    this.size = size;
  }
  addCheese() {
    this.cheese = true;
    return this;
  }
  build() {
    return new Pizza(this);
  }
}
const pizza = new PizzaBuilder('large').addCheese().build();
```



**二、结构型模式（处理对象组合）**

**4. 适配器模式 (Adapter)**

使接口不兼容的对象能够协同工作。
```javascript
class OldAPI {
  request() {
    return '旧数据格式';
  }
}

class Adapter {
  constructor(oldApi) {
    this.oldApi = oldApi;
  }
  fetch() {
    const data = this.oldApi.request();
    return { data, status: 200 }; // 转换为新格式
  }
}
```

**5. 装饰器模式 (Decorator)**

动态添加职责到对象。
```javascript
function withLogging(fn) {
  return function(...args) {
    console.log(`调用 ${fn.name}`);
    return fn(...args);
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(1, 2); // 输出：调用 add，返回：3
```

**6. 代理模式 (Proxy)**

控制对对象的访问。
```javascript
const target = {
  getSecret() {
    return '机密数据';
  }
};

const proxy = new Proxy(target, {
  get(obj, prop) {
    if (prop === 'getSecret') {
      return '访问被拒绝';
    }
    return obj[prop];
  }
});
console.log(proxy.getSecret()); // "访问被拒绝"
```



**三、行为型模式（处理对象交互）**

**7. 观察者模式 (Observer)**

定义对象间的一对多依赖关系。
```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('收到数据:', data);
  }
}
const subject = new Subject();
subject.subscribe(new Observer());
subject.notify('新消息');
```

**8. 策略模式 (Strategy)**

定义算法族，使其可以互相替换。
```javascript
const strategies = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

function calculate(strategy, a, b) {
  return strategies[strategy](a, b);
}
console.log(calculate('add', 5, 3)); // 8
```

**9. 状态模式 (State)**

允许对象在内部状态改变时改变行为。
```javascript
class TrafficLight {
  constructor() {
    this.states = [new RedLight(), new GreenLight()];
    this.current = this.states[0];
  }
  change() {
    this.current = this.states.shift();
    this.states.push(this.current);
  }
  sign() {
    return this.current.sign();
  }
}

class RedLight {
  sign() { return 'STOP'; }
}
class GreenLight {
  sign() { return 'GO'; }
}

const tl = new TrafficLight();
tl.sign(); // 返回 STOP
tl.change();
tl.sign(); // 返回 GO
```



**四、其他重要模式**

**10. 模块模式 (Module)**

封装私有变量和方法。
```javascript
const counterModule = (() => {
  let count = 0; // 私有变量

  return {
    increment() {
      count++;
    },
    getCount() {
      return count;
    }
  };
})();

counterModule.getCount(); // 0
counterModule.increment();
counterModule.getCount(); // 1
```

**11. 中间件模式 (Middleware)**

处理请求的管道机制（Express.js风格）。
```javascript
function createMiddlewareStack() {
  const stack = [];
  return {
    use(fn) {
      stack.push(fn);
    },
    run(context) {
      let index = 0;
      const next = () => {
        if (index < stack.length) {
          stack[index++](context, next);
        }
      };
      next();
    }
  };
}

const stack = createMiddlewareStack();
stack.use((ctx, next) => {
    console.log(ctx.name);
    next();
});
stack.use((ctx, next) => {
    console.log(ctx.age);
    next();
});

stack.run({ name: 'Alice', age: 23}); // Alice 23
```

**12. 依赖注入 (Dependency Injection)**

解耦依赖关系。
```javascript
class Database {
  query() { /* ... */ }
}

class UserService {
  constructor(database) {
    this.db = database;
  }
  getUsers() {
    return this.db.query('SELECT * FROM users');
  }
}
const service = new UserService(new Database());
```



**五、设计模式选择指南**

| **问题场景**     | **推荐模式**    |
| ---------------- | --------------- |
| 需要全局唯一对象 | 单例模式        |
| 对象创建逻辑复杂 | 工厂/建造者模式 |
| 接口不兼容       | 适配器模式      |
| 动态添加功能     | 装饰器模式      |
| 控制对象访问     | 代理模式        |
| 一对多事件通知   | 观察者模式      |
| 算法可切换       | 策略模式        |
| 状态驱动行为变化 | 状态模式        |
| 封装私有逻辑     | 模块模式        |
| 处理请求管道     | 中间件模式      |
| 解耦依赖关系     | 依赖注入        |



**六、现代JavaScript的演进**

1. **类语法**：简化了工厂、单例等模式的实现
2. **Proxy/Reflect**：原生支持代理模式
3. **ES Modules**：替代传统模块模式
4. **函数式编程**：减少对传统OOP模式的依赖

掌握这些模式能帮助您写出更灵活、可维护的代码，但应避免过度设计——**简单性永远是最高原则**。



### **Proxy 对象的操作与应用** ★

Proxy 是 ES6 引入的元编程特性，允许你创建一个对象的代理（proxy），从而可以拦截和自定义对象的底层操作。它是实现高级抽象（如数据绑定、观察者模式等）的强大工具。

**一、Proxy 的核心概念**

**1. 基本语法**

```javascript
const proxy = new Proxy(target, handler);
```
- `target`：要代理的目标对象
- `handler`：定义拦截行为的处理器对象（包含"陷阱"方法）

**2. 关键特性**

- **透明代理**：Proxy 会包装目标对象，对外表现与原始对象一致
- **可撤销代理**：通过 `Proxy.revocable()` 创建可取消的代理
- **无原型链**：`Proxy.prototype` 是 `undefined`



**二、Handler 的拦截操作（陷阱方法）**

Proxy 支持拦截 **13 种基本操作**，以下是常见陷阱方法：

| **陷阱方法**                             | **拦截的操作**                      | **示例**               |
| ---------------------------------------- | ----------------------------------- | ---------------------- |
| `get(target, prop, receiver)`            | 属性读取 `proxy.x`                  | [示例](#get陷阱示例)   |
| `set(target, prop, value, receiver)`     | 属性设置 `proxy.x = 1`              | [示例](#set陷阱示例)   |
| `has(target, prop)`                      | `in` 操作符 `'x' in proxy`          |                        |
| `deleteProperty(target, prop)`           | `delete proxy.x`                    |                        |
| `apply(target, thisArg, args)`           | 函数调用 `proxy(...args)`           | [示例](#apply陷阱示例) |
| `construct(target, args)`                | `new proxy(...args)`                |                        |
| `getPrototypeOf(target)`                 | `Object.getPrototypeOf(proxy)`      |                        |
| `setPrototypeOf(target, proto)`          | `Object.setPrototypeOf()`           |                        |
| `isExtensible(target)`                   | `Object.isExtensible(proxy)`        |                        |
| `preventExtensions(target)`              | `Object.preventExtensions()`        |                        |
| `getOwnPropertyDescriptor(target, prop)` | `Object.getOwnPropertyDescriptor()` |                        |
| `defineProperty(target, prop, desc)`     | `Object.defineProperty()`           |                        |
| `ownKeys(target)`                        | `Object.keys(proxy)` 等             |                        |

注：参数 `receiver` 指向 Proxy 自身或者继承 Proxy 的对象。



**三、实用示例**

**1. 数据验证代理（`set` 陷阱示例）**

```javascript
const validator = {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new Error('年龄必须是正数');
      }
    }
    target[prop] = value; // 通过验证后设置值
    return true; // 表示设置成功
  }
};

const person = new Proxy({}, validator);
person.age = 25; // 成功
person.age = -1; // 抛出错误
```

**2. 自动填充默认值（`get` 陷阱示例）**

```javascript
const withDefaults = (target, defaults) => new Proxy(target, {
  get(target, prop) {
    return prop in target ? target[prop] : defaults[prop];
  }
});

const config = withDefaults(
  { theme: 'dark' },
  { theme: 'light', fontSize: 14 }
);
console.log(config.theme);    // 'dark'（已有值）
console.log(config.fontSize); // 14（默认值）
```

**3. 函数调用日志（`apply` 陷阱示例）**

```javascript
function sum(a, b) {
  return a + b;
}

const loggedSum = new Proxy(sum, {
  apply(target, thisArg, args) {
    console.log(`调用函数 ${target.name}，参数: ${args}`);
    return Reflect.apply(target, thisArg, args);
  }
});

loggedSum(2, 3); // 输出日志后返回 5
```

**4. 可撤销代理**

```javascript
const { proxy, revoke } = Proxy.revocable({}, {});
proxy.x = 1;      // 正常操作
revoke();         // 撤销代理
console.log(proxy.x); // TypeError: Cannot perform 'get' on a revoked proxy
```



**四、Proxy 的高级应用**

**1. 实现观察者模式**

```javascript
function createObservable(target, callback) {
  return new Proxy(target, {
    set(target, prop, value) {
      callback(prop, target[prop], value);
      return Reflect.set(target, prop, value);
    }
  });
}

const data = createObservable(
  { count: 0 },
  (key, oldVal, newVal) => console.log(`属性 ${key} 从 ${oldVal} 变为 ${newVal}`)
);
data.count = 1; // 输出: "属性 count 从 0 变为 1"
```

**2. 负数组索引支持**

```javascript
const negativeArray = arr => new Proxy(arr, {
  get(target, prop, receiver) {
    const index = parseInt(prop);
    if (index < 0) {
      prop = target.length + index;
    }
    return Reflect.get(target, prop, receiver);
  }
});

const arr = negativeArray(['a', 'b', 'c']);
console.log(arr[-1]); // 'c'
```

**3. API 请求缓存**

```javascript
const cache = new Map();
const cachedFetch = new Proxy(fetch, {
  apply(target, thisArg, args) {
    const [url] = args;
    if (cache.has(url)) {
      return cache.get(url);
    }
    const promise = target(...args).then(res => res.json());
    cache.set(url, promise);
    return promise;
  }
});

// 使用方式与普通 fetch 一致
cachedFetch('https://api.example.com/data')
  .then(data => console.log(data));
```



**五、Proxy 的局限性**

1. **无法拦截严格相等**  
   `proxy === target` 无法被拦截，始终返回 `false`

2. **部分内置对象限制**  
   Date、Map、Set 等内置对象的部分方法可能绕过代理

3. **性能开销**  
   比直接对象操作稍慢（现代引擎已优化）

4. **不能代理原始值**  
   
   ```javascript
   new Proxy(42, {}); // TypeError: Cannot create proxy with a non-object target
   ```



**六、最佳实践建议**

1. **优先使用 Reflect 方法**  
   在陷阱方法内使用 `Reflect` 调用默认行为：
   ```javascript
   get(target, prop) {
     console.log('GET', prop);
     return Reflect.get(...arguments);
   }
   ```

2. **避免过度拦截**  
   只拦截必要的操作以减少性能影响

3. **与装饰器模式结合**  
   
   ```javascript
   @logAccess
   class DataModel {
     // ...
   }
   function logAccess(target) {
     return new Proxy(target, {
       get(target, prop) {
         console.log('访问属性:', prop);
         return target[prop];
       }
     });
   }
   ```
   
4. **注意 this 绑定**  
   代理可能改变方法的 `this` 指向，必要时使用 `bind`



**七、Proxy 与其他技术的对比**

| **技术**                  | **特点**         | **与 Proxy 的关系**            |
| ------------------------- | ---------------- | ------------------------------ |
| **Object.defineProperty** | ES5 的拦截方案   | 只能拦截属性访问，Proxy 更强大 |
| **Reflect**               | 提供默认操作实现 | 常与 Proxy 配合使用            |
| **装饰器**                | 编译时元编程     | Proxy 是运行时的动态装饰       |

Proxy 为 JavaScript 打开了元编程的大门，合理使用可以实现许多高级模式（如虚拟化、数据绑定、AOP 等），是现代前端框架（如 Vue 3）的核心基础之一。



### **Reflect 对象的操作与应用** ★

`Reflect` 是 ES6 引入的一个内置对象，它提供了一套用于操作对象的方法，**这些方法与 `Proxy` 处理器方法一一对应**，旨在**更规范、更安全**地进行对象操作。下面从多个维度全面解析 `Reflect`：

**一、Reflect 的核心作用**

**1. 统一对象操作 API**

将原本分散的 `Object`、`Function` 等对象操作统一到 `Reflect` 上：
```javascript
// 旧方式
Object.defineProperty(obj, key, desc);
delete obj[key];

// 新方式
Reflect.defineProperty(obj, key, desc);
Reflect.deleteProperty(obj, key);
```

**2. 提供操作返回值标准化**

- 旧方法有的返回布尔值，有的返回对象，不一致：
  ```javascript
  Object.defineProperty() // 返回对象或抛出错误
  delete obj.a // 返回布尔值
  ```
- `Reflect` 方法统一返回布尔值或操作结果：
  
  ```javascript
  Reflect.defineProperty() // 返回布尔值
  Reflect.deleteProperty() // 返回布尔值
  ```

**3. 与 Proxy 完美配合**

每个 `Reflect` 方法对应一个 `Proxy` 陷阱（trap）：
```javascript
const proxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('GET', key);
    return Reflect.get(target, key, receiver); // 调用默认行为
  }
});
```



**二、Reflect 的 13 个静态方法**

**1. 基本对象操作**

| 方法                                        | 等效操作              | 说明                             |
| ------------------------------------------- | --------------------- | -------------------------------- |
| `Reflect.get(target, key, receiver)`        | `target[key]`         | 获取属性值（支持 getter 上下文） |
| `Reflect.set(target, key, value, receiver)` | `target[key] = value` | 设置属性值（支持 setter 上下文） |
| `Reflect.has(target, key)`                  | `key in target`       | 检查属性是否存在                 |
| `Reflect.deleteProperty(target, key)`       | `delete target[key]`  | 删除属性                         |

**2. 属性描述符操作**

| 方法                                            | 等效操作                            | 说明           |
| ----------------------------------------------- | ----------------------------------- | -------------- |
| `Reflect.defineProperty(target, key, desc)`     | `Object.defineProperty()`           | 定义属性       |
| `Reflect.getOwnPropertyDescriptor(target, key)` | `Object.getOwnPropertyDescriptor()` | 获取属性描述符 |

**3. 原型与扩展性操作**

| 方法                                    | 等效操作                     | 说明           |
| --------------------------------------- | ---------------------------- | -------------- |
| `Reflect.getPrototypeOf(target)`        | `Object.getPrototypeOf()`    | 获取原型       |
| `Reflect.setPrototypeOf(target, proto)` | `Object.setPrototypeOf()`    | 设置原型       |
| `Reflect.isExtensible(target)`          | `Object.isExtensible()`      | 判断是否可扩展 |
| `Reflect.preventExtensions(target)`     | `Object.preventExtensions()` | 阻止扩展       |

**4. 函数调用与构造**

| 方法                                   | 等效操作                    | 说明            |
| -------------------------------------- | --------------------------- | --------------- |
| `Reflect.apply(func, thisArg, args)`   | `func.apply(thisArg, args)` | 调用函数        |
| `Reflect.construct(constructor, args)` | `new constructor(...args)`  | 替代 `new` 操作 |

**5. 其他**

| 方法                      | 说明                          |
| ------------------------- | ----------------------------- |
| `Reflect.ownKeys(target)` | 获取所有自身键（包括 Symbol） |



**三、关键应用场景**

**1. 替代 `Object` 的不安全操作**

```javascript
// 旧方式（失败时抛出错误）
try {
  Object.defineProperty(obj, 'readonly', { 
    value: 42, 
    writable: false 
  });
} catch (e) {
  console.error('定义失败');
}

// 新方式（返回布尔值）
if (!Reflect.defineProperty(obj, 'readonly', { 
  value: 42, 
  writable: false 
})) {
  console.log('定义失败'); // 更优雅的错误处理
}
```

**2. 代理默认行为实现**

```javascript
const proxy = new Proxy(obj, {
  set(target, key, value, receiver) {
    if (key === 'age' && value < 0) {
      throw new Error('年龄不能为负');
    }
    return Reflect.set(target, key, value, receiver); // 调用默认行为
  }
});
```

**3. 安全地调用构造函数**

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

// 传统方式可能被覆盖
const obj1 = new Animal('Dog');

// 更安全的方式
const obj2 = Reflect.construct(Animal, ['Cat']);
```

**4. 操作转发**

```javascript
const original = { a: 1 };
const wrapper = {
  get(target, key) {
    console.log('访问:', key);
    return Reflect.get(target, key);
  }
};
const proxy = new Proxy(original, wrapper);
console.log(proxy.a); // 输出: "访问: a" → 1
```



**四、Reflect vs Object 方法对比**

| **操作** | **Object 方法**              | **Reflect 方法**           | **优势**               |
| -------- | ---------------------------- | -------------------------- | ---------------------- |
| 定义属性 | `Object.defineProperty()`    | `Reflect.defineProperty()` | 返回布尔值，不抛出错误 |
| 获取原型 | `Object.getPrototypeOf()`    | `Reflect.getPrototypeOf()` | 与 Proxy 陷阱对应      |
| 函数调用 | `Function.prototype.apply()` | `Reflect.apply()`          | 更直观的 API 设计      |
| 删除属性 | `delete obj.key`             | `Reflect.deleteProperty()` | 可作为函数传递         |



**五、设计思想与最佳实践**

1. **统一性**：所有方法都是静态的，命名与 Proxy 陷阱一致
2. **函数式风格**：适合组合使用（如 `compose(Reflect.get, Reflect.set)`）
3. **安全优先**：避免直接操作对象带来的副作用
4. **与 Proxy 配合**：实现透明代理（保持默认行为）



**六、兼容性提示**

- 所有现代浏览器和 Node.js 均支持
- 需转译器（如 Babel）支持旧环境

**`Reflect` 不是革命性的新功能，而是对 JavaScript 对象操作的标准化和补充，尤其在元编程（如 Proxy）场景中不可或缺**。合理使用能使代码更健壮、更易维护。




## 实战问题 ★

### **如何实现一个 Promise**

**关键实现点**

1. **三种状态管理**：
   - `pending`、`fulfilled`、`rejected`
   - 状态一旦改变就不能逆转
2. **异步处理**：
   - 使用 `setTimeout` 确保 `then` 回调异步执行
   - 维护回调队列处理异步情况
3. **链式调用**：
   - `then` 方法返回新的 Promise
   - 实现值穿透（当 then 的参数不是函数时） ----完整版
4. **Promise 解决过程**： ----完整版
   - 处理 thenable 对象
   - 防止循环引用
   - 递归解析 Promise
5. **静态方法**： ----完整版
   - 实现 `resolve`、`reject`、`all`、`race` 等静态方法



<a id="Promise简易版">**Promise简易版**</a>
包括状态管理、异步处理机制、then方法链式调用

  ```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject); // 执行用户处理，根据情况选择resolve或reject分支
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            resolve(onFulfilled(this.value));
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === "rejected") {
        setTimeout(() => {
          try {
            resolve(onRejected(this.value));
          } catch (error) {
            reject(error);
          }
        });
      } else {
        // 处理异步调用resolve或reject函数的情况
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              resolve(onFulfilled(this.value));
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              resolve(onRejected(this.value));
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
  ```

  

**Promise完整版**（符合Promises/A+ 规范）

在简易版的基础上，**实现值穿透**（当 then 的参数不是函数时），**完善Promise 解决过程**（处理 thenable 对象、防止循环引用、递归解析 Promise），**实现常用的静态方法**（`resolve`、`reject`、`all`、`race`）。

下面是一个符合 **Promises/A+ 规范**的简化版 Promise 实现，包含核心功能：

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态
    this.value = undefined; // 成功值
    this.reason = undefined; // 失败原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn()); // 执行队列中的回调函数
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn()); // 执行队列中的回调函数
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // 处理 then 的参数不是函数的情况
    //2.2.7.3. If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
    //2.2.7.4. If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

    // 内部调用then方法时，返回了一个新的promise，并让这个新的promise接管了它下一个then方法
    // 在定义新的promise时，生成了对应的executor函数。在这个executor中，将上一个Promise的处理结果作为参数，传递给新的的Promise
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // finally 回调函数不接收任何参数。这种情况恰好适用于你不关心拒绝原因或兑现值的情况，因此无需提供它
  // finally() 调用通常是透明的，不会更改原始 promise 的状态
  //   Promise.resolve(2).finally(() => 77) 返回一个最终兑现为值 2 的 promise
  //   Promise.reject(3).finally(() => 88) 返回一个最终以原因 3 拒绝的 promise
  // 在 finally 回调函数中抛出错误（或返回被拒绝的 promise）仍会导致返回的 promise 被拒绝。
  //   Promise.reject(3).finally(() => { throw 99; }) 会以理由 99 拒绝返回的 promise
  //   Promise.reject(3).finally(() => Promise.reject(99)) 同样会以理由 99 拒绝返回的 promise
  finally(callback) {
    // callback 不为函数时，直接透传原Promise
    if (typeof callback !== 'function') {
      return this.then();
    }
      
    // 为什么使用 MyPromise.resolve 包装一层？
    // 无论 Promise 成功/失败，callback 都会执行回调，而且要保证后续 .then 的一致性（顺序一致）
    // 也就是说，如果 callback 是异步函数或返回 Promise，使用 Promise.resolve 会等待内部的 Promise 完成，然后再执行后序 .then 处理
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason => MyPromise.resolve(callback()).then(() => { throw reason })
    );
  }

  // Promise.resolve() 静态方法以给定值“解决（resolve）”一个 Promise：
  //   如果该值本身就是一个 Promise，那么该 Promise 将被返回；
  //   如果该值是一个 thenable 对象，Promise.resolve() 将调用其 then() 方法及其两个回调函数；
  //   否则，返回的 Promise 将会以该值兑现
  // Promise.resolve() 返回一个 Promise 对象，其最终状态取决于另一个 Promise 对象、thenable 对象或其他值
  // Promise.resolve() 并不总是返回一个 fulfilled 的 Promise！它的结果取决于传入的值
  // 实际场景中的意义：统一处理同步/异步值，避免嵌套 Promise，安全处理 thenable 对象
  static resolve(value) {
    // value 是 promise 时直接返回value
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise(resolve => resolve(value));
  }

  // Promise.reject() 静态方法返回一个已拒绝（rejected）的 Promise 对象，拒绝原因为给定的参数
  // 与 Promise.resolve() 不同，即使 reason 已经是一个 Promise 对象，Promise.reject() 方法也始终会将其封装在一个新的 Promise 对象中
  // 实际场景中的意义：异步请求前同步校验失败时直接拒绝（保持代码逻辑一致性，全部返回 Promise），条件不满足时终止链式调用，将非 Promise 错误标准化
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }

  // 返回的 Promise 在所有输入的 Promise 都兑现时（包括传入的可迭代对象为空时）被兑现，其值为一个包含所有兑现值的数组
  // 如果输入的任何 Promise 被拒绝，返回的 Promise 也会被拒绝，并返回第一个拒绝的原因。
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      // promises不是可迭代对象时，拒绝一个TypeError
      if (!promises || !promises[Symbol.iterator]) {
        return reject(new TypeError(`${typeof promises} is not iterable.`));
      }
      // promises为空数组时，直接敲定返回结果
      if (promises.length === 0) {
        return resolve(promises);
      }
      
      const results = [];
      let count = 0;
      promises.forEach((promise, index) => {
        // 参数promise有可能并非Promise类型，例如通过Promise.resolve(1)将参数转换为Promise类型
        MyPromise.resolve(promise).then(
          value => {
            results[index] = value;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          }, reject);
      });
    });
  }
  
  // 所有 Promise 完成（无论成功/失败）时，才返回结果数组
  static allSettled(promises) {
    if (!promises || !promises[Symbol.iterator]) {
      return Promise.reject(new TypeError(`${typeof promises} is not iterable.`));
    }

    return MyPromise.all(
      promises.map((p) =>
        MyPromise.resolve(p).then(
          (value) => ({ status: 'fulfilled', value }),
          (reason) => ({ status: 'rejected', reason })
        )
      )
    );
  }

  // 返回的 Promise 与第一个敲定的 Promise 的最终状态保持一致（ fulfilled 或 rejected 均可）
  // 与之类似的Promise.any，是在任何输入的 Promise 兑现（fulfilled）时兑现，其值为第一个兑现的值
  // promises为空数组时，返回一个pending状态的promise（也就是没执行resolve或reject处理）
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (!promises || !promises[Symbol.iterator]) {
        return reject(new TypeError(`${typeof promises} is not iterable.`));
      }
        
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }
  
  // 哪个 Promise 先成功就返回它的结果，所有都失败时返回一个包含拒绝原因数组的AggregateError
  static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (!promises || !promises[Symbol.iterator]) {
        return reject(new TypeError(`${typeof promises} is not iterable.`));
      }
      // 数组为空时，也要拒绝一个AggregateError
      if (promises.length === 0) {
        return reject(new AggregateError([], 'All promises were rejected.'));
      }

      const errors = new Array(promises.length);
      let count = 0;
      promises.forEach((p, i) => {
        MyPromise.resolve(p).then(resolve, (reason) => {
          errors[i] = reason;
          count++;
          if (count === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected.'));
          }
        });
      });
    });
  }
}

// 处理 thenable 对象和循环引用
function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
  // 例：const p2 = new MyPromise((res) => res(1)).then(() => p2);
  //    p2.catch((err) => console.log(err.message)); // 输出错误信息
  if (promise2 === x) {
    // 防止进入内部死循环
    // 抛出类型错误：发现promise的链式循环(引用)
    // 为什么是TypeError: 除了类型错误外，尝试以不适当的方法使用一个值也会抛出TypeError
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  
  // 标记第一次调用，确保状态不可逆转
  // 使用thenable时可能出现后续调用覆盖结果的情况
  let called = false;
  
  // 2.3.3 Otherwise, if x is an object or function,
  // 注：function本质上也是object,可以在一个function上添加额外的then属性，因此需要处理
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // 2.3.3.1 Let then be x.then
      // If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason
      // const then = x.then 包裹在try...catch..中
      // 获取x.then可能报错的原因：如果x是一个对象，且其then属性是通过getter方法定义的，而该getter方法内部可能抛出错误
      const then = x.then;
      if (typeof then === 'function') {
        // x.then为函数时，认为x为一个Promise对象
        /**
        * 2.3.3.2 如果x是一个promise,采用他的状态
        *  2.3.3.3.1 如果x是pengding状态,promise必须保持等待状态,直到x被fulfilled或rejected
        *  2.3.3.3.2 如果x是fulfilled状态,用相同的原因解决promise
        *  2.3.3.3.3 如果x是rejected状态,用相同的原因拒绝promise
        * */
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // y有可能依然是嵌套的Promise对象，因此需要递归执行resolvePromise()
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r); // 外层的Promise采用内层Promise的状态，内层reject时外层也reject
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      // 2.3.3.3.4 If calling then throws an exception e,
      // 2.3.3.3.4.1 If resolvePromise or rejectPromise have been called, ignore it.
      // 2.3.3.3.4.2 Otherwise, reject promise with e as the reason.
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

这个实现涵盖了 Promise 的核心功能，可以作为面试时手写 Promise 的参考。实际面试中，可以根据时间要求展示完整实现或简化版本。



**使用示例**

```javascript
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 1000);
});

p.then(res => {
  console.log(res); // 1秒后输出 "success"
  return 'another success';
})
.then(res => console.log(res)) // 输出 "another success"
.catch(err => console.error(err));
```



---



**附加：Promises/A+ 规范中 resolvePromise 和 rejectPromise 同时调用的情况分析**

在 Promises/A+ 规范的 **2.3.3.3.3** 条款中，明确指出：  
**如果 `resolvePromise` 和 `rejectPromise` 都被调用，那么第一次调用的结果优先，后续调用被忽略**。  
这种情况虽然罕见，但在某些特殊场景下可能出现，以下是详细解析：

**(1) 在 `thenable` 对象的 `then` 方法中误操作**

`thenable` 是指符合 Promise 接口的任何对象，即可以被当作 Promise 处理的任何对象。

> 在 Promise 成为 JavaScript 语言的一部分之前，JavaScript 生态系统已经有了多种 Promise 实现。尽管它们在内部的表示方式不同，但至少所有类 Promise 的对象都实现了 *Thenable* 接口。thenable 对象实现了 `.then()` 方法，该方法被调用时需要传入两个回调函数，一个用于 Promise 被兑现时调用，一个用于 Promise 被拒绝时调用。Promise 也是 thenable 对象。**为了与现有的 Promise 实现进行交互，JavaScript 语言允许在 Promise 的位置使用 thenable 对象**。

当一个对象是 **thenable**（即拥有 `then` 方法），但在其 `then` 方法中同时调用了 `resolve` 和 `reject`：

```javascript
const thenable = {
  then(resolvePromise, rejectPromise) {
    resolvePromise(42);  // 第一次调用（有效）
    rejectPromise(new Error("Oops")); // 第二次调用（被忽略）
  }
};

Promise.resolve(thenable)
  .then(val => console.log("Resolved:", val))  // 输出 "Resolved: 42"
  .catch(err => console.log("Rejected:", err)); // 不会执行
```

**(2) 异步竞争条件**

如果 `resolvePromise` 和 `rejectPromise` 在异步操作中**因竞争条件被先后触发**：
```javascript
const thenable = {
  then(resolvePromise, rejectPromise) {
    setTimeout(() => resolvePromise(1), 100);
    setTimeout(() => rejectPromise(2), 100); // 几乎同时触发
  }
};

// 实际只会输出 "Resolved: 1"（取决于事件循环的微小时间差）
```

**(3) 第三方库的 bug 或非预期行为**

某些不符合规范的 Promise 实现或第三方库可能在内部错误地同时调用了两者。

---

```javascript
// ❌ 完全没必要！
new Promise((resolve, reject) => {
  resolve(42);
  reject(new Error("No")); // 这一行会被忽略
}).catch(err => {
  console.log("永远不会执行");
});
```



**附加：如何验证你的 Promise 实现是否符合规范？**

**使用 Promises/A+ 测试套件**

1. 安装测试工具：
   ```bash
   npm install promises-aplus-tests -D
   ```
2. 实现 `adapter` 接口：
   ```javascript
   // adapter.js
   module.exports = {
     resolved: Promise.resolve,
     rejected: Promise.reject,
     deferred() {
       const obj = {};
       obj.promise = new Promise((resolve, reject) => {
         obj.resolve = resolve;
         obj.reject = reject;
       });
       return obj;
     }
   };
   ```
3. 运行测试：
   ```bash
   npx promises-aplus-tests adapter.js
   ```




### **实现一个发布-订阅模式**

- 事件中心管理
- on/emit/off 方法



发布-订阅模式（Pub-Sub）是一种消息通信模式，发送者（发布者）不直接发送消息给接收者（订阅者），而是通过**消息中心**（事件总线）进行中转。以下是完整实现：

**1. 基础版本实现**

```javascript
class EventBus {
  constructor() {
    this.events = {}; // 存储事件名和对应的回调函数列表
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // 发布事件
  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }

  // 取消订阅
  off(eventName, callback) {
    const callbacks = this.events[eventName];
    if (callbacks) {
      this.events[eventName] = callbacks.filter(cb => cb !== callback);
    }
  }

  // 一次性订阅
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
```

**使用示例**

```javascript
const bus = new EventBus();

// 订阅
bus.on('login', (user) => {
  console.log(`${user.name} 登录了`);
});

// 发布
bus.emit('login', { name: 'Alice' }); // 输出 "Alice 登录了"

// 取消订阅
const handler = (user) => console.log('记录日志:', user);
bus.on('login', handler);
bus.off('login', handler);

// 一次性订阅
bus.once('payment', (amount) => {
  console.log(`支付成功: ${amount}元`);
});
bus.emit('payment', 100); // 输出 "支付成功: 100元"
bus.emit('payment', 200); // 无输出
```



**2. 进阶功能实现**

**(1) 支持命名空间**

```javascript
class EventBus {
  constructor(namespace = '') {
    this.namespace = namespace;
    this.events = {};
  }

  // 添加命名空间前缀
  #getFullEventName(eventName) {
    return this.namespace ? `${this.namespace}:${eventName}` : eventName;
  }

  on(eventName, callback) {
    const fullName = this.#getFullEventName(eventName);
    // ...其余逻辑同基础版本
  }

  // emit/off/once 同理需要添加命名空间处理
}
```

**(2) 异步事件支持**

```javascript
emitAsync(eventName, ...args) {
  const callbacks = this.events[eventName];
  if (callbacks) {
    return Promise.all(callbacks.map(cb => cb(...args)));
  }
  return Promise.resolve();
}

// 使用
await bus.emitAsync('event');
```

**(3) 优先级控制**

```javascript
on(eventName, callback, priority = 0) {
  if (!this.events[eventName]) {
    this.events[eventName] = [];
  }
  this.events[eventName].push({ callback, priority });
  this.events[eventName].sort((a, b) => b.priority - a.priority);
}

// 触发时按优先级执行
emit(eventName, ...args) {
  const callbacks = this.events[eventName];
  if (callbacks) {
    callbacks.forEach(item => item.callback(...args));
  }
}
```



**3. 实际应用场景**

**场景 1：跨组件通信（Vue/React）**

```javascript
// Vue3 组件A（发布）
import bus from './eventBus';
bus.emit('data-updated', newData);

// Vue3 组件B（订阅）
bus.on('data-updated', this.handleData);
```

**场景 2：微前端架构**

```javascript
// 主应用
window.globalBus = new EventBus();

// 子应用
window.globalBus.on('theme-change', (theme) => {
  document.body.style.backgroundColor = theme;
});
```

**场景 3：插件系统**

```javascript
// 核心系统
class CoreSystem {
  constructor() {
    this.bus = new EventBus();
  }
}

// 插件
core.bus.on('before-save', validateData);
```



**4. 与观察者模式的区别**

| **发布-订阅**              | **观察者模式**               |
| -------------------------- | ---------------------------- |
| 通过消息中心中转（松耦合） | 主题直接通知观察者（紧耦合） |
| 发布者不知道订阅者的存在   | 主题明确维护观察者列表       |
| **更适合跨模块/系统通信**  | **适合同一模块内的对象通信** |



**5. 性能优化建议**

1. **批量触发**：对高频事件（如 scroll）做防抖处理

   ```javascript
   emitDebounced(eventName, delay = 100) {
     clearTimeout(this.timers[eventName]);
     this.timers[eventName] = setTimeout(() => {
       this.emit(eventName);
     }, delay);
   }
   ```

2. **内存管理**：增加清除所有订阅的方法

   ```javascript
   clear() {
     this.events = {};
   }
   ```

3. **错误处理**：包裹回调函数避免单个报错影响整体

   ```javascript
   emit(eventName, ...args) {
     const callbacks = this.events[eventName];
     if (callbacks) {
       callbacks.forEach(cb => {
         try {
           cb(...args);
         } catch (err) {
           console.error('Event handler error:', err);
         }
       });
     }
   }
   ```



### **手写 bind/call/apply**

- 上下文绑定
- 参数处理



**1. 实现 call()**

`call()` 方法立即调用函数，并指定 `this` 值和参数列表。

```javascript
Function.prototype.myCall = function(context, ...args) {
  // 1. 处理 context 为 null/undefined 的情况（默认指向全局对象）
  context = context || window; // 浏览器环境用 window，Node.js 用 global
  
  // 2. 将当前函数（this）作为 context 的一个属性
  const fnKey = Symbol('fn'); // 使用 Symbol 避免属性名冲突
  context[fnKey] = this;
  
  // 3. 执行函数
  const result = context[fnKey](...args);
  
  // 4. 删除临时属性
  delete context[fnKey];
  
  return result;
};

// 使用示例
function greet(message) {
  console.log(`${message}, ${this.name}!`);
}

const person = { name: 'Alice' };
greet.myCall(person, 'Hello'); // 输出: "Hello, Alice!"
```



**2. 实现 apply()**

`apply()` 与 `call()` 类似，但参数以数组形式传递。

```javascript
Function.prototype.myApply = function(context, argsArray) {
  // 1. 处理 context
  context = context || window;
  
  // 2. 将函数绑定到 context
  const fnKey = Symbol('fn');
  context[fnKey] = this;
  
  // 3. 执行函数（处理 argsArray 为 null/undefined 的情况）
  const result = argsArray ? context[fnKey](...argsArray) : context[fnKey]();
  
  // 4. 删除临时属性
  delete context[fnKey];
  
  return result;
};

// 使用示例
function introduce(age, city) {
  console.log(`${this.name} is ${age} years old, living in ${city}`);
}

const person = { name: 'Bob' };
introduce.myApply(person, [30, 'New York']); // 输出: "Bob is 30 years old, living in New York"
```



**3. 实现 bind()**

`bind()` 返回一个新函数，永久绑定 `this` 和部分参数。

注意，如果使用 new 运算符构造绑定函数，则忽略绑定的 this 上下文。

```javascript
Function.prototype.myBind = function(context, ...bindArgs) {
  const originalFunc = this;
  
  // 返回一个新函数
  return function(...callArgs) {
    // 合并绑定参数和调用参数
    // bindArgs 在调用 func 时，插入到传入绑定函数的参数前的参数
    const allArgs = bindArgs.concat(callArgs);
    
    // 判断是否通过 new 调用（处理 new 操作符的情况）
    // new.target 元属性允许你检测函数或构造函数是否是通过 new 运算符被调用的
    // 在通过 new 运算符执行的函数或构造函数中，new.target 返回一个指向 new 调用的构造函数或函数的引用
    // 在普通的函数调用中，new.target 的值是 undefined
    if (new.target) {
      return new originalFunc(...allArgs); // 如果是 new 调用，忽略绑定的 this
    } else {
      return originalFunc.apply(context, allArgs); // 普通调用使用绑定的 this
    }
  };
};

// 使用示例
function printInfo(role, department) {
  console.log(`${this.name} is a ${role} in ${department}`);
}

const employee = { name: 'Charlie' };
const boundFunc = printInfo.myBind(employee, 'Engineer');
boundFunc('Tech'); // 输出: "Charlie is a Engineer in Tech"

// 测试 new 调用
const NewBoundFunc = printInfo.myBind(employee);
const instance = new NewBoundFunc('Designer', 'Art'); // this 指向新对象，忽略 employee
```



**关键点解析**

| **方法** | **区别**                 | **实现核心**                       |
| -------- | ------------------------ | ---------------------------------- |
| `call`   | 立即调用，参数逐个传递   | `context.fn(...args)`              |
| `apply`  | 立即调用，参数为数组     | `context.fn(...argsArray)`         |
| `bind`   | 返回绑定函数，可延迟执行 | 闭包保存 `this` 和参数，处理 `new` |



**边界情况处理**

1. **`context` 为 null/undefined**：默认指向全局对象（严格模式下不同）。
2. **`bind` 后的函数通过 `new` 调用**：应忽略绑定的 `this`，原型链需正确。
3. **参数合并**：`bind` 需要合并绑定时参数和调用时参数。



**面试常见问题**

**Q1: 为什么用 Symbol 作为临时属性名？**

- 避免覆盖 `context` 原有属性，确保代码安全。

**Q2: `bind` 如何实现柯里化（Currying）？**

- 通过闭包保存部分参数（`bindArgs`），在调用时合并剩余参数（`callArgs`）。

**Q3: 如何判断函数是否通过 `new` 调用？**

- 使用 `new.target`（ES6）或 `this instanceof boundFunction`。



### **数组去重的多种方法**

- Set
- filter + indexOf
- reduce
- 对象键值



> [!NOTE]
>
> **最佳实践建议**
>
> 1. **简单数组（数字/字符串）** → **`[...new Set(arr)]`**（最优解）
> 2. **需要兼容 IE** → **对象键值法** 或 **filter + indexOf**
> 3. **对象数组去重** → **Map + 自定义 key 生成规则**
> 4. **超大数组** → **Map 或对象键值法**（O(n) 时间复杂度）



**1. 使用 Set（ES6 最简单方法）**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
**优点**：
- 代码简洁，一行搞定
- 性能优秀（`Set` 内部使用哈希表）

**缺点**：
- **无法区分对象引用（如 `{}` 和 `{}` 被视为不同）**
- 不兼容 IE11 及以下



**2. 使用 filter + indexOf**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
**优点**：
- 兼容性好（ES5）
- 可读性强

**缺点**：
- 时间复杂度 O(n²)（大数据量性能差）
- 同样无法处理对象引用去重



**3. 使用 reduce**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.reduce((acc, cur) => {
  return acc.includes(cur) ? acc : [...acc, cur];
}, []);
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
**优点**：
- 函数式编程风格
- 灵活（可在回调中添加复杂逻辑）

**缺点**：
- 每次迭代创建新数组（性能较差）



**4. 使用对象键值（适用于基本类型）**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const obj = {};
const uniqueArr = [];
for (const item of arr) {
  if (!obj[item]) {
    obj[item] = true;
    uniqueArr.push(item);
  }
}
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
**优点**：
- 时间复杂度 O(n)（性能最好）
- 兼容所有浏览器

**缺点**：

- 仅适用于字符串/数字（对象会被转为 `[object Object]`）
- 无法区分 `'1'` 和 `1`



**5. 使用 Map（ES6，支持对象去重）**

```javascript
const arr = [{id: 1}, {id: 1}, {id: 2}];
const map = new Map();
const uniqueArr = arr.filter(item => {
  const key = JSON.stringify(item); // 根据实际需求生成唯一 key
  return map.has(key) ? false : map.set(key, true);
});
console.log(uniqueArr); // [{id: 1}, {id: 2}]
```
**优点**：

- 支持对象去重
- 性能接近 O(n)

**缺点**：

- **对象顺序变化会导致 key 不同（如 `{a:1, b:2}` 和 `{b:2, a:1}`）**



**6. 排序后去重（适用于数字/字符串）**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.sort().filter((item, index, array) => {
  return index === 0 || item !== array[index - 1];
});
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
**优点**：
- 时间复杂度 O(n log n)（排序占主导）

**缺点**：
- 会改变原数组顺序
- 不适用于对象



**7. 使用 includes（ES7）**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [];
arr.forEach(item => {
  if (!uniqueArr.includes(item)) {
    uniqueArr.push(item);
  }
});
console.log(uniqueArr); // [1, 2, 3, 4, 5]
```
**优点**：
- 代码直观

**缺点**：
- 时间复杂度 O(n²)
- 不兼容 IE



**方法对比总结**

| 方法             | 时间复杂度 | 对象支持 | 兼容性   | 代码简洁度 |
| ---------------- | ---------- | -------- | -------- | ---------- |
| Set              | O(n)       | ❌        | ES6+     | ★★★★★      |
| filter + indexOf | O(n²)      | ❌        | ES5+     | ★★★☆☆      |
| reduce           | O(n²)      | ❌        | ES5+     | ★★★★☆      |
| 对象键值         | O(n)       | ❌        | 全浏览器 | ★★★☆☆      |
| Map              | O(n)       | ✅        | ES6+     | ★★★★☆      |
| 排序后去重       | O(n log n) | ❌        | ES5+     | ★★★☆☆      |
| includes         | O(n²)      | ❌        | ES7+     | ★★★★☆      |




### **实现一个深比较函数(deepEqual)**

- 基本类型比较
- 对象/数组递归比较
- 循环引用处理
- Date/RegExp特殊类型比较



深比较函数用于递归比较两个值是否完全相等（包括对象、数组等复杂类型的结构比较）。以下是完整实现和详细解析：

**1. 基础版本实现**

```javascript
function deepEqual(a, b) {
  // 1. 处理基本类型和严格相等
  // 基本类型且值相同、对象类型且引用相同、均为null、均为undefined
  if (a === b) return true;

  // 2. 处理 null
  // 排除其中之一是null的情况
  // 单独拿出来判断的原因是：typeof(null)的结果是‘object’，第3步判断不了
  if (a === null || b === null) return false;

  // 3. 处理非对象类型（Number, String, Boolean, Symbol 等）
  // 排除其中之一不是object类型的情况
  // function类型也会被排除，因为function类型一般不比较（比较时用===）
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  // =======从此开始，都是object类型之间的比较======
  // 4. 处理数组
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // 5. 处理对象
  const keysA = Object.keys(a); // 获取自身所有可枚举的属性key
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}
```

**使用示例**

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(deepEqual(obj1, obj2)); // true

const arr1 = [1, [2, 3]];
const arr2 = [1, [2, 3]];
console.log(deepEqual(arr1, arr2)); // true
```



**2. 进阶优化版本**

**(1) 处理循环引用**

```javascript
function deepEqual(a, b, visited = new WeakMap()) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  // 检查循环引用
  // visited 只记录对象类型
  // visited.get(a) === b 说明a和b是第二次比较，第一次比较肯定相同
  if (visited.has(a) && visited.get(a) === b) return true;
  visited.set(a, b); // 记录a和b进行过一次比较

  // 处理数组
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], visited)) return false;
    }
    return true;
  }

  // 处理对象
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key], visited)) return false;
  }

  return true;
}
```

**(2) 支持特殊对象（Date, RegExp 等）**

```javascript
function deepEqual(a, b, visited = new WeakMap()) {
  // ... 前面的基础逻辑 ...

  // 处理 Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // 处理 RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // ... 后续的对象比较逻辑（Array、Object） ...
}
```



**3. 边界情况测试**

**测试用例**

```javascript
// 基本类型
console.log(deepEqual(1, 1)); // true
console.log(deepEqual('a', 'a')); // true
console.log(deepEqual(true, true)); // true

// 对象
console.log(deepEqual({ a: 1 }, { a: 1 })); // true
console.log(deepEqual({ a: 1 }, { a: 2 })); // false

// 数组
console.log(deepEqual([1, 2], [1, 2])); // true
console.log(deepEqual([1, [2]], [1, [2]])); // true

// 循环引用
const objA = { a: 1 };
objA.self = objA;
const objB = { a: 1 };
objB.self = objB;
console.log(deepEqual(objA, objB)); // true

// 特殊对象
console.log(deepEqual(new Date('2023-01-01'), new Date('2023-01-01'))); // true
console.log(deepEqual(/abc/, /abc/)); // true
```



**4. 实现要点总结**

| **关键点**    | **处理方式**                  |
| ------------- | ----------------------------- |
| **基本类型**  | 直接 `===` 比较               |
| **对象/数组** | 递归比较每个属性或元素        |
| **循环引用**  | 使用 `WeakMap` 记录已访问对象 |
| **特殊对象**  | 单独处理 `Date`、`RegExp` 等  |
| **性能优化**  | 先比较长度/键数量，快速失败   |



**5. 常见面试问题**

**Q1: 为什么用 `WeakMap` 而不是 `Map`？**

- **答**：`WeakMap` 的键是弱引用，不会阻止垃圾回收，避免内存泄漏。

**Q2: 如何比较函数？**

- **答**：**函数通常比较引用（`===`），但实际业务中很少需要深比较函数。**

**Q3: 如何优化大数据结构的比较性能？**

- **答**：先比较简单属性（如 `length` 或 `size`），再用哈希或备忘录模式减少重复计算。



### **实现一个深拷贝函数(deepCopy)**

- 拷贝基本类型

- 拷贝对象/数组

- 处理循环引用

- 拷贝Date/RegExp/Map/Set等特殊类型

- 性能优化



深拷贝是指创建一个新对象，完全复制原始对象的所有层级属性，使得新旧对象完全独立互不影响。以下是完整实现方案：

**1. 基础版本（支持对象、数组、基本类型）**

```javascript
function deepCopy(source) {
  // 1. 处理非对象类型（string/number/boolean/null/undefined/symbol）
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  // 2. 处理数组
  if (Array.isArray(source)) {
    const copy = [];
    for (const item of source) {
      copy.push(deepCopy(item)); // 递归拷贝数组元素
    }
    return copy;
  }

  // 3. 处理普通对象
  const copy = {};
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      copy[key] = deepCopy(source[key]); // 递归拷贝对象属性
    }
  }
  return copy;
}
```

**使用示例**

```javascript
const original = {
  a: 1,
  b: [2, 3],
  c: { d: 4 }
};

const copied = deepCopy(original);
console.log(copied.b === original.b); // false（深拷贝成功）
```



**2. 进阶版本（处理循环引用、特殊对象）**

```javascript
function deepCopy(source, visited = new WeakMap()) {
  // 基本类型直接返回
  if (typeof source !== 'object' || source === null) {
    return source;
  }

  // 处理循环引用
  if (visited.has(source)) {
    return visited.get(source);
  }

  // 处理特殊对象、Array、Object
  // 根据source类型执行对应的拷贝处理
  let copy = null;
  let copyFn = null;
  if (source instanceof Date) {
    // Date
    copy = new Date(source);
  } else if (source instanceof RegExp) {
    // RegExp
    copy = new RegExp(source);
  } else if (source instanceof Map) {
    // Map
    copy = new Map();
    copyFn = () => {
      for (const [key, val] of source) {
        copy.set(deepCopy(key, visited), deepCopy(val, visited));
      }
    };
  } else if (source instanceof Set) {
    // Set
    copy = new Set();
    copyFn = () => {
      for (const val of source) {
        copy.add(deepCopy(val, visited));
      }
    };
  } else if (Array.isArray(source)) {
    // Array
    copy = [];
    copyFn = () => {
      for (const val of source) {
        copy.push(deepCopy(val, visited));
      }
    };
  } else {
    // Object
    copy = Object.create(Object.getPrototypeOf(source)); // 创建copy的同时保持原型链
    copyFn = () => {
      for (const key of Object.keys(source)) {
        copy[key] = deepCopy(source[key], visited);
      }
      // 处理 Symbol 属性
      for (const symbolKey of Object.getOwnPropertySymbols(source)) {
        copy[symbolKey] = deepCopy(source[symbolKey], visited);
      }
    };
  }
  visited.set(source, copy); // 记录已拷贝对象。尽早执行，避免循环引用导致死循环
  copyFn && copyFn(); // 开始拷贝

  // 处理 Symbol 属性
  const symbolKeys = Object.getOwnPropertySymbols(source);
  for (const symKey of symbolKeys) {
    copy[symKey] = deepCopy(source[symKey], visited);
  }

  return copy;
}
```

**支持特性**

- ✅ 循环引用检测（通过 `WeakMap`）
- ✅ 特殊对象处理（`Date`/`RegExp`/`Map`/`Set`）
- ✅ Symbol 属性拷贝
- ✅ 原型链保持

**测试用例**

```javascript
// 循环引用
const obj = { a: 1 };
obj.self = obj;
const copiedObj = deepCopy(obj);
console.log(copiedObj.self === copiedObj); // true

// 特殊对象
const date = new Date();
const copiedDate = deepCopy(date);
console.log(copiedDate.getTime() === date.getTime()); // true

// Map/Set
const map = new Map([['key', { value: 42 }]]);
const copiedMap = deepCopy(map);
console.log(copiedMap.get('key').value); // 42
```



**3. 性能优化版本（针对大数据）**

```javascript
function deepCopy(source, visited = new WeakMap()) {
  // 基础类型和已处理对象直接返回
  if (typeof source !== 'object' || source === null) return source;
  if (visited.has(source)) return visited.get(source);

  // 快速浅拷贝（减少递归层数）
  const shallowCopy = Array.isArray(source) ? [...source] : { ...source };
  visited.set(source, shallowCopy);

  // 仅处理需要深拷贝的属性
  for (const key in shallowCopy) {
    if (typeof shallowCopy[key] === 'object' && shallowCopy[key] !== null) {
      shallowCopy[key] = deepCopy(shallowCopy[key], visited);
    }
  }

  return shallowCopy;
}
```
**适用场景**：对象层级较深但多数属性是基本类型时。



**4. 替代方案对比**

| **方法**                 | **优点**                 | **缺点**                          |
| ------------------------ | ------------------------ | --------------------------------- |
| **递归实现**             | 完全控制拷贝过程         | 需手动处理所有边界情况            |
| **JSON.parse/stringify** | 简单快捷                 | 丢失函数/Symbol/循环引用/特殊对象 |
| **Lodash _.cloneDeep**   | 功能完善，生产环境首选   | 增加依赖体积                      |
| **structuredClone**      | 浏览器原生，支持循环引用 | 不支持函数/RegExp/原型链          |

**JSON 方法示例（局限性明显）**

```javascript
const obj = { a: 1, b: new Date() };
const copied = JSON.parse(JSON.stringify(obj));
console.log(copied.b); // 字符串（Date 对象被转成字符串）
```



**5. 实现要点总结**

| **关键点**   | **处理方案**                                             |
| ------------ | -------------------------------------------------------- |
| **基本类型** | 直接返回                                                 |
| **循环引用** | 使用 `WeakMap` 缓存已拷贝对象                            |
| **特殊对象** | 分别处理 `Date`/`RegExp`/`Map`/`Set`                     |
| **原型链**   | 通过 `Object.create(Object.getPrototypeOf(source))` 保持 |
| **性能优化** | 对大数据先浅拷贝，再递归处理引用类型属性                 |



**6. 面试常见问题**

**Q1: 为什么用 `WeakMap` 而不是 `Map`？**

- **答**：`WeakMap` 的键是弱引用，不会阻止垃圾回收，避免内存泄漏。

**Q2: 如何拷贝函数？**

- **答**：函数通常不需要深拷贝（直接赋值引用即可），如需拷贝可使用 `eval(fn.toString())`（有安全性风险）。

**Q3: 如何验证深拷贝成功？**

- **答**：检查拷贝后的对象与原对象 `!==`，且修改拷贝对象不影响原对象。

