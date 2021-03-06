require("./adaptor");
var X509 = require("../main.js").X509;
var KJUR = require("../main.js").KJUR;
var BigInteger =require("../main.js").BigInteger;
var ASN1HEX = require("../main.js").ASN1HEX;
var RSAKey = require("../main.js").RSAKey;
var _rsasign_verifyString = require("../main.js")._rsasign_verifyString;
describe("test X509",function(){


    var sCer1PEM = "" +
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIBqDCCAVKgAwIBAgIJAJ53Xn2fQ6vJMA0GCSqGSIb3DQEBBQUAMBoxCzAJBgNV\n" +
        "BAYTAkpQMQswCQYDVQQKEwJ6MjAeFw0xMDA1MzEwNjE3NTZaFw0yMDA1MjgwNjE3\n" +
        "NTZaMBoxCzAJBgNVBAYTAkpQMQswCQYDVQQKEwJ6MjBcMA0GCSqGSIb3DQEBAQUA\n" +
        "A0sAMEgCQQC5sAMpUF/i7WDsVondzfW5TQWrQW4WQ7HKP5b8Ry7rH2LtR2iX8Vmu\n" +
        "mLfzrezseXHetfZNmiWQHE3HpJdy5aArAgMBAAGjezB5MB0GA1UdDgQWBBS7MIUo\n" +
        "gYmDIf2DOqOcwYCKCb3GjDBKBgNVHSMEQzBBgBS7MIUogYmDIf2DOqOcwYCKCb3G\n" +
        "jKEepBwwGjELMAkGA1UEBhMCSlAxCzAJBgNVBAoTAnoyggkAnndefZ9Dq8kwDAYD\n" +
        "VR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAANBAFhZ88q7ZS7THEcPJ8ogQ+78nyAn\n" +
        "DN7F1FsLp7jE9oM3kYQl6KYy0pwch6Wd6ypW86pel4JFOEr+LnVGODaoxFE=\n" +
        "-----END CERTIFICATE-----\n";

    var sCer1B64 = "MIIBqDCCAVKgAwIBAgIJAJ53Xn2fQ6vJMA0GCSqGSIb3DQEBBQUAMBoxCzAJBgNVBAYTAkpQMQswCQYDVQQKEwJ6MjAeFw0xMDA1MzEwNjE3NTZaFw0yMDA1MjgwNjE3NTZaMBoxCzAJBgNVBAYTAkpQMQswCQYDVQQKEwJ6MjBcMA0GCSqGSIb3DQEBAQUAA0sAMEgCQQC5sAMpUF/i7WDsVondzfW5TQWrQW4WQ7HKP5b8Ry7rH2LtR2iX8VmumLfzrezseXHetfZNmiWQHE3HpJdy5aArAgMBAAGjezB5MB0GA1UdDgQWBBS7MIUogYmDIf2DOqOcwYCKCb3GjDBKBgNVHSMEQzBBgBS7MIUogYmDIf2DOqOcwYCKCb3GjKEepBwwGjELMAkGA1UEBhMCSlAxCzAJBgNVBAoTAnoyggkAnndefZ9Dq8kwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAANBAFhZ88q7ZS7THEcPJ8ogQ+78nyAnDN7F1FsLp7jE9oM3kYQl6KYy0pwch6Wd6ypW86pel4JFOEr+LnVGODaoxFE=";

    var hCer1 = "308201a830820152a0030201020209009e775e7d9f43abc9300d06092a864886f70d0101050500301a310b3009060355040613024a50310b3009060355040a13027a32301e170d3130303533313036313735365a170d3230303532383036313735365a301a310b3009060355040613024a50310b3009060355040a13027a32305c300d06092a864886f70d0101010500034b003048024100b9b00329505fe2ed60ec5689ddcdf5b94d05ab416e1643b1ca3f96fc472eeb1f62ed476897f159ae98b7f3adecec7971deb5f64d9a25901c4dc7a49772e5a02b0203010001a37b3079301d0603551d0e04160414bb30852881898321fd833aa39cc1808a09bdc68c304a0603551d23044330418014bb30852881898321fd833aa39cc1808a09bdc68ca11ea41c301a310b3009060355040613024a50310b3009060355040a13027a328209009e775e7d9f43abc9300c0603551d13040530030101ff300d06092a864886f70d01010505000341005859f3cabb652ed31c470f27ca2043eefc9f20270cdec5d45b0ba7b8c4f68337918425e8a632d29c1c87a59deb2a56f3aa5e978245384afe2e75463836a8c451";

    var sCer2PEM = "" +
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIBvTCCASYCCQD55fNzc0WF7TANBgkqhkiG9w0BAQUFADAjMQswCQYDVQQGEwJK\n" +
        "UDEUMBIGA1UEChMLMDAtVEVTVC1SU0EwHhcNMTAwNTI4MDIwODUxWhcNMjAwNTI1\n" +
        "MDIwODUxWjAjMQswCQYDVQQGEwJKUDEUMBIGA1UEChMLMDAtVEVTVC1SU0EwgZ8w\n" +
        "DQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANGEYXtfgDRlWUSDn3haY4NVVQiKI9Cz\n" +
        "Thoua9+DxJuiseyzmBBe7Roh1RPqdvmtOHmEPbJ+kXZYhbozzPRbFGHCJyBfCLzQ\n" +
        "fVos9/qUQ88u83b0SFA2MGmQWQAlRtLy66EkR4rDRwTj2DzR4EEXgEKpIvo8VBs/\n" +
        "3+sHLF3ESgAhAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAEZ6mXFFq3AzfaqWHmCy1\n" +
        "ARjlauYAa8ZmUFnLm0emg9dkVBJ63aEqARhtok6bDQDzSJxiLpCEF6G4b/Nv/M/M\n" +
        "LyhP+OoOTmETMegAVQMq71choVJyOFE5BtQa6M/lCHEOya5QUfoRF2HF9EjRF44K\n" +
        "3OK+u3ivTSj3zwjtpudY5Xo=\n" +
        "-----END CERTIFICATE-----\n";

    var sCer2B64 = "MIIBvTCCASYCCQD55fNzc0WF7TANBgkqhkiG9w0BAQUFADAjMQswCQYDVQQGEwJKUDEUMBIGA1UEChMLMDAtVEVTVC1SU0EwHhcNMTAwNTI4MDIwODUxWhcNMjAwNTI1MDIwODUxWjAjMQswCQYDVQQGEwJKUDEUMBIGA1UEChMLMDAtVEVTVC1SU0EwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBANGEYXtfgDRlWUSDn3haY4NVVQiKI9CzThoua9+DxJuiseyzmBBe7Roh1RPqdvmtOHmEPbJ+kXZYhbozzPRbFGHCJyBfCLzQfVos9/qUQ88u83b0SFA2MGmQWQAlRtLy66EkR4rDRwTj2DzR4EEXgEKpIvo8VBs/3+sHLF3ESgAhAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAEZ6mXFFq3AzfaqWHmCy1ARjlauYAa8ZmUFnLm0emg9dkVBJ63aEqARhtok6bDQDzSJxiLpCEF6G4b/Nv/M/MLyhP+OoOTmETMegAVQMq71choVJyOFE5BtQa6M/lCHEOya5QUfoRF2HF9EjRF44K3OK+u3ivTSj3zwjtpudY5Xo=";

    var hCer2 = "308201bd30820126020900f9e5f373734585ed300d06092a864886f70d01010505003023310b3009060355040613024a5031143012060355040a130b30302d544553542d525341301e170d3130303532383032303835315a170d3230303532353032303835315a3023310b3009060355040613024a5031143012060355040a130b30302d544553542d52534130819f300d06092a864886f70d010101050003818d0030818902818100d184617b5f8034655944839f785a63835555088a23d0b34e1a2e6bdf83c49ba2b1ecb398105eed1a21d513ea76f9ad3879843db27e91765885ba33ccf45b1461c227205f08bcd07d5a2cf7fa9443cf2ef376f448503630699059002546d2f2eba124478ac34704e3d83cd1e041178042a922fa3c541b3fdfeb072c5dc44a00210203010001300d06092a864886f70d010105050003818100119ea65c516adc0cdf6aa587982cb50118e56ae6006bc6665059cb9b47a683d76454127adda12a01186da24e9b0d00f3489c622e908417a1b86ff36ffccfcc2f284ff8ea0e4e611331e80055032aef5721a1527238513906d41ae8cfe508710ec9ae5051fa111761c5f448d1178e0adce2bebb78af4d28f7cf08eda6e758e57a";

    var sCer3PEM = "" + // z0512.cer
        "-----BEGIN CERTIFICATE-----\n" +
        "MIIBqDCCAVKgAwIBAgIJAJ53Xn2fQ6vJMA0GCSqGSIb3DQEBBQUAMBoxCzAJBgNV\n" +
        "BAYTAkpQMQswCQYDVQQKEwJ6MjAeFw0xMDA1MzEwNjE3NTZaFw0yMDA1MjgwNjE3\n" +
        "NTZaMBoxCzAJBgNVBAYTAkpQMQswCQYDVQQKEwJ6MjBcMA0GCSqGSIb3DQEBAQUA\n" +
        "A0sAMEgCQQC5sAMpUF/i7WDsVondzfW5TQWrQW4WQ7HKP5b8Ry7rH2LtR2iX8Vmu\n" +
        "mLfzrezseXHetfZNmiWQHE3HpJdy5aArAgMBAAGjezB5MB0GA1UdDgQWBBS7MIUo\n" +
        "gYmDIf2DOqOcwYCKCb3GjDBKBgNVHSMEQzBBgBS7MIUogYmDIf2DOqOcwYCKCb3G\n" +
        "jKEepBwwGjELMAkGA1UEBhMCSlAxCzAJBgNVBAoTAnoyggkAnndefZ9Dq8kwDAYD\n" +
        "VR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAANBAFhZ88q7ZS7THEcPJ8ogQ+78nyAn\n" +
        "DN7F1FsLp7jE9oM3kYQl6KYy0pwch6Wd6ypW86pel4JFOEr+LnVGODaoxFE=\n" +
        "-----END CERTIFICATE-----\n";

    var hSig3 = "" +
        "a30ea363514246b686a25529e6446d79ed3081b9709c6213f0611a495456b5b5\n" +
        "6efb33e92ad1c00348c84c6335d01425a1033e0c5006b377ab0d6b34c9322d62\n";

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



    test("pemToBase64", function() {
        var sResult = X509.pemToBase64(sCer1PEM);
        equal(sResult, sCer1B64, "testing pem-base64 conversion.");
    });

    it("pemToHex", function() {
        var sResult = X509.pemToHex(sCer1PEM);
        equal(sResult, hCer1, "testing pem-hex conversion.");
    });

    test("getSubjectPublicKeyInfoPosFromCertHex", function() {
        var pSPK = X509.getSubjectPublicKeyInfoPosFromCertHex(hCer1);
        equal(pSPK, 127 * 2, "check position of subject public key info.");
    });

    test("getSubjectPublicKeyPosFromCertHex", function() {
        var pSPK = X509.getSubjectPublicKeyPosFromCertHex(hCer1);
        equal(pSPK, 147 * 2, "check position of subject public key without encapsulation.");
    });

    test("getPublicKeyHexArrayFromCertHex", function() {
        var a = X509.getPublicKeyHexArrayFromCertHex(hCer1);
        expect(3);
        equal(a.length, 2, "check array length.");
        equal(a[0], "00b9b00329505fe2ed60ec5689ddcdf5b94d05ab416e1643b1ca3f96fc472eeb1f62ed476897f159ae98b7f3adecec7971deb5f64d9a25901c4dc7a49772e5a02b", "check N");
        equal(a[1], "010001", "check E");
    });

    test("getPublicKeyHexArrayFromCertPEM", function() {
        var a = X509.getPublicKeyHexArrayFromCertPEM(sCer1PEM);
        expect(3);
        equal(a.length, 2, "check array length.");
        equal(a[0], "00b9b00329505fe2ed60ec5689ddcdf5b94d05ab416e1643b1ca3f96fc472eeb1f62ed476897f159ae98b7f3adecec7971deb5f64d9a25901c4dc7a49772e5a02b", "check N");
        equal(a[1], "010001", "check E");
    });

    test("getPublicKeyHexArrayFromCertPEM sCer2PEM", function() {
        expect(8);
        equal(X509.pemToBase64(sCer2PEM), sCer2B64, "check pem to base64.");
        equal(X509.pemToHex(sCer2PEM), hCer2, "check pem to hex.");
        var pTbsCert = X509.getHexTbsCertificateFromCert(hCer2);
        equal(pTbsCert, 8, "check tbsCert position.");
        equal(X509.getSubjectPublicKeyInfoPosFromCertHex(hCer2), 280,
            "check subjectPublicKeyInfo position.");
        var a = ASN1HEX.getPosArrayOfChildren_AtObj(hCer2, pTbsCert);
        equal(a.join("/"), "16/38/68/142/206/280", "check postion array of tbsCert.");

        var a = X509.getPublicKeyHexArrayFromCertPEM(sCer2PEM);
        equal(a.length, 2, "check array length.");
        equal(a[0], "00d184617b5f8034655944839f785a63835555088a23d0b34e1a2e6bdf83c49ba2b1ecb398105eed1a21d513ea76f9ad3879843db27e91765885ba33ccf45b1461c227205f08bcd07d5a2cf7fa9443cf2ef376f448503630699059002546d2f2eba124478ac34704e3d83cd1e041178042a922fa3c541b3fdfeb072c5dc44a0021", "check N");
        equal(a[1], "010001", "check E");
    });

    test("X509.readCertPEM", function() {
        var c = new X509();
        c.readCertPEM(sCer1PEM);
        expect(4);
        equal(c.subjectPublicKeyRSA_hN, "00b9b00329505fe2ed60ec5689ddcdf5b94d05ab416e1643b1ca3f96fc472eeb1f62ed476897f159ae98b7f3adecec7971deb5f64d9a25901c4dc7a49772e5a02b", "check N");
        equal(c.subjectPublicKeyRSA_hE, "010001", "check E");
        equal(c.subjectPublicKeyRSA.n.toString(16), "b9b00329505fe2ed60ec5689ddcdf5b94d05ab416e1643b1ca3f96fc472eeb1f62ed476897f159ae98b7f3adecec7971deb5f64d9a25901c4dc7a49772e5a02b", "check N");
        equal(c.subjectPublicKeyRSA.e.toString(16), "10001", "check E");
    });

    xtest("X509.subjectPublicKeyRSA.verifyString integration test", function() {
        RSAKey.prototype.verifyString = _rsasign_verifyString;
        var c = new X509();
        c.readCertPEM(sCer1PEM);
        expect(2);
        equal(c.subjectPublicKeyRSA.verifyString("aaa", hSig3), true, "check sig is valid");
        equal(c.subjectPublicKeyRSA.verifyString("aab", hSig3), false, "check sig is invalid.");
    });

    it("X509.getSerialNumber/Issuer/Subject/NotBefore/NotAfter test", function() {
        RSAKey.prototype.verifyString = _rsasign_verifyString;
        var c = new X509();
        c.readCertPEM(sCer1PEM);
        expect(8);
        equal(c.getSerialNumberHex(), "009e775e7d9f43abc9", "sn = 02");
        equal(c.getIssuerHex(), "301a310b3009060355040613024a50310b3009060355040a13027a32", "issuer");
        equal(c.getSubjectHex(), "301a310b3009060355040613024a50310b3009060355040a13027a32", "subject");
        equal(c.getNotBefore(), "100531061756Z", "notbefore");
        equal(c.getNotAfter(), "200528061756Z", "notafter");
        equal(X509.hex2dn(c.getSubjectHex()), "/C=JP/O=z2", "subjecthex2str");
        equal(c.getIssuerString(), "/C=JP/O=z2", "issuer str");
        equal(c.getSubjectString(), "/C=JP/O=z2", "subject str");
    });

    /*
     test("hoge", function() {
     RSAKey.prototype.verifyString = _rsasign_verifyString;
     var r = new RSAKey();
     expect(4);
     equal(hex2b64, null, "check 4");
     equal(_rsasign_verifyString, null, "check 3");
     equal(r.signString, null, "check signString function");
     equal(r.verifyString, null, "check verifyString function");
     });
     */

    test("getPublicKeyInfoPropOfCertPEM sCer1PEM", function() {
        var r = X509.getPublicKeyInfoPropOfCertPEM(sCer1PEM);
        expect(3);
        equal(r.algoid, "2a864886f70d010101", "algoid");
        equal(r.algparam, null, "algparam");
        equal(r.keyhex, "3048024100b9b00329505fe2ed60ec5689ddcdf5b94d05ab416e1643b1ca3f96fc472eeb1f62ed476897f159ae98b7f3adecec7971deb5f64d9a25901c4dc7a49772e5a02b0203010001", "keyhex");
    });

    test("getPublicKeyInfoPropOfCertPEM k1(ECC)", function() {
        var r = X509.getPublicKeyInfoPropOfCertPEM(k1CertPEM);
        expect(3);
        equal(r.algoid, "2a8648ce3d0201", "algoid"); // ecPublicKey
        equal(r.algparam, "2a8648ce3d030107", "algparam"); // secp256r1
        equal(r.keyhex, "04a01532a3c0900053de60fbefefcca58793301598d308b41e6f4e364e388c2711bef432c599148c94143d4ff46c2cb73e3e6a41d7eef23c047ea11e60667de425", "keyhex");
    });

});
