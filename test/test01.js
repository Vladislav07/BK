const assert=require('assert');
const validate=require('../middleware/validate');
let testsCompleted = 0;
function testValidate(){
let temp=validate.parseField('entry[title]');
assert.equal(temp,'entry,title','разбор строки');
console.log(temp);
testsCompleted++;
}

testValidate();