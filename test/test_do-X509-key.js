require("./adaptor");
var X509 = require("../main.js").X509;
var KJUR = require("../main.js").KJUR;
var BigInteger =require("../main.js").BigInteger;
var ASN1HEX = require("../main.js").ASN1HEX;

describe("test X509 key",function() {

// _test/z1.cer (RSA)
    var z1CertPEM = "" +
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIBdTCCAR+gAwIBAgIBBTANBgkqhkiG9w0BAQUFADAaMQswCQYDVQQGEwJVUzEL\n" +
        "MAkGA1UECgwCYTEwHhcNMTMwNTA0MDM0MTQxWhcNMjMwNTA0MDM0MTQxWjAaMQsw\n" +
        "CQYDVQQGEwJVUzELMAkGA1UECgwCYTEwXDANBgkqhkiG9w0BAQEFAANLADBIAkEA\n" +
        "6GZN0rQFKRIVaPOzm8l6Yue6PAm6vcTw3NjfkOt5C5u2RaK3DjESdHtNPEG1FCSJ\n" +
        "URX++I951D6uWxpONRj9WQIDAQABo1AwTjAdBgNVHQ4EFgQUxUc+4gDI561wA9/1\n" +
        "QguM3fTCDhUwHwYDVR0jBBgwFoAUxUc+4gDI561wA9/1QguM3fTCDhUwDAYDVR0T\n" +
        "BAUwAwEB/zANBgkqhkiG9w0BAQUFAANBALL2k69LjwOYfDXv3TXJUAFGUqto+Noj\n" +
        "CJLP08fOfNBZy+KAIy0GsrNU/3uRViqbuGqAnH9kFFwHQjOAFrAe8XQ=\n" +
        "-----END CERTIFICATE-----\n";

// _gitpg/jsrsasign/test/eckey/k1.self.cer
    var k1CertPEM = "" +
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIBfDCCASGgAwIBAgIJAKbxELQvSUDNMAoGCCqGSM49BAMCMBoxCzAJBgNVBAYT\n" +
        "AlVTMQswCQYDVQQKDAJLMTAeFw0xMzA3MTQwMjE3MTdaFw0yMzA3MTIwMjE3MTda\n" +
        "MBoxCzAJBgNVBAYTAlVTMQswCQYDVQQKDAJLMTBZMBMGByqGSM49AgEGCCqGSM49\n" +
        "AwEHA0IABKAVMqPAkABT3mD77+/MpYeTMBWY0wi0Hm9ONk44jCcRvvQyxZkUjJQU\n" +
        "PU/0bCy3Pj5qQdfu8jwEfqEeYGZ95CWjUDBOMB0GA1UdDgQWBBTIR74yfMz/Y4hw\n" +
        "dXSW4r42bESo/DAfBgNVHSMEGDAWgBTIR74yfMz/Y4hwdXSW4r42bESo/DAMBgNV\n" +
        "HRMEBTADAQH/MAoGCCqGSM49BAMCA0kAMEYCIQDfAcS/WKBrP6JBgksQVpp4jdq4\n" +
        "C53Yu4F5NkaMgthAHgIhANGRdWAP1QdW9l6tiglQwdqJs4T0e8+NYv+RcAb3VYwn\n" +
        "-----END CERTIFICATE-----\n";

    xtest("getPublicKeyFromCertPEM z1CertPEM(RSA)", function () {
        var key = X509.getPublicKeyFromCertPEM(z1CertPEM);
        expect(3);
        equal(key.type, "RSA", "type");
        equal(key.n.compareTo(new BigInteger("00e8664dd2b40529121568f3b39bc97a62e7ba3c09babdc4f0dcd8df90eb790b9bb645a2b70e3112747b4d3c41b51424895115fef88f79d43eae5b1a4e3518fd59", 16)), 0, "compare z1.n");
        equal(key.e, 65537, "z1.e(65537)");

    });

    test("getPublicKeyFromCertPEM k1CertPEM(ECC)", function () {
        var key = X509.getPublicKeyFromCertPEM(k1CertPEM);
        expect(2);
        equal(key.type, "EC", "type");
        equal(key.pubKeyHex, "04a01532a3c0900053de60fbefefcca58793301598d308b41e6f4e364e388c2711bef432c599148c94143d4ff46c2cb73e3e6a41d7eef23c047ea11e60667de425", "pubKeyHex");
    });

});