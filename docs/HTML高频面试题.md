

# HTML 高频面试题

> [!NOTE]
>
> **必考（几乎必问）**
>
> 1. HTML5 新特性
> 2. 语义化标签及意义
> 3. DOCTYPE 作用
> 4. 行内元素 vs 块级元素 vs 行内块元素
> 5. Cookie、LocalStorage、SessionStorage 区别
>
> **高频（常问）**
>
> 1. Canvas 和 SVG 的区别
> 2. History API（pushState、replaceState、popstate）
> 3. script 标签的 async 和 defer 区别
> 4. HTML 渲染流程（DOM 树构建、CSSOM 树、Render Tree）
> 5. 跨域解决方案（CORS、JSONP、Nginx 代理）
>
> **加分（进阶或大厂可能问）**
>
> 1. Web Worker 作用及限制
> 2. 拖放 API（Drag & Drop）
> 3. Web Components（Shadow DOM、Custom Elements）
> 4. HTML 性能优化（预加载、懒加载、SSR）
> 5. Meta 标签 SEO 优化



## HTML基础知识

### 对于Web标准以及W3C的理解

Web标准简单来说可以分为结构、表现、行为。其中结构是由HTML各种标签组成，简单来说就是body里面写入标签是为了页面的结构。表现指的是CSS层叠样式表，通过CSS可以让我们的页面结构标签更具美感。行为指的是页面和用户具有一定的交互，这部分主要由JS组成。

W3C，全称：World Wide Web Consortium是一个制定各种标准的非盈利性组织，也叫万维网联盟，标准包括HTML、CSS、ECMAScript等等，Web标准的制定有很多好处，比如说：

- 可以统一开发流程，统一使用标准化开发工具（VSCode、WebStorm、Sublime），方便多人协作

- 学习成本降低，只需要学习标准就行，否则就要学习各个浏览器厂商标准

- 跨平台，方便迁移都不同设备

- 降低代码维护成本



### 前端页面由哪三层构成

前端页面的构成：结构层、表示层、行为层。

1.  **结构层（structural layer）**

结构层类似于盖房子需要打地基以及房子的悬梁框架，它是由HTML超文本标记语言来创建的，也就是页面中的各种标签，在结构层中保存了用户可以看到的所有内容，比如说：一段文字、一张图片、一段视频等等。

2.  **表示层（presentation layer）**

表示层是由CSS负责创建，它的作用是如何显示有关内容，学名：层叠样式表，也就相当于装修房子，看你要什么风格的，田园的、中式的、地中海的，总之CSS都能办妥。

3.  **行为层（behavior layer）**

行为层表示网页内容跟用户之间产生交互性，简单来说就是用户操作了网页，网页给用户一个反馈，这是JavaScript和DOM主宰的领域。



### DOCTYPE 的作用是什么

DOCTYPE声明的作用是指定HTML文档的类型和版本，告诉浏览器该以何种方式渲染页面。它有助于浏览器以正确的方式解析和显示网页内容。

HTML5 的 DOCTYPE 简化了声明，不基于 SGML（标准通用标记语言），无需引用 DTD。浏览器会以此为标准模式渲染页面。



### 什么是严格模式与混杂模式 *

在HTML文档中，DOCTYPE声明用于告诉浏览器使用哪种文档类型定义（DTD，Document Type Definition）来解析文档。DOCTYPE声明的存在和类型会影响浏览器选择哪种解析模式。

如果HTML或XHTML文档包含形式完整的DOCTYPE声明（例如，对于HTML5，它是\<!DOCTYPE html\>），则浏览器通常会以严格模式呈现页面。然而，如果DOCTYPE不存在或形式不正确，或者如果它包含过渡DTD但没有URI，浏览器可能会以混杂模式呈现页面。

**定义**

- 严格模式：也称标准模式（Standards），页面以浏览器支持的最高标准运行；

- 混杂模式：也称怪异模式（Quirks）或兼容模式，页面以宽松向下兼容的方式显示，模拟老式浏览器的行为。

**区别**

总体会有布局、样式解析、脚本执行三个方面区别，这里列举一些比较常见的区别：

- **盒模型**：在W3C标准中，如果设置一个元素的宽度和高度，指的是元素内容的宽度和高度，然而在Quirks模式下，IE的宽度和高度还包含了padding和border；（`content-box` vs `border-box`)
- **用 margin: 0 auto 设置水平居中**：在Standards模式下，设置 margin: 0 auto 可以使元素水平居中，但是在Quriks模式下失效；
- **设置行内元素的高宽**：在Standards模式下，给行内元素设置width和height都不会生效，而在Quriks模式下会生效；
- **设置百分比高度**：在Standards模式下，如果父元素无明确高度，子元素设置百分比的高度是无效的（等同于 `auto`），而在Quriks模式下可能 **向上追溯** 到窗口高度。



### HTML和XHTML的区别是什么

| **特性**  | **HTML**                   | **XHTML**                |
| :-------- | :------------------------- | :----------------------- |
| 语法      | 宽松，允许小写、不闭合标签 | 严格，必须小写、标签闭合 |
| MIME 类型 | text/html                  | application/xhtml+xml    |
| 错误处理  | 容错性强，浏览器自动修复   | 严格，解析错误会停止渲染 |
| 文档声明  | \<!DOCTYPE html\>          | 需声明 XML 命名空间      |

总结：XHTML 是更严格的 HTML，但 HTML5 已成为主流。



## HTML标签使用

### 行级元素和块级元素分别有哪些

**常见的块级元素**：p、div、form、ul、li、ol、table、h1、h2、h3、h4、h5、h6、dl、dt、dd

**常见的行级元素**：span、a、img、button、input、select



**块级元素 （block-level elements）**

1、每个元素单独占一行

2、可以设置宽高，宽度缺少时是它的容器的100%

3、可以设置外边距和内边距

4、可以容纳其它行级元素和块级元素



**行内元素 （inline elements）**

1、不换行，直到该行被填满才会转到下一行

2、不能设置宽高，宽高由内容决定

3、<u>可以设置左右边距，但上下边距在一些情况下可能会无效或被浏览器忽略；可以设置内边距</u>。

4、只能容纳文本或者其它行内元素



**使用行内元素需要注意的是**：

- 行内元素设置宽度width无效；

- 行内元素设置高度height无效，但是可以通过line-height来设置；

- <u>设置margin只有左右有效，上下无效</u>；

- <u>设置padding只有左右有效，上下无效</u>；

- 可以通过display属性对行内元素和块级元素进行切换。



### iframe的作用以及优缺点 *

**作用**：

- **嵌入其他网页**：例如，在一个新闻网站上，可以使用\<iframe\>将相关的新闻文章嵌入到一个页面中，使用户可以方便地在同一个页面上浏览不同的新闻。

- **嵌入多媒体内容**：通过将视频或音频文件的URL嵌入到\<iframe\>中，可以在网页上直接播放这些媒体内容。这种方式可以提供更好的用户体验，因为用户无需离开当前页面就可以观看视频或听音乐。

- **广告展示**：广告商可以通过\<iframe\>将广告嵌入到网页中，从而在用户浏览网页时展示广告。

- **跨域通信**：由于安全原因，浏览器限制了不同源之间的直接通信。但是，通过使用\<iframe\>，可以在不同源之间进行通信。这种跨域通信的方式被广泛应用于单点登录(SSO)系统和跨域数据共享等场景。

- 内容分割：有时候，一个网页的内容可能非常庞大，加载时间较长。通过使用\<iframe\>，可以将网页分割为多个区域，分别加载不同的内容，这样可以提高页面加载速度，并且在加载过程中，用户可以先看到部分内容，提高用户体验。

- 分页加载：在长网页中，通过将每一页的内容放在一个\<iframe\>中实现分页加载，可以提高网页加载速度，降低用户等待时间。同时，分页加载也可以方便用户在长网页中浏览内容。

- 控制网页布局：通过\<iframe\>可以将网页分割为多个区域，分别加载不同的内容，可以灵活控制网页的布局和样式。

- 加载异步内容：在网页中使用\<iframe\>可以实现异步加载，也就是在主网页加载的同时，通过\<iframe\>加载其他内容，提高网页的响应速度和用户体验。

**优点**：

- 可以在页面上独立显示一个页面或者内容,不会与页面其他元素产生冲突。

- 可以在多个页面中重用同一个页面或者内容,可以减少代码的冗余。

- 加载是**并行**的,页面可以在不等待 iframe 加载完成的情况下进行展示。

- 方便地实现跨域访问。

**缺点**：

- 搜索引擎可能无法正确解析 iframe 中的内容

- <u>会阻塞主页面的 onload 事件</u>

- 和主页面共享连接池,影响页面并行加载

- 安全性问题：嵌入的网页可能包含恶意代码或广告，因此在使用\<iframe\>时需要确保嵌入的网页是可信的



### meta viewport 详解 *

Viewport，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum=1.0, user-scalable=no">
```

其中，content 参数有以下几种：

- width viewport ：宽度(数值/device-width)

- height viewport ：高度(数值/device-height)

- initial-scale ：初始缩放比例

- maximum-scale ：最大缩放比例

- minimum-scale ：最小缩放比例

- user-scalable ：是否允许用户缩放(yes/no）


总结：可设置的内容包括宽高、初始比例、最大最小比例、用户缩放。



## HTML语义化

### 说说对 html 语义化的理解 *

HTML标签的语义化，简单来说，就是用正确的标签做正确的事情，给某块内容用上一个最恰当最合适的标签，使页面有良好的结构，页面元素有含义，无论是谁都能看懂这块内容是什么。

语义化的优点如下：

- 在没有CSS样式情况下也能够让页面呈现出清晰的结构；

- 有利于SEO和搜索引擎建立良好的沟通，有助于爬虫抓取更多的有效信息，爬虫是依赖于标签来确定上下文和各个关键字的权重；

- 方便团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

- 提升无障碍访问（屏幕阅读器解析）

总结：HTML语义化是指使用明确含义的标签构建HTML文档结构，优点是：无CSS时页面结构依然清晰、有利于SEO、可读性强方便团队开发维护、提升无障碍访问。



### 列举常见的语义化标签 *

1. **\<header\>** 头部区域 **\</header\>**

2. **\<main\>** 主要内容 **\</main\>**    

3. **\<footer\>** 页脚 **\</footer\>**  

4. **\<nav\>** 导航栏 **\</nav\>**  

5. **\<aside\>** 侧边栏（广告、相关链接） **\</aside\>**  

6. **\<article\>** 独立内容（如博客文章） **\</article\>**  

7. **\<section\>** 文档中的节（如章节） **\</section\>**  

   

## HTML存储

### 浏览器三种缓存的的区别 * *

|  | **cookie** | **localStorage** | **sessionStorage** |
|:---|:---|:---|:---|
| 由谁初始化 | 客户端或服务器，服务器可以使用 Set-Cookie 请求头。 | 客户端 | 客户端 |
| 过期时间 | 手动设置 | 永不过期 | 当前页面关闭时 |
| 是否随着每个 HTTP 请求发送给服务器 | 是，Cookies会通过 Cookie 请求头，自动发送给服务器 | 否 | 否 |
| 容量（每个域名） | 4kb | 5MB | 5MB |
| 访问权限 | 同源 | 同源 | 同页面 |
| 使用场景 | 存储登录态（如 token） | 长期缓存（如用户主题偏好） | 临时数据（如表单填写中途保存） |

注意：

- SessionStorage在页面关闭或标签页关闭后数据会被清除，**但在页面刷新时并不会清除数据**。

- SessionStorage实现共享的方式：复制页面时，SessionStorage也会被复制一份，但互不影响。



## HTML渲染和性能

### 浏览器输入 URL 后发生了什么 *

**浏览器处理流程**

1.  **URL解析**：浏览器首先解析URL，确定协议（如HTTP或HTTPS）、主机名（如www\.example\.com）、端口（默认为80或443）以及路径（如/path/to/page.html）；

2.  **DNS查询**：浏览器通过DNS（域名系统）服务查找主机名对应的IP地址。如果缓存中有该域名的IP，直接使用；否则，发起DNS查询请求，获取IP地址；

3.  **TCP 握手**：一旦获取到服务器 IP 地址，浏览器就会通过TCP“三次握手”与服务器建立连接。这个机制的是用来让两端尝试进行通信——在浏览器和服务器通过上层协议 HTTPS 发送数据之前，可以协商网络 TCP 套接字连接的一些参数。

4.  **TLS 协商**：对于通过 HTTPS 建立的安全连接，还需要另一次 "握手"。这种握手，或者说 TLS 协商，决定使用哪种密码对通信进行加密，验证服务器，并在开始实际数据传输前建立安全连接。这就需要在实际发送内容请求之前，再往返服务器五次。

5.  **发送HTTP请求**：建立连接后，浏览器构造并发送一个HTTP请求到服务器，请求头通常包含请求方法（如GET或POST）、缓存控制指令等信息。

6.  **服务器响应并发送HTML文件**：服务器收到请求后，处理请求并发送HTML文件作为响应。

7. **浏览器开始解析HTML文件**：

   - 构建 DOM 树（遇到 \<script\> 会阻塞解析）；
   
   
      - 加载 CSS 并构建 CSSOM 树；
   
   
      - 合并为 Render Tree，计算布局（Layout），绘制（Paint）页面。
   


8.  **执行 JavaScript：**defer 或 async 可优化脚本加载。



**注意**

- CSS文件是**后台并行下载**的。如果CSS文件尚未加载完成，浏览器会使用内联样式和已加载的样式表来渲染页面。当CSS文件加载并解析完毕后，浏览器会重新渲染页面，以应用新的样式。

- 如果HTML文档中包含JS脚本，并且这些脚本在DOM树构建完毕后执行（即设置了defer属性），那么浏览器会执行这些脚本。这些脚本可能会修改DOM树或执行其他操作，从而影响页面的外观和行为。

- 在HTML解析过程中，遇到img标签时，发出图片请求，但不等图片下载完成就继续向下解析。等到图片响应之后，再回过来重新渲染图片以及其之后的内容。



### script 的 async/defer 区别 *

**主要区别**

**\<script\>** - HTML 解析中断，脚本被提取并立即执行。执行结束后，HTML 解析继续。

**\<script async\>**（异步加载） - 脚本提取过程与 HTML 解析过程并行，脚本执行完毕可能在 HTML 解析完毕之前。**当脚本与页面上其他脚本独立时，可以使用 async**（不关心代码顺序），比如用作页面统计分析。

**\<script defer\>**（延迟执行） - 脚本提取过程与 HTML 解析过程并行，脚本的执行将在 HTML 解析完毕后进行。如果有多个含 defer 的脚本，脚本的执行顺序将按照在 document 中出现的位置，**从上到下顺序执行**。

注意：没有 src 属性的脚本，async 和 defer 属性会被忽略。



**总结**

- 普通脚本立即提取和执行，打断HTML解析；

- async脚本后台并行提取，提取完立即执行，打断HTML解析；

- defer脚本后台并行提取，提取完等待HTML解析完毕后再执行；

- async脚本按照下载完成顺序执行；而defer脚本会按照它们在 HTML 中出现的顺序执行；

- async脚本中的document.write()会覆盖整个文档；而defer脚本中的document.write()会被忽略。




**适用场景**

- \<script\> - 小型脚本，无依赖，极少数需要同步执行的场景（**现代开发尽量避免**）；

- \<script async\> - 独立脚本（如统计代码）；

- \<script defer\> - 依赖 DOM 或其它脚本的代码。



**最佳实践**

- 大多数情况下优先用 **defer**（保证 DOM 就绪且顺序可控）。

- 非关键脚本用 async（不影响DOM的前提下，可以加速页面渲染）。




### 如何优化 HTML 页面加载速度 *

优化方式如下：

1.  **减少 DOM 数量**：避免嵌套过深。

2.  **CSS 放在 \<head\>**：避免页面闪烁（FOUC）。

3.  **JS 放在 \<body\> 底部**：或使用 defer/async。

4.  **减少HTTP请求**：合并和压缩CSS、JavaScript文件，使用雪碧图或SVG图像等。

5.  **图片懒加载**：\<img loading="lazy"\>。

6.  **预加载关键资源**：提前发现资源并行下载，不影响主线程。预加载优先项：首屏图片、自定义字体、关键CSS/JS
```html 
<link rel="preload" href="style.css" as="style">
```



## HTML5新特性

### H5有哪些新元素和新特性

HTML5主要是关于图像、位置、存储、多任务等功能的增加：

- 语义化标签，如：article、footer、header、nav等

- 表单控件、calendar、date、time、email

- 视频（Video API）、音频（Audio API）

- 画布（CanvasAPI）

- 拖拽释放（Drag and Drop API），用于实现拖放功能，使得用户可以轻松地在网页上拖动和放置元素

- 本地存储API，localStorage长期存储数据，浏览器关闭后数据不丢失，sessionStorage的数据在浏览器关闭后自动删除

- 地理API（Geolocation API），用于获取和使用用户的地理位置信息。

- Web Workers API，用于在后台线程中运行JS代码，以避免阻塞用户界面。这对于处理大量数据或执行复杂计算的任务特别有用。

- WebSocket API，用于建立实时通信（如聊天室、在线游戏等）

- History API，用于操作浏览器的历史记录



### 如何使用 Canvas元素绘制图形

Canvas元素允许在网页上使用JavaScript绘制图形和动画。以下是一个简单的绘制矩形的示例：

```html
<canvas id="myCanvas" width="200" height="200"></canvas>
<script>
    var canvas = document.getElementById("myCanvas");  
    var ctx = canvas.getContext("2d");  
    ctx.fillStyle = "red";  
    ctx.fillRect(50, 50, 100, 100);  
</script>
```

在这个示例中，使用 document.getElementById() 方法获取 Canvas 元素，并通过 getContext(“2d”) 获取2D绘图上下文。 然后，使用 fillStyle 属性设置填充颜色，fillRect() 方法绘制一个矩形。



### Canvas 和 SVG 的区别 *

| **特性** | **Canvas**               | **SVG**              |
| -------- | ------------------------ | -------------------- |
| 图像类型 | 位图（像素）             | 矢量图（XML 描述）   |
| 适合场景 | 动态渲染（游戏、图表）   | 静态图标、可缩放图形 |
| 操作方式 | 通过 JavaScript API 绘制 | 通过 DOM/CSS 操作    |
| 性能     | 高频绘制性能好           | 复杂图形性能较差     |
| 对象操作 | 不支持，只能整个场景重绘 | 支持操作某个具体对象 |



### Web Worker 能操作 DOM 吗 *

作用：在后台线程运行 JavaScript，解决主线程阻塞问题。

限制：不能操作 DOM（线程隔离）；通过 postMessage 与主线程通信。

示例：
```javascript
// main.js  
const worker = new Worker("worker.js");  
worker.postMessage("Start!");  
worker.onmessage = (e) => { console.log(e.data); };  
   
// worker.js  
onmessage = (e) => { postMessage("Done!"); };  
```



### WebSocket 如何建立连接 *

示例：

```javascript
const socket = new WebSocket('ws://example.com');  
socket.onopen = () => { console.log('连接已建立'); };  
socket.onmessage = (event) => { console.log('收到消息:', event.data); };  
socket.send('Hello Server!');  
```

特点：

- 单个 TCP 连接，全双工通信。

- 相比 HTTP 轮询，节省带宽和服务器资源。



### History API 有什么作用 *

HTML5 History API 允许开发者在**不刷新页面**的情况下动态修改浏览器地址栏的 URL，并管理浏览器的历史记录（前进/后退）。它是现代 单页应用（SPA） 路由（如 Vue Router、React Router）的核心底层技术。

history.pushState()、history.replaceState()和popstate事件能够实现无刷新路由（SPA 核心）。这是是因为浏览器底层设计如此，它直接操作浏览器的 历史记录栈（History Stack） 和 地址栏（Address Bar），而不触发HTTP请求。而直接通过window.location.href修改url，则会触发页面刷新，重新加载整个页面。

注意：调用pushState()或replaceState()方法，并不会触发popstate事件；只有点击浏览器前进倒退按钮，或者使用js调用history.back(), history.forward(), history.go()方法时才会触发。

**核心作用**

- 无刷新跳转：改变 URL 不触发页面刷新，仅动态更新页面内容。

- 管理历史记录：可添加、修改或删除历史记录条目（支持前进/后退导航）。

- 状态管理：通过 state 对象存储页面状态（即使刷新页面也能恢复）。

**关键API方法**

1.  **history.pushState(state, title, url)**

- 添加一条历史记录，并更新 URL（不刷新页面）

- 参数：

  - state：关联的状态对象（可在 popstate 事件中获取）。


  - title：浏览器忽略此参数（通常传 null 或空字符串）。


  - url：新的 URL（必须同源）。


```javascript
// 示例：跳转到 /about，不刷新页面  
history.pushState({ page: "about" }, null, "/about");  
```

&nbsp;

2.  **history.replaceState(state, title, url)**

- 替换当前历史记录（不新增记录，无法通过后退返回上一页）。

- 适用于静默更新 URL（如登录状态变化）。

```javascript
// 示例：替换当前 URL 为 /profile  
history.replaceState({ page: "profile" }, null, "/profile");  
```

&nbsp;

3.  **window.onpopstate 事件**

- 当用户点击前进/后退按钮时触发，可在此事件中恢复页面状态。

- 通过 event.state 获取 pushState 或 replaceState 存储的数据。

```javascript
window.addEventListener("popstate", (event) => {  
	console.log("当前状态:", event.state); // 获取历史记录的状态  
    // 根据 event.state 动态更新页面内容...
});  
```

**使用场景**

1.  **单页应用（SPA）路由**

```javascript
// 点击导航菜单时，动态切换内容  
document.getElementById("nav-about").addEventListener("click", (e) => {
    e.preventDefault();  
    history.pushState({ page: "about" }, null, "/about");  
    loadAboutPage(); // 异步加载 about 页面的内容  
});  
```

2.  **无限滚动（记录滚动位置）**

```javascript
// 滚动到下一页时，更新 URL  
history.pushState({ page: 2, scrollPos: 500 }, null, "?page=2");  

// 用户后退时恢复滚动位置  
window.addEventListener("popstate", (event) => {  
    if (event.state?.scrollPos) {  
        window.scrollTo(0, event.state.scrollPos);  
    }  
});  
```

&nbsp;

3.  **模态框（Modal）的 URL 管理**

```javascript
// 打开模态框时更新 URL  
history.pushState({ modal: "settings" }, null, "?modal=settings");  


// 用户关闭模态框时返回上一页  
document.getElementById("close-modal").addEventListener("click", () => {  
    history.back(); // 等同于用户点击后退按钮  
});  
```

**注意事项**

- 同源策略：pushState 的 URL 必须与当前页面同源（协议+域名+端口一致）。

- SEO 优化：SPA 需配合服务端渲染（SSR）或预渲染，否则搜索引擎无法抓取动态内容。

- 服务器配置：需将所有路径重定向到 index.html（避免 404 错误）。（原因：虽然通过 history api 修改url，不会触发页面刷新，但**用户通过地址栏直接修改url时，依然会触发页面刷新**，服务器配置就是为了避免此种情况）



## HTML综合问题

### 如何实现跨标签页通信 *

**一、LocalStorage**

```javascript
// A页面  
localStorage.setItem("msg","Hello B!");  

// B页面监听storage事件  
window.addEventListener("storage", e => {  
    console.log(e.key, e.newValue); // 输出 "msg", "Hello B!"  
});  
```



**二、window.open & window.postMessage**

通过在一个标签页中使用 window.open 打开另一个标签页，并使用 window.postMessage 进行消息传递，可以实现跨标签页通信。

```javascript
// 页面A  
const newWindow = window.Open("B.html", "_blank");  
newWindow.postMessage("Hellow from A", "*");  

// 页面B  
window.addEventListener("message", event => {  
    console.log(event.data); // Hello from A  
});  
```

如果考虑到安全问题，可以在postMessage时指定目标origin（源），而不是“\*”，在接受消息时也可以验证发送消息的origin是否和预想的origin是否一致。（验证源的原因是，窗口虽然没变，但可能跳转到了其他网站，源发生了变化）

```javascript
// 页面A, url是http://localhost:8080/a.html  
const toOrigin = "http://localhost:8081";  
const toUrl = toOrigin + "/b.html";  
const newWindow = window.Open(toUrl, "_blank");  
newWindow.postMessage("Hello from a", toOrigin);  

// 页面B, url是http://localhost:8081/b.html  
const fromOrigin = "http://example.com:8080";
// 或者使用 window.onmessage = ...
window.addEventListener("message", event => {  
    if(e.origin !== fromOrigin) return;  
    console.log(e.data); // Hello from a  
});  
```



**三、BroadCast Channel（更现代的方式）**

Broadcast Channel API 允许浏览上下文（即 window、tab、frame 或 iframe）与同源的 worker 之间进行基本通信。

通过创建 BroadcastChannel 对象，你可以接收发布到该对象的任何消息。你不必维护对要与之通信的框架或 worker 的引用：他们可以通过构建具有相同名称的 BroadcastChannel 来“订阅”特定频道，并在它们之间进行双向通信。

```javascript
// 页面A  
const channel = new BroadcastChannel("myChannel");  
channel.postMessage("Hello from A!");  

// 页面B  
const channel = new BroadcastChannel("myChannel");  
channel.onmessage = e => {  
    console.log(e.data); // Hello from A!  
};  

// 关闭广播  
channel.close();  
```



**四、Service Worker**

Service worker 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用来采取适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。

Service worker 是一个注册在指定源和路径下的事件驱动 worker。它采用 JavaScript 文件的形式，控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。你可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。

使用 ServiceWorkerContainer.register() 方法首次注册 service worker。如果注册成功，service worker 就会被下载到客户端并尝试安装或激活，这将作用于整个域内用户可访问的 URL，或者其特定子集。

```html
// 页面A  
<body>  
    <h1>页面一</h1>  
    <button>发送</button>  
    <script>  
        navigator.serviceWorker.register("./sw.js").then(() => {  
            console.log("service worker 注册成功");  
        });  

        document.querySelector("button").onclick = function () {  
            navigator.serviceWorker.controller.postMessage("hello");  
        };  
    </script>  
</body>  



// 页面B  
<body>  
    <h1>页面二</h1>  
    <script>  
        navigator.serviceWorker.register("./sw.js").then(() => {  
            console.log("service worker 注册成功");  
        });  

        navigator.serviceWorker.onmessage = function ({ data }) {  
            console.log(data);  
        };  
    </script>  
</body>  
```

```javascript
// sw.js  
self.addEventListener("message", async (event) => {  
    const clients = await self.clients.matchAll();  
    clients.forEach(function (client) {  
        client.postMessage(event.data);  
    });  
});  
```



### 如何实现一个拖拽功能 *

1.  给元素设置 draggable="true"。

2. 监听事件：

   - dragstart：开始拖拽时存储数据。


   - dragover：阻止默认行为以允许放置。


   - drop：处理放置逻辑。


```html
<div draggable="true" id="drag-item">拖拽我</div>  
<div id="drop-area">放置区</div>  
<script>  
    document.getElementById("drag-item").addEventListener("dragstart", (e) => {  
        // 第一个参数可以自定义 Key，但通常建议使用 标准MIME 类型 或 常见格式  
        // 主要考虑到浏览器兼容性和跨应用拖放  
        e.dataTransfer.setData("text/plain", e.target.id);  
    });  

    document.getElementById("drop-area").addEventListener("dragover", (e) => {  
        // dragover事件的默认行为必须阻止！！！  
        // 默认情况下，浏览器会阻止元素接受拖放（即不会触发 drop 事件）  
        // 必须调用 e.preventDefault() 或 return false，才能让目标元素变成可放置区域  
        e.preventDefault();  
    });  

    document.getElementById("drop-area").addEventListener("drop", (e) => {  
        // drop事件也要阻止默认行为，是为了防止浏览器默认处理（如拖放文件时浏览器会尝试打开文件）  
        e.preventDefault();  
        const id = e.dataTransfer.getData("text/plain");  
        e.target.appendChild(document.getElementById(id));  
    });  
</script>  
```

