module.exports = {
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:vue/essential",
	],
	"plugins": [
		"vue"
	],
	"rules": {
		'vue/no-parsing-error': [2, {
			'control-character-in-input-stream': false
		}],
		// 禁止空语句块
		"no-empty": 2,
		// 禁止对象字面量中出现重复的 key
		"no-dupe-keys": 2,
		// 禁止重复的 case 标签
		"no-duplicate-case": 2,
		// 使用 === 替代 == allow-null允许null和undefined==
		"eqeqeq": 2,
		// 不允许多个空行
		"no-multiple-empty-lines": [2, {
			"max": 2
		}],
		// switch包含default
		"default-case": 2,
		// 禁止对const定义重新赋值
		"no-const-assign": 2,
		// 禁止额外的分号
		"no-extra-semi": 2,
		// 禁止直接对 NaN 进行判断，必须使用 isNaN
		'use-isnan': 2,
		// 操作符前后要加空格
		'space-infix-ops': 2,
		// function 等的花括号之前不使用空格
		'space-before-blocks': 0,
		// 字符串是否使用单引号
		'quotes': 0,
		// obj = { a: a } 必须转换成 obj = { a }
		// @off 没必要
		'object-shorthand': 0,
		// 对象每个属性必须独占一行
		// @off 不限制
		'object-property-newline': 0,
		// 禁止 if 语句在没有花括号的情况下换行
		'nonblock-statement-body-position': 2,
		// 箭头函数的空格使用规则
		'arrow-spacing': 2,
		// v-for和v-if同时使用
		// 在只想渲染部分节点的时候十分有用，因此关闭
		// 但是在数据多的情况下还是推荐使用computed生成一个新的渲列表
		'vue/no-use-v-if-with-v-for': ['off']
	}
};

