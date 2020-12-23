# Commander Gulp Util Dynamic

<p>Compilación utiles dinámicamente</p>

![commander: version (tag)](https://img.shields.io/badge/commander-v3.0.2-blue?style=for-the-badge)
![gulp: version (tag)](https://img.shields.io/badge/gulp-v4.0.2-orange?style=for-the-badge)
![MIT License](https://img.shields.io/badge/lincense-MIT-yellow?style=for-the-badge) 
![npm: version (tag)](https://img.shields.io/badge/npm-v7.0.15-red?style=for-the-badge)
![node: version (tag](https://img.shields.io/badge/node-v15.4.0-green?style=for-the-badge)

## Instalación

```bash
$ npm install commander-gulp-util
```


### Comando a ejecutar

```bash
$ commander-gulp-util util 'entry' --ut  'ouput'
$ commander-gulp-util clean 'entry' 
```

### Configuración por el package.json

```bash
 "scripts": {
    "fonts": "commander-gulp-util util \"frontend/src/static/font/" --ut  \"docs\"",
    "clean": "commander-gulp-util clean \"docs\""
  }
```