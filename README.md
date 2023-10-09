# tuco
a cli tool

## 安装

1. Node 环境

2. 安装 tuco-cli
```
npm install -g tuco-cli
```

## 功能和使用方法

### 1. tinyPNG 图片压缩 & 转格式

图片压缩，图片大小调整，图片转格式（转格式的同时也会压缩）。

对图片的操作都会生成新文件，在原文件名字基础上以 _tiny 结尾命名，不会改变原文件。

- **压缩命令**

  主要命令为 tuco-tp，采用该命令对图片压缩。

  ```
  tuco-tp xxx.png
  ```

  会在xxx.png同级目录生成 xxx_tiny.png, 为压缩后的图片

- **指定后缀（转码其他格式）**

  目标格式的后缀，直接通过 - 指定，如 -png,-jpg

  xxx.png 转为 webp 格式：
  ```
  tuco-tp -webp xxx.png
  ```

  xxx.jpg 转为 png 格式：
  ```
  tuco-tp -png xxx.jpg
  ```

- **指定大小**

  对大小的处理，有三种方式：
    - scale(缩放)
    - fit(适应指定宽高容器，图片显示完全，容器内可能空余)
    - cover(覆盖指定宽高容器，图片可能被裁剪，容器被填满)

  通过参数 --rs, --rf, --rc 指定。（命名依据： r resize, s scale, f fit, c cover）

  - scale
    指定宽度180，高度缩放
    ```
    tuco-tp --rs=w180 xxx.jpg
    ```

    指定高度180，宽度缩放
     ```
    tuco-tp --rs=h180 xxx.jpg
    ```

  - fit
    指定宽400,高180，实际可能宽或者高不足
     ```
    tuco-tp --rf=400*180 xxx.jpg
    ```

  - cover
    指定宽400,高180，图片裁剪后占满
    ```
    tuco-tp --rc=400*180 xxx.jpg
    ```

- 改后缀同时指定大小
  ```
  tuco-tp -png --rs="h200" dbd.jpeg
  ```
  将依据 dbd.jpeg 生成 dbd_tiny.png 文件，按高度 200 缩放



### 2. Color conversion 颜色转换