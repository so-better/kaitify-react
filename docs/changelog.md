---
lastUpdated: false
title: 更新日志
---

# 更新日志

## v0.0.1-beta.16 <Badge type="tip" text='2026.04.10' />

- 修复 `Wrapper` 组件监听 `options` 变化的 `useEffect` 依赖项问题：将依赖从整个 `options` 对象引用改为具体的属性值，避免父组件每次渲染时因对象引用变化导致该副作用不必要地重复触发
- 修复 `Wrapper` 组件在 `value` 快速变化时的异步竞态问题：在 `review` 异步回调中增加取消标志，防止过期的回调干扰最新状态

## v0.0.1-beta.15 <Badge type="tip" text='2026.04.10' />

- 修复 `Wrapper` 组件在 `options` 变化时 `editable` 默认值错误的问题（默认值应为 `true`）

## v0.0.1-beta.14 <Badge type="tip" text='2026.04.02' />

- 更新 `@kaitify/core` 的依赖版本，更新底层架构
- 部分内置扩展优化
- 修复和优化了一些底层的问题

## v0.0.1-beta.13 <Badge type="tip" text='2026.03.19' />

- 更新 `@kaitify/core` 的依赖版本
- 更新 `CodeBlock` 扩展
- 修复和优化了一些底层的问题

## v0.0.1-beta.12 <Badge type="tip" text='2026.03.16' />

- 更新 `@kaitify/core` 的依赖版本，修复一些问题

## v0.0.1-beta.8 <Badge type="tip" text='2026.03.04' />

- 更新 `@kaitify/core` 的依赖版本，修复一些问题

## v0.0.1-beta.6 <Badge type="tip" text='2026.03.03' />

- 更新 `@kaitify/core` 的依赖版本，修复一些问题

## v0.0.1-beta.5 <Badge type="tip" text='2026.02.09' />

- 更新 `@kaitify/core` 的依赖版本
- `Wrapper` 组件新增 `onRedressSelection` 属性

## v0.0.1-beta.4 <Badge type="tip" text='2026.02.04' />

- 更新 `@kaitify/core` 的依赖版本
- 升级依赖的less版本

## v0.0.1-beta.3 <Badge type="tip" text='2025.10.30' />

- kaitify-react 的第一个发布版本
