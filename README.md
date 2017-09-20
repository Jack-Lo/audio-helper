## 简介

**audio-helper**是一个HTML`<audio\>`的功能扩展插件，提供了：

- **基础的音频操作**，如`play`、`pause`、`stop`以及`reset`等方法；
- 多种**事件监听**；
- **音频合并**（`Join`）、**音频混合**（`Mix`）。


## Install

```shell
npm install audio-helper --save
```


## Usage

首先，我们引用：

```javascript
import { Player, Mix, Join } 'audio-helper'
```

**audio-helper**分为三部分内容：

- **Player**：通用播放器类，用于实例化单一的播放器；
- **Mix**：用于交叉混合两个播放器实例，返回一个播放器实例；
- **Join**：用于拼接多个播放器实例，返回一个播放器实例。


### Player

我们来实例化一个播放器：

```javascript
var poem = new Player({
  src: 'poem.mp3',
  attrs: {
    loop: true
  }
})

poem.play()
```


`Player`接受两个参数，`src`表示音频地址，`attrs`即`<audio\>`的`Attributes`，参考[这里](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)。

一个`Player`实例有以下几个基础api：

- **play**：播放音频
- **pause**：暂停播放
- **stop**：停止播放
- **reset**：重置播放器

事件相关的api：

- **on**：监听事件
- **once**：一次性监听
- **off**：移除监听

其他api：

- **copy**：用于复制当前播放器，返回一个新的播放器实例。


```javascript
var playId = poem.on('play', () => {
  console.log('play!')

  poem.off('play', playId)
})
```

事件系统的实现借助于[on-fire](https://github.com/jack-Lo/on-fire)，可以查看其文档帮助理解。


### Join

**Join**用于**拼接**多个播放器实例：

```javascript
var a1 = new Player({
  src: 'a1.mp3'
})

var a2 = new Player({
  src: 'a2.mp3'
})

var a3 = new Player({
  src: 'a3.mp3'
})

var speech = new Join(a1, a2, a3)

speech.play()
```

如上，`a1`、`a2`和`a3`一起拼接成`speech`，`speech.play()`会按照拼接的顺序依次播放。


### Mix

**Mix**用于**混合**两个播放器实例：

```javascript
var words = new Player({
  src: 'words.mp3'
})

var bgm = new Player({
  src: 'bgm.mp3',
  attrs: {
    loop: true
  }
})

var song = new Mix(words, bgm)

song.play()
```

以上，`song.play()`将会混合`words`与`bgm`两段音频，就像是为`words`配上了背景音乐一样，当然，`song`是以`words`为起点和钟点，`bgm`将会基于`words`的长度被裁切。

当然，你也可以进行一些更为复杂的组合方式：

```javascript
var bark = new Player({
  src: 'bark.mp3'
})

var meow = new Player({
  src: 'meow.mp3'
})

var bgm = new Player({
  src: 'bgm.mp3',
  attrs: {
    loop: true
  }
})

var dog = new Join(bark.copy(), bark.copy(), bark.copy())
var cat = new Join(meow.copy(), meow.copy(), meow.copy())

var yard = new Mix(new Mix(dog, cat), bgm)

yard.play()
```
