var fs = require('fs');
var vm = require('vm');
var path = require("path");


vm.include = function include(filetoInclude) {
    var code = fs.readFileSync(path.join(__dirname,filetoInclude), 'utf-8');
    vm.runInThisContext(code, filetoInclude);
};

var navigator = {};
navigator.uesrAgent = false;


var this_file = path.join(path.dirname(__filename),path.basename(__filename));
var make_file = process.argv.length === 3 && process.argv[1].toUpperCase()=== this_file.toUpperCase();
//xx console.log(process.argv.length,process.argv[2]);
//xx console.log(process.argv[1]);
//xx console.log("this_file =",this_file);
//xx console.log("make_file= ",make_file);

if (make_file) {

    var filename = process.argv[2];
    console.log(" creating ",filename)
    var f = fs.createWriteStream(filename);
    function write(a) {
        f.write(a + "\n");
    }
    vm = {};
    vm.runInThisContext = function (a) {
        write(a+ "\n");
    };
    vm.include = function(filename) {
        var code = fs.readFileSync(path.join(__dirname,filename), 'utf-8');
        write("//  " +filename + "\n");
        write(code+ "\n");

    };
    vm.special = vm.runInThisContext;
    vm.end = function() {
        f.end();
    }
} else {
    vm.special = function(){};


}


vm.runInThisContext("var navigator = {};");
vm.runInThisContext("var window = {};");
vm.include("./lib/yahoo-min.js");
vm.include("./lib/jsrsasign/ext/base64.js");
vm.include("./lib/jsrsasign/crypto-1.1.js");
vm.include("./lib/jsrsasign/ext/cryptojs-312-core-fix.js");
vm.include("./lib/jsrsasign/ext/jsbn.js");
vm.include("./lib/jsrsasign/ext/jsbn2.js");
vm.include("./lib/jsrsasign/ext/rsa.js");
vm.include("./lib/jsrsasign/ext/rsa2.js");
vm.include("./lib/jsrsasign/ext/prng4.js");
vm.include("./lib/jsrsasign/ext/rng.js");
vm.include("./lib/jsrsasign/ext/sha1.js");
vm.include("./lib/jsrsasign/ext/sha256.js");
vm.include("./lib/jsrsasign/ext/sha512.js");
vm.include("./lib/jsrsasign/ext/md5.js");
vm.include("./lib/jsrsasign/ext/ripemd160.js");
vm.include("./lib/jsrsasign/ext/ec.js");
vm.include("./lib/jsrsasign/base64x-1.1.js");
vm.include("./lib/jsrsasign/x509-1.1.js");
vm.include("./lib/jsrsasign/asn1-1.0.js");
vm.include("./lib/jsrsasign/asn1cms-1.0.js");
vm.include("./lib/jsrsasign/asn1cades-1.0.js");
vm.include("./lib/jsrsasign/asn1hex-1.1.js");
vm.include("./lib/jsrsasign/asn1tsp-1.0.js");
vm.include("./lib/jsrsasign/asn1x509-1.0.js");
vm.include("./lib/jsrsasign/rsasign-1.2.js");
vm.include("./lib/jsrsasign/keyutil-1.0.js");
vm.include("./lib/jsrsasign/ecdsa-modified-1.0.js");
vm.include("./lib/jsrsasign/ecparam-1.0.js");

vm.special("exports.X509 = X509;");
vm.special("exports.KJUR = KJUR;");
vm.special("exports.ASN1HEX = ASN1HEX;");
vm.special("exports.RSAKey = RSAKey;");
vm.special("exports._rsasign_verifyString = _rsasign_verifyString; if(!_rsasign_verifyString) throw new Error('rzrezr')");
vm.special("exports.KEYUTIL = KEYUTIL;");


if (!make_file) {
    exports.X509 = X509;
    exports.KJUR = KJUR;
    exports.ASN1HEX = ASN1HEX;
    exports.RSAKey = RSAKey;
    exports._rsasign_verifyString =_rsasign_verifyString;
}



