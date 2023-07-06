// On termininal:
// node
// then this line:
const crypto = require('crypto');
// then this line:
const idBytes = crypto.randomBytes(8);
// then this line:
const randomId = idBytes.toString('hex');
// finally this line:
console.log(randomId);