const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const path = require('path')
const uglify = require('rollup-plugin-uglify').uglify

const buildType = [
  {
    format: 'umd',
    ext: '.js'
  },
  {
    format: 'umd',
    ext: '.min.js'
  },
  {
    format: 'es',
    ext: '.esm.js'
  }
]

function resolve(p) {
  return path.resolve(__dirname, '../', p)
}

function generateBuildPluginsConfigs() {
  const tsConfig = {
    verbosity: -1,
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
  }
  return [typescript(tsConfig), uglify()]
}

const configs = buildType.map((type) => {
  const config = {
    packageName: {
      value: 'mouse-wheel'
    },
    ext: {
      value: type.ext
    },
    input: resolve('./src/index.ts'),
    output: {
      file: resolve(`dist/mouse-wheel${type.ext}`),
      name: 'mouse-wheel',
      format: type.format,
    },
    plugins: generateBuildPluginsConfigs(),
  }

  return config
})

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

const build = () => {
  configs.forEach((config) => {
    console.log('config',config)
    rollup.rollup(config).then((bundle) => {
      bundle.write(config.output).then(({ output }) => {
        const code = output[0].code

        console.log('size: ', getSize(code));
      })
    }).catch((e) => {
      console.log('build failed', e);
    })
  })
}

build()