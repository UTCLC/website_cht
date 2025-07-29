---
title: 语言标签规范
date: 2024-10-10 17:36:00
tags: 本地化规范
---

如本地化时需要使用语言标签，可参考规范 [RFC 5646](https://www.rfc-editor.org/rfc/rfc5646.html) 与查阅 [IANA 语言子标签注册中心](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
格式：language-extlang-script-region
比较常用的中文语言标签与对应名称如下
【language】
zh：中文
【extlang】
cmn：普通话/国语/官话
yue：粤语
lzh：文言文
【script】
Hans：简体
Hant：繁体
【region】
CN：中国内地
TW：台湾
HK：香港特别行政区
MO：澳门特别行政区
SG：新加坡
【例】
zh-cmn-Hans-CN
简体中文（普通话，中国内地）
zh-yue-Hant-HK
繁體中文（粵語，香港特別行政區）
zh
中文
zh-Hans
简体中文 / 中文（简体）
zh-CN
中文（中国内地）
zh-yue
中文（粤语）