const rollup = require('rollup')
const typescript = require('rollup-plugin-typescript2')
const path = require('path')
const uglify = require('rollup-plugin-uglify').uglify
const inquirer = require('inquirer')

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

function generateBuildPluginsConfigs(isMin) {
  const tsConfig = {
    verbosity: -1,
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
  }
  const result = [typescript(tsConfig)];

  if (isMin) {
    result.push(uglify());
  }

  return result;
}

const generateConfig = (isMin) => buildType.map((type) => {
  const config = {
    input: resolve('./src/index.ts'),
    output: {
      file: resolve(`dist/mouse-wheel${type.ext}`),
      name: 'mouse-wheel',
      format: type.format,
    },
    plugins: generateBuildPluginsConfigs(isMin),
  }

  return config
})

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

const build = async () => {
  const selected = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'min',
      message: 'minify output files',
    }
  ]);

  const configs = generateConfig(selected.min);

  configs.forEach((config) => {
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