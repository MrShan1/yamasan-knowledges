# HTTP及浏览器 高频面试题

> [!NOTE]
>
> **HTTP及浏览器 高频面试知识点分类：**  
>
> **必考（必须掌握）**  
>
> 1. **HTTP状态码**（2xx/3xx/4xx/5xx）  
> 2. **HTTP缓存机制**（强缓存、协商缓存）  
> 3. **HTTPS工作原理**（TLS握手、加密方式）  
> 4. **GET vs POST**  
> 5. **输入URL到页面渲染的流程**  
> 6. **跨域解决方案**（CORS、JSONP、代理）  
> 7. **浏览器事件循环**（宏任务、微任务）  
> 8. **Cookie/Session/Token的区别**  
>
> **高频（常问）**  
>
> 1. **HTTP/1.1 vs HTTP/2 vs HTTP/3**  
> 2. **TCP三次握手/四次挥手**  
> 3. **重排（Reflow）和重绘（Repaint）**  
> 4. **浏览器存储**（Cookie、LocalStorage、SessionStorage）  
> 5. **XSS和CSRF攻击及防御**  
> 6. **Web性能优化**（CDN、懒加载、防抖节流）  
> 7. **Service Worker & PWA**  
>
> **加分（进阶）**  
>
> 1. **HTTP/3（QUIC协议）的优势**  
> 2. **前端监控（埋点、错误上报）**  
> 3. **大文件上传（分片、断点续传）**  
> 4. **浏览器多进程架构**  
> 5. **Web安全（CSP、SameSite Cookie）**  
> 6. **前端渲染优化（SSR、Islands架构）**  
>



## **HTTP协议相关**
### **HTTP 1.0/1.1/2.0/3.0 的主要区别**  

- **HTTP/1.1**：持久连接（Keep-Alive）、管道化（Pipelining）、缓存优化（如`Cache-Control`）。  
- **HTTP/2**：二进制分帧、多路复用、头部压缩（HPACK）、服务器推送（Server Push）。  
- **HTTP/3**：基于QUIC协议（UDP实现），解决队头阻塞（HOLB）、0-RTT快速握手。



**HTTP 协议演进**

**1. HTTP/1.0（1996）**

- **特点**：  
  - 短连接：每个请求需新建/关闭TCP连接（高延迟）。  
  - 无状态：无默认持久化机制，依赖`Connection: keep-alive`（非标准）。  
- **问题**：  
  - 频繁TCP握手（三次握手+四次挥手），性能差。  

---

**2. HTTP/1.1（1999）**

- **核心改进**：  
  - **持久连接**（默认`Connection: keep-alive`）：复用TCP连接，减少握手开销。  
  - **管道化（Pipelining）**：允许连续发送多个请求（但响应必须按顺序返回，易队头阻塞）。  
  - **缓存优化**：引入`Cache-Control`（如`max-age`）、`ETag`等。  
  - **分块传输**（`Transfer-Encoding: chunked`）：支持流式传输。  
- **遗留问题**：  
  - 队头阻塞（Head-of-Line Blocking）：一个请求延迟会阻塞后续请求。  
  - 头部冗余：每次请求重复携带相同头部（如`Cookie`）。  

---

**3. HTTP/2（2015）**

- **核心改进**：  
  - **二进制分帧**：不再使用文本格式来传输数据，将报文拆分为二进制帧（Frame），提升解析效率。  
  - **多路复用（Multiplexing）**：一个TCP连接上并行传输多个请求/响应，彻底解决HTTP层队头阻塞。  
  - **头部压缩（HPACK）**：减少头部体积，通过共享头部信息，可以显著减少传输的数据量。（如用索引表复用字段）
  - **服务器推送（Server Push）**：主动推送资源（如CSS/JS）到客户端缓存。  
- **局限**：  
  - 仍基于TCP，可能因TCP丢包重传导致队头阻塞（传输层问题）。  

---

**4. HTTP/3（2022）**

- **底层协议变革**：  
  - **基于QUIC协议**（UDP实现）：绕过TCP限制，解决队头阻塞。（QUIC是快速UDP网络连接（Quick UDP Internet Connections）的缩写）
  - **0-RTT握手**：复用之前连接密钥，减少延迟（类似TLS 1.3）。  
  - **独立流控制**：每个请求流独立传输，丢包不影响其他流。  
  - **内置加密**：QUIC默认集成TLS 1.3，安全性更强。  
- **优势场景**：  
  - 高延迟/不稳定网络（如移动端），弱网环境下性能显著提升。  



**对比总结**

| 特性         | HTTP/1.1            | HTTP/2           | HTTP/3                |
| ------------ | ------------------- | ---------------- | --------------------- |
| **连接方式** | TCP（持久连接）     | TCP（多路复用）  | QUIC（UDP）           |
| **队头阻塞** | HTTP层和TCP层均存在 | 仅TCP层存在      | 彻底解决              |
| **头部压缩** | 无                  | HPACK            | QPACK（改进版HPACK）  |
| **传输效率** | 低（文本协议）      | 高（二进制分帧） | 极高（QUIC优化）      |
| **握手延迟** | 1-RTT（TCP+TLS）    | 1-RTT（TCP+TLS） | 0-RTT（QUIC复用连接） |



**关键区别详解**

1. **连接方式**  
   - 1.0：每次请求需新建TCP连接（高延迟）。  
   - 1.1：复用TCP连接（默认开启Keep-Alive）。  
   - 2/3：单连接多路复用，大幅提升并发能力。

2. **传输效率**  
   - 1.1：文本协议，头部重复传输。  
   - 2：二进制分帧 + 头部压缩，减少冗余数据。  
   - 3：QUIC内置加密和拥塞控制，降低握手延迟（0-RTT）。

3. **队头阻塞（HOL Blocking）**  
   - 1.1：同一TCP连接需按顺序处理请求（管道化易失败）。  
   - 2：应用层多路复用，但TCP层仍可能阻塞。  
   - 3：QUIC基于UDP，每个流独立传输，彻底解决队头阻塞。

4. **安全性**  
   - 1.0/1.1：明文传输（需HTTPS额外加密）。  
   - 2/3：默认要求HTTPS（HTTP/2强制，HTTP/3的QUIC内置TLS）。



**面试回答技巧**

- **强调演进逻辑**：  

  > “HTTP/1.1通过持久连接减少握手开销，但仍有队头阻塞；HTTP/2通过多路复用解决应用层阻塞，但受限于TCP；HTTP/3改用QUIC协议，从传输层彻底解决问题。”  
  >
  > “从1.1到2的重点是解决应用层效率，而3则是通过替换TCP协议解决传输层根本问题。”

- **举例说明**：  

  > “HTTP/2的多路复用允许在同一个TCP连接上并行传输多个请求，而HTTP/1.1即使启用管道化，响应仍需按顺序返回，容易阻塞。”  



### **HTTP常见状态码及其含义**  

- 1xx：消息（100 客户端应继续其请求）。  
- 2xx：成功（200 OK、204 No Content）。 
- 3xx：重定向（301永久、302临时、304缓存命中）。  
- 4xx：客户端错误（400 Bad Request、401 Unauthorized、403 Forbidden、404 Not Found）。  
- 5xx：服务端错误（500 Internal Error、502 Bad Gateway、503 Service Unavailable）。



HTTP 状态码用于表示服务器对请求的处理结果，由 **3位数字** 和描述短语组成。以下是核心状态码分类及典型场景：

**1. 1xx（信息性状态码）**

| 状态码  | 描述                | 场景                                                         |
| ------- | ------------------- | ------------------------------------------------------------ |
| **100** | Continue            | 客户端应继续发送请求体（用于大文件上传前预检服务器是否接受）。 |
| **101** | Switching Protocols | 服务器同意升级协议（如从 HTTP 切换到 WebSocket）。           |



**2. 2xx（成功状态码）**

| 状态码  | 描述       | 场景                                                         |
| ------- | ---------- | ------------------------------------------------------------ |
| **200** | OK         | 请求成功（GET返回资源，POST返回操作结果）。                  |
| **201** | Created    | 资源创建成功（如提交表单后返回新资源的URL，常见于RESTful API）。 |
| **204** | No Content | 请求成功，但无返回内容（如删除资源后响应）。                 |

**示例**：
```http
HTTP/1.1 200 OK
Content-Type: application/json
{"data": "success"}
```



**3. 3xx（重定向状态码）**

重定向的实际应用：域名更换、HTTPS升级、登录跳转等。

| 状态码  | 描述              | 场景                                                         |
| ------- | ----------------- | ------------------------------------------------------------ |
| **301** | Moved Permanently | 资源永久重定向（浏览器会缓存新地址，后续直接访问新URL）。比如网址从http永久升级到https，和SEO优化有关 |
| **302** | Found             | 资源临时重定向（浏览器下次仍请求原URL）。例如：未登录用户访问受限页面，临时重定向到登录页 |
| **304** | Not Modified      | 资源未修改，使用缓存（响应中无Body，配合`If-Modified-Since`使用）。 |

**示例**：

```http
HTTP/1.1 301 Moved Permanently
Location: https://new.example.com
```



**4. 4xx（客户端错误状态码）**

| 状态码  | 描述              | 场景                                                   |
| ------- | ----------------- | ------------------------------------------------------ |
| **400** | Bad Request       | 请求语法错误（如JSON格式错误、缺少必填参数）。         |
| **401** | Unauthorized      | 未认证（需提供身份凭证，如登录令牌）。                 |
| **403** | Forbidden         | 服务器拒绝执行（权限不足，如普通用户访问管理员接口）。 |
| **404** | Not Found         | 资源不存在（URL错误或资源已删除）。                    |
| **429** | Too Many Requests | 请求频率过高（触发限流）。                             |

**示例**：
```http
HTTP/1.1 404 Not Found
Content-Type: text/html
<h1>Page Not Found</h1>
```



**5. 5xx（服务器错误状态码）**

| 状态码  | 描述                  | 场景                                                    |
| ------- | --------------------- | ------------------------------------------------------- |
| **500** | Internal Server Error | 服务器内部错误（如代码抛出未捕获的异常）。              |
| **502** | Bad Gateway           | 代理服务器无法从上游获取响应（如Nginx后端的服务崩溃）。 |
| **503** | Service Unavailable   | 服务不可用（如服务器维护或过载）。                      |
| **504** | Gateway Timeout       | 代理服务器等待上游响应超时。                            |

**示例**：
```http
HTTP/1.1 503 Service Unavailable
Retry-After: 3600  // 1小时后重试
```



**6. 高频面试问题**

**Q1：301 和 302 的区别？**  

- **301**：永久重定向，搜索引擎会更新索引（SEO友好）。  
- **302**：临时重定向，浏览器下次仍访问原URL。  

**Q2：401 和 403 的区别？**  
- **401**：未提供身份凭证（如未登录）。  
- **403**：身份已认证但权限不足（如普通用户访问管理员接口）。  

**Q3：502 和 504 的区别？**  

- **502**：代理服务器收到无效响应（如后端进程崩溃）。  
- **504**：代理服务器未在超时时间内收到响应（如后端处理过慢）。  



**总结**

| **分类** | **范围** | **核心状态码**          | **关键词**             |
| -------- | -------- | ----------------------- | ---------------------- |
| 1xx      | 100-199  | 100, 101                | 继续、协议切换         |
| 2xx      | 200-299  | 200, 201, 204           | 成功、创建、无内容     |
| 3xx      | 300-399  | 301, 302, 304           | 重定向、缓存           |
| 4xx      | 400-499  | 400, 401, 403, 404, 429 | 客户端错误、权限、限流 |
| 5xx      | 500-599  | 500, 502, 503, 504      | 服务器错误、超时       |



### **HTTP缓存机制详解**  

- **强缓存**：`Expires`（绝对时间）和`Cache-Control`（相对时间，如`max-age`）。  
- **协商缓存**：`Last-Modified`/`If-Modified-Since`（时间戳）和`ETag`/`If-None-Match`（哈希值）。



HTTP缓存是浏览器或代理服务器存储资源副本，避免重复请求，**显著提升页面加载速度并减少服务器压力**。其核心分为 **强缓存** 和 **协商缓存** 两类。

**1. 强缓存（无需服务器验证）**

浏览器直接判断本地缓存是否有效，若有效则直接使用，**不发送请求到服务器**。  
**响应头控制字段**：

- **`Expires`**（HTTP/1.0）  
  - 值：绝对时间（如 `Expires: Wed, 21 Oct 2025 07:28:00 GMT`）  
  - **问题**：依赖客户端时间，若本地时间不准会导致缓存失效。  
- **`Cache-Control`**（HTTP/1.1，优先级更高）  
  - 常用指令：  
    - `max-age=3600`：缓存有效期（秒），相对时间，解决`Expires`问题。  
    - `no-cache`：禁用强缓存，需走协商缓存。  
    - `no-store`：彻底禁用缓存（不存储任何副本）。  
    - `public`：允许代理服务器缓存（如CDN）。  
    - `private`：仅允许浏览器缓存。  

**示例**：  
```http
Cache-Control: public, max-age=3600
```



**2. 协商缓存（需服务器验证）**

若强缓存失效，浏览器携带缓存标识询问服务器资源是否更新。若未更新（304），则复用缓存；否则返回新资源（200）。  
**控制字段**：  

**(1) `Last-Modified` & `If-Modified-Since`**  

- **首次请求**：服务器返回 `Last-Modified`（资源最后修改时间）。  
  
  ```http
  Last-Modified: Wed, 21 Oct 2025 07:28:00 GMT
  ```
- **再次请求**：浏览器自动带上 `If-Modified-Since`（值为之前的`Last-Modified`）。  
  
  ```http
  If-Modified-Since: Wed, 21 Oct 2025 07:28:00 GMT
  ```
- **服务器对比**：  
  - 若时间一致 → **304 Not Modified**（浏览器用缓存）。  
  - 若时间不一致 → **200 OK + 新资源**。  

**缺点**：  

- 精度仅到秒，频繁修改的资源可能误判。  
- 文件内容未变但修改时间变化（如重新生成）会导致无效请求。  

**(2) `ETag` & `If-None-Match`**（优先级更高）  

- **首次请求**：服务器返回 `ETag`（Entity Tag，资源唯一标识，Entity Tag如哈希值）。
  
  ```http
  ETag: "33a64df551425fcc55e4d42a148795d9"
  ```
- **再次请求**：浏览器带上 `If-None-Match`（值为之前的`ETag`）。  
  ```http
  If-None-Match: "33a64df551425fcc55e4d42a148795d9"
  ```
- **服务器对比**：  
  - `ETag` 一致 → **304 Not Modified**。  
  - `ETag` 不一致 → **200 OK + 新资源**。  

**优势**：  
- 精准判断内容变化（如文件内容未变但修改时间变化仍可命中缓存）。  



**3. 缓存流程总结**

1. **浏览器请求资源**：  
   - 检查 `Cache-Control`/`Expires`，若未过期 → **强缓存**（直接使用本地副本）。  
   - 若过期 → 进入协商缓存。  
2. **协商缓存**：  
   - 发送请求，携带 `If-Modified-Since` 或 `If-None-Match`。  
   - 服务器返回 **304** 或 **200**。  



**4. 实际应用建议**

- **静态资源（JS/CSS/图片）**：  
  ```http
  Cache-Control: public, max-age=31536000  # 1年强缓存
  ```
  配合文件名哈希（如 `app.a1b2c3.js`），内容变化后URL改变，自动跳过缓存。  
- **动态接口（API）**：  
  ```http
  Cache-Control: no-cache  # 强制协商缓存
  ```
- **敏感数据（如用户信息）**：  
  ```http
  Cache-Control: no-store  # 禁止缓存
  ```



**5. 面试常见问题**

**Q1：`no-cache` 和 `no-store` 的区别？**  

- `no-cache`：不直接使用缓存，需向服务器验证（走协商缓存）。  
- `no-store`：彻底不缓存，每次重新请求。  

**Q2：为什么既有 `Last-Modified` 又有 `ETag`？**  
- `Last-Modified` 精度低（秒级），`ETag` 可解决内容未变但时间变化的问题（如文件重新生成）。  

**Q3：用户强制刷新（Ctrl+F5）时会发生什么？**  
- 浏览器忽略强缓存和协商缓存，直接发送请求，头部携带：  
  ```http
  Cache-Control: no-cache
  Pragma: no-cache
  ```



### **浏览器缓存优先级与决策流程**

浏览器缓存遵循一套明确的优先级规则，决定何时使用缓存、何时向服务器发起请求。以下是缓存决策的完整流程和优先级排序：

**1. 缓存优先级从高到低**

```mermaid
graph TD
A[强制缓存生效] --> B[协商缓存生效] --> C[向服务器请求新资源]
```

1. **强制缓存（200 from cache）**  
   - 优先级最高，若未过期直接使用缓存，**不发送任何请求**。  
   - 由 `Cache-Control` 或 `Expires` 控制。  

2. **协商缓存（304 Not Modified）**  
   - 强制缓存失效后，携带缓存标识询问服务器资源是否变化。  
   - 由 `Last-Modified`/`If-Modified-Since` 或 `ETag`/`If-None-Match` 控制。  

3. **无缓存（200 OK）**  
   - 前两者均失效时，向服务器请求完整资源。



**2. 详细决策流程**

**步骤 1：检查强制缓存**

浏览器优先检查 `Cache-Control`（优先级高于 `Expires`）：
- **`Cache-Control: max-age=3600`**  
  - 若当前时间 < 缓存时间 + `max-age`，直接使用缓存（状态码 `200 from memory/disk cache`）。  
  - **内存缓存（memory cache）**：高频访问资源（如脚本），优先级高于磁盘缓存。  
  - **磁盘缓存（disk cache）**：大文件（如图片）持久化存储。  
- **`Cache-Control: no-store`**  
  - 跳过所有缓存，直接请求服务器。  

**步骤 2：协商缓存验证**

若强制缓存失效，浏览器发送请求并携带缓存标识：
- **`ETag`/`If-None-Match`（优先级更高）**  
  - 服务器对比资源哈希值，一致则返回 `304`，否则返回 `200 + 新资源`。  
- **`Last-Modified`/`If-Modified-Since`**  
  - 服务器对比修改时间，未变化则返回 `304`。

**步骤 3：完整请求**

若协商缓存也失效（或首次请求），服务器返回完整资源（`200 OK`）。



**3. 缓存头优先级对比**

| **头字段**                | **优先级** | **控制阶段**       | **示例值**                      |
| ------------------------- | ---------- | ------------------ | ------------------------------- |
| `Cache-Control: no-store` | 最高       | 完全禁用缓存       | `no-store`                      |
| `Cache-Control: no-cache` | 高         | 跳过强制缓存       | `no-cache`                      |
| `Cache-Control: max-age`  | 中         | 强制缓存有效期     | `max-age=3600`                  |
| `ETag`                    | 中高       | 协商缓存（强校验） | `"33a64df551"`                  |
| `Last-Modified`           | 低         | 协商缓存（弱校验） | `Wed, 21 Oct 2025 07:28:00 GMT` |



**4. 实际场景示例**

**场景 1：静态资源长期缓存**

```http
Cache-Control: public, max-age=31536000, immutable
```
- **行为**：1年内直接使用缓存，不发送请求（除非URL变化）。

**场景 2：动态接口实时性要求高**

```http
Cache-Control: no-cache
ETag: "abc123"
```
- **行为**：每次请求服务器验证 `ETag`，未变化返回 `304`。

**场景 3：敏感数据禁止缓存**

```http
Cache-Control: no-store
```
- **行为**：完全不缓存，每次请求最新数据。



**5. 关键注意事项**

- **内存缓存 vs 磁盘缓存**：  
  - 内存缓存：生命周期短（随进程关闭清除），读取速度快。  
  - 磁盘缓存：持久化存储，但读取速度较慢。  
- **用户行为影响**：  
  - **正常访问**：遵循缓存规则。  
  - **强制刷新（Ctrl+F5）**：忽略所有缓存，请求头添加 `Cache-Control: no-cache`。  
- **Service Worker 缓存**：  
  - 优先级高于HTTP缓存，可编程控制（需在代码中处理）。



**6. 面试高频问题**

**Q1：`no-cache` 和 `no-store` 的区别？**  

- `no-cache`：跳过强制缓存，但仍走协商缓存。  
- `no-store`：完全禁用缓存，每次请求最新数据。  

**Q2：为什么 `ETag` 比 `Last-Modified` 更可靠？**  
- `ETag` 基于内容哈希，能检测到文件内容变化但修改时间未变的情况（如秒级内修改）。  

**Q3：如何让浏览器缓存静态资源但保证更新？**  

- 文件名添加哈希（如 `app.abc123.js`），设置长期缓存 `max-age=31536000`。  



**总结**

- **最高优先级**：`Cache-Control: no-store` > `no-cache` > `max-age`。  
- **协商缓存**：`ETag` 优先于 `Last-Modified`。  
- **优化建议**：  
  - 静态资源：长缓存 + 文件名哈希。  
  - 动态数据：短缓存 + 协商验证。  



### **HTTP 报文结构详解**

**1. HTTP 请求报文（Request）**

请求报文由 **请求行（Request Line）**、**请求头（Headers）**、**空行** 和 **请求体（Body）** 组成，格式如下：

```http
POST /api/login HTTP/1.1          ← 请求行
Host: example.com                 ← 请求头开始
User-Agent: Mozilla/5.0
Content-Type: application/json
Authorization: Bearer abc123      ← Bearer(持票人) token
Content-Length: 42                ← 请求头结束
                                   ← 空行（必须）
{"username":"admin","password":"123456"} ← 请求体（可选）
```

**组成部分说明**

| **部分**   | **内容示例**               | **说明**                                                     |
| ---------- | -------------------------- | ------------------------------------------------------------ |
| **请求行** | `POST /api/login HTTP/1.1` | 包含：<br> - 方法（GET/POST/PUT等）<br> - 路径（URI）<br> - HTTP版本 |
| **请求头** | `Host: example.com`        | 键值对形式，传递附加信息（如认证、内容类型、客户端信息）。   |
| **空行**   | （无内容）                 | 分隔头部和Body，必须存在！                                   |
| **请求体** | `{"username":"admin"}`     | 可选，GET请求通常无Body，POST/PUT等需要传输数据时使用。      |



**2. HTTP 响应报文（Response）**

响应报文由 **状态行（Status Line）**、**响应头（Headers）**、**空行** 和 **响应体（Body）** 组成，格式如下：

```http
HTTP/1.1 200 OK                     ← 状态行
Server: nginx/1.18.0                ← 响应头开始
Content-Type: application/json
Cache-Control: no-cache
Content-Length: 29                  ← 响应头结束
                                     ← 空行（必须）
{"status":"success","data":{}}      ← 响应体
```

**组成部分说明**

| **部分**   | **内容示例**                     | **说明**                                                     |
| ---------- | -------------------------------- | ------------------------------------------------------------ |
| **状态行** | `HTTP/1.1 200 OK`                | 包含：<br> - HTTP版本<br> - 状态码（如200）<br> - 状态文本（如OK） |
| **响应头** | `Content-Type: application/json` | 服务端返回的元数据（如内容类型、缓存策略、服务器信息）。     |
| **空行**   | （无内容）                       | 分隔头部和Body，必须存在！                                   |
| **响应体** | `{"status":"success"}`           | 主要返回内容（HTML、JSON、二进制数据等）。                   |



**3. 关键字段对比**

| **字段**           | **请求报文示例**   | **响应报文示例** | **作用**                     |
| ------------------ | ------------------ | ---------------- | ---------------------------- |
| **Content-Type**   | `application/json` | `text/html`      | 指定Body的媒体类型。         |
| **Content-Length** | `1024`             | `2048`           | Body的字节长度（防止截断）。 |
| **Authorization**  | `Bearer token123`  | （无）           | 客户端身份凭证。             |
| **Cache-Control**  | （无）             | `max-age=3600`   | 控制缓存行为。               |



**4. 实际抓包示例（Chrome DevTools）**

**请求报文**：
```http
GET /search?q=http HTTP/1.1
Host: www.google.com
User-Agent: Mozilla/5.0
Accept: text/html
```

**响应报文**：
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Cache-Control: private
Content-Length: 12345

<!DOCTYPE html><html>...</html>
```



**5. 常见问题**

**Q1：GET 请求可以有 Body 吗？**  
- 可以，但无意义（服务器可能忽略）。规范建议 GET 的 Body 仅用于非业务逻辑（如调试）。

**Q2：空行为什么必须存在？**  
- 用于明确分隔 Headers 和 Body。没有空行时，服务器会解析失败（可能返回 `400 Bad Request`）。

**Q3：如何查看原始报文？**  
- **浏览器**：Chrome DevTools → Network → 点击请求 → "Headers" 标签页下的 "View Source"。  
- **命令行**：  
  ```bash
  curl -v http://example.com  # -v 显示详细报文
  ```



**6. 总结**

- **请求报文**：`方法 + URI + 版本` → `Headers` → `空行` → `Body`。  
- **响应报文**：`版本 + 状态码` → `Headers` → `空行` → `Body`。  
- **核心区别**：请求报文包含目标路径，响应报文包含状态码。  

理解报文结构是调试接口、分析网络问题的基础！ 



### **HTTP Keep-Alive 的作用与原理**

**1. 核心作用**

**Keep-Alive**（也称为 **持久连接，Persistent Connection**）是一种机制，允许在 **同一个TCP连接上发送和接收多个HTTP请求/响应**，从而减少重复建立和断开连接的开销，显著提升性能。



**2. 解决的问题**

- **HTTP/1.0 的短连接问题**：  
  默认每次请求后关闭TCP连接，导致高延迟（每次需重新三次握手 + 四次挥手）。  
  
  ```mermaid
  graph LR
  A[请求1] --> B[断开连接]
  C[请求2] --> D[新建连接]
  ```
- **Keep-Alive 的优化**：  
  复用TCP连接处理多个请求，减少握手次数。  
  
  ```mermaid
  graph LR
  A[请求1] --> B[请求2] --> C[请求3] --> D[...]
  ```



**3. 工作原理**

**(1) 客户端请求保持连接**

通过 `Connection: keep-alive` 头声明：  
```http
GET /page1 HTTP/1.1
Host: example.com
Connection: keep-alive  ← 关键头
```

**(2) 服务端同意保持连接**

响应中同样携带 `Connection: keep-alive`：  
```http
HTTP/1.1 200 OK
Content-Type: text/html
Connection: keep-alive  ← 服务端确认
Content-Length: 1234
```

**(3) 复用连接发送后续请求**

同一TCP连接可继续发送新请求，直到超时或主动关闭。



**4. 关键配置参数**

- **超时时间**：服务器设置连接保持的最长空闲时间（如Nginx的 `keepalive_timeout`）。  
- **最大请求数**：单个连接处理的请求上限（如Apache的 `MaxKeepAliveRequests`）。  

**Nginx 配置示例**：  
```nginx
http {
    keepalive_timeout 60s;  # 空闲连接保留60秒
    keepalive_requests 100; # 单个连接最多处理100个请求
}
```



**5. 与HTTP/1.1的区别**

- **HTTP/1.1**：默认启用Keep-Alive（无需显式声明），关闭需指定 `Connection: close`。  
- **HTTP/1.0**：需显式声明 `Connection: keep-alive` 才能启用。



**6. 性能优化场景**

- **大量静态资源加载**：网页中的CSS/JS/图片请求复用同一连接。  
- **API高频调用**：减少多次握手的延迟（尤其对高延迟网络重要）。  



**7. 注意事项**

- **资源占用**：长时间空闲连接会占用服务器资源，需合理设置超时。  
- **不适合长连接场景**：如实时消息推送，建议用WebSocket。  



**8. 面试高频问题**

**Q1：Keep-Alive如何影响性能？**  
- 减少TCP握手次数，降低延迟，但需平衡连接复用和服务器资源消耗。  

**Q2：如何禁用Keep-Alive？**  
- 客户端或服务端设置 `Connection: close`。  

**Q3：与HTTP/2多路复用的区别？**  
- Keep-Alive是串行复用（请求需顺序处理），HTTP/2是并行复用（一个连接同时处理多个请求）。  



**总结**

- **核心价值**：减少TCP握手开销，提升页面加载速度。  
- **默认状态**：HTTP/1.1默认开启，HTTP/1.0需手动启用。  
- **适用场景**：短周期、高频的请求（如网页资源加载）。  



### **HTTPS 的工作原理详解**  

- 混合加密：非对称加密（RSA/ECDHE交换密钥） + 对称加密（AES加密数据）。  
- 数字证书：CA机构验证服务器公钥，防止中间人攻击。  
- TLS握手过程（如RSA四次握手、ECDHE优化）。



> [!NOTE]
>
> HTTPS之所以比HTTP更安全，主要是通过以下几种机制来保证其安全性：
>
> 1. **加密传输**：HTTPS使用SSL/TLS协议对HTTP报文进行加密，使得敏感数据在网络传输过程中不容易被窃听和篡改。这种加密过程结合了对称加密和非对称加密，确保数据的保密性和完整性。
> 2. **身份验证**：HTTPS通过数字证书进行身份验证，确保通信双方的真实性。在建立HTTPS连接时，服务器会提供数字证书来证明自己的身份。如果验证通过，客户端就可以信任服务器，并继续与其进行安全的数据传输。这有效防止了被恶意伪装的服务器攻击。
> 3. **数据完整性保护**：在传输数据之前，HTTPS会对数据进行加密，并使用消息摘要（hash）算法生成一个摘要值。在数据到达接收端后，接收端会使用相同的算法对接收到的数据进行摘要计算，并与发送端的摘要值进行比较。如果两者一致，说明数据在传输过程中没有被篡改。如果不一致，通信双方应重新进行验证或中断连接。



HTTPS（Hypertext Transfer Protocol Secure）是 HTTP 的安全版本，通过 **TLS/SSL 加密** 保护数据传输。其核心目标是解决三大安全问题：
1. **机密性**（防窃听）  
2. **完整性**（防篡改）  
3. **身份认证**（防冒充）



**1. HTTPS 核心流程**

**步骤 1：TCP 三次握手**

- 客户端与服务器建立 TCP 连接（与 HTTP 相同）。

**步骤 2：TLS 握手（关键安全层）**

**(1) ClientHello**

客户端发送支持的信息：
- TLS 版本（如 TLS 1.3）
- 支持的加密套件（如 `AES256-GCM-SHA384`）
- 随机数（Client Random）

**(2) ServerHello**

服务器响应：
- 选定的 TLS 版本和加密套件  
- 随机数（Server Random）  
- **数字证书**（包含公钥和域名信息）  

**(3) 证书验证**

客户端验证证书：
- 检查证书是否由受信任的 CA（如 DigiCert）签发。  
- 确保证书中的域名与访问的域名一致。  
- 验证证书是否过期或被吊销（通过 OCSP/CRL）。  

**(4) 密钥交换**

- **RSA 密钥交换（旧版）**：  
  客户端用证书中的公钥加密一个 **Pre-Master Secret** （预主密钥）发送给服务器。  
- **ECDHE（现代推荐）**：  
  双方通过椭圆曲线迪菲-赫尔曼（ECDHE）算法生成 **Pre-Master Secret**，无需传输。  

**(5) 生成会话密钥**

双方用以下三个随机数生成 **Master Secret**，再派生出对称加密密钥：  
```
Master Secret = f(Client Random, Server Random, Pre-Master Secret)
```

**(6) 加密通信开始**

后续所有数据用对称加密（如 AES）传输，密钥仅双方知晓。



**2. 核心安全技术**

**(1) 混合加密**

- **非对称加密（RSA/ECC）**：  
  用于握手阶段交换密钥（如传递 `Pre-Master Secret`）。   RSA（一种非对称加密算法，RSA就是发明者三人姓氏开头）
  - 优点：安全。  
  - 缺点：速度慢（比对称加密慢 1000 倍以上）。  

- **对称加密（AES）**：  
  用于加密实际传输的数据。  AES（一种对称加密算法，高级加密标准，Advanced Encryption Standard）
  - 优点：速度快。  
  - 缺点：需安全地共享密钥（通过非对称加密解决）。  

**(2) 数字证书**

- **作用**：验证服务器身份，防止中间人攻击。  
- **内容**：  
  - 公钥  
  - 域名  
  - 签发者（CA）  
  - 有效期  
- **验证链**：  
  浏览器信任根 CA → 根 CA 签名中间 CA → 中间 CA 签名网站证书。  

**(3) 完整性保护**

- **HMAC** 或 **AEAD**（如 AES-GCM）：  
  通过哈希算法（如 SHA-256）生成消息认证码（MAC），确保数据未被篡改。



**3. TLS 1.2 vs TLS 1.3 优化**

| 特性         | TLS 1.2                         | TLS 1.3                        |
| ------------ | ------------------------------- | ------------------------------ |
| **握手延迟** | 2-RTT（RSA）或 1.5-RTT（ECDHE） | 1-RTT（默认），支持 0-RTT      |
| **加密套件** | 支持旧算法（如 SHA-1）          | 仅保留高强度算法（如 AES-GCM） |
| **密钥交换** | 支持 RSA 密钥传输               | 仅 ECDHE（更安全）             |
| **安全性**   | 易受降级攻击                    | 禁用不安全的协商选项           |



**4. 实际应用示例**

**(1) 浏览器访问 HTTPS 网站**

1. 用户输入 `https://example.com`。  
2. 浏览器通过 DNS 获取 IP，建立 TCP 连接。  
3. 完成 TLS 握手（如证书验证、密钥交换）。  
4. 地址栏显示锁图标，所有数据加密传输。  

**(2) 开发者配置 HTTPS**

- **Nginx 配置示例**：  
  ```nginx
  server {
      listen 443 ssl;
      server_name example.com;
      ssl_certificate /path/to/cert.pem;     # 证书文件
      ssl_certificate_key /path/to/key.pem;  # 私钥文件
      ssl_protocols TLSv1.2 TLSv1.3;         # 禁用旧版本
      ssl_ciphers HIGH:!aNULL:!MD5;          # 指定加密套件
  }
  ```



**5. 常见问题**

**Q1：为什么 HTTPS 比 HTTP 慢？**  
- 握手阶段多 1-2 次往返（RTT），但 TLS 1.3 的 0-RTT 已优化。  
- 对称加密的数据传输阶段性能损耗可忽略。  

**Q2：自签名证书和 CA 证书的区别？**  

- **自签名证书**：浏览器不信任，需手动导入（仅适合测试）。  
- **CA 证书**：由受信任机构（如 Let's Encrypt）签发，自动验证。  

**Q3：如何免费获取 HTTPS 证书？**  

- 使用 Let's Encrypt 的 `certbot` 工具自动签发：  
  ```bash
  sudo certbot --nginx -d example.com
  ```



**总结**

- **HTTPS = HTTP + TLS**，通过混合加密、证书验证、完整性保护确保安全。  
- **TLS 握手**是非对称加密，**数据传输**是对称加密。  
- **TLS 1.3** 大幅提升性能（1-RTT/0-RTT）和安全性。  



### **GET 和 POST 的区别**  

- 语义：GET是幂等的（获取资源），POST非幂等（提交数据）。  
- 安全性：GET参数在URL中，POST在请求体。  
- 长度限制：GET受URL长度限制（浏览器不同），POST理论上无限制。



**1. 核心区别总结**

| **对比维度**     | **GET**                       | **POST**                               |
| ---------------- | ----------------------------- | -------------------------------------- |
| **语义**         | 获取资源（幂等）              | 提交数据（非幂等）                     |
| **数据位置**     | URL 查询参数（`?key=value`）  | 请求体（Body）                         |
| **数据长度限制** | 受 URL 长度限制（约 2KB~8KB） | 理论上无限制（服务器可配置限制）       |
| **安全性**       | 参数暴露在 URL 和浏览器历史   | 相对安全（HTTPS 下加密）               |
| **缓存**         | 可被缓存（适合静态资源）      | 默认不缓存                             |
| **浏览器行为**   | 可收藏为书签，可重复触发      | 重复提交会警告（如“确认重新提交表单”） |
| **TCP 数据包**   | 1 个（Header + URL）          | 2 个（Header + Body）                  |



**2. 深度解析**

**(1) 语义与幂等性**

- **GET**：  
  
  - **幂等操作**（多次请求结果相同），用于获取数据（如加载网页、搜索）。  
  - 示例：  
    ```http
    GET /api/users?id=123 HTTP/1.1
    ```
- **POST**：  
  - **非幂等**（多次请求可能产生不同结果），用于创建/修改数据（如提交表单）。  
  - 示例：  
    ```http
    POST /api/users HTTP/1.1
    Content-Type: application/json
    {"name": "John"}
    ```

**(2) 数据长度限制**

- **GET**：  
  - 限制来自浏览器（Chrome 约 8KB）和服务器（如 Nginx 默认 4KB）。  
- **POST**：  
  - 无硬性限制，但服务器可能限制 Body 大小（如 Nginx 的 `client_max_body_size 10M`）。

**(3) 安全性误区**

- **即使 POST 也不绝对安全**：  
  - 仅靠 HTTPS 能加密传输数据，但日志或浏览器插件可能记录 POST 数据。  
  - 敏感操作（如密码）应用 POST + HTTPS + 额外加密（如 BCrypt）。

**(4) 实际应用场景**

- **用 GET**：  
  - 搜索过滤（`/search?q=keyword`）  
  - 分页（`/articles?page=2`）  
- **用 POST**：  
  - 登录（提交用户名密码）  
  - 文件上传（Body 支持二进制数据）  



**3. 面试高频问题**

**Q1：POST 比 GET 更安全吗？**  

- 不完全正确。安全与否取决于是否使用 HTTPS。GET 参数在 URL 中可见，但 POST 数据在未加密时也能被拦截。关键区别在于 **数据位置和暴露风险**。

**Q2：GET 能否传 JSON 数据？**  
- 可以但不推荐。将 JSON 放在 URL 中：  
  ```http
  GET /api/data?params=%7B%22key%22%3A%22value%22%7D
  ```
  但会受 URL 长度限制，且需手动编码（`encodeURIComponent`）。

**Q3：为什么 RESTful API 强调用 POST 创建资源？**  

- 遵循 HTTP 语义：  
  - `POST /users` → 创建用户  
  - `GET /users/123` → 获取用户  
  - 用错方法（如 GET 创建资源）会误导缓存或爬虫。



**4. 代码示例**

**前端（JavaScript）**

```javascript
// GET 请求
fetch('/api/data?id=123')
  .then(response => response.json());

// POST 请求
fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
});
```

**后端（Node.js Express）**

```javascript
// 处理 GET
app.get('/api/data', (req, res) => {
  const id = req.query.id; // 获取 URL 参数
  res.json({ data: id });
});

// 处理 POST
app.post('/api/data', (req, res) => {
  const body = req.body; // 获取请求体
  res.status(201).json({ created: body });
});
```



**5. 高级扩展**

- **PUT vs POST**：  
  - PUT 用于全量更新（幂等），POST 用于创建（非幂等）。  
- **GET 的 Body**：  
  - HTTP 协议允许 GET 带 Body，但多数库（如 `fetch`）和服务器（如 Nginx）会忽略。  
- **RESTful 设计**：  
  - 用 `GET /users` 获取列表，`POST /users` 创建用户，`DELETE /users/123` 删除用户。



**总结回答（面试版）**

> “GET 和 POST 的核心区别在于语义：GET 是幂等的，用于获取数据且参数在 URL 中，适合搜索等场景；POST 是非幂等的，数据在 Body 中，适合提交表单或创建资源。安全性上，两者均依赖 HTTPS，但 GET 参数更易暴露。实际开发应遵循 RESTful 规范，按操作类型选择方法。”



### **OPTIONS 预检请求详解**

浏览器发送请求时，在**某些情况下**会先发送一个 **OPTIONS 预检请求（Preflight Request）**，这是浏览器基于 **CORS（跨域资源共享）** 安全策略的机制。以下是详细解释：

TODO：写的有问题，总结错误！！！！！

**1. 什么情况下会触发 OPTIONS 预检？** 

当 POST 请求满足以下 **任一条件** 时，浏览器会先发送 OPTIONS 请求：
1. **自定义请求头**（如 `Content-Type: application/json`）。  
2. **非简单请求方法**（如 PUT、DELETE）。  
3. **跨域请求**（域名/协议/端口不同）。  

**示例场景**

```javascript
// 前端代码（触发预检的请求）
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',  // 非简单头
    'X-Custom-Header': 'foo'            // 自定义头
  },
  body: JSON.stringify({ key: 'value' })
});
```
此时浏览器会先发送：
```http
OPTIONS /data HTTP/1.1
Host: api.example.com
Origin: https://your-site.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type, x-custom-header
```



**2. OPTIONS 请求的作用**

**(1) 询问服务器是否允许跨域**

浏览器通过 OPTIONS 请求询问目标服务器：
- 是否允许来自 `Origin` 的请求？  
- 是否支持 `POST` 方法和指定的请求头（如 `Content-Type`）？  

**(2) 服务器必须明确响应**

服务端需返回允许的规则：
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://your-site.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Custom-Header
Access-Control-Max-Age: 86400  // 预检结果缓存时间（秒）
```
- 如果响应头不符合要求，浏览器会拦截后续 POST 请求。



**3. 如何避免不必要的 OPTIONS 请求？**

**(1) 改为简单请求（Simple Request）**

满足以下所有条件的 POST 请求 **不会触发预检**：
1. 使用简单请求头：  
   - `Accept`  
   - `Accept-Language`  
   - `Content-Language`  
   - `Content-Type` 仅限以下值：  
     - `text/plain`  
     - `multipart/form-data`  
     - `application/x-www-form-urlencoded`  
2. 无自定义头。  

**示例（不触发 OPTIONS）**：
```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: 'key=value'
});
```

**(2) 服务端缓存预检结果**

通过 `Access-Control-Max-Age` 让浏览器缓存 OPTIONS 响应，减少重复预检：
```http
Access-Control-Max-Age: 86400  // 缓存24小时
```

**(3) 同源请求**

如果前端和后端在同一域名下（同协议、域名、端口），不会触发 CORS 检查。



**4. 常见问题**

**Q1：OPTIONS 请求是浏览器行为还是开发者代码触发的？**

- 是 **浏览器自动发送** 的，开发者无法直接控制。

**Q2：为什么 GET 请求通常没有 OPTIONS？**

- 简单 GET 请求（无自定义头、跨域）不触发预检，但非简单 GET（如带 `Authorization` 头）会触发。

**Q3：OPTIONS 请求会影响性能吗？**

- 每次预检增加 1 次 HTTP 往返，但可通过缓存（`Access-Control-Max-Age`）优化。



**5. 总结**

| **场景**                        | **是否发送 OPTIONS** | **解决方案**                                         |
| ------------------------------- | -------------------- | ---------------------------------------------------- |
| 简单 POST 请求                  | ❌ 否                 | 使用简单头（如 `application/x-www-form-urlencoded`） |
| 复杂 POST 请求（跨域+自定义头） | ✅ 是                 | 服务端正确配置 CORS 头                               |
| 同源 POST 请求                  | ❌ 否                 | 无需处理                                             |



### **Cookie/Session/Token 的区别**  

- **Cookie**：客户端存储，自动携带在请求头（有大小限制）。  
- **Session**：服务端存储会话状态，依赖Session ID。  
- **Token**（如JWT）：无状态，自包含用户信息，签名防篡改。



**Cookie、Session、Token 的核心区别**  

| **对比维度** | **Cookie**                 | **Session**                    | **Token（如JWT）**                |
| ------------ | -------------------------- | ------------------------------ | --------------------------------- |
| **存储位置** | **客户端**（浏览器）       | **服务端**（内存/数据库）      | **客户端**（LocalStorage/Cookie） |
| **安全性**   | 较低（易被XSS/CSRF攻击）   | 较高（敏感信息在服务端）       | 中（依赖加密和签名）              |
| **扩展性**   | 差（依赖浏览器，跨域限制） | 差（集群需共享Session）        | 强（无状态，适合分布式）          |
| **性能**     | 优（无服务端存储）         | 差（频繁读写Session存储）      | 优（无需服务端存储）              |
| **跨域支持** | 需配置`SameSite`/`CORS`    | 不支持（依赖Cookie）           | 天然支持（通过Authorization头）   |
| **生命周期** | 可设置过期时间             | 服务端控制（默认会话结束失效） | 可自定义过期时间                  |



**1. Cookie**

- **本质**：由服务器通过`Set-Cookie`响应头下发，浏览器自动存储并在后续请求中携带（同域下）。  
- **特点**：  
  - 大小限制（约4KB）。  
  - 可设置`HttpOnly`防XSS、`Secure`仅HTTPS传输、`SameSite`防CSRF。  
- **用途**：  
  - 会话管理（如Session ID）。  
  - 个性化设置（如语言偏好）。  

**示例**：  
```http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```



**2. Session**

- **本质**：服务端存储的用户会话状态（如用户ID、权限），通过**Session ID**（通常存于Cookie）关联客户端。  
- **特点**：  
  - 服务端存储（内存、Redis、数据库）。  
  - 集群环境下需共享Session（如Redis集群）。  
- **问题**：  
  - 服务器扩容时Session同步复杂。  
  - 客户端仅持有ID，安全性依赖服务端。  

**流程**：  
1. 用户登录 → 服务端生成Session并存储 → 返回Session ID给Cookie。  
2. 后续请求携带Session ID → 服务端查询Session验证身份。  



**3. Token（如JWT）**

- **本质**：自包含的令牌（包含用户信息+签名），客户端存储并在请求头（`Authorization`）中发送。  
- **特点**：  
  - **无状态**：服务端不存储，通过签名验证合法性。  
  - **组成**：`Header.Payload.Signature`（示例）：  
    
    ```json
    {
      "alg": "HS256",
      "typ": "JWT"
    }
    {
      "userId": 123,
      "exp": 1735689600  // 过期时间戳
    }
    ```
- **优势**：  
  - 适合分布式/微服务架构。  
  - 支持跨域（移动端/第三方调用）。  
- **风险**：  
  - Token被盗用无法主动失效（需短有效期+黑名单）。  

**示例请求头**：  
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```



**4. 如何选择？**

- **Cookie+Session**：  
  - 传统Web应用，需简单会话管理。  
  - 缺点：扩展性差，需防御CSRF。  
- **Token（JWT）**：  
  - 前后端分离、APP、API服务。  
  - 缺点：需处理Token续期和安全存储。  
- **混合方案**：  
  - 敏感操作用Session，普通接口用Token。  



**5. 面试高频问题**

**Q1：为什么Token比Session更适合分布式系统？**  
- Session需服务端共享状态，Token无状态，天然支持横向扩展。  

**Q2：如何防止JWT被盗用？**  
- 设置短有效期（`exp`）。  
- 使用HTTPS防窃听。  
- 关键操作需二次验证（如短信）。  

**Q3：Cookie的`HttpOnly`和`SameSite`有什么用？**  
- `HttpOnly`：禁止JS访问，防XSS窃取Cookie。  
- `SameSite=Lax`：阻止跨站请求伪造（CSRF）。  



**总结**  

- **Cookie**：客户端存储，配合Session或独立使用。  
- **Session**：服务端状态，依赖Cookie传ID。  
- **Token**：无状态，自包含权限信息，适合现代架构。  



### **TCP 和 UDP 的核心区别**

**1. 核心特性对比**

| **对比维度** | **TCP（传输控制协议）**      | **UDP（用户数据报协议）** |
| ------------ | ---------------------------- | ------------------------- |
| **连接方式** | 面向连接（三次握手）         | 无连接                    |
| **可靠性**   | 可靠传输（确认、重传、排序） | 不可靠（可能丢包、乱序）  |
| **数据顺序** | 保证数据按序到达             | 不保证顺序                |
| **速度**     | 较慢（需建立连接、确认机制） | 极快（无额外控制开销）    |
| **头部开销** | 大（至少20字节）             | 小（仅8字节）             |
| **流量控制** | 通过滑动窗口机制             | 无                        |
| **拥塞控制** | 有（慢启动、拥塞避免等）     | 无                        |
| **适用场景** | 文件传输、网页浏览、邮件     | 视频流、游戏、DNS查询     |



**2. 工作原理详解**

**(1) TCP 的可靠性实现**

- **三次握手建立连接**：  
  ```mermaid
  sequenceDiagram
    Client->>Server: SYN
    Server->>Client: SYN-ACK
    Client->>Server: ACK
  ```
- **数据传输保障**：  
  - 确认应答（ACK）  
  - 超时重传  
  - 数据排序（按序列号重组）  
- **四次挥手断开连接**：  
  
  ```mermaid
  sequenceDiagram
    Client->>Server: FIN
    Server->>Client: ACK
    Server->>Client: FIN
    Client->>Server: ACK
  ```

**(2) UDP 的简单性**

- **无连接**：直接发送数据包，无需建立/断开连接。  
- **无重传**：即使丢包也不重发（适合实时性要求高的场景）。  



**3. 应用场景对比**

| **场景**               | **推荐协议** | **原因**                           |
| ---------------------- | ------------ | ---------------------------------- |
| 网页加载（HTTP/HTTPS） | TCP          | 需保证文本、图片完整传输           |
| 在线视频（如YouTube）  | UDP          | 容忍少量丢包，优先降低延迟         |
| 在线游戏（如FPS）      | UDP          | 实时性高于可靠性，重传旧数据无意义 |
| 文件下载（FTP）        | TCP          | 需确保文件完整性                   |
| DNS查询                | UDP          | 请求-响应模型简单，单个包即可完成  |



**4. 协议头部对比**

- **TCP 头部（20~60字节）**：  
  ```
  | 源端口 | 目的端口 | 序列号 | 确认号 | 数据偏移 | 控制标志（SYN/ACK等） | 窗口大小 | 校验和 | 紧急指针 | 选项 |
  ```
- **UDP 头部（8字节）**：  
  ```
  | 源端口 | 目的端口 | 长度 | 校验和 |
  ```



**5. 面试高频问题**

**Q1：为什么 TCP 比 UDP 慢？**  
- 答：TCP 需三次握手、确认应答、重传等机制，而 UDP 直接发送数据。  

**Q2：什么情况下 UDP 比 TCP 更可靠？**  
- 答：在极端网络环境下（如高丢包率），TCP 频繁重传可能导致雪崩效应，而 UDP 的简单性反而更稳定（如 QUIC 协议基于 UDP 实现可靠传输）。  

**Q3：如何用 UDP 实现可靠传输？**  
- 答：在应用层添加序列号、确认机制（如 QUIC、RTMP 协议）。  

**Q4：TCP 的粘包问题如何解决？**  

- 答：通过固定长度、分隔符或自定义协议头（如 HTTP 的 `Content-Length`）。  



**总结**

- **选择 TCP**：需可靠性、数据完整的场景（如文件传输）。  
- **选择 UDP**：需低延迟、可容忍丢包的场景（如实时视频）。  
- **现代协议趋势**：  
  - HTTP/3 基于 UDP 的 QUIC 协议，结合了 TCP 的可靠性和 UDP 的高效性。  



### **TCP 三次握手与四次挥手详解**

**1. TCP 三次握手（建立连接）**

**目的**：确保双方（客户端和服务端）的发送和接收能力正常，并同步初始序列号（ISN）。

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client: 主动打开连接
    Client->>Server: SYN=1, seq=x (客户端发送SYN包)
    Note right of Server: SYN_RCVD状态
    Server->>Client: SYN=1, ACK=1, seq=y, ack=x+1 (服务端回应SYN-ACK)
    Note left of Client: ESTABLISHED状态
    Client->>Server: ACK=1, seq=x+1, ack=y+1 (客户端确认)
    Note right of Server: ESTABLISHED状态
```

**步骤解析**：

1. **第一次握手**（`SYN`）：
   - 客户端发送 `SYN=1` 和随机序列号 `seq=x`，进入 `SYN_SENT` 状态。
   - **作用**：试探服务端是否存活，并告知初始序列号。

2. **第二次握手**（`SYN-ACK`）：
   - 服务端收到 `SYN` 后，返回 `SYN=1` + `ACK=1`，携带自己的序列号 `seq=y` 和对客户端序列号的确认 `ack=x+1`，进入 `SYN_RCVD` 状态。
   - **作用**：确认客户端的发送能力，并告知自己的初始序列号。

3. **第三次握手**（`ACK`）：
   - 客户端收到 `SYN-ACK` 后，发送 `ACK=1`，确认号 `ack=y+1`，进入 `ESTABLISHED` 状态。
   - 服务端收到 `ACK` 后也进入 `ESTABLISHED` 状态。
   - **作用**：确认服务端的发送能力，完成连接建立。

**为什么需要三次握手？**

- **防止历史重复连接**：避免因网络延迟导致的旧 `SYN` 包误建连接。
- **同步初始序列号**：双方确认对方的序列号，确保数据传输有序。



**2. TCP 四次挥手（关闭连接）**

**目的**：双方安全关闭连接，确保数据完整传输。（需要注意的是，在四次挥手的过程中，客户端和服务器都有可能先发起关闭请求）

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Note over Client: 主动关闭连接
    Client->>Server: FIN=1, seq=u (客户端发送FIN包)
    Note right of Server: CLOSE_WAIT状态
    Server->>Client: ACK=1, ack=u+1 (服务端确认)
    Note left of Client: FIN_WAIT_2状态
    Server->>Client: FIN=1, seq=v, ack=u+1 (服务端发送FIN包)
    Note right of Server: LAST_ACK状态
    Client->>Server: ACK=1, seq=u+1, ack=v+1 (客户端确认)
    Note left of Client: TIME_WAIT状态（等待2MSL）
    Note right of Server: CLOSED状态
```

**步骤解析**：

1. **第一次挥手**（`FIN`）：
   - 客户端发送 `FIN=1` 和序列号 `seq=u`，进入 `FIN_WAIT_1` 状态。
   - **作用**：通知服务端“我要关闭连接”。

2. **第二次挥手**（`ACK`）：
   - 服务端返回 `ACK=1` 和确认号 `ack=u+1`，进入 `CLOSE_WAIT` 状态。
   - 客户端收到后进入 `FIN_WAIT_2` 状态。
   - **作用**：服务端确认收到关闭请求，但可能还有数据要发送。

3. **第三次挥手**（`FIN`）：
   - 服务端发送 `FIN=1` 和序列号 `seq=v`，进入 `LAST_ACK` 状态。
   - **作用**：服务端通知客户端“我也要关闭连接”。

4. **第四次挥手**（`ACK`）：
   - 客户端发送 `ACK=1` 和确认号 `ack=v+1`，进入 `TIME_WAIT` 状态，等待 `2MSL`（报文最大生存时间）后关闭。
   - 服务端收到 `ACK` 后立即关闭连接。
   - **作用**：确保服务端收到最后的确认，防止丢包导致资源泄漏。

**为什么需要四次挥手？**

- **半关闭状态**：TCP是全双工协议，一方关闭发送通道后仍可接收数据（故需两次双向关闭）。
- **确保数据完整性**：服务端可能仍有数据未发送完，需等待其处理完毕。



**3. 关键问题与面试回答**

**Q1：为什么握手是三次，挥手是四次？**

- **握手**：服务端的 `SYN` 和 `ACK` 可合并为一个包（无需等待数据）。
- **挥手**：服务端收到 `FIN` 后可能还需发送数据，故 `ACK` 和 `FIN` 分开发送。

**Q2：TIME_WAIT 状态的作用？**

- **确保最后一个ACK到达**：若服务端未收到 `ACK` 会重发 `FIN`，客户端需能响应。
- **避免旧连接数据混淆**：等待 `2MSL`（通常1~4分钟）确保网络中所有旧包失效。

**Q3：SYN Flood攻击是什么？如何防御？**

- **攻击原理**：伪造大量 `SYN` 包耗尽服务端资源（半连接队列）。
- **防御**：SYN Cookie、限制并发连接数、防火墙过滤。



**4. 总结**

| **阶段**     | **关键动作**          | **状态变化**                      |
| ------------ | --------------------- | --------------------------------- |
| **三次握手** | SYN → SYN-ACK → ACK   | SYN_SENT → SYN_RCVD → ESTABLISHED |
| **四次挥手** | FIN → ACK → FIN → ACK | FIN_WAIT_1 → TIME_WAIT → CLOSED   |



### **TCP/IP 协议的分层结构**

TCP/IP协议是互联网通信的核心标准，分为 **4层**（或5层，若细分物理层）。以下是各层的功能、核心协议及与OSI模型的对比：

**1. TCP/IP 4层模型**

| **分层**       | **功能**                           | **核心协议**              | **对应OSI层**          |
| -------------- | ---------------------------------- | ------------------------- | ---------------------- |
| **应用层**     | 提供用户接口和服务（如HTTP、FTP）  | HTTP, FTP, DNS, SMTP, SSH | 应用层、表示层、会话层 |
| **传输层**     | 端到端数据传输，保证可靠性或实时性 | TCP, UDP                  | 传输层                 |
| **网络层**     | 寻址和路由（跨网络的数据包传输）   | IP, ICMP, ARP, BGP        | 网络层                 |
| **网络接口层** | 物理介质访问和数据帧封装           | Ethernet, WiFi, PPP       | 数据链路层、物理层     |



**2. 各层详解**

**(1) 应用层（Application Layer）**

- **功能**：直接面向用户，处理应用程序的逻辑（如浏览器请求网页）。  
- **典型协议**：  
  - **HTTP**：网页传输  
  - **DNS**：域名解析  
  - **SMTP**：邮件发送  
  - **SSH**：安全远程登录  

**(2) 传输层（Transport Layer）**

- **功能**：确保数据可靠传输或高效传输。  
- **核心协议**：  
  - **TCP**：面向连接，可靠传输（三次握手、重传机制）。  
  - **UDP**：无连接，低延迟（适合视频、游戏）。  
- **关键概念**：  
  - **端口号**：区分同一主机的不同服务（如80端口对应HTTP）。  

**(3) 网络层（Internet Layer）**

- **功能**：通过IP地址实现跨网络的数据路由。  
- **核心协议**：  
  - **IP**：无连接、不可靠的数据包传输（IPv4/IPv6）。  
  - **ICMP**：网络状态诊断（如`ping`命令）。  
  - **ARP**：将IP地址解析为MAC地址。  

**(4) 网络接口层（Network Interface Layer）**

- **功能**：负责物理介质上的数据帧传输。  
- **典型技术**：  
  - **以太网（Ethernet）**：局域网通信标准。  
  - **WiFi**：无线局域网。  
  - **PPP**：拨号上网协议。  



**3. 数据封装流程**

```mermaid
graph LR
A[应用层数据] -->|添加HTTP头| B[HTTP报文]
B -->|添加TCP头| C[TCP段]
C -->|添加IP头| D[IP数据包]
D -->|添加帧头帧尾| E[以太网帧]
E --> 物理层比特流
```
- **每层添加自己的头部信息**，接收方逐层解析。



**4. 常见问题**

**Q1：为什么TCP/IP模型比OSI模型更常用？**

- **答**：OSI理论完善但复杂，TCP/IP更简洁且直接对应实际协议（如HTTP/IP），它更直接地反映了互联网的实际工作方式。

**Q2：ICMP属于哪一层？**

- **答**：网络层，尽管它依赖IP，但用于传输控制消息而非数据。

**Q3：路由器工作在哪一层？**

- **答**：主要在网络层（处理IP地址），但现代路由器也涉及传输层（如NAT）。



**5. 面试回答示例**

> “TCP/IP分为4层：应用层（HTTP/DNS）、传输层（TCP/UDP）、网络层（IP/ICMP）、网络接口层（以太网）。数据发送时自上而下封装，接收时自下而上解封装。例如，网页请求经过HTTP→TCP→IP→以太网的封装后传输。”



**总结**

- **应用层**：用户可见的服务（如浏览器）。  
- **传输层**：端到端可靠性（TCP）或实时性（UDP）。  
- **网络层**：全局寻址和路由（IP）。  
- **网络接口层**：物理设备驱动和帧传输。  



## **浏览器工作原理**
### **从输入URL到页面渲染的完整流程 **- 略

- DNS解析 → TCP握手 → HTTP请求 → 服务器响应 → 解析HTML（构建DOM树/CSSOM树） → 渲染树（Layout） → 绘制（Paint） → 重排（Reflow）和重绘（Repaint）。



参见 HTML相关



### **浏览器如何解析HTML/CSS/JS - 略**  

- **HTML**：边下载边解析，生成DOM树（遇到`<script>`会阻塞，除非加`async/defer`）。  
- **CSS**：生成CSSOM树，与DOM树合并为渲染树。  
- **JS**：通过V8引擎解析执行，可能触发DOM操作或样式修改。



参见 HTML相关



### **重排和重绘的优化方式 - 略**  

- **重排**（Reflow）：布局变化（如修改宽度、位置）。  
- **重绘**（Repaint）：样式变化不影响布局（如颜色）。  
- **优化**：避免频繁DOM操作、使用`transform`/`opacity`（触发GPU加速）、批量修改（如`documentFragment`）。



参见 CSS相关



### **事件循环（Event Loop）机制 - 略**  

- **宏任务**：script整体代码、setTimeout、setInterval、I/O。  
- **微任务**：Promise.then、MutationObserver、process.nextTick。  
- 执行顺序：同步代码 → 微任务队列清空 → 宏任务一次 → 循环。



参见 JS相关



### **跨域问题及解决方案详解**  

- **原因**：同源策略（协议/域名/端口一致）。  
- **解决方案**：  
  - CORS（服务端设置`Access-Control-Allow-Origin`）。  
  - JSONP（利用`<script>`标签跨域）。  
  - 代理服务器（Nginx反向代理）。  
  - WebSocket（不受同源策略限制）。



**1. 什么是跨域？**

跨域（Cross-Origin）是由 **浏览器的同源策略（Same-Origin Policy）** 引起的安全限制。当请求的 **协议（HTTP/HTTPS）、域名（example.com）、端口（80/443）** 任一不同时，即触发跨域拦截。

**示例**：

- `http://a.com` → `http://b.com` ❌（域名不同）  
- `https://a.com` → `http://a.com` ❌（协议不同）  
- `http://a.com:80` → `http://a.com:8080` ❌（端口不同）  



**2. 常见跨域场景**

1. 前端调用不同域的后端 API（如前端 `localhost:3000` 访问 `api.example.com`）。  
2. 第三方服务嵌入（如使用外链 JS/CSS）。  
3. 本地开发联调（前端与后端分离部署）。  



**3. 解决方案**

**(1) CORS（跨域资源共享）** ★最常用  

**原理**：服务器通过响应头声明允许的跨域来源。  
**配置示例**（后端代码）：  
```http
Access-Control-Allow-Origin: https://your-frontend.com  // 允许特定域名
Access-Control-Allow-Methods: GET, POST, PUT          // 允许的HTTP方法
Access-Control-Allow-Headers: Content-Type           // 允许的请求头
Access-Control-Allow-Credentials: true               // 允许携带Cookie
```
**适用场景**：  
- 可控的后端服务（如自建API）。  
- 简单请求（GET/POST/HEAD）直接通过；非简单请求（如PUT/DELETE）会先发`OPTIONS`预检请求。  

---

**(2) JSONP（仅限GET请求）**  

**原理**：利用 `<script>` 标签不受同源策略限制的特性。  
**前端代码**：  
```javascript
function handleResponse(data) {
  console.log(data);
}
const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleResponse';
document.body.appendChild(script);
```
**后端响应**：  
```javascript
handleResponse({"data": "value"});  // 返回JS函数调用
```
**缺点**：  
- 仅支持GET请求。  
- 安全性低（需完全信任第三方）。  

---

**(3) 代理服务器**  

**原理**：让同域的前端服务器转发请求到目标后端。  

- **开发环境**（如Vite/Webpack配置代理）：  
  
  ```javascript
  // vite.config.js
  export default {
    server: {
      proxy: {
        '/api': {
          target: 'http://api.example.com',
          changeOrigin: true,
        }
      }
    }
  }
  ```
- **生产环境**：  
  使用 Nginx 反向代理：  
  
  ```nginx
  location /api {
    proxy_pass http://api.example.com;
  }
  ```
  **优点**：  
- 前端无需修改代码，无缝对接。  

---

**(4) WebSocket**  

**原理**：WebSocket 协议不受同源策略限制。  
**示例**：

```javascript
const socket = new WebSocket('wss://api.example.com');
socket.onmessage = (event) => {
  console.log(event.data);
};
```
**适用场景**：  

- 实时通信（如聊天室、股票行情）。  

---

**(5) 其他方案**  

- **postMessage**：跨窗口通信（如iframe嵌套）。  
- **document.domain**：仅适用于同一主域下的子域（如 `a.example.com` 和 `b.example.com`）。  



**4. 跨域携带Cookie**  

需同时满足：  
1. 后端设置：  
   ```http
   Access-Control-Allow-Credentials: true
   Access-Control-Allow-Origin: https://your-frontend.com  // 不能为*
   ```
2. 前端请求开启`credentials`：  
   ```javascript
   fetch('https://api.example.com', {
     credentials: 'include'
   });
   ```



**5. 面试高频问题**

**Q1：CORS预检请求（OPTIONS）是什么？**  

- 非简单请求（如PUT/DELETE或自定义头）会先发OPTIONS请求，询问服务器是否允许跨域。  

**Q2：为什么JSONP只能发GET请求？**  
- 本质是动态创建`<script>`标签，而脚本加载仅支持GET。  

**Q3：如何防御恶意跨域请求？**  

- 后端严格校验`Origin`头。  
- 敏感接口禁用CORS，改用代理或Token验证。  



**总结**  

- **推荐方案**：  
  - 开发环境 → 代理服务器。  
  - 生产环境 → CORS + Nginx代理。  
- **慎用方案**：JSONP（安全性差）、`document.domain`（限制多）。  



### **浏览器存储方案有哪些 - 略**  

- **Cookie**：4KB，跟随HTTP请求发送。  
- **Web Storage**：LocalStorage（永久存储，5MB）、SessionStorage（会话级）。  
- **IndexedDB**：非关系型数据库，适合大量结构化数据。



参见 HTML相关



### **进程与线程的区别**

> [!NOTE]
>
> 总结来说，进程和线程在资源占用、并发性、独立性和系统开销等方面都存在显著的区别：
>
> - 进程是资源分配的基本单位，而线程是CPU调度的基本单位。
> - 进程拥有独立的地址空间和资源，而线程共享进程的资源。
> - 在并发性和系统开销方面，线程较进程具有更高的效率和更低的开销。



**1. 核心区别总结**

| **对比维度** | **进程（Process）**                 | **线程（Thread）**                  |
| ------------ | ----------------------------------- | ----------------------------------- |
| **定义**     | 操作系统资源分配的基本单位          | CPU调度的基本单位（进程内的执行流） |
| **内存隔离** | 独立地址空间，互不干扰              | 共享进程的内存（堆、全局变量）      |
| **开销**     | 创建/销毁开销大（需分配独立资源）   | 创建/销毁开销小                     |
| **通信方式** | 进程间通信（IPC）：管道、消息队列等 | 直接读写共享内存（需同步机制）      |
| **稳定性**   | 一个进程崩溃不影响其他进程          | 一个线程崩溃可能导致整个进程退出    |
| **并发性**   | 多进程可跨CPU核心并行运行           | 多线程在单核CPU上交替执行（伪并行） |



**2. 深入解析**

**(1) 资源分配**

- **进程**：  
  - 独占内存、文件句柄、网络端口等资源。  
  - 示例：浏览器中每个标签页是独立进程（Chrome设计）。  
- **线程**：  
  - 共享进程资源，但拥有独立的栈和寄存器。  
  - 示例：一个Word进程内，编辑和拼写检查运行在不同线程。

**(2) 性能对比**

| **操作**   | 进程开销       | 线程开销        |
| ---------- | -------------- | --------------- |
| 创建时间   | 慢（毫秒级）   | 快（微秒级）    |
| 上下文切换 | 需切换内存映射 | 仅切换寄存器/栈 |
| 内存占用   | 高（MB级）     | 低（KB级）      |

**(3) 通信复杂度**

- **进程间通信（IPC）**：  

  - 需通过操作系统提供的机制（如管道、共享内存）。  

  - 代码示例（Python管道）：  

    ```python
    from multiprocessing import Pipe
    parent_conn, child_conn = Pipe()
    child_conn.send("Hello")  # 子进程发送
    print(parent_conn.recv())  # 父进程接收
    ```

- **线程间通信**：  

  - 直接访问全局变量，但需加锁（如互斥锁）。  

  - 代码示例（Python线程锁）：  

    ```python
    from threading import Lock
    lock = Lock()
    def safe_increment():
        with lock:
            global counter
            counter += 1
    ```



**3. 使用场景**

| **场景**                    | 推荐选择            | 原因                                        |
| --------------------------- | ------------------- | ------------------------------------------- |
| 需要高隔离性（如浏览器）    | 多进程              | 避免单个页面崩溃影响整个浏览器              |
| 频繁创建/销毁（Web服务器）  | 多线程 + 线程池     | 轻量级，响应更快                            |
| 计算密集型任务（如AI训练）  | 多进程（跨CPU核心） | 利用多核并行计算（Python因GIL限制需多进程） |
| I/O密集型任务（如网络请求） | 多线程              | 避免阻塞主线程                              |



**4. 常见误区**

- **误区1**：“线程一定比进程快”。  
  - 事实：线程切换虽快，但多进程能利用多核CPU真正并行（尤其在Python中受GIL限制）。  
- **误区2**：“多线程无需考虑同步”。  
  - 事实：共享数据时仍需锁（如电商秒杀场景的超卖问题）。  



**5. 面试高频问题**

**Q1：为什么多线程共享内存会导致问题？如何解决？**  

- **答**：并发读写可能引发竞态条件（如余额错误）。需通过锁（`Lock`）、原子操作或不可变数据解决。  

**Q2：什么情况下用多进程？什么情况下用多线程？**  

- **答**：  
  - 多进程：需高隔离性、利用多核（如科学计算）。  
  - 多线程：I/O密集、轻量级任务（如Web服务器处理请求）。  

**Q3：进程和线程的“上下文切换”有什么区别？**  

- **答**：  
  - 进程切换：需切换内存映射表（TLB刷新），开销大。  
  - 线程切换：仅保存/恢复寄存器、栈指针，开销小。  



**总结**

- **进程**：独立性高，适合隔离任务。  
- **线程**：轻量高效，适合并发协作。  
- **选择依据**：  
  - 安全性要求 → 多进程  
  - 性能要求 → 多线程（注意同步）  



### **浏览器渲染进程有哪些线程**

浏览器渲染进程（Renderer Process）是多线程架构的核心组成部分，主要负责页面的解析、渲染和交互。以下是其核心线程及其职责：

**1. 主线程（Main Thread）**

- **核心职责**：
  - 解析HTML/CSS → 构建DOM树和CSSOM树。
  - 执行JavaScript（除Worker外的JS代码）。
  - 处理用户交互事件（点击、滚动等）。
- **关键任务**：
  - **DOM解析**：将HTML转换为DOM树。
  - **样式计算**：结合CSS生成CSSOM树。
  - **布局（Layout）**：计算元素的位置和大小（重排）。
  - **绘制（Paint）**：生成绘制指令（重绘）。
- **性能瓶颈**：
  - 长时间运行的JS会阻塞渲染（需任务分片或Web Worker）。



**2. 合成线程（Compositor Thread）**

- **核心职责**：
  - 将页面分层（Layers），独立处理滚动、动画等。
  - 通过GPU加速合成最终图像（避免主线程负担）。
- **优化机制**：
  - **离屏Canvas**：动画元素单独分层，避免重绘。
  - **避免重排**：使用`transform`/`opacity`触发合成层（不触发主线程）。



**3. 光栅化线程（Raster Thread）**

- **核心职责**：
  - 将合成线程生成的图层（Layers）切分为图块（Tiles）。
  - 调用GPU光栅化图块为位图（最终像素）。
- **并行处理**：
  - 多个光栅化线程同时工作，加速渲染。



**4. JavaScript引擎线程（如V8）**

- **核心职责**：
  - 解析和执行JavaScript代码。
  - 与主线程共享调用栈（故JS执行会阻塞DOM渲染）。
- **优化手段**：
  - **异步任务**：`setTimeout`、`Promise`。
  - **Web Worker**：将耗时JS移至独立线程。



**5. 事件触发线程（Event Loop Thread）**

- **核心职责**：
  - 管理事件循环（Event Loop），调度宏任务/微任务。
  - 将用户交互、网络请求等事件分发给主线程。
- **运行机制**：
  ```mermaid
  graph LR
    A[宏任务队列] --> B[执行栈]
    B --> C[微任务队列]
    C --> D[渲染]
  ```



**6. 网络线程（Network Thread）**

- **核心职责**：
  - 异步加载资源（HTML、CSS、JS、图片等）。
  - 处理缓存逻辑（`Cache-Control`验证）。
- **优化特性**：
  - 并行下载（浏览器限制同一域名6~8个连接）。



**7. Web Worker线程（可选）**

- **核心职责**：
  - 运行后台JS脚本，与主线程隔离。
  - 用于计算密集型任务（如数据分析）。
- **限制**：
  - 无法操作DOM（通过`postMessage`通信）。



**线程协作流程示例**

1. **加载阶段**：
   - 网络线程下载HTML → 主线程解析DOM/CSS → 合成线程分层。
2. **交互阶段**：
   - 事件触发线程捕获点击事件 → 主线程执行JS → 合成线程更新动画。
3. **渲染阶段**：
   - 光栅化线程生成位图 → GPU合成最终画面。



**面试高频问题**

**Q1：为什么JS执行会阻塞渲染？**  
- 主线程同时负责JS和渲染，调用栈独占（单线程特性）。

**Q2：如何优化大量DOM操作？**  

- 使用`documentFragment`批量操作，或通过`requestAnimationFrame`分帧处理。

**Q3：`transform`为何性能高？**  

- 它触发的动画由合成线程直接处理，跳过主线程的布局和绘制。



**总结**

| **线程**     | **职责**         | **优化目标**          |
| ------------ | ---------------- | --------------------- |
| 主线程       | DOM/JS/样式/布局 | 减少长任务，避免阻塞  |
| 合成线程     | 分层与GPU合成    | 使用CSS动画替代JS动画 |
| 光栅化线程   | 图层转位图       | 并行化加速            |
| 事件触发线程 | 调度事件循环     | 合理分配宏/微任务     |



## **进阶问题**
### **Web性能优化手段有哪些 - 略**  

- 减少HTTP请求（合并文件、雪碧图）。  
- 静态资源CDN加速。  
- 代码层面：防抖/节流、虚拟列表、懒加载。  
- 预加载（`<link rel="preload">`）和预渲染。



参见 HTML相关



### **前端安全相关问题及防御措施**  

- **XSS**：转义用户输入（如`<`转`&lt;`），使用CSP策略。  
- **CSRF**：Token验证、SameSite Cookie属性。  
- **点击劫持**：X-Frame-Options响应头。



前端安全是Web开发中的核心议题，以下是常见攻击手段及应对策略，涵盖 **XSS**、**CSRF**、**点击劫持** 等高频考点：

**1. XSS（跨站脚本攻击）**

**攻击原理**

- 恶意脚本被注入到网页中，在用户浏览器执行（如窃取Cookie、篡改页面）。
- **类型**：
  - **存储型XSS**：恶意脚本存入数据库（如评论框输入`<script>`）。
  - **反射型XSS**：脚本通过URL参数注入（如钓鱼链接）。（服务端解析后拼接HTML）
  - **DOM型XSS**：前端JS动态操作DOM时未转义。（客户端浏览器解析后拼接HTML）

**防御措施**

- **输入过滤/转义**：
  - 使用 `textContent` 替代 `innerHTML`，或转义特殊字符（如 `<` → `&lt;`）。
  ```javascript
  // 错误示范
  document.getElementById('output').innerHTML = userInput;
  
  // 正确做法
  document.getElementById('output').textContent = userInput;
  ```
- **CSP（内容安全策略）**：
  
  - 限制脚本来源，禁止内联脚本和执行外部资源。
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com
  ```
- **HttpOnly Cookie**：
  - 防止JavaScript读取敏感Cookie。
  ```http
  Set-Cookie: sessionId=abc123; HttpOnly; Secure
  ```



**2. CSRF（跨站请求伪造）**

**攻击原理**

- 诱导用户访问恶意网站，利用已登录状态伪造请求（如偷偷发起转账）。

**防御措施**

- **CSRF Token**：
  - 服务端生成随机Token，嵌入表单或请求头，验证请求合法性。
  ```html
  <form action="/transfer" method="POST">
    <input type="hidden" name="_csrf" value="随机Token">
  </form>
  ```
- **SameSite Cookie**：
  
  - 限制Cookie仅在同站请求中发送。
  ```http
  Set-Cookie: sessionId=abc123; SameSite=Lax; Secure
  ```
- **验证Referer/Origin头**：
  - 服务端检查请求来源是否合法。



**3. 点击劫持（Clickjacking）**

**攻击原理**

- 透明iframe覆盖在按钮上，诱骗用户点击（如伪造点赞或关注）。（XSS、XSRF都有可能）

**防御措施**

- **X-Frame-Options**：
  
  - 禁止页面被嵌入iframe。
  ```http
  X-Frame-Options: DENY  // 或 SAMEORIGIN
  ```
- **CSP的frame-ancestors指令**：
  ```http
  Content-Security-Policy: frame-ancestors 'none';
  ```



**4. 数据泄露与安全配置**

**风险点**

- **敏感信息硬编码**：API密钥、密码等暴露在前端代码中。
- **错误的CORS配置**：允许任意域访问（`Access-Control-Allow-Origin: *`）。

**防御措施**

- **环境变量管理密钥**：
  - 使用构建工具（如Webpack）注入环境变量，避免代码泄露。
  ```javascript
  const API_KEY = process.env.API_KEY;
  ```
- **严格CORS策略**：
  ```http
  Access-Control-Allow-Origin: https://your-domain.com
  ```



**5. 第三方依赖风险**

**风险点**

- 引入的npm包可能包含恶意代码（如窃取数据或挖矿脚本）。

**防御措施**

- **审计依赖**：
  - 使用 `npm audit` 或 `yarn why` 检查漏洞。
  - 锁定版本号（避免自动升级到有问题的版本）。
- **子资源完整性（SRI）**：
  - 验证CDN资源的哈希值是否匹配。
  ```html
  <script src="https://cdn.example.com/jquery.js" 
          integrity="sha384-...">
  </script>
  ```



**6. 前端存储安全**

**风险点**

- **LocalStorage/SessionStorage**：易受XSS攻击泄露数据。
- **IndexedDB**：未加密存储敏感信息。

**防御措施**

- **避免存储敏感数据**：如令牌、密码等应仅存于内存或HttpOnly Cookie。
- **加密存储**：必要时使用AES加密后再存。



**7. 面试高频问题**

**Q1：如何防止XSS攻击？**  
- 转义用户输入、启用CSP、设置HttpOnly Cookie。  

**Q2：CSRF和XSS的区别？**  
- CSRF利用用户已登录状态伪造请求；XSS直接注入恶意脚本。  

**Q3：为什么CSP能提升安全性？**  

- 限制资源加载来源，阻止未授权的脚本执行。  



**总结**

| **攻击类型** | **防御措施**                          |
| ------------ | ------------------------------------- |
| XSS          | 转义输入、CSP、HttpOnly Cookie        |
| CSRF         | CSRF Token、SameSite Cookie           |
| 点击劫持     | X-Frame-Options、CSP的frame-ancestors |
| 数据泄露     | 环境变量管理、严格CORS                |
| 依赖风险     | 审计npm包、SRI校验                    |

**核心原则**：  

- **最小权限**：仅开放必要的访问和操作权限。  
- **纵深防御**：多层防护（前端+服务端+网络层）。  



### **Service Worker 与 PWA 详解**  

- Service Worker：离线缓存（通过`fetch`事件拦截请求）。  
- PWA：manifest文件配置，实现“添加到主屏”和离线访问。



**1. Service Worker（服务工作者）**

**定义**：  
Service Worker 是浏览器在后台运行的脚本，充当**代理服务器**，可拦截网络请求、缓存资源，实现离线功能。

**核心特性**：  
- **独立线程**：与主线程隔离，不影响页面性能。  
- **离线缓存**：通过 `Cache API` 存储资源（HTML/CSS/JS/图片）。  
- **拦截请求**：可修改请求或返回缓存内容（类似反向代理）。  
- **推送通知**：支持后台推送消息（即使页面关闭）。  

**生命周期**：  
1. **注册** → 2. **安装**（`install` 事件） → 3. **激活**（`activate` 事件） → 4. **运行**（拦截请求）。  

**示例代码**：  
```javascript
// 注册 Service Worker（主线程）
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker 注册成功');
  });
}

// sw.js（Service Worker 脚本）
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(['/', '/styles.css', '/app.js']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```



**2. PWA（渐进式 Web 应用）**

**定义**：  
PWA 是通过 Web 技术（HTML/CSS/JS）构建的类原生应用体验的网页应用，依赖 Service Worker 实现核心功能。

**核心特性**：  
- **离线可用**：Service Worker 缓存关键资源。  
- **添加到主屏**：通过 `manifest.json` 配置图标和启动样式。  
- **推送通知**：增强用户互动。  
- **响应式设计**：适配所有设备。  

**关键组件**：  
1. **Service Worker**（离线缓存+后台同步）。  
2. **Web App Manifest**（定义应用元数据）。  
3. **HTTPS**（必需，确保安全）。  

**manifest.json 示例**：  
```json
{
  "name": "My PWA",
  "short_name": "PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "icons": [{
    "src": "/icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  }]
}
```



**3. 实际应用场景**

**(1) 离线访问**

- 缓存静态资源（如博客文章、文档）。  
- 首次访问后，断网仍可加载页面。  

**(2) 加速加载**

- 缓存 API 响应（如商品列表），减少网络请求。  

**(3) 推送通知**

- 电商促销、新闻更新（需用户授权）。  



**4. 实现步骤**

1. **注册 Service Worker**（见上文代码）。  
2. **编写缓存策略**（如优先缓存，失败则请求网络）。  
3. **配置 `manifest.json`**（定义应用名称、图标等）。  
4. **部署 HTTPS**（PWA 强制要求）。  



**5. 注意事项**

- **缓存更新**：通过版本控制（如 `cache-v2`）清理旧缓存。  
- **用户权限**：推送通知需用户显式授权。  
- **兼容性**：不支持 IE，部分 Safari 功能受限。  



**6. 面试高频问题**

**Q1：Service Worker 能访问 DOM 吗？**  
- 不能，它在独立线程运行，通过 `postMessage` 与主线程通信。  

**Q2：如何更新 Service Worker？**  
- 修改 `sw.js` 文件（如版本号变更），触发新安装并清理旧缓存。  

**Q3：PWA 和原生应用的主要区别？**  
- **PWA**：无需安装商店审核，更新即时，但硬件访问（如蓝牙）受限。  
- **原生应用**：功能更全面，但需下载安装。  

---

**总结**

- **Service Worker**：离线缓存和网络代理的基石。  
- **PWA**：通过 Service Worker + Manifest 实现类原生体验。  
- **适用场景**：内容型网站（新闻、博客）、轻量级应用（工具、电商）。  



### **为什么现代浏览器采用多进程架构**  

- 进程隔离（如渲染进程、GPU进程、插件进程），避免单页面崩溃影响整个浏览器。



现代浏览器（如 Chrome、Edge）采用多进程架构，主要为了解决 **稳定性**、**安全性** 和 **性能** 三大问题。以下是详细解析：

**1. 稳定性：避免单点崩溃**

- **问题**：传统单进程浏览器中，一个页面崩溃（如内存泄漏或脚本错误）会导致整个浏览器崩溃。  
- **多进程方案**：  
  - 每个标签页、插件、扩展运行在**独立进程**中。  
  - **崩溃隔离**：单个页面崩溃仅影响自身，其他标签页不受影响。  
  - 示例：Chrome 中每个标签页是一个独立的 `Renderer Process`。



**2. 安全性：沙箱化（Sandboxing）**

- **问题**：恶意网页可能通过漏洞攻击浏览器内核，窃取用户数据。  
- **多进程方案**：  
  - **沙箱隔离**：渲染进程（Renderer Process）无权直接访问系统资源（如文件、网络），需通过主进程（Browser Process）代理。  
  - **最小权限原则**：插件、GPU 等高风险模块运行在独立进程，权限受限。  



**3. 性能：并行处理与资源分配**

- **问题**：单进程下，复杂页面（如多标签、视频、动画）会争夺CPU/内存资源，导致卡顿。  
- **多进程方案**：  
  - **多核CPU利用**：不同进程可并行运行，充分利用多核CPU（如JS引擎、渲染、解码分开处理）。  
  - **内存优化**：闲置标签页可被冻结或降级，释放资源给前台页面。  



**4. 现代浏览器的进程模型（以 Chrome 为例）**

| **进程类型**         | **职责**                         | **示例**       |
| -------------------- | -------------------------------- | -------------- |
| **Browser Process**  | 主进程，管理窗口、导航、其他进程 | 只有一个       |
| **Renderer Process** | 渲染页面（每个标签页独立）       | 每个标签页一个 |
| **GPU Process**      | 处理3D渲染、CSS动画加速          | 共享全局       |
| **Plugin Process**   | 运行插件（如Flash，已逐步淘汰）  | 每个插件一个   |
| **Utility Process**  | 辅助功能（网络服务、文件访问）   | 按需创建       |



**5. 多进程架构的代价**

- **内存占用高**：每个进程需独立的内存空间（如V8引擎、渲染栈）。  
  - 优化：Chrome 采用 **进程合并策略**（如同源标签页共享进程）。  
- **进程间通信（IPC）开销**：跨进程通信比线程通信更耗时。  



**6. 对比单进程/多线程架构**

| **架构类型**         | **优点**           | **缺点**             |
| -------------------- | ------------------ | -------------------- |
| 单进程               | 内存占用低         | 崩溃风险高、安全性差 |
| 多进程               | 稳定、安全、性能好 | 内存占用高           |
| 混合架构（现代方案） | 平衡资源与隔离需求 | 实现复杂             |



**7. 面试高频问题**

**Q1：多进程如何提升安全性？**  

- 答：通过沙箱隔离，渲染进程无法直接读写磁盘或网络，需通过主进程的权限检查。  

**Q2：为什么多进程比多线程更适合浏览器？**  
- 答：进程间内存隔离更彻底（线程共享内存），崩溃和攻击的影响范围更小。  

**Q3：如何减少多进程的内存占用？**  
- 答：进程复用（同源标签共享进程）、懒加载、冻结后台标签。  



**总结**

- **核心目标**：稳定性（隔离崩溃）、安全性（沙箱）、性能（并行）。  
- **技术趋势**：现代浏览器进一步细化进程（如 Site Isolation，每个跨站点 iframe 独立进程）。  

多进程架构是浏览器从“单页面工具”演变为“操作系统级应用”的关键设计！



## **实战场景题**
### **如何实现一个埋点监控系统**  

- 数据采集（PV/UV、错误监控、性能指标）。  
- 上报方式（Navigator.sendBeacon、img.src打点）。  
- 防丢失策略（本地缓存 + 批量上报）。



**1. 核心目标**

- **用户行为追踪**：点击、滚动、页面停留等。
- **性能监控**：页面加载时间、API耗时。
- **错误收集**：JS错误、API失败。
- **数据可视化**：生成报表分析用户行为。



**2. 技术架构**

```mermaid
graph LR
A[前端SDK] -->|发送数据| B[日志服务器]
B -->|存储| C[数据仓库]
C -->|分析| D[可视化平台]
```



**3. 前端SDK实现**

**(1) 基础埋点**

```javascript
class Tracker {
  constructor() {
    this.endpoint = 'https://logs.yourdomain.com'; // 日志接收地址
  }

  // 发送数据
  send(data) {
    const params = new URLSearchParams({
      project: 'your_project',
      timestamp: Date.now(),
      ...data
    });
    
    // 使用navigator.sendBeacon保证页面关闭时也能发送
    navigator.sendBeacon(`${this.endpoint}?${params}`);

    // 或使用img标签兜底（兼容性更好）
    new Image().src = `${this.endpoint}?${params}`;
  }

  // 页面访问埋点
  trackPageView() {
    this.send({
      type: 'pageview',
      path: window.location.pathname
    });
  }

  // 点击事件埋点
  trackClick(selector, eventName) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('click', () => {
        this.send({
          type: 'click',
          event: eventName,
          text: el.innerText.slice(0, 20)
        });
      });
    });
  }
}

// 使用示例
const tracker = new Tracker();
tracker.trackPageView();
tracker.trackClick('.buy-btn', 'product_purchase');
```

**(2) 性能监控**

```javascript
// 页面加载性能
window.addEventListener('load', () => {
  const timing = performance.timing;
  tracker.send({
    type: 'performance',
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    tcp: timing.connectEnd - timing.connectStart,
    ttfb: timing.responseStart - timing.requestStart,
    domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
    load: timing.loadEventEnd - timing.navigationStart
  });
});

// API监控（重写fetch）
const originalFetch = window.fetch;
window.fetch = async function(...args) {
  const start = Date.now();
  const response = await originalFetch(...args);
  tracker.send({
    type: 'api',
    url: args[0],
    status: response.status,
    duration: Date.now() - start
  });
  return response;
};
```

**(3) 错误收集**

```javascript
// JS错误
window.addEventListener('error', (e) => {
  tracker.send({
    type: 'error',
    msg: e.message,
    file: e.filename,
    line: e.lineno,
    col: e.colno
  });
});

// Promise错误
window.addEventListener('unhandledrejection', (e) => {
  tracker.send({
    type: 'promise_error',
    reason: e.reason?.toString()
  });
});
```



**4. 服务端实现**

**Node.js日志接收示例**

```javascript
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const logData = decodeURIComponent(req.url.split('?')[1]);
  fs.appendFileSync('./logs.txt', logData + '\n');
  res.end();
}).listen(3000);
```

**日志处理建议**

- **存储**：使用ELK（Elasticsearch+Logstash+Kibana）或时序数据库（InfluxDB）
- **去重**：对相同错误进行聚合
- **采样**：大流量时对非关键数据采样



**5. 数据上报优化**

| **策略**   | **实现方式**                      | **适用场景**         |
| ---------- | --------------------------------- | -------------------- |
| 批量上报   | 本地缓存数据，定时批量发送        | 高频事件（如点击流） |
| 失败重试   | 失败数据存入IndexedDB，下次补发   | 网络不稳定环境       |
| 采样上报   | 随机丢弃部分非关键数据            | PV量极大的页面       |
| 差异化上报 | 错误日志100%上报，性能数据采样10% | 平衡成本与需求       |



**6. 可视化分析**

- **基础方案**：  
  - 使用Grafana连接数据库展示折线图、饼图
- **高级方案**：  
  - 用户行为路径分析（桑基图）
  - 错误聚类统计



**7. 隐私与合规**

- **匿名化**：去除IP、用户ID等敏感信息
- **GDPR合规**：提供关闭埋点的选项
```javascript
// 通过本地存储记录用户选择
localStorage.setItem('tracking_disabled', 'true');
```



**8. 面试问题**

**Q1：如何保证数据不丢失？**  
- 答：本地缓存（IndexedDB）+ 服务端确认机制 + 失败重试

**Q2：大流量场景如何优化？**  
- 答：采样上报、批量压缩、CDN分发日志接收接口

**Q3：SPA（单页应用）如何统计页面停留时间？**  
- 答：监听路由变化事件，计算前后路由切换时间差



**总结**

- **核心流程**：采集 → 上报 → 存储 → 分析
- **关键技术**：  
  - 前端：`sendBeacon`、`performance API`、错误监听  
  - 后端：高并发日志接收、大数据处理  
- **扩展方向**：  
  - 无痕埋点（全量采集+后端解析）  
  - 用户行为录像（rrweb等库）  



### **大文件分片上传/断点续传如何实现**  

- 前端分片（File API的`slice`方法）。  
- 服务端记录分片（MD5校验）。  
- 断点续传（已上传分片跳过）。



**1. 核心流程**

```mermaid
graph TB
A[前端分片] --> B[上传分片]
B --> C[服务端校验]
C --> D[合并文件]
D --> E[断点续传校验]
```



**2. 前端实现**

**(1) 文件分片**

```javascript
// 分片大小建议：5~10MB
const CHUNK_SIZE = 5 * 1024 * 1024; 

async function splitFile(file) {
  const chunks = [];
  let start = 0;
  
  while (start < file.size) {
    const chunk = file.slice(start, start + CHUNK_SIZE);
    chunks.push({
      chunk,
      hash: await calculateHash(chunk), // 分片哈希（可用SparkMD5）
      index: chunks.length,
      total: Math.ceil(file.size / CHUNK_SIZE)
    });
    start += CHUNK_SIZE;
  }
  
  return chunks;
}

// 计算文件哈希（用于唯一标识文件）
function calculateHash(chunk) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(e.target.result);
      resolve(spark.end());
    };
    reader.readAsArrayBuffer(chunk);
  });
}
```

**(2) 上传控制**

```javascript
async function uploadFile(file) {
  const chunks = await splitFile(file);
  const fileHash = await calculateFullHash(chunks); // 整个文件的哈希
  
  // 检查哪些分片已上传（断点续传）
  const { uploaded } = await checkServer(fileHash);
  
  for (const chunk of chunks) {
    if (uploaded.includes(chunk.hash)) continue;
    
    const formData = new FormData();
    formData.append('chunk', chunk.chunk);
    formData.append('hash', chunk.hash);
    formData.append('index', chunk.index);
    formData.append('fileHash', fileHash); // 使用fileHash作为文件唯一标识符
    
    await fetch('/upload', {
      method: 'POST',
      body: formData
    });
    
    // 上传进度计算
    updateProgress((chunk.index + 1) / chunks.length * 100);
  }
  
  // 通知服务端合并
  await mergeChunks(fileHash, file.name);
}

// 计算整个文件的哈希
async function calculateFullHash(chunks) {
  const spark = new SparkMD5.ArrayBuffer();
  for(let chunk of chunks){
    await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = e => {
        spark.append(e.target.result);
        resolve();
      };
      reader.readAsArrayBuffer(chunk);
    });
  }
  return spark.end();
}
```



**3. 服务端实现（Node.js示例）**

**(1) 接收分片**

```javascript
const fs = require('fs');
const path = require('path');
const UPLOAD_DIR = './uploads';

// 检查已上传分片
app.get('/check', (req, res) => {
  const { fileHash } = req.query;
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  
  if (!fs.existsSync(chunkDir)) {
    return res.json({ uploaded: [] });
  }
  
  const uploaded = fs.readdirSync(chunkDir);
  res.json({ uploaded });
});

// 上传分片
app.post('/upload', (req, res) => {
  const { hash, fileHash } = req.body;
  const chunk = req.files.chunk;
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }
  
  fs.renameSync(chunk.path, `${chunkDir}/${hash}`);
  res.status(200).end();
});
```

**(2) 合并分片**

```javascript
app.post('/merge', async (req, res) => {
  const { fileHash, fileName } = req.body;
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  const chunks = fs.readdirSync(chunkDir);
  
  // 按分片索引排序
  chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1]); // 分片的名称大概为：[hash]-[index]
  
  // 合并文件
  const filePath = path.resolve(UPLOAD_DIR, fileName);
  await Promise.all(
    chunks.map((chunk, index) => {
      return new Promise(resolve => {
        const reader = fs.createReadStream(`${chunkDir}/${chunk}`);
        const writer = fs.createWriteStream(filePath, {
          start: index * CHUNK_SIZE
        });
        reader.pipe(writer).on('finish', resolve);
      });
    })
  );
  
  // 删除临时分片
  fs.rmdirSync(chunkDir, { recursive: true });
  res.status(200).end();
});
```



**4. 断点续传关键点**

1. **分片哈希**：每个分片计算唯一hash，服务端记录已上传的分片。  
2. **文件标识**：整个文件的hash作为唯一ID（避免重复上传）。  
3. **分片清理**：合并后删除临时分片，避免存储浪费。  



**5. 优化策略**

| **问题**         | **解决方案**                             |
| ---------------- | ---------------------------------------- |
| 网络波动         | 分片失败自动重试（3次限制）              |
| 大文件哈希计算慢 | 使用Web Worker后台计算                   |
| 服务端存储压力   | 设置分片过期时间（如24小时未合并则删除） |
| 并发控制         | 限制同时上传的分片数（如最多5个并行）    |



**6. 前端完整示例（Vue/React）**

```javascript
// 上传组件
function FileUpload() {
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file) => {
    const chunks = await splitFile(file);
    const fileHash = await calculateFullHash(chunks);
    
    // 检查已上传分片
    const { uploaded } = await axios.get('/check', { 
      params: { fileHash } 
    });
    
    // 过滤未上传的分片
    const todoChunks = chunks.filter(
      chunk => !uploaded.includes(chunk.hash)
    );
    
    // 并发上传（限制5个）
    await Promise.all(
      todoChunks.map((chunk, i) => 
        i < 5 ? uploadChunk(chunk, fileHash) : null // i < 5 写的不对吧？
      )
    );
    
    // 合并
    await axios.post('/merge', { fileHash, fileName: file.name });
  };
  
  return <input type="file" onChange={e => handleUpload(e.target.files[0])} />;
}
```



**7. 面试高频问题**

**Q1：如何保证分片顺序合并？**  

- 答：分片命名包含索引（如`chunk-1-hash`），服务端按索引排序后合并。  

**Q2：文件哈希相同是否直接秒传？**  
- 答：是，服务端检查文件hash若已存在，可直接返回已上传文件的URL。  

**Q3：如何防止上传被恶意中断？**  
- 答：分片单独校验（每个分片上传后记录），中断后重新上传缺失的分片。  



**总结**

- **分片上传**：切割文件 → 并行上传 → 服务端合并  
- **断点续传**：哈希标识分片 → 服务端记录 → 续传时跳过已上传  
- **优化方向**：  
  - 前端：Web Worker计算哈希、并发控制  
  - 服务端：秒传、分片清理  

完整实现可参考：[uppy.js](https://uppy.io/) 或 [tus协议](https://tus.io/)！ 
