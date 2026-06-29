# CSS 高频面试题

> [!NOTE]
>
> **必考（几乎必问）**
>
> - 盒模型（标准 vs 怪异）
>
> - 选择器优先级（权重计算）
>
> - Flex 布局（主轴/交叉轴属性）
>
> - Grid 布局（基本概念）
>
> - BFC（触发条件/作用）
>
> - 居中方案（水平/垂直）
>
> - 响应式设计（媒体查询/视口单位）
>
> **高频（常问）**
>
> - CSS3 新特性（动画/渐变/阴影）
>
> - 重绘与回流（区别/优化）
>
> - 伪类与伪元素（:hover/::before）
>
> - CSS 变量（--var 使用）
>
> - Position 定位（relative/absolute/fixed）
>
> - 层叠上下文（z-index 生效条件）
>
> - 移动端适配（REM/Viewport）
>
> **加分（进阶/亮点）**
>
> - CSS 模块化（CSS Modules/CSS-in-JS）
>
> - 性能优化（will-change/content-visibility）
>
> - CSS 函数（calc()/clamp()）
>
> - 容器查询（@container）
>
> - CSS 预处理器（Sass/Less 区别）
>
> - Houdini API（CSS 绘制扩展）
>
> - CSS 与无障碍（prefers-reduced-motion）
>



## CSS基础概念

### 标准盒模型和怪异盒模型的区别

CSS 盒模型是指每个 HTML 元素可以被看作一个矩形盒子，这个盒子由多个区域组成。这些区域包括内容区域（content）、内边距（padding）、边框（border）和外边距（margin）。

- 标准盒模型(content-box)：width/height = 内容区大小

- 怪异盒模型(border-box)：width/height = 内容区 + padding + border



### CSS选择器优先级如何计算 *

选择器权重：!important \> 行内样式 \> ID选择器 \> 类/属性/伪类选择器 \> 元素/伪元素选择器 \> 通配符

具体计算规则：a(行内),b(ID),c(类),d(元素) -\> 比较abcd的权重值



### 哪些CSS属性可以继承 * *

在CSS中，有许多属性是可以从父元素继承到子元素的。以下是一些常见的可继承的CSS属性：

1.  **字体属性**：包括font-family、font-size、font-weight、font-style、font-variant和line-height等。这些属性决定了文本的字体样式、大小和行高等。

2.  **文本属性**：如color（文本颜色）、text-align（文本对齐方式）、text-indent（文本缩进）、text-decoration（文本装饰，如下划线、删除线等）、text-transform（文本转换，如大写、小写、首字母大写等）、letter-spacing（字符间距）和word-spacing（单词间距）等。

3.  **元素可见性**：visibility属性可以控制元素是否可见，即使其被隐藏，也不会影响页面的布局。

4.  **列表属性**：如list-style、list-style-type、list-style-position和list-style-image等，用于控制列表的样式。

5.  **光标属性**：cursor属性用于设置鼠标指针在元素上时的样式。

6.  **表格属性**：如border-collapse（用于控制表格边框的合并）在某些情况下也可以被继承。

请注意，虽然这些属性在大多数情况下是可继承的，但它们的继承性可能会受到一些因素的影响，如CSS的层叠规则（Cascading Rules）和!important规则的使用等。此外，并非所有的CSS属性都是可继承的，例如背景属性（如background-color）、盒子模型的属性（如width、height、margin、padding和border）以及定位属性（如position、top、right、bottom、left和z-index）等都是不可继承的。



### position属性有哪些 *

- **static**: 默认，正常文档流

- **relative**: 相对自身定位，会在此元素未添加定位时所在位置留下空白

- **absolute**: 相对最近非static祖先定位，元素会被移出正常文档流，并不为元素预留空间

- **fixed**: 相对视口定位，元素会被移出正常文档流，并不为元素预留空间

- **sticky**: 相对最近滚动祖先和包含块定位，滚动时固定在指定位置



### 常用的 @规则 有哪些

CSS 的 @ 规则（At-Rules）用于定义特殊行为、条件或元数据，以下是最常用的几种：

| **@ 规则** | **用途**         | **使用场景**           |
| ---------- | ---------------- | ---------------------- |
| @media     | 响应式设计       | 适配不同屏幕尺寸       |
| @keyframes | 定义动画         | CSS 动画               |
| @font-face | 加载自定义字体   | 品牌字体、图标字体     |
| @import    | 引入外部 CSS     | 模块化样式（但性能差） |
| @supports  | 特性检测         | 渐进增强               |
| @charset   | 定义文件编码     | 非 UTF-8 编码时        |
| @page      | 打印样式         | 打印优化               |
| @layer     | 管理样式优先级   | 大型项目样式隔离       |
| @container | 容器查询         | 组件级响应式设计       |
| @namespace | XML/SVG 命名空间 | SVG 样式隔离           |

**1\. @media — 媒体查询（响应式设计）**

用途：根据设备特性（如屏幕宽度、方向、分辨率）应用不同样式。

```css
@media (max-width: 768px) {  
    body { font-size: 14px; } /* 手机端字体缩小 */  
}  

/* 深色模式适配 */  
@media (prefers-color-scheme: dark) {  
    body { background: #222; color: #fff; }  
} 
```

**2\. @keyframes — 关键帧动画**

用途：定义动画的中间步骤。

```css
@keyframes fadeIn {  
    from { opacity: 0; }  
    to { opacity: 1; }  
}  

.element {  
    animation: fadeIn 2s;  
} 
```

**3\. @font-face — 自定义字体**

用途：加载非系统字体。

```css
@font-face {  
    font-family: "MyFont";  
    src: url("myfont.woff2") format("woff2");  
}  

body {  
    font-family: "MyFont";  
}
```

**4\. @import — 导入外部CSS**

用途：引入其他 CSS 文件（但会阻塞渲染，慎用）。

```css
@import url("reset.css"); /* 不推荐，优先用 <link> */  
```

**5\. @supports — 特性检测**

用途：检查浏览器是否支持某 CSS 特性。

```css
@supports (display: grid) {  
    .container { display: grid; } /* 支持 Grid 时生效 */  
}
```

**6\. @charset — 定义编码**

用途：指定 CSS 文件的字符编码（通常 UTF-8）。

```css
@charset "UTF-8"; /* 必须放在文件第一行 */  
```

**7\. @page — 打印样式**

用途：控制打印时的页面样式。

```css
@page {  
    size: A4;  
    margin: 1cm;  
}
```

**8\. @layer — 级联层（CSS Cascade Layers）**

用途：管理样式优先级（CSS 新特性）。

```css
@layer base, theme;  

@layer base {  
    button { color: red; } /* 低优先级 */  
}  

@layer theme {  
    button { color: blue; } /* 高优先级 */  
} 
```

**9\. @container — 容器查询（实验性）**

用途：根据容器尺寸而非视口调整样式。

```css
.component {  
    container-type: inline-size;  
}  

/* min-width: 500px 相当于 width > 500px */ 
@container (min-width: 500px) {  
    .child { font-size: 1.2rem; }  
} 
```

**10\. @namespace — XML 命名空间**

用途：用于 SVG 或 MathML 等 XML 内容。

```css
@namespace svg url("http://www.w3.org/2000/svg");  
svg|a { fill: blue; } /* 仅影响 SVG 的 <a> 元素 */  
```



### 伪类和伪元素的区别和使用 * *

伪类的例子有:hover，:active，:first-child，:visited等。

伪元素的例子有:first-line，:first-letter，:after，:before等。



**一、伪类 vs 伪元素：核心区别**

| **特性**     | **伪类（Pseudo-class）**           | **伪元素（Pseudo-element）**           |
| ------------ | ---------------------------------- | -------------------------------------- |
| **作用对象** | **整个元素**（如状态、位置）       | **元素的特定部分**（如首行、内容前后） |
| **语法符号** | 单冒号（`:`）                      | 双冒号（`::`，CSS3规范）*              |
| **常见示例** | `:hover`, `:nth-child()`, `:focus` | `::before`, `::after`, `::first-line`  |
| **DOM 结构** | 不创建新元素                       | 创建虚拟元素（不在DOM中，但可样式化）  |
| **功能定位** | 描述元素的**状态或特征**           | 描述元素的**特定内容部分**             |

> *注：CSS3规范中伪元素用双冒号（`::`），但单冒号（`:`）仍被浏览器兼容。



**二、详细解析与示例**

**1. 伪类（Pseudo-class）**

**作用**：选择处于**特定状态**或满足**特定条件**的元素。  
**常见用例**：
```css
/* 状态伪类 */
a:hover { color: red; }         /* 鼠标悬停 */
input:focus { border-color: blue; } /* 输入框聚焦 */
button:disabled { opacity: 0.5; }   /* 禁用状态 */

/* 结构伪类 */
li:nth-child(odd) { background: #eee; }  /* 奇数行 */
tr:first-child { font-weight: bold; }     /* 表格首行 */
:not(.hidden) { display: block; }         /* 非隐藏元素 */
```

**2. 伪元素（Pseudo-element）**

**作用**：选择元素的**特定部分**或**创建虚拟内容**。  
**常见用例**：
```css
/* 创建虚拟内容 */
.element::before {
  content: "前缀";  /* 必须设置content */
  color: red;
}
.element::after {
  content: "后缀";
  color: blue;
}

/* 选择元素部分内容 */
p::first-letter { font-size: 2em; }   /* 首字母放大 */
p::first-line { text-decoration: underline; } /* 首行下划线 */
::selection { background: yellow; }    /* 文本选中样式 */
```



**三、易混淆案例对比**

```css
/* 伪类：选择第一个子元素 */
div:first-child { color: red; }

/* 伪元素：选择元素内容的第一个字母 */
div::first-letter { color: blue; }
```
- `:first-child`：选择作为第一个子元素的`div`（整个元素）。  
- `::first-letter`：选择`div`内容的首字母（元素的一部分）。



**四、记忆技巧**

1. **伪类**：描述元素"怎么样"（状态/位置）。  
   - 如：悬停（`:hover`）、第几个（`:nth-child`）、禁用（`:disabled`）。  
2. **伪元素**：描述元素"的某个部分"（内容/片段）。  
   - 如：前面（`::before`）、首行（`::first-line`）、选中文本（`::selection`）。



**五、特殊注意事项**

1. **content属性**：  
   
   - 伪元素（如`::before`/`::after`）**必须**设置`content`属性才会生效。  
   - 伪类不需要`content`属性。
   
2. **组合使用**：  
   伪类和伪元素可以组合使用：
   ```css
   /* 鼠标悬停时的首字母 */
   p:hover::first-letter {
     font-size: 2em;
   }
   ```

3. **浏览器兼容性**：  
   
   - 对于旧浏览器（如IE8），伪元素仅支持单冒号（`:`）。  
   - 现代开发中建议使用双冒号（`::`）规范。




### CSS函数有哪些

CSS 函数用于动态计算值，实现更灵活的样式控制。以下是最常用的CSS 函数，按用途分类整理：

| **分类**   | **常用函数**                         | **作用**            |
| ---------- | ------------------------------------ | ------------------- |
| 颜色       | rgb(), hsl(), color-mix()            | 颜色定义与混合      |
| 数学计算   | calc(), min(), clamp()               | 动态尺寸计算        |
| 渐变       | linear-gradient(), radial-gradient() | 创建渐变背景        |
| 变形       | translate(), rotate()                | 2D/3D 变换          |
| 滤镜       | blur(), drop-shadow()                | 视觉特效处理        |
| 形状裁剪   | circle(), polygon()                  | 定义可见区域        |
| 变量与逻辑 | var(), attr()                        | 动态值和属性引用    |
| 资源加载   | url(), counter()                     | 引入外部资源/计数器 |

**使用场景建议**

1. 响应式布局 → calc() + clamp()

2. 动画/交互 → translate() + rotate()

3. 主题切换 → var() + CSS 变量

4. 复杂背景 → linear-gradient() + radial-gradient()

5. 性能优化 → will-change + transform函数（GPU 加速）



**1\. 颜色函数**

（处理颜色值）

```css
/* rgb() / rgba() */  
color: rgb(255, 0, 0);        /* 红色 */  
background: rgba(0, 0, 255, 0.5); /* 半透明蓝色 */  

/* hsl() / hsla() */  
color: hsl(120, 100%, 50%);    /* 纯绿色 */  
background: hsla(0, 100%, 50%, 0.3); /* 半透明红色 */  

/* color-mix()（CSS Color Level 4） */  
background: color-mix(in srgb, red 30%, blue 70%);  

/* hwb()（Hue-Whiteness-Blackness） */  
color: hwb(180 0% 0%); /* 青色 */  
```

hsl指hue（色相、色调、颜色，0-360deg），saturation（饱和度,0-100%），lightness（明亮度,0-100%）

**2\. 数学计算**

（动态计算尺寸/数值）

```css
/* calc() */  
width: calc(100% - 50px); /* 响应式宽度计算 */  

/* min() / max() / clamp() */  
font-size: clamp(1rem, 2.5vw, 2rem); /* 动态字体大小：最小值、首选值、最大值 */  
width: min(100%, 500px); /* 不超过500px */  
height: max(50vh, 300px); /* 至少300px */  
```

**3\. 渐变函数**

（创建颜色渐变）

```css
/* linear-gradient() */  
background: linear-gradient(45deg, red, blue);  

/* radial-gradient() */  
background: radial-gradient(circle, yellow, green);  

/* conic-gradient() */  
background: conic-gradient(red, yellow, lime, blue);
```

**4\. 变形与过渡**

（2D/3D 变换和动画）

```css
/* translate() / rotate() / scale() */  
transform: translate(50px, 20px) rotate(45deg) scale(1.2);  

/* matrix()（矩阵变换） */  
transform: matrix(1, 0.5, -0.5, 1, 0, 0);  

/* perspective()（3D 透视） */  
transform: perspective(500px) rotateY(30deg);  
```

**5\. 滤镜效果**

（图像/元素视觉处理）

```css
/* blur() / brightness() / contrast() */  
filter: blur(2px) brightness(1.5) contrast(0.8);  

/* drop-shadow()（替代 box-shadow 对内容生效） */  
filter: drop-shadow(2px 4px 6px black);  

/* url()（加载 SVG 滤镜） */  
filter: url(#svg-filter);  
```

**6\. 形状与裁剪**

（定义可见区域）

```css
/* circle() / ellipse() / polygon() */  
clip-path: circle(50% at center); /* 圆形裁剪 */  
shape-outside: polygon(0 0, 100% 0, 50% 100%); /* 文字环绕 */  
```

**7\. 变量与条件**

（动态值和逻辑判断）

```css
/* var()（CSS 变量） */  
:root { --primary: #4285f4; }  
button { background: var(--primary); }  

/* attr()（获取 HTML 属性值） */  
.tooltip::after { content: attr(data-tooltip); }  
```

**8\. 其他实用函数**

```css
/* url()（加载资源） */  
background-image: url("image.jpg");  

/* counter()（计数器） */  
content: counter(item) ". "; /* 生成列表编号 */  

/* env()（访问环境变量，如安全区域） */  
padding-bottom: env(safe-area-inset-bottom); /* 适配刘海屏 */  
```



## CSS布局相关

### 如何实现水平垂直居中 *

1.  **使用Flex布局**

```css
/* 方法1: flex */  
.parent {  
    display: flex;  
    justify-content: center;  /* 此处使用justify-items也行 */
    align-items: center;  
}  
```



2.  **使用Grid布局**

```css
/* 方法2: grid */  
.parent {  
    display: grid;  
    place-items: center; /* align-items 和 justify-items 属性的简写 */
}  
```

&nbsp;

3.  **使用定位（Position）和转换（transform）**

对于已知尺寸的元素，可以使用定位和转换来实现居中。

```css
.parent {    
    position: relative;    
    height: 300px; /* 或者其他值 */    
    width: 300px; /* 或者其他值 */    
}    

.child {    
    position: absolute;    
    top: 50%;    
    left: 50%;    
    transform: translate(-50%, -50%);    
    /* 其他样式 */    
}  
```

&nbsp;

4.  **使用表格布局（Table Layout）**

虽然这不是真正的表格，但可以利用表格布局的某些特性来实现居中。

```css
.parent {    
    display: table-cell;    
    text-align: center;    
    vertical-align: middle;    
    height: 300px; /* 或者其他值 */    
    width: 300px; /* 或者其他值 */    
    border: 1px solid #ccc; /* 可选边框 */    
}    

.child {    
    display: inline-block; /* 或者 block，但可能会引入额外的边距 */    
    /* 其他样式 */    
}  
```

&nbsp;

5.  **使用行内块块元素（inline-block）和文本对齐**

对于行内块元素，可以使用文本对齐和垂直填充来实现居中。

```css
.parent {    
    text-align: center; /* 水平居中 */    
    height: 300px; /* 或者其他值 */    
    line-height: 300px; /* 与高度相同以实现垂直居中 */    
}    

.child {    
    display: inline-block;    
    vertical-align: middle; /* 对于行内块元素来说不是必要的，但保持一致性 */    
    line-height: normal; /* 重置行高以避免继承 */    
    /* 其他样式 */    
}  
```



### Flex布局常用属性有哪些 * *

**容器属性:**

1.  **flex-direction**：定义主轴的方向，即弹性项在容器中的排列方向，可选值有row（水平方向，默认值）、row-reverse（水平方向的反方向）、column（垂直方向）和column-reverse（垂直方向的反方向）。

2.  **flex-wrap**：定义当弹性项在一行或一列中无法放下时，是否换行或换列，可选值有nowrap（不换行，默认值）、wrap（换行）和wrap-reverse（反向换行）。

3.  **flex-flow**：是flex-direction和flex-wrap的简写形式，用于同时设置这两个属性。

4.  **justify-content**：定义弹性项在主轴上的对齐方式，可选值有flex-start（主轴起点对齐）、flex-end（主轴终点对齐）、center（主轴居中对齐）、space-between（首尾元素与两端对齐，弹性项之间的间隔相等）、space-around（每个弹性项两侧的间隔相等）和space-evenly（弹性项之间的间隔和两端的间隔都相等）。（也可以理解为多条交叉轴在主轴方向上的对齐方式）

5.  **justify-items ***：<u>弹性盒子布局中，该属性被忽略</u>。Grid布局中，会将其栅格区域内的项目在其行内轴上对齐。常用值有start、end、center、stretch、flex-start、flex-end。

6.  **align-items**：定义弹性项<u>包含的项目</u>在盒子内部交叉轴上的对齐方式，可选值与justify-items类似，但作用在交叉轴上，包括flex-start（交叉轴起点对齐）、flex-end（交叉轴终点对齐）、center（交叉轴居中对齐）、**stretch**（多个元素时，自动调整大小的元素将等量增大，以填满容器，同时这些元素仍然保持其宽高比例的约束。注意：最高的元素定义了容器的高度）。

7.  **align-content**：定义多行弹性项在交叉轴上的对齐方式，当弹性项换行时有效，可选项与justify-content属性相似。（多行相当于产生了多条主轴，把每个主轴当成一个整体，此项设置的是多条主轴在交叉轴方向上的对齐方式）。

**项目属性：**

1.  **order**：定义弹性项的排列顺序，数值越小越排在前面，默认为0。

2.  **flex-grow**：定义弹性项的放大比例，默认为0，即如果存在剩余空间，也不放大。如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

3.  **flex-shrink**：定义弹性项的缩小比例，默认为1，即当空间不足时，都将等比例缩小。

4.  **flex-basis**：定义弹性项在主轴上的基础尺寸，默认为auto，即根据内容自动计算。

5.  **flex**：是flex-grow、flex-shrink和flex-basis的简写形式，用于同时设置这三个属性。

6.  **align-self**：会对齐当前 grid 或 flex 行中的元素，并覆盖已有的 align-items 的值。

```css
/* 关键字值 */  
flex: initial; /* 相当于 flex: 0 1 auto */  
flex: auto; /* 相当于 flex: 1 1 auto */  
flex: none; /* 相当于 flex: 0 0 auto */  

/* 单值，无单位数字：flex-grow，flex-basis 此时等于0 */  
flex: 2; /* 相当于 flex: 2 1 0 */ 

/* 单值，宽度/高度：flex-basis */  
flex: 10em; /* 相当于 flex: 1 1 10em */
flex: 30px;  
flex: min-content;  

/* 双值：flex-grow | flex-basis */  
flex: 1 30px; /* 相当于 flex: 1 1 30px */

/* 双值：flex-grow | flex-shrink */  
flex: 2 2; /* 相当于 flex: 2 2 0 */

/* 三值：flex-grow | flex-shrink | flex-basis */  
flex: 2 2 10%; 
```



### Grid布局和Flex布局有什么区别

Flex 是一维布局，Grid 是二维布局；

Flex 更适合组件和小规模布局，Grid 更适合整体页面布局。



### 使用Grid布局来创建二维布局 *

Flexbox主要用于一维盒子布局，Grid用于二维布局系统，它同时处理行和列，使得创建复杂的二维布局变得简单而直观。

1.  **创建一个 Grid 容器**

首先，你需要一个 HTML 元素作为 Grid 容器。这个元素将包含所有你想要用 Grid 布局排列的子元素。

```html
<div class="grid-container">  
    <div class="grid-item">1</div>    
    <div class="grid-item">2</div>    
    <div class="grid-item">3</div>    
    <!-- ... 更多子元素 ... -->    
</div>  
```

&nbsp;

2.  **应用Grid布局**

在 CSS 中，使用 display: grid 或 display: inline-grid 将容器元素设置为 Grid 容器。

```css
.grid-container {    
    display: grid;    
    /* 其他样式 */    
}  
```

&nbsp;

3.  **定义Grid行和列**

使用 grid-template-columns 和 grid-template-rows 属性定义 Grid 的行和列。这些属性接受一个或多个长度值、百分比值、fr 单位（分数单位）或 auto 关键字。

fr单位是Grid布局引入的一个相对长度单位，是flexible的缩写，意味着灵活的、可伸缩的。主要用于自动分配网格轨迹的大小、平等地分配容器中剩余的空间或者根据比例分配空间‌。

```css
.grid-container {    
    display: grid;    
    grid-template-columns: 100px 1fr 20%; /* 定义三列，第一列 100px，第二列占据一三列分配后的剩余空间，第三列占据总空间的 1/5 */    
    grid-template-rows: 50px auto 100px; /* 定义三行，第一行 50px，第二行自动，第三行 100px */    
    /* 其他样式 */    
}  
```

可以在行列中使用 repeat() 标记，1fr 1fr 1fr 相当于 repeat(3, 1fr)。

```css
.wrapper {  
    display: grid;  
    grid-template-columns: repeat(3, 1fr 2fr);  /* 相当于 1fr 2fr 1fr 2fr 1fr 2fr */      
}  
```

如果你在定义的网格外放置内容，或者由于内容太多，需要更多的网格轨道，那么网格就会在隐式网格中创建行和列。默认情况下，这些轨道会自动调整大小，因此它们的大小取决于轨道内的内容。

此时你可以使用 `grid-auto-rows` 和 `grid-auto-columns` 属性为在隐式网格中创建的轨道定义设定大小。

在设置显式网格或定义自动创建的行或列的大小时，我们可能希望给轨迹一个最小尺寸。网格布局提供了 minmax() 函数来解决这个问题。

```css
.wrapper {  
    display: grid;  
    grid-template-columns: repeat(3, 1fr);  
    grid-auto-rows: minmax(100px, auto); /* 最小100px，最大auto */  
}  
```

&nbsp;

4.  **控制Grid间距**

使用 grid-gap、row-gap 和 column-gap 属性来控制 Grid 行和列之间的间距。

```css
.grid-container {    
    display: grid;    
    grid-template-columns: 100px 1fr 20%;    
    grid-template-rows: 50px auto 100px;    
    grid-gap: 10px; /* 行和列之间的间距都是 10px */    

    /* 或者 */    
    row-gap: 20px; /* 行之间的间距是 20px */    
    column-gap: 15px; /* 列之间的间距是 15px */    

    /* 其他样式 */    
}  
```

&nbsp;

5.  **定位Grid项**

使用 grid-column 和 grid-row 属性来定位 Grid 项。这些属性接受一个或多个值，可以是数字（代表行/列的索引）、span 关键字（表示跨越多个行/列）或行/列的名称（如果你使用了命名行/列）。

注：span为网格单元定义一个跨度，使得网格单元的网格区域中的一条边界远离另一条边界线 n 条基线。

```css
.grid-item:nth-child(1) {    
    grid-column: 1 / 3; /* 跨越第一列和第二列，相当于 1 / span 2 */    
    grid-row: 1; /* 位于第一行 */    
}    

.grid-item:nth-child(2) {    
    grid-column: 3; /* 位于第三列 */    
    grid-row: 2 / span 2; /* 位于第二行，并跨越到第三行 */    
}    

/* ... 其他 Grid 项的样式 ... */  
```

&nbsp;

6.  **使用区域（Areas）**

grid-area 是一种对于grid-row-start、grid-column-start、grid-row-end 和 grid-column-end 的简写，通过基线（line），跨度（span）或没有（自动）的网格放置在 grid row 中指定一个网格项的大小和位置，继而确定 grid area 的边界。

```css
.grid-container {    
    display: grid;    
    grid-template-columns: repeat(3, 1fr);    
    grid-template-rows: repeat(3, 100px);    
    grid-template-areas:    
        "header header header"    
        "main main sidebar"    
        "footer footer footer";    
}    

.header { grid-area: header; /* ... */ }    
.main   { grid-area: main;   /* ... */ }    
.sidebar { grid-area: sidebar; /* ... */ }    
.footer { grid-area: footer; /* ... */ }  
```

&nbsp;

7.  **使用对齐和分布属性**

Grid 布局提供了丰富的对齐和分布属性，如 justify-items、align-items、justify-content、align-content 等，用于控制 Grid 项在容器中的对齐方式。



## CSS高级特性

### BFC的定义和作用 * *

`BFC (Block Formatting Context)` 指块级格式化上下文，设置了这种属性的元素会成为一个独立的渲染区域，让处于BFC内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。BFC只会作用于Block-level box（块级元素）。

在布局中，BFC具有以下作用：

1.  **解决相邻元素margin塌陷的问题**：在CSS中，两个垂直外边距相遇时，它们将形成一个外边距。这个外边距的高度等于两个发生塌陷的外边距的高度中的较大者。但是，BFC可以解决这个问题，使得元素在垂直方向上不会发生margin塌陷。

2.  **避免父子元素margin重叠的问题（margin合并）**：在某些情况下，块级元素的垂直外边距可能合并成一个外边距。但是，如果父元素是一个BFC，那么它就不会和它的子元素发生外边距合并。

3.  **清除浮动，防止塌陷**：浮动元素会脱离文档流，导致父元素高度塌陷。但是，如果父元素是一个BFC，那么它就可以包含浮动的子元素，从而防止高度塌陷。

4.  **阻止元素被浮动元素覆盖**：在文档流中，块级元素会排列在一行，但是浮动元素会脱离文档流，可能会覆盖在块级元素之上。如果块级元素是BFC，那么它就不会被浮动元素覆盖。



### 如何创建一个BFC * *

1.  **根元素自动创建BFC**：根元素是默认的BFC，它包含整个页面的内容。

2.  **使用overflow属性**：将一个元素的overflow属性设置为除“visible”以外的值（例如hidden、auto、scroll）可以创建一个BFC。例如，给一个容器元素添加overflow: hidden样式来创建一个BFC。

3.  **使用float属性**：给一个元素的float属性设置为“left”或“right”也会创建一个BFC。浮动元素会形成一个独立的块级容器，不会与其他元素发生重叠。

4.  **使用绝对定位**：当一个元素设置position属性为position: absolute或position: fixed时，它会脱离文档流并创建一个新的BFC。

5.  **使用特定的display值**：display值为inline-block、table-cell、table-caption、flex、grid的元素也会创建新的BFC。

另外，display: flow-root 这个CSS属性值也会使元素生成一个块级元素盒，并创建一个新的块级格式化上下文。

总的来说，BFC是一个独立的渲染区域，其中的元素布局不会受到外部元素的影响。创建BFC的方法多种多样，可以根据具体的需求和场景来选择合适的方法。



### CSS动画有哪些实现方式 * *

> [!NOTE]
>
> 选择哪种动画实现方式取决于具体需求：
>
> - 简单状态变化 → Transition
>
> - 复杂多阶段动画 → Animation + @keyframes
>
> - 性能关键动画 → Transform、opacity
>
> - 需要精确控制的动画 → 结合JavaScript
>



CSS 提供了多种实现动画效果的方法，以下是主要的几种实现方式及其特点：

**一、Transition（过渡）**

**特点**：最简单的动画方式，用于在不同状态之间添加过渡效果。

```css
.element {
  transition: [property] [duration] [timing-function] [delay];
}

/* 示例 */
.box {
  width: 100px;
  height: 100px;
  background: red;
  transition: width 1s ease-in-out 0.5s;
}

.box:hover {
  width: 200px;
}
```

**参数说明**：
- `property`：要过渡的属性（如 `all` 表示所有属性）
- `duration`：动画持续时间（如 `1s`）
- `timing-function`：速度曲线（如 `ease`, `linear`, `ease-in-out`）
- `delay`：延迟时间（如 `0.5s`）

  

**二、Animation + @keyframes**

**特点**：更复杂的动画序列，可以定义多个关键帧。

```css
@keyframes animationName {
  0% { /* 起始状态 */ }
  50% { /* 中间状态 */ }
  100% { /* 结束状态 */ }
}

.element {
  animation: [name] [duration] [timing-function] [delay] 
             [iteration-count] [direction] [fill-mode] [play-state];
}

/* 示例 */
@keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}

.box {
  animation: slide 2s ease-in-out infinite alternate;
}
```

**参数说明**：
- `name`：关键帧名称
- `duration`：动画持续时间
- `timing-function`：速度曲线
- `delay`：延迟时间
- `iteration-count`：播放次数（`infinite` 表示无限循环）
- `direction`：播放方向（`normal`, `reverse`, `alternate`）
- `fill-mode`：动画结束后的状态（`forwards`, `backwards`）
- `play-state`：播放状态（`running`, `paused`）

  

**三、Transform（变形）**

**特点**：实现元素的变形效果，常与动画配合使用。

```css
.element {
  transform: [function](value);
}

/* 示例 */
.box {
  transform: rotate(45deg) scale(1.2) translate(10px, 20px);
}

/* 配合动画使用 */
.box:hover {
  transform: rotate(180deg);
  transition: transform 1s ease;
}
```

**常用变形函数**：

- `translate()`：移动
- `rotate()`：旋转
- `scale()`：缩放
- `skew()`：倾斜
- `matrix()`：矩阵变形

  

**四、性能优化技巧**

1. **优先使用 transform 和 opacity**：
   
   - 这两个属性不会触发回流和重绘，性能最佳。（不改变布局 + 利用 GPU 加速 + 独立渲染层）
   
2. **使用 will-change**：
   
   ```css
   .element {
     will-change: transform, opacity;
   }
   ```
   
3. **避免使用 left/top/margin**：
   - 这些属性会触发回流，改用 transform: translate()

4. **合理使用 requestAnimationFrame**：
   - 对于复杂动画，可以结合JS的requestAnimationFrame
   
     

**五、实际应用示例**

**淡入淡出效果**：

```css
.fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**弹跳效果**：
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.bounce {
  animation: bounce 0.5s infinite;
}
```

**3D旋转**：
```css
.cube {
  transform-style: preserve-3d;
  animation: spin 5s infinite linear;
}

@keyframes spin {
  from { transform: rotateY(0); }
  to { transform: rotateY(360deg); }
}
```



### 如何实现响应式设计 * *

响应式设计（Responsive Design）是指网页能够自动适应不同设备屏幕尺寸和方向的技术方案。以下是实现响应式设计的核心方法和最佳实践：

**一、基础实现方案** *

1. **视口设置（Viewport Meta Tag）**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- 这是响应式设计的**首要条件**，告诉浏览器使用设备宽度作为视口宽度

2. **媒体查询（Media Queries）**

```css
/* 移动设备优先（默认样式为小屏幕设计） */
.container {
  width: 100%;
}

/* 中等屏幕（平板） */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

/* 大屏幕（桌面） */
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}

/* 超大屏幕 */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```

3. **流动布局（Fluid Layout）**

```css
.container {
  width: 90%; /* 替代固定像素值 */
  max-width: 1200px; /* 最大宽度限制 */
  margin: 0 auto;
}

.column {
  float: left;
  width: 23%; /* 百分比宽度 */
  margin: 1%;
}
```



**二、现代响应式技术** *

1. **Flexbox 弹性布局**

```css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 200px; /* 基础尺寸200px，可伸缩 */
  margin: 10px;
}
```

2. **CSS Grid 网格布局**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* auto-fit：自适应填充，会铺满整个容器 */
  gap: 20px;
}
```

3. **相对单位**

- **rem**：基于根元素字体大小
- **vw/vh**：视口宽度/高度的百分比
- **%**：相对于父元素

```css
html {
  font-size: 16px; /* 1rem = 16px */
}

.box {
  width: 50vw; /* 视口宽度的50% */
  padding: 2rem;
  margin-bottom: 5vh; /* 视口高度的5% */
}
```



**三、响应式媒体处理** *

1. **响应式图片**

```html
<picture>
  <source media="(min-width: 1200px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="响应式图片">
</picture>
```

2. **自适应视频**

```css
.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  height: 0;
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```



**四、高级响应式技术**

1. **CSS容器查询（Container Queries）**

```css
.component {
  container-type: inline-size;
}

@container (min-width: 600px) {
  .component {
    /* 当容器宽度≥600px时的样式 */
  }
}
```

2. **响应式字体**

```css
:root {
  font-size: calc(14px + 0.3vw); /* 基础14px，随视口增大 */
}

h1 {
  font-size: clamp(1.75rem, 3vw, 2.5rem); /* 最小值1.75rem，理想值3vw，最大值2.5rem */
}
```



**五、实用工具类**

1. **显示/隐藏控制**

```css
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  
  .desktop-only {
    display: block;
  }
}
```

2. **断点变量管理（Sass/Less）**

```scss
$breakpoints: (
  'small': 576px,
  'medium': 768px,
  'large': 992px,
  'xlarge': 1200px
);

@mixin respond-to($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

// 使用示例
.element {
  @include respond-to('medium') {
    width: 50%;
  }
}
```



六、测试与调试

1. **浏览器开发者工具**：使用设备模式模拟不同屏幕尺寸
2. **真实设备测试**：至少测试手机、平板和桌面三种设备
3. **在线测试工具**：
   - BrowserStack
   - Responsinator
   - LambdaTest



**七、最佳实践**

1. **移动优先**：先设计移动端样式，再逐步增强
2. **渐进增强**：确保基本功能在所有设备上可用
3. **性能优化**：
   - 按需加载资源
   - 使用适当的图片格式和尺寸
   - 减少不必要的媒体查询
4. **触摸友好**：
   - 确保点击目标≥48×48px
   - 避免悬停(:hover)作为唯一交互方式



## CSS性能优化

### CSS性能优化有哪些方法 * *

> [!NOTE]
>
> 常见优化方向：
>
> - **优化选择器使用**：简化选择器复杂度、避免通用选择器滥用、减少属性选择器使用；
>
> - **优化文件加载**：压缩CSS文件、避免使用@import、首屏必要样式内联到HTML中、使用 preload 预加载非首屏CSS文件、按路由/组件拆分 CSS；
>
> - **优化渲染性能**：使用transform和opacity减少重排和重绘、使用will-change优化动画性能、禁用高开销效果（阴影）；
>
> - **使用CSS精灵图减少HTTP请求**



CSS 性能优化是提升网页加载速度和渲染效率的关键环节。以下是经过验证的 CSS 性能优化方法，分为多个关键方面：

**一、选择器优化**

1. **简化选择器复杂度**
   
   ```css
   /* 不推荐 - 过于复杂 */
   body div#main ul.nav li a.button { ... }
   
   /* 推荐 - 简化选择器 */
   .nav-button { ... }
   ```
   - 浏览器从右向左解析选择器
   - 避免超过 3 层的嵌套选择器
   
2. **避免通用选择器滥用**
   
   ```css
   /* 谨慎使用 */
   * { margin: 0; padding: 0; }
   ```
   
3. **减少属性选择器的使用**
   ```css
   /* 性能较差 */
   [type="submit"] { ... }
   
   /* 更好方式 */
   .submit-btn { ... }
   ```



**二、文件与加载优化**

4. **压缩 CSS 文件**
   - 使用工具如 CSSNano、CleanCSS
   - Webpack 插件：`css-minimizer-webpack-plugin`

5. **避免使用 @import**
   ```css
   /* 不推荐 - 阻塞渲染 */
   @import url("styles.css");
   ```
   - 改用 `<link>` 标签并行加载

6. **关键 CSS 内联**
   ```html
   <style>
     /* 首屏关键样式 */
     .header, .hero { ... }
   </style>
   ```
   - 提取首屏必要样式内联到 HTML

7. **CSS 文件拆分**
   - 按路由/组件拆分 CSS
   - 使用 `preload` 预加载非关键 CSS（关键CSS会被内联）
   ```html
   <link rel="preload" href="non-critical.css" as="style">
   ```



**三、渲染性能优化**

8. **减少重排和重绘**
   - 避免频繁修改几何属性（width/height等）
   - 使用 `transform` 和 `opacity` 实现动画

9. **will-change 优化**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```
   - 提前告知浏览器哪些属性会变化

10. **GPU 加速**
    ```css
    .accelerate {
      transform: translateZ(0);
      /* 或 */
      backface-visibility: hidden; /* 指定当元素背面朝向观察者时是否可见 */
    }
    ```



**四、布局与绘制优化**

11. **避免布局抖动**
    
    - 不要交错读取和修改 DOM 样式
    - 使用 `FastDOM` 库管理读写操作
    
12. **减少图层数量**
    
    - 检查浏览器渲染工具的图层面板
    - 避免不必要的 `z-index` 和 `position: fixed`
    
13. **优化重绘区域**
    
    ```css
    /* 限制重绘范围 */
    .fixed-header {
      position: fixed;
      width: 100%;
      /* 添加背景避免下方内容重绘 */
      background: white; 
    }
    ```



**五、现代 CSS 特性利用**

14. **使用 content-visibility**
    ```css
    .long-list {
      content-visibility: auto;
      contain-intrinsic-size: 500px;
    }
    ```
    - 跳过屏幕外内容的渲染

15. **CSS Containment**
    ```css
    .isolated-component {
      contain: layout paint style;
    }
    ```
    - 限制浏览器重新计算的范围

16. **使用 CSS 变量替代预处理器变量**
    ```css
    :root {
      --primary-color: #4285f4;
    }
    .button {
      background: var(--primary-color);
    }
    ```
    - 浏览器原生支持，无需编译



**六、工具与工作流**

17. **PurgeCSS 移除未使用样式**
    
    ```javascript
    // webpack.config.js
    const PurgeCSSPlugin = require('purgecss-webpack-plugin')
    ```
    
18. **CSS 原子化方案**
    - 使用 TailwindCSS、UnoCSS 等工具
    - 自动生成最小化的实用类

19. **使用 CSS 精灵图**
    ```css
    .icon {
      background-image: url('sprite.png');
      background-position: -60px 0;
      width: 20px;
      height: 20px;
    }
    ```
    - 减少 HTTP 请求



**七、移动端专项优化**

20. **简化媒体查询**
    ```css
    /* 合并相同断点 */
    @media (max-width: 768px) {
      .menu, .header { ... }
    }
    ```

21. **减少文本重排**
    
    ```css
    .text-block {
      hyphens: auto;
      overflow-wrap: break-word;
    }
    ```
    
22. **禁用高开销效果**
    
    ```css
    /* 移动端谨慎使用 */
    .element {
      box-shadow: none;
      text-shadow: none;
    }
    ```



**性能检测工具**

1. **Chrome DevTools**
   - Performance 面板分析渲染性能
   - Coverage 检查未使用的 CSS

2. **Lighthouse**
   - 提供 CSS 优化建议
   - 识别未使用的样式

3. **WebPageTest**
   - 多地点性能测试
   - 可视化加载过程



**总结**

通过综合应用这些优化方法，可以显著提升 CSS 性能。建议从影响最大的项目开始（如**选择器优化、关键 CSS、文件压缩**），再逐步实施其他优化措施。记住要在优化前后进行性能测试对比，确保改动确实带来了性能提升。



### 重绘和回流的定义和优化方式 * *

> [!NOTE]
>
> **回流(reflow)**: 布局改变
>
> **重绘(repaint)**: 外观改变不影响布局
>
> **减少方法**: 避免频繁操作DOM样式，使用transform替代top/left，使用opacity替代visibility，使用will-change提示浏览器开启GPU渲染，避免强制同步布局（使用requestAnimationFrame优化动画），避免table布局，使用Flex/Grid布局替代float/position



**重绘（Repaint）和回流（Reflow）是什么？**

**1. 回流（Reflow，也叫重排）**  
- **定义**：浏览器重新计算元素的**几何属性**（如尺寸、位置），导致页面布局重新排列。  
- **触发条件**：  
  - 修改影响布局的CSS属性（`width`、`height`、`margin`、`padding`、`display`、`font-size`等）。  
  - DOM结构变化（添加/删除元素、调整元素顺序）。  
  - 窗口大小改变（`resize`）。  

**2. 重绘（Repaint）**  

- **定义**：浏览器重新绘制元素的**外观**（如颜色、背景、边框），但不影响布局。  
- **触发条件**：  
  - 修改不影响布局的CSS属性（`color`、`background`、`visibility`、`opacity`等）。  



**如何减少回流和重绘？**

**1. 减少回流的优化方法**

✅ **避免频繁操作DOM**  
- 使用 `documentFragment` 或虚拟DOM（如React/Vue）批量更新。  
- 离线操作DOM（先`display: none`，修改后再显示）。  

✅ **避免逐行修改样式**  
```javascript
// ❌ 糟糕：多次触发回流
element.style.width = '100px';
element.style.height = '200px';

// ✅ 优化：使用 `class` 或 `cssText` 一次性修改
element.classList.add('new-style');
// 或
element.style.cssText = 'width: 100px; height: 200px;';
```

✅ 使用`transform`替代 `top/left` ，使用 `opacity` 替代 `visibility/display:none/rgba()`

`transform`仅触发合成（GPU加速）,不会触发回流重排；

`opacity`仅触发合成（Composite），跳过重绘阶段。

```css
/* ❌ 触发回流 */
.box { left: 100px; }

/* ✅ 仅触发合成（GPU加速） */
.box { transform: translateX(100px); }
```

✅ **避免强制同步布局（Layout Thrashing）**  
```javascript
// ❌ 糟糕：读取 → 修改 → 读取 → 修改（强制浏览器立即计算布局）
const width = element.offsetWidth; // 触发回流
element.style.width = width + 10 + 'px'; // 再次回流

// ✅ 优化：批量读取 → 批量修改
const width = element.offsetWidth; // 先读取
requestAnimationFrame(() => {
  element.style.width = width + 10 + 'px'; // 再修改
});
```

✅ **使用 `flex`/`grid` 替代 `float`/`position`**  
- 现代布局方式（Flex/Grid）回流影响更小。  



**2. 减少重绘的优化方法**

✅ **使用 `will-change` 提示浏览器**  
```css
.element {
  will-change: transform, opacity; /* 提前告知浏览器可能变化 */
}
```

✅ **减少 `box-shadow`、`filter` 等高开销效果**  
- 这些属性会导致**重绘**，尤其在动画中。  

✅ **使用 `requestAnimationFrame` 优化动画**  
```javascript
// ❌ 糟糕：setTimeout/setInterval 可能导致丢帧
setInterval(() => {
  element.style.left = newPos + 'px';
}, 16);

// ✅ 优化：使用 `requestAnimationFrame` 平滑动画
function animate() {
  element.style.transform = `translateX(${newPos}px)`;
  requestAnimationFrame(animate);
}
animate();
```



**总结**

| **优化策略**                   | **适用场景** | **示例**                       |
| ------------------------------ | ------------ | ------------------------------ |
| **减少DOM操作**                | 批量修改DOM  | `documentFragment`             |
| **使用 `transform`/`opacity`** | 动画/位移    | `transform: translateX(100px)` |
| **避免强制同步布局**           | JS计算样式   | `requestAnimationFrame`        |
| **使用 `will-change`**         | 复杂动画     | `will-change: transform`       |
| **Flex/Grid布局**              | 页面结构     | `display: flex`                |

**最终目标**：  
✅ **减少回流 → 优化布局计算**  
✅ **减少重绘 → 优化渲染性能**  
✅ **尽量使用GPU加速（`transform`/`opacity`）**  



### CSS浏览器兼容性写法有哪些 *

为了确保 CSS 在不同浏览器中正常显示，开发者通常需要处理**前缀兼容**、**特性降级**和**渐进增强**。以下是常用的兼容性解决方案：

**1. 浏览器前缀（Vendor Prefixes）** *

不同浏览器对实验性 CSS 属性的支持不同，需添加私有前缀：

| **前缀**   | **浏览器**              | **示例**                            |
| ---------- | ----------------------- | ----------------------------------- |
| `-webkit-` | Chrome, Safari, 新 Edge | `-webkit-transform: rotate(45deg);` |
| `-moz-`    | Firefox                 | `-moz-border-radius: 5px;`          |
| `-ms-`     | 旧版 Edge / IE          | `-ms-flex-direction: column;`       |
| `-o-`      | 旧版 Opera              | `-o-transition: all 1s;`            |

**手动写法**：
```css
.box {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg); /* 标准写法放最后 */
}
```

**自动化工具**：
- **PostCSS + Autoprefixer**（推荐）  
  配置后自动添加所需前缀：
  ```javascript
  // postcss.config.js
  module.exports = {
    plugins: [require('autoprefixer')]
  };
  ```



**2. 条件注释（IE 兼容）**

针对 IE 浏览器的特殊样式（仅 IE9 及以下有效）：
```html
<!--[if IE 9]>
  <link rel="stylesheet" href="ie9-fixes.css">
<![endif]-->
```



**3. 特性检测（@supports）**

通过 CSS 检测浏览器是否支持某特性：
```css
@supports (display: grid) {
  .container { display: grid; } /* 支持 Grid 时生效 */
}

@supports not (display: grid) {
  .container { float: left; } /* 不支持时的降级方案 */
}
```



**4. Hack 写法（谨慎使用）**

针对特定浏览器的特殊写法：
- **IE6 Hack**：`_color: red;`  
- **IE7 Hack**：`*color: red;`  
- **IE9 及以下**：`background: red\9;`  

**示例**：
```css
.box {
  color: red;         /* 所有浏览器 */
  *color: blue;       /* IE7 及以下 */
  _color: green;      /* IE6 */
  background: pink\9; /* IE9 及以下 */
}
```



**5. 渐进增强（Graceful Degradation）**

先保证基础功能，再为高级浏览器增强体验：
```css
/* 基础样式（所有浏览器支持） */
.button {
  padding: 10px;
  background: #ddd;
}

/* 增强样式（现代浏览器） */
@supports (box-shadow: 0 0 5px #000) {
  .button {
    background: linear-gradient(to bottom, #eee, #ccc);
    box-shadow: 0 0 5px #000;
  }
}
```



**6. CSS 重置（Reset/Normalize）**

统一不同浏览器的默认样式：
- **Reset CSS**（暴力清零）  
  ```css
  * { margin: 0; padding: 0; box-sizing: border-box; }
  ```
- **Normalize.css**（温和修复）  
  ```html
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  ```



**7. 常见兼容性问题与解决方案**

**(1) Flexbox 兼容**

```css
.container {
  display: -webkit-box;      /* 旧版 iOS/Safari */
  display: -ms-flexbox;      /* 旧版 IE */
  display: flex;             /* 标准 */
}
```

**(2) Grid 兼容**

```css
.container {
  display: -ms-grid;         /* IE10+ */
  display: grid;
  -ms-grid-columns: 1fr 1fr; /* IE 语法 */
  grid-template-columns: 1fr 1fr;
}
```

**(3) 动画兼容**

```css
@-webkit-keyframes fadeIn { ... } /* 旧版 WebKit */
@keyframes fadeIn { ... }
```

**(4) 透明兼容**

```css
.element {
  opacity: 0.5;            /* 标准 */
  filter: alpha(opacity=50); /* IE8 及以下 */
}
```



**8. 兼容性检查工具**

1. **Can I Use**（[caniuse.com](https://caniuse.com)）  
   查询 CSS/JS 特性兼容性。  
2. **BrowserStack**（[browserstack.com](https://www.browserstack.com)）  
   多浏览器真机测试。  
3. **Modernizr**（[modernizr.com](https://modernizr.com)）  
   检测浏览器支持的特性。  



**总结：最佳实践**

1. **前缀处理** → 用 **Autoprefixer**（避免手动维护）。  
2. **IE 兼容** → 条件注释或 Hack（逐步淘汰）。  
3. **特性检测** → `@supports` 实现渐进增强。  
4. **统一基准** → 使用 **Normalize.css**。  
5. **真机测试** → 在 BrowserStack 验证效果。  

**示例工作流**：  

```markdown
1. 编写标准 CSS → 2. Autoprefixer 加前缀 → 3. @supports 检测 → 4. 真机测试
```



## CSS新特性

### CSS3 新增了哪些特性

> [!NOTE]
>
> 新特性分类
>
> - **选择器**: :nth-child, :not等
>
> - **布局**: flex, grid
>
> - **阴影**: box-shadow, text-shadow
>
> - **渐变**: linear-gradient, radial-gradient
>
> - **过渡和动画**: transition, animation
>
> - **变形**: transform
>
> - **媒体查询**: @media (xxx) and (xxx)
>
> - **变量**: --var, var()
>



> [!NOTE]
>
> 联想记忆：媒体查询---CSS选择器增强---Flex/Grid布局---盒模型---背景设置---变形transform---过渡/动画



CSS3 引入了大量强大的新特性，主要分为以下几类：  

**1. 选择器增强**

✅ **更精准的元素选择**  
- **属性选择器**：  
  ```css
  input[type="text"] { ... }  
  a[href^="https"] { ... }  /* 以 https 开头的链接 */
  ```
- **伪类选择器**：  
  ```css
  :nth-child(2n) { ... }  /* 偶数元素 */
  :not(.disabled) { ... } /* 非 disabled 的元素 */
  ```
- **伪元素增强**：  
  ```css
  ::selection { color: red; } /* 选中文本样式 */
  ::placeholder { opacity: 0.5; } /* 输入框占位符 */
  ```



**2. 盒模型与背景**

✅ **圆角、阴影、渐变**  
- **圆角**：  
  ```css
  .box { border-radius: 10px; }
  ```
- **阴影**：  
  ```css
  .box { 
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3); 
    text-shadow: 2px 2px 4px #000;
  }
  ```
- **渐变**：  
  ```css
  .gradient {
    background: linear-gradient(to right, red, blue);
    background: radial-gradient(circle, red, yellow, green);
  }
  ```
- **多背景**：  
  ```css
  .hero {
    background: url(bg1.png), url(bg2.png);
    background-size: cover, contain;
  }
  ```



**3. 弹性布局（Flexbox）**

✅ **一维布局的革命**  
```css
.container {
  display: flex;
  justify-content: center; /* 水平对齐 */
  align-items: center;    /* 垂直对齐 */
}
.item {
  flex: 1; /* 自动伸缩 */
}
```



**4. 网格布局（Grid）**

✅ **二维布局系统**  
```css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3列，中间列是两侧的2倍 */
  gap: 10px; /* 间距 */
}
.item {
  grid-column: span 2; /* 跨2列 */
}
```



**5. 过渡与动画**

✅ **平滑的动态效果**  
- **过渡（Transition）**：  
  ```css
  .button {
    transition: all 0.3s ease;
  }
  .button:hover {
    transform: scale(1.1);
  }
  ```
- **关键帧动画（Animation）**：  
  
  ```css
  @keyframes slide {
    from { transform: translateX(0); }
    to { transform: translateX(100px); }
  }
  .box {
    animation: slide 2s infinite alternate;
  }
  ```



**6. 变形（Transform）**

✅ **2D/3D 变换**  
```css
.box {
  transform: rotate(45deg) scale(1.2) translate(10px, 20px);
}
/* 3D 变换 */
.card {
  transform: perspective(500px) rotateY(30deg);
}
```



**7. 媒体查询（响应式设计）**

✅ **适配不同设备**  
```css
/* 手机 */
@media (max-width: 768px) {
  body { font-size: 14px; }
}
/* 深色模式 */
@media (prefers-color-scheme: dark) {
  body { background: #222; }
}
```



**8. 其他重要特性**

✅ **变量（CSS Variables）**  
```css
:root {
  --primary-color: #4285f4;
}
.button {
  background: var(--primary-color);
}
```
✅ **多列布局**  
```css
.article {
  column-count: 3;
  column-gap: 20px;
}
```
✅ **裁剪与遮罩**  
```css
.image {
  clip-path: circle(50%); /* 圆形裁剪 */
  mask: url(mask.png);    /* SVG 遮罩 */
}
```
✅ **滤镜（Filter）**  
```css
.photo {
  filter: blur(2px) brightness(1.2);
}
```



**总结**

| **类别**      | **关键特性**                  | **典型应用**       |
| ------------- | ----------------------------- | ------------------ |
| **选择器**    | `:nth-child`, `:not()`        | 精准样式控制       |
| **盒模型**    | `border-radius`, `box-shadow` | 圆角、阴影、渐变   |
| **Flex/Grid** | `display: flex/grid`          | 现代响应式布局     |
| **动画**      | `transition`, `@keyframes`    | 交互动态效果       |
| **变形**      | `transform: rotate/scale`     | 2D/3D 变换         |
| **响应式**    | `@media`                      | 适配不同屏幕       |
| **变量**      | `--var`, `var()`              | 主题切换、统一风格 |



## CSS预处理器和模块化

### **CSS 预处理器对比与区别** * *

> [!NOTE]
>
> **大型项目**：Sass
>
> **小型项目**：Less
>
> **极简主义**：Stylus
>
> **典型工作流**：Sass/Less → 编译为 CSS → PostCSS 处理 → 最终 CSS



CSS 预处理器通过扩展 CSS 语法（如变量、嵌套、混合等），提升代码可维护性。以下是主流预处理器及其核心区别：

**1. 主流 CSS 预处理器**

| 名称        | 语言基础   | 流行度 | 特点                             |
| ----------- | ---------- | ------ | -------------------------------- |
| **Sass**    | Ruby       | ★★★★★  | 功能最全，社区生态强大           |
| **Less**    | JavaScript | ★★★★☆  | 学习成本低，兼容原生 CSS         |
| **Stylus**  | Node.js    | ★★★☆☆  | 语法灵活，省略大括号/分号        |
| **PostCSS** | Node.js    | ★★★★☆  | 非传统预处理器，通过插件扩展功能 |



**2. 核心功能对比**

**(1) 变量（Variables）**

- **Sass**（`$` 前缀）  
  
  ```scss
  $primary-color: #4285f4;
  .button { background: $primary-color; }
  ```
- **Less**（`@` 前缀）  
  ```less
  @primary-color: #4285f4;
  .button { background: @primary-color; }
  ```
- **Stylus**（可省略符号）  
  ```stylus
  primary-color = #4285f4
  .button 
    background: primary-color
  ```

**(2) 嵌套（Nesting）**

- **三者均支持**，语法类似：  
  ```scss
  .parent {
    color: red;
    .child { font-size: 14px; }
    &:hover { background: blue; }
  }
  ```

**(3) 混合（Mixins）**

- **Sass**  
  ```scss
  @mixin center($width) {
    width: $width;
    margin: 0 auto;
  }
  .box { @include center(80%); }
  ```
- **Less**  
  ```less
  .center(@width) {
    width: @width;
    margin: 0 auto;
  }
  .box { .center(80%); }
  ```
- **Stylus**  
  ```stylus
  center(width)
    width: width
    margin: 0 auto
  .box 
    center(80%)
  ```

**(4) 继承（Extend）**

- **Sass**（`@extend`）  
  ```scss
  .error { color: red; }
  .warning { @extend .error; }
  ```
- **Less**（通过伪类实现）  
  
  ```less
  .error { color: red; }
  .warning { &:extend(.error); }
  ```
- **Stylus**（`@extend`）  
  
  ```stylus
  .error 
    color: red
  .warning 
    @extend .error
  ```

**(5) 条件与循环（Logic）**

- **Sass**  
  
  ```scss
  @if $theme == dark { 
    background: #000; 
  }
  @for $i from 1 to 3 { 
    .item-#{$i} { width: 10px * $i; } 
  }
  ```
- **Less**（通过函数模拟）  
  ```less
  .loop(@counter) when (@counter > 0) {
    .item-@{counter} { width: 10px * @counter; }
    .loop(@counter - 1);
  }
  .loop(3);
  ```
- **Stylus**  
  ```stylus
  if theme == dark
    background: #000
  for i in 1..3
    .item-{i}
      width: 10px * i
  ```



**3. 关键区别总结**

| **特性**     | Sass                  | Less                | Stylus             |
| ------------ | --------------------- | ------------------- | ------------------ |
| **语法风格** | 严谨（需分号/大括号） | 类原生 CSS          | 极简（可省略符号） |
| **变量符号** | `$var`                | `@var`              | `var` 或 `$var`    |
| **编译速度** | 中等                  | 最快                | 较慢               |
| **生态插件** | 最丰富（Compass等）   | 较少                | 较少               |
| **兼容性**   | 需 Ruby/Node          | 纯 JS（浏览器兼容） | 需 Node.js         |
| **学习曲线** | 中等                  | 最低                | 较高（语法灵活）   |



**4. 如何选择？**

- **企业级项目** → **Sass**（功能全面，社区支持强）  
- **快速开发/小型项目** → **Less**（易上手，兼容性好）  
- **极简主义者** → **Stylus**（自由语法，适合 Node 项目）  
- **未来趋势** → **PostCSS**（插件化，配合 `autoprefixer` 等工具）  



**5. 补充：PostCSS 的特殊性**

PostCSS 不是预处理器，而是一个 **CSS 处理工具**，通过插件实现：
- 自动添加前缀（`autoprefixer`）
- 未来语法转换（如 CSS Nesting）
- 代码压缩（`cssnano`）

**典型工作流**：  

```bash
Sass/Less → 编译为 CSS → PostCSS 处理 → 最终 CSS
```



### **CSS 模块化的概念与主流方案** * *

> [!NOTE]
>
> **CSS 模块化的核心目标**：
>
> - 避免样式全局污染，样式仅作用于特定组件/模块；
> - 解决类名冲突问题，自动生成唯一类名；
> - 明确样式与组件的依赖关系，将两者绑定，便于维护；
> - 提升样式复用性，模块化样式可跨项目复用。
>
> **CSS 模块化的主流方案**：
>
> - CSS Modules：通过编译工具将类名转换为唯一哈希值，实现局部作用域
> - CSS-in-JS：直接在 JavaScript 中编写 CSS，样式与组件绑定
> - CSS原子化：通过预定义的原子类进行样式组合
> - CSS命名约定：通过手动命名规则模拟模块化，例如BEM命名规范
> - Scoped CSS：Vue/React的框架内置方案
> - CSS原生隔离：Shadow DOM，浏览器原生支持的样式隔离，用于Web Components开发



CSS 模块化是一种将 CSS 代码拆分为独立、可复用的模块的开发方式，旨在解决传统 CSS 的**全局污染**、**命名冲突**和**依赖管理**等问题。

**一、CSS 模块化的核心目标**

1. **避免全局污染**：样式仅作用于特定组件/模块。
2. **解决命名冲突**：自动生成唯一类名。
3. **明确依赖关系**：样式与组件绑定，便于维护。
4. **提升复用性**：模块化样式可跨项目复用。



**二、主流 CSS 模块化方案**

**1. CSS Modules**  

**原理**：通过编译工具（如 Webpack）将类名转换为唯一哈希值，实现局部作用域。  

**实现方式**：  

```jsx
// Button.module.css
.primary {
  background: blue;
}

// Button.jsx
import styles from './Button.module.css';
function Button() {
  return <button className={styles.primary}>Click</button>;
}
```
**输出结果**：  

```html
<button class="Button_primary_abc123">Click</button>
```
**特点**：  
✅ 零学习成本（原生 CSS 语法）  
✅ 自动局部作用域  
❌ 需构建工具支持（如 Webpack、Vite）  

---

**2. CSS-in-JS**  

**原理**：直接在 JavaScript 中编写 CSS，样式与组件绑定。  

**主流库**：  

- **Styled-components**  
  ```jsx
  import styled from 'styled-components';
  const Button = styled.button`
    background: ${props => props.primary ? 'blue' : 'gray'};
  `;
  <Button primary>Click</Button>
  ```
- **Emotion**  
  ```jsx
  import { css } from '@emotion/react';
  const style = css`color: red;`;
  <div css={style}>Hello</div>
  ```
  **特点**：  
  ✅ 动态样式（基于 props/state）  
  ✅ 自动解决命名冲突  
  ❌ 运行时性能开销（部分库需额外优化）  

---

**3. Utility-First CSS（原子化 CSS）**  

**原理**：通过预定义的原子类（如 `text-red-500`、`p-4`）组合样式。  

**代表工具**：  
- **Tailwind CSS**  
  
  ```html
  <button class="bg-blue-500 text-white px-4 py-2 rounded">
    Click
  </button>
  ```
- **UnoCSS**（按需生成）  
**特点**：  
✅ 极高的开发效率  
✅ 极小的生产体积（按需生成）  
❌ 需熟悉类名约定  

---

**4. BEM（命名约定）**  

**原理**：通过手动命名规则（`block__element--modifier`）模拟模块化。  

**示例**：  
```css
/* BEM 风格 */
.card__title--highlight { 
  color: red; 
}
```
**特点**：  
✅ 无需构建工具  
❌ 依赖人工维护命名规范  
❌ 无法真正隔离作用域  

---

**5. Scoped CSS（Vue/React）**  

**框架内置方案**：  

- **Vue 的 `<style scoped>`**  
  ```vue
  <style scoped>
  .title { color: red; } /* 仅作用于当前组件 */
  </style>
  ```
- **React 的 CSS-in-JS 集成**（如 `styled-jsx`）  

**特点**：  
✅ 框架原生支持  
❌ 生态局限性（仅限特定框架）  

---

**6. Shadow DOM（原生隔离）**  

**原理**：浏览器原生支持的样式隔离（Web Components）。  

**示例**：  

```javascript
const shadow = element.attachShadow({ mode: 'open' });
shadow.innerHTML = `
  <style>button { color: red; }</style>
  <button>Click</button>
`;
```
**特点**：  
✅ 彻底的样式隔离  
❌ 兼容性问题（旧浏览器不支持）  
❌ 开发体验较差  



**三、方案对比与选型建议**

| **方案**      | **作用域隔离** | **动态样式** | **构建依赖** | **适用场景**         |
| ------------- | -------------- | ------------ | ------------ | -------------------- |
| CSS Modules   | ✅ 自动哈希     | ❌ 有限       | ✅ 需要       | 传统项目，React/Vue  |
| CSS-in-JS     | ✅ 完全隔离     | ✅ 灵活       | ❌ 可选       | 动态主题，复杂交互   |
| Utility-First | ✅ 原子类       | ✅ 组合       | ✅ 需要       | 快速开发，设计系统   |
| BEM           | ❌ 人工维护     | ❌ 无         | ❌ 无需       | 小型项目，无构建工具 |
| Scoped CSS    | ✅ 框架支持     | ❌ 有限       | ❌ 无需       | Vue/React 组件库     |
| Shadow DOM    | ✅ 原生隔离     | ❌ 复杂       | ❌ 无需       | Web Components 开发  |



**四、如何选择？**

1. **React/Vue 项目**：  
   - 首选 **CSS Modules** 或 **CSS-in-JS**（如 styled-components）。  
2. **快速原型开发**：  
   - 选择 **Tailwind CSS**（原子化）。  
3. **Web Components**：  
   - 使用 **Shadow DOM**。  
4. **旧项目迁移**：  
   - 渐进式采用 **BEM** 或 **CSS Modules**。  



**五、未来趋势**

- **CSS Scope**（原生作用域提案）：  
  ```css
  @scope (.card) {
    .title { color: red; } /* 仅作用于 .card 内部 */
  }
  ```
- **CSS Layers**（层级管理）：  
  ```css
  @layer base, components;
  @layer base { button { color: red; } }
  ```



## CSS实际应用

### 如何使用CSS实现一个三角形 *

使用border实现

```css
.triangle {  
    width: 0;  
    height: 0;  
    border: 50px solid transparent;  
    border-top-color: red;  
} 
```



### 如何实现移动端1像素边框 *

使用transform-scale实现

```css
.border {
  position: relative;
}
.border::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #000;
  transform: scale(0.5);
  transform-origin: 0 0;
}
```



### 如何实现单行/多行文本省略 * *

```css
/* 单行 */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 多行 */
.multi-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
```
