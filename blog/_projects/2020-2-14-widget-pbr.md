---
date: 2020-2-14
tag:
  - gl-widget插件文档
  - gl-widget
  - glsl/shader
  - pbr
  - webgl
author: PhilXu
location: Shanghai  
---

# GLWidget pbr材质插件 @gl-widget/physical-shader
## PBR概念
基于物理的渲染（Physically Based Rendering，PBR）是指使用基于物理原理和微平面理论建模的着色/光照模型，以及使用从现实中测量的表面参数来准确表示真实世界材质的渲染理念。
## 优点
对物理世界表达更准确
调整参数更直观
可以放在其他光照下都是正确的
## @gl-widget/physical-shader



::: run {title: 'DEMO', row: false, reverse: true, jsLabs: ['http://cdn.jsdelivr.net/npm/@gl-widget/gl-widget@1.0.7/dist/index.umd.js', 'http://cdn.jsdelivr.net/npm/@gl-widget/physical-shader@1.0.3/dist/index.umd.js', 'http://cdn.jsdelivr.net/npm/@gl-widget/obj-parser@1.0.4/dist/index.umd.js', 'http://cdn.jsdelivr.net/npm/@gl-widget/orbit-controls@1.0.6/dist/index.umd.js', 'http://cdn.jsdelivr.net/npm/dat.gui/build/dat.gui.min.js']}
```html
<template>
    <div id="demo">
      <div id="gl-widget"></div>
      <div id="dat"></div>
    </div>
    
</template>
<script>
export default {
    mounted () {
      
      // 利用 id 或 htmlelement 初始化
      let glWidget = new GLWidget.GLWidget({
      element: 'gl-widget'
      })


      // 灯光
      let dirLight = new PhysicalShader.DirectionalLight(
        new GLWidget.Vector3(1, 1, 1),
        new GLWidget.Vector3(0, 1, 50)
      )

      let pointLight = new PhysicalShader.PointLight(
        new GLWidget.Vector3(1, 1, 1),
        new GLWidget.Vector3(40, 0, 0),
        100
      )
      let lights = new PhysicalShader.Lights([
        dirLight
      ])

      // 贴图
      
      let images = []
      let imagenames = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz']
      for (let i = 0; i < 6; i++) {
        images.push(`/_glwidget/image/${imagenames[i]}.jpg`)
      }
      let envMap = new GLWidget.Texture(images)
      let diffuseMap = new GLWidget.Texture('/_glwidget/image/map.jpg')
      let normalMap = new GLWidget.Texture('/_glwidget/image/normal.jpg')
      let metalRoughnessMap = new GLWidget.Texture('/_glwidget/image/roughness.jpg')
      let metalnessMap = new GLWidget.Texture('/_glwidget/image/roughness.jpg')

      let emissiveMap = new GLWidget.Texture('/_glwidget/image/emissive.jpg')
      let aoMap = new GLWidget.Texture('/_glwidget/image/ao.jpg')

      let shader = new PhysicalShader.PhysicalShader({
        lights:lights,
        diffuseMap: diffuseMap,
        roughness: 1,
        metalness: 1,
        envMap: envMap,
        aoMap: aoMap,
        normalMap: normalMap,
        roughnessMap: metalRoughnessMap,
        metalnessMap: metalnessMap,
        emissive: new GLWidget.Vector3(2, 2, 2),
        emissiveMap: emissiveMap

      })
      let xmlhttp=new XMLHttpRequest();
      xmlhttp.onreadystatechange=function()
        {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
          {
            let geometry = ObjParser.parse(xmlhttp.responseText)
            let element = new GLWidget.RenderableElement(shader, geometry)
            glWidget.add(element)
          }
        }
      xmlhttp.open("GET","/_glwidget/obj/helmet.obj",true);
      xmlhttp.send();

      let gui = new dat.GUI({ autoPlace: false });

      let customContainer = document.getElementById('dat');
      customContainer.appendChild(gui.domElement);
      let options = {
        roughness: 1,
        roughnessMap: true,
        metalness: 1,
        metalnessMap: true,
        aoMap: true,
        pointLight: false,
        pointLightColor: [0, 128, 255],
        ambientColor: [200, 200, 200]
      }
      gui.add( options, 'roughness', 0, 1 )
      gui.add( options, 'roughnessMap' )
      gui.add( options, 'metalness', 0, 1 )
      gui.add( options, 'metalnessMap' )
      gui.add( options, 'aoMap' )
      gui.add( options, 'pointLight' ).onChange((value) => {
        if (value) {
          lights.addLight(pointLight)
        } else {
          lights.removeLight(pointLight)
        }
      })
      gui.add( pointLight.position, 'x', 40, 150 )
      gui.addColor( options, 'pointLightColor' )
      gui.add( dirLight.position, 'x', -100, 100 )
      gui.addColor( options, 'ambientColor' )



      let controls = new OrbitControls(glWidget)
      glWidget.camera.position.z = 3
      //每帧动画
      function animate() {
        shader.update({
          lights: lights,
          roughness: options.roughness,
          roughnessMap: options.roughnessMap ? metalRoughnessMap : null,
          metalness: options.metalness,
          metalnessMap: options.metalnessMap ? metalRoughnessMap : null,
          aoMap: options.aoMap ? aoMap : null,
          ambientLightColor: new GLWidget.Vector3(options.ambientColor[0] / 255, options.ambientColor[1] / 255, options.ambientColor[2] / 255)
        })

        pointLight.color.x = options.pointLightColor[0] / 255
        pointLight.color.y = options.pointLightColor[1] / 255
        pointLight.color.z = options.pointLightColor[2] / 255
        lights.update(glWidget.camera)
        controls.update()
      }

      //开始渲染
      glWidget.render(animate)
    }
  }
</script> 
<style>
#demo {
  position: relative;
}
#gl-widget {
  height:500px;
}
#dat {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
```
:::

### 贴图支持
diffuseMap、envMap、normalMap、roughnessMap、metalnessMap、emissiveMap、aoMap
### 灯光支持
点光源、平行光源
### 参数
参考threejs设置如下
```ts
export interface PhysicalMaterialOptions {
  color?: string,
  isInstanced?: boolean,
  fog?: boolean,
  side?: RenderSide,
  flatShading?: boolean,
  toneMapping?: ToneMapping,
  outputEncoding?: Encoding,
  sheen?: Vector3,
  toneMappingExposure?: number,
  toneMappingWhitePoint?: number,
  maxMipLevel?: number,
  flipEnvMap?: boolean,
  metalness?: number,
  roughness?: number,
  opacity?: number,
  envMapIntensity?: number,
  normalScale?: Vector2,
  emissiveMap?: GLWidget.Texture,
  emissive?: Vector3,
  diffuse?: Vector3,
  ambientLightColor?: Vector3,
  diffuseMap?: GLWidget.Texture,
  envMap?: GLWidget.Texture,
  normalMap?: GLWidget.Texture,
  aoMap?: GLWidget.Texture,
  specularMap?: GLWidget.Texture,
  roughnessMap?: GLWidget.Texture,
  metalnessMap?: GLWidget.Texture,
  offset?: Vector2,
  repeat?: Vector2,
  center?: Vector2,
  rotation?: number,
  lights?: Lights
}
```


