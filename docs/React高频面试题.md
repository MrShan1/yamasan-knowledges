# **React** 高频面试题

> [!NOTE]
>
> **React 面试高频知识点分类**  
>
> **🔥 必考（几乎必问）**  
>
> 1. 虚拟 DOM 与 Diffing 算法  
> 2. JSX 本质  
> 3. 组件通信（Props、回调、Context）  
> 4. Hooks 核心（`useState`、`useEffect`、`useContext`）  
> 5. 受控组件 vs 非受控组件  
> 6. React 生命周期（类组件）  
> 7. `key` 的作用  
>
> **📌 高频（80%概率）**  
>
> 1. `useMemo` 和 `useCallback` 优化  
> 2. React Fiber 架构  
> 3. 错误边界（Error Boundary）  
> 4. 函数组件 vs 类组件  
> 5. Redux 核心流程（Action、Reducer、Store）  
> 6. React Router 基础（路由匹配、导航）  
> 7. 性能优化（`React.memo`、`PureComponent`）  
>
> **✨ 加分（进阶/原理）**  
>
> 1. 自定义 Hook 实现  
> 2. React 18 新特性（并发模式、自动批处理）  
> 3. SSR（Next.js） vs CSR  
> 4. React 合成事件机制  
> 5. Hooks 实现原理（闭包、链表存储）  
> 6. Redux 中间件（如 Redux-Thunk、Redux-Saga）  
> 7. 状态管理方案对比（Redux vs Context vs Zustand）  
>



## **核心概念**
### **React 是什么？它的主要特点是什么？**  

- 用于构建用户界面的 JavaScript 库，基于组件化、声明式编程和虚拟 DOM。
- 特点：单向数据流、JSX 语法、高效的 DOM 更新（Diffing 算法）。



### **虚拟 DOM（Virtual DOM）是什么？如何工作？**  

- 虚拟 DOM 是真实 DOM 的轻量级 JavaScript 对象表示。  
- 工作流程：状态变化 → 生成新虚拟 DOM → 与旧虚拟 DOM 对比（Diffing）→ 局部更新真实 DOM。



### **JSX 是什么？为什么 React 使用 JSX？**  

- JSX 是 JavaScript 的语法扩展，允许在 JavaScript 中编写类似 HTML 的代码。  
- 本质上是 `React.createElement()` 的语法糖，便于描述 UI 结构。



### **React 组件通信方式有哪些？**  

- 父传子：`props`  
- 子传父：通过父组件传递的回调函数  
- 兄弟组件：状态提升到共同父组件，或使用 Context/状态管理库（Redux、MobX）  
- 跨层级：Context API、全局状态管理。



## **组件与生命周期**
### **类组件和函数组件的区别？**  

- 类组件：使用 ES6 Class，有生命周期和状态（`this.state`）。  
- 函数组件：无状态（React 16.8 前），通过 Hooks 实现状态和生命周期。



### **React 的生命周期方法有哪些？（类组件）**  

- **挂载阶段**：`constructor` → `render` → `componentDidMount`  
- **更新阶段**：`shouldComponentUpdate` → `render` → `componentDidUpdate`  
- **卸载阶段**：`componentWillUnmount`



### **`useEffect` 如何模拟生命周期？（函数组件）**  

- `componentDidMount`：`useEffect(() => {}, [])`  
- `componentDidUpdate`：`useEffect(() => {}, [deps])`  
- `componentWillUnmount`：`useEffect(() => { return () => {} }, [])`



### **什么是受控组件和非受控组件？**  

- **受控组件**：表单数据由 React 状态管理（如 `value` + `onChange`）。  
- **非受控组件**：表单数据由 DOM 自身管理（通过 `ref` 获取值）。



## **Hooks 相关**
### **React Hooks 是什么？为什么需要 Hooks？**  

- Hooks 是 React 16.8 引入的函数式组件特性，用于复用状态逻辑、替代类组件。  
- 优势：简化组件逻辑、避免嵌套高阶组件（HOC）、更清晰的代码结构。



### **常用 Hooks 及其作用**  

- `useState`：管理组件状态。  
- `useEffect`：处理副作用（数据请求、订阅等）。  
- `useContext`：访问 Context 值。  
- `useRef`：获取 DOM 引用或保存可变值。  
- `useMemo`/`useCallback`：性能优化（缓存值/函数）。



### **`useMemo` 和 `useCallback` 的区别？**  

- `useMemo`：缓存计算结果，避免重复计算。  
- `useCallback`：缓存函数引用，避免子组件不必要的重渲染。



### **Hooks 的使用规则**  

- 只能在函数组件或自定义 Hook 中调用。  
- 必须在顶层调用（不能嵌套在条件/循环中）。



## **状态管理**
### **React 的 Context API 是什么？适用场景？**  

- 用于跨层级组件共享数据，避免层层传递 props。  
- 适用场景：主题、用户身份等全局数据。



### **Redux 的核心概念和工作流程？**  

- **核心概念**：Store、Action、Reducer。  
- **工作流程**：`View → Dispatch(Action) → Reducer → Store → View`。



### **Redux 与 React Context 的区别？**  

- Redux 提供更强大的状态管理（中间件、时间旅行调试等），适合复杂应用。  
- Context 适合简单场景，但缺乏 Redux 的中间件和性能优化。



## **性能优化**
### **如何避免组件不必要的重渲染？**  

- 使用 `React.memo` 缓存函数组件。  
- 类组件继承 `PureComponent` 或实现 `shouldComponentUpdate`。  
- 合理使用 `useMemo` 和 `useCallback`。



### **React 的 Diffing 算法原理？**  

- 同层比较（不跨层级）、Key 优化（列表项的唯一标识）、组件类型判断。



### **如何优化长列表渲染？**  

- 使用虚拟滚动库（如 `react-window` 或 `react-virtualized`）。



## **进阶问题**
### **React Fiber 是什么？**  

- React 16 引入的新的协调引擎，支持增量渲染和任务优先级调度，提升动画、手势等场景的性能。



### **React 中的错误边界（Error Boundary）？**  

- 通过 `componentDidCatch` 或 `static getDerivedStateFromError` 捕获子组件的 JavaScript 错误，避免整个应用崩溃。



### **SSR（服务端渲染）和 CSR（客户端渲染）的区别？**  

- SSR：服务端生成 HTML，利于 SEO 和首屏加载。  
- CSR：客户端动态渲染，交互更流畅。



## **实战问题**
### **如何实现一个自定义 Hook？**  

- 示例：封装数据请求 Hook（`useFetch`）。  
```javascript
const useFetch = (url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  return data;
};
```



### **React 中的 key 有什么作用？**  

- 帮助 React 识别列表项的唯一性，优化 Diffing 算法性能。

