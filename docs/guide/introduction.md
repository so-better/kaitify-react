---
title: 简介
---

# 简介

## 前言

`kaitify-react` 是一套基于 `kaitify` 富文本编辑器核心库进行开发和设计的富文本编辑器，使用 `React` 框架作视图渲染，并提供相关的组件供开发者使用

本文档不再对 `kaitify` 进行赘述，关于编辑器底层的核心理念，在 `kaitify` 文档中都有讲述，如果你对 `kaitify` 有兴趣，可以访问 [@kaitify/core 文档](https://www.so-better.cn/docs/kaitify-core/)，获取进一步的了解

## 结合 React

`kaitify` 是一个基于原生 `js` 的富文本编辑器核心库，在 `React` 项目中进行使用的话，可能需要进行一些组件的封装，并且需要为更好地与 `React` 结合而进行开发与设计

`kaitify-react` 的目的就是为了帮助开发者解决这一问题，减少一些基本工作，同时提供了可以直接拿来使用的必要组件，并且设计了一套基本的 `UI` 样式

`kaitify-react` 最低支持的 react 版本是 react 18

## 视图渲染

`kaitify` 的视图渲染采用完全原生 `js` 的写法，我们称之为 `js-render`，而在 `kaitify-react` 中，我们自定义了视图渲染的逻辑，采用 `React` 的 `ReactNode` 来作视图渲染

因此编辑器本身不关心视图如何进行渲染，只需要专注于内部逻辑的处理，视图渲染的部分我们完全交给 `React` 去处理

> [!TIP] 怎么样？
> 接下来去更详细地了解 `kaitify-react` 是怎么使用的吧~
