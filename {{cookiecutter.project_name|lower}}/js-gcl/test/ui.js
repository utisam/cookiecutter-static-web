const assert = require('assert');
const fs = require('fs');
const { Script } = require("vm");
const { JSDOM } = require("jsdom");

const indexjs = new Script(fs.readFileSync(`${process.env['TARGET_DIR']}/index.js`).toString());

describe('Test', function() {
	it('write here', function() {
		const dom = new JSDOM(`target html`, { runScripts: "outside-only" });
		dom.runVMScript(indexjs);
	});
});
