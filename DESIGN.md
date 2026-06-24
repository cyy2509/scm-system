--
version: alpha
name: SCM Dashboard — Premium
description: >
  百货中心供应链管理系统。深靛蓝主色调，暖灰中性背景，
  深邃侧边栏配微光渐变。数据面板用层叠阴影营造空间感。
  受 Stripe/Linear 启发，克制用色、精准间距、柔和字体。

colors:
  primary: "#6366F1"
  primary-light: "#818CF8"
  primary-dark: "#4F46E5"
  primary-bg: "#EEF2FF"
  on-primary: "#FFFFFF"

  ink: "#0F172A"
  ink-secondary: "#1E293B"
  ink-muted: "#475569"
  ink-subtle: "#94A3B8"
  ink-placeholder: "#CBD5E1"

  canvas: "#F1F5F9"
  surface: "#FFFFFF"
  surface-hover: "#F8FAFC"
  surface-secondary: "#F8FAFC"

  hairline: "#E2E8F0"
  hairline-strong: "#CBD5E1"

  sidebar-bg: "#060B1B"
  sidebar-surface: "#0B1225"
  sidebar-bottom: "#111B34"
  sidebar-ink: "rgba(255,255,255,0.55)"
  sidebar-ink-active: "#FFFFFF"
  sidebar-hover: "rgba(255,255,255,0.05)"
  sidebar-active: "rgba(99,102,241,0.18)"
  sidebar-glow: "rgba(99,102,241,0.08)"

  accent-amber: "#F59E0B"
  accent-emerald: "#10B981"
  accent-rose: "#F43F5E"
  accent-cyan: "#06B6D4"
  accent-violet: "#8B5CF6"

  success: "#10B981"
  success-bg: "#ECFDF5"
  danger: "#EF4444"
  danger-bg: "#FEF2F2"
  warning: "#F59E0B"
  warning-bg: "#FFFBEB"
  info: "#6366F1"
  info-bg: "#EEF2FF"

typography:
  page-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  card-title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
  stat-value:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "-0.02em"

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 10px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.on-primary}"
  page-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  sidebar-item-active:
    backgroundColor: "{colors.sidebar-active}"
    textColor: "{colors.sidebar-ink-active}"
  stat-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  table-header:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.ink-muted}"
---

## Overview

SCM Dashboard Premium — 企业供应链管理后台。深靛蓝 (#6366F1)
为主色，暖灰中性背景，深邃侧边栏。克制用色、精准间距、
柔和阴影。服务于中文企业用户，追求专业与品质感。

Design philosophy: "少即是多"。每种颜色都有精确用途，每处
阴影都有空间意图。不为装饰而装饰。

## Colors

- **Primary (#6366F1):** 深靛蓝。比 Element Plus 默认蓝更有
  质感。用于主按钮、激活态、链接、聚焦环。唯一彩色强调色。
- **Ink (#0F172A):** 接近纯黑的深蓝黑。标题和关键数据。
- **Sidebar (#060B1B):** 极深海军蓝，配合微光渐变。
- **Canvas (#F1F5F9):** 带蓝调的浅灰底，区别于纯白卡片。
- **Semantic:** 翡翠绿(success)、玫红(danger)、琥珀(warning)
  — 均降低饱和度以融入整体克制调性。

## Typography

系统字体栈优先中文渲染。单一无衬线体系，通过字号/字重区分层级。
页面标题 18px/600，卡片标题 15px/600，正文 14px/400。
统计数值 30px/700 带 -0.02em 字间距收紧。

## Do's and Don'ts

- ✅ 用层叠阴影 (多层 box-shadow) 营造空间深度
- ✅ 颜色不超过 3 个语义色同时出现
- ✅ 保持 4.5:1 正文对比度
- ❌ 禁止渐变文字、侧边条、毛玻璃
- ❌ 禁止 100vw 突围、32px+ 圆角
- ❌ 禁止装饰性动画
