# tuco

集合型命令行工具

来点 issue❓ / 意见 💭 / 好点子 🚀 ，或者 star⭐ ~

**目前功能**：

- **图片压缩 & 改尺寸大小 & 换格式后缀**
- **翻译 启动浏览器（百度翻译）**

## 安装

1. Node 环境

2. 安装 tuco-cli

```
npm install -g tuco-cli
```

3. 检查 tuco-cli 版本

```
tuco -v
```

或者

```
tuco --version
```

## 命令

tuco 作为仓库名，不用于命令（除了版本信息的`tuco -v`或`tuco --version`）。为了缩减功能命令长度，取`tight tight tight`（tuco 台词）中的`ti`作为命令前缀。

- `ti-tp` - 压缩图片命令
- `ti-tl` - 翻译命令

## 功能和使用方法

### 1. tinyPNG 图片压缩 & 转格式 & 转尺寸

图片压缩，图片大小调整，图片转格式（转格式的同时也会压缩）。

对图片的操作都会生成新文件，在原文件名字基础上以 \_tiny 结尾命名，不会改变原文件。

在网站 https://tinypng.com/developers 获取 tinypng API key， 初始化：

```
ti-tp --key="API KEY"
```

提示 Done 之后，就可以使用 `ti-tp` 命令对图片处理了，后续无需再次初始化，多次初始化会覆盖之前设置的 key。（tp 取名自 tinypng）

- **压缩命令**

  命令为 ti-tp，采用该命令对图片压缩，转换格式和尺寸大小。

  ```
  ti-tp xxx.png
  ```

  会在 xxx.png 同级目录生成 xxx_tiny.png, 为压缩后的图片

- **指定后缀（转码其他格式）**

  目标格式的后缀，直接通过 - 指定，如 -png,-jpg

  xxx.png 转为 webp 格式：

  ```
  ti-tp -webp xxx.png
  ```

  xxx.jpg 转为 png 格式：

  ```
  ti-tp -png xxx.jpg
  ```

- **指定尺寸**

  对尺寸大小的处理，有三种方式：

  - scale(缩放)
  - fit(适应指定宽高容器，图片显示完全，容器内可能空余)
  - cover(覆盖指定宽高容器，图片可能被裁剪，容器被填满)

  通过参数 --rs, --rf, --rc 指定。（命名依据： r resize, s scale, f fit, c cover）

  - scale
    指定宽度 180，高度缩放

    ```
    ti-tp --rs='w180' xxx.jpg
    ```

    指定高度 180，宽度缩放

    ```
    ti-tp --rs='h180' xxx.jpg
    ```

  - fit
    指定宽 400,高 180，实际可能宽或者高不足

    ```
    ti-tp --rf='400*180' xxx.jpg
    ```

  - cover
    指定宽 400,高 180，图片裁剪后占满
    ```
    ti-tp --rc='400*180' xxx.jpg
    ```

- 改后缀同时指定尺寸大小
  ```
  ti-tp -png --rs="h200" dbd.jpeg
  ```
  将依据 dbd.jpeg 生成 dbd_tiny.png 文件，按高度 200 缩放

### 2. 翻译

只接受一个参数，待翻译的文本。根据正则匹配第一字符为字母则英译中，否则中译英。

`ti-tl fatal`打开百度翻译英译中翻译 fatal

`ti-tl 你好`打开百度翻译中译英翻译 你好

### 3. Color conversion 颜色转换

todo..
