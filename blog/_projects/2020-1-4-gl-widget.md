---
date: 2020-1-4
tag:
  - gl-widget
  - webgl
author: PhilXu
location: Shanghai  
---

# GLWidget  一个面向UI的轻量化、插件化WebGL渲染引擎
## GLWidget背景
一提到WebGL应用，想到的都是展示3D产品，或是3D网页游戏，在普通页面UI上的应用很少，shadertoy上很多酷炫的shader作为UI的一部分应该是很酷的事情，那为什么很少有人尝试呢，除了兼容性的问题，其中很大一部分原因是从零开始搭建WegGL应用过于繁琐，而引用threejs、babylonjs渲染引擎做这样的事情又大材小用。

所以我就想写一款内核极简，又能快速完成搭建shader运行环境的引擎，可以使开发人员专注于shader效果的编写，或是直接移植shadertoy上惊艳的效果。同时，在架构上注重扩展性，通过编写插件，可以扩展成功能更全的引擎。
::: run {title: '简单shader', row: false, reverse: true, jsLabs: ['http://cdn.jsdelivr.net/npm/@gl-widget/gl-widget/dist/index.umd.js']}
```html
<template>
    <div id="gl-widget"></div>
</template>
<script>
export default {
    mounted () {

      var glWidget = new GLWidget.GLWidget({
      element: 'gl-widget'
      })

      var bg = new GLWidget.Background({
        fragmentShader: `
          precision mediump float;
          uniform vec2 resolution;
          uniform float     time; 
          void main () {
            vec2 uv = gl_FragCoord.xy/resolution.xy;   
            vec3 col = 0.5 + 0.5*cos(time+uv.xyx+vec3(0,2,4));
            gl_FragColor = vec4(col,1.0);
          }
        `,
        uniforms: {
          resolution:{
            value: glWidget.getSize()
          },
          time: {
            value: 0
          }
        },
      })
      glWidget.add(bg);
      let clock = new GLWidget.Clock()
      function animate() {
        bg.uniforms['time'].value = clock.getElapsedTime()
      }
      glWidget.render(animate)
    }
  }
</script> 
<style>
    b {
        color: #3eaf7c;
    }
</style>
` ` `
:::


