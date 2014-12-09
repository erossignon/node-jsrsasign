require("./adaptor");
var X509 = require("../main.js").X509;
// var KJUR = require("../main.js").KJUR;
var BigInteger =require("../main.js").BigInteger;

describe("test do ASN1", function () {


    test("Boolean Test", function () {
        var d = new KJUR.asn1.DERBoolean();
        expect(1);
        equal(d.getEncodedHex(), "0101ff", "Boolean TRUE");
    });

    xtest("Integer Test", function () {
        var d = new KJUR.asn1.DERInteger();
        expect(9);
        d.setByBigInteger(new BigInteger("3", 16));
        equal(d.getEncodedHex(), "020103", "setByBigInteger(BI('3',16))");
        d.setByBigInteger(new BigInteger("3f", 16));
        equal(d.getEncodedHex(), "02013f", "setByBigInteger(BI('3f',16))");
        d.setByBigInteger(new BigInteger("254", 10));
        equal(d.getEncodedHex(), "020200fe", "setByBigInteger(BI('254',10))");
        d.setByBigInteger(new BigInteger("-3", 16));
        equal(d.getEncodedHex(), "0201fd", "setByBigInteger(BI('-3',16))");
        d.setByBigInteger(new BigInteger("-1", 16));
        equal(d.getEncodedHex(), "0201ff", "setByBigInteger(BI('-1',16))");
        d.setByInteger(-3);
        equal(d.getEncodedHex(), "0201fd", "setByInteger(-3)");
        var d2 = new KJUR.asn1.DERInteger({'bigint': new BigInteger("-3", 16)});
        equal(d2.getEncodedHex(), "0201fd", "constructor bigint -3");
        var d3 = new KJUR.asn1.DERInteger({'int': -3});
        equal(d3.getEncodedHex(), "0201fd", "constructor int -3");
        var d4 = new KJUR.asn1.DERInteger({'hex': 'fd'});
        equal(d4.getEncodedHex(), "0201fd", "constructor hex fd");
    });

    test("BitString Test", function () {
        var d = new KJUR.asn1.DERBitString();
        expect(9);
        d.setHexValueIncludingUnusedBits("04bac0");
        equal(d.getEncodedHex(), "030304bac0", "setHexValueIncludingUnusedBits > ub=4, bac0");
        d.setUnusedBitsAndHexValue(5, "bad0");
        equal(d.getEncodedHex(), "030305bad0", "setUnusedBitsAndHexValue > ub=5, bad0");
        d.setByBinaryString('1011');
        equal(d.getEncodedHex(), "030204b0", "setByBinaryString 1011 > ub=4, b0");
        d.setByBinaryString('11111111');
        equal(d.getEncodedHex(), "030200ff", "setByBinaryString 1(8) > ub=0, ff");
        d.setByBinaryString('111111111');
        equal(d.getEncodedHex(), "030307ff80", "setByBinaryString 1(9) > ub=7, ff80");
        d.setByBooleanArray([true, false, true, true, false]);
        equal(d.getEncodedHex(), "030204b0", "setByBooleanArray([t,f,t,t,f]) > ub=4, b0");
        var d2 = new KJUR.asn1.DERBitString({"hex": "04bac0"});
        equal(d2.getEncodedHex(), "030304bac0", "constructor hex 04bac0");
        var d3 = new KJUR.asn1.DERBitString({"bin": "1011"});
        equal(d3.getEncodedHex(), "030204b0", "constructor bin 1011");
        var d4 = new KJUR.asn1.DERBitString({"array": [true, false, true, true]});
        equal(d4.getEncodedHex(), "030204b0", "constructor array [t,f,t,t]");
    });

    test("OctetString Test", function () {
        var d = new KJUR.asn1.DEROctetString();
        expect(4);
        d.setString('aaa');
        equal(d.getEncodedHex(), "0403616161", "OctetString aaa");
        d.setStringHex('000102');
        equal(d.getEncodedHex(), "0403000102", "OctetString x000102");
        var d2 = new KJUR.asn1.DEROctetString({'hex': '010203'});
        equal(d2.getEncodedHex(), "0403010203", "constructor params hex");
        var d3 = new KJUR.asn1.DEROctetString({'str': 'aaa'});
        equal(d3.getEncodedHex(), "0403616161", "constructor params str aaa");
    });

    test("Null Test", function () {
        var d = new KJUR.asn1.DERNull();
        expect(1);
        equal(d.getEncodedHex(), "0500", "Null");
    });

    test("ObjectIdentifier Test", function () {
        var d = new KJUR.asn1.DERObjectIdentifier();

        expect(5);
        d.setValueHex('550406');
        equal(d.getEncodedHex(), "0603550406", "setValueHex('550406') C:2.5.4.6");
        d.setValueOidString('2.5.4.6');
        equal(d.getEncodedHex(), "0603550406", "setValueOidString('2.5.4.6') C:2.5.4.6");
        d.setValueOidString('1.2.34.56789');
        equal(d.getEncodedHex(), "06052a2283bb55", "setValueOidString('1.2.34.56789')");
        var d4 = new KJUR.asn1.DERObjectIdentifier({'oid': '2.5.4.6'});
        equal(d4.getEncodedHex(), "0603550406", "constructor oid 2.5.4.6");

        var d5 = new KJUR.asn1.DERObjectIdentifier({'oid': '0.1.1.2.2'});
        equal(d5.getEncodedHex(), "060401010202", "oid 0.1.1.2.2");
    });

    test("UTF8String Test", function () {
        var d = new KJUR.asn1.DERUTF8String();
        expect(2);
        d.setString('aaa');
        equal(d.getEncodedHex(), "0c03616161", "UTF8String aaa");
        d.setString('bbb');
        equal(d.getEncodedHex(), "0c03626262", "UTF8String bbb");
    });

    test("NumericString Test", function () {
        var d = new KJUR.asn1.DERNumericString();
        expect(2);
        d.setString('aaa');
        equal(d.getEncodedHex(), "1203616161", "NumericString aaa");
        d.setString('bbb');
        equal(d.getEncodedHex(), "1203626262", "NumericString bbb");
    });

    test("PrintableString Test", function () {
        var d = new KJUR.asn1.DERPrintableString();
        expect(2);
        d.setString('aaa');
        equal(d.getEncodedHex(), "1303616161", "PrintableString aaa");
        d.setString('bbb');
        equal(d.getEncodedHex(), "1303626262", "PrintableString bbb");
    });

    test("TeletexString Test", function () {
        var d = new KJUR.asn1.DERTeletexString();
        expect(2);
        d.setString('aaa');
        equal(d.getEncodedHex(), "1403616161", "TeletexString aaa");
        d.setString('bbb');
        equal(d.getEncodedHex(), "1403626262", "TeletexString bbb");
    });

    test("IA5String Test", function () {
        var d = new KJUR.asn1.DERIA5String();
        expect(2);
        d.setString('aaa');
        equal(d.getEncodedHex(), "1603616161", "IA5String aaa");
        d.setString('bbb');
        equal(d.getEncodedHex(), "1603626262", "IA5String bbb");
    });

    test("UTCTime Test", function () {
        expect(5);

        var d1 = new KJUR.asn1.DERUTCTime();
        d1.setString('130430125959Z');
        equal(d1.getEncodedHex(), "170d3133303433303132353935395a", "setString 130430125959Z");

        var d2 = new KJUR.asn1.DERUTCTime();
        d2.setByDate(new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0)));
        equal(d2.s, "150131000000Z", "setByDate Date.UTC");

        var d3 = new KJUR.asn1.DERUTCTime();
        d3.setByDateValue(2015, 1, 31, 0, 0, 0);
        equal(d3.s, "150131000000Z", "setByDateValue");

        var d4 = new KJUR.asn1.DERUTCTime({'date': new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0))});
        equal(d4.s, "150131000000Z", "constructor date argument");

        var d5 = new KJUR.asn1.DERUTCTime();
        var d5hex = d5.getEncodedHex()
        equal(d5hex.substr(0, 4), "170d", "now[0,4]=170d");
    });

    test("GeneralizedTime Test", function () {
        expect(7);
        var d1 = new KJUR.asn1.DERGeneralizedTime();
        d1.setString('20130430125959Z');
        equal(d1.getEncodedHex(), "180f32303133303433303132353935395a",
            "GeneralizedTime 20130430125959Z");

        var d2 = new KJUR.asn1.DERGeneralizedTime();
        d2.setByDate(new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0)));
        equal(d2.s, "20150131000000Z", "setByDate Date.UTC");

        var d3 = new KJUR.asn1.DERGeneralizedTime();
        d3.setByDateValue(2015, 1, 31, 0, 0, 0);
        equal(d3.s, "20150131000000Z", "setByDateValue");

        var date4 = new Date(Date.UTC(2015, 0, 31, 0, 0, 0, 0));
        var d4 = new KJUR.asn1.DERGeneralizedTime({'date': date4});
        equal(d4.s, "20150131000000Z", "constructor date argument");

        var d5 = new KJUR.asn1.DERGeneralizedTime();
        var d5hex = d5.getEncodedHex()
        equal(d5hex.substr(0, 4), "180f", "now[0,4]=180f");
        equal(d5.s.length, 15, "now length=15");

        var d6 = new KJUR.asn1.DERGeneralizedTime({millis: true});
        var d6hex = d6.getEncodedHex()
        equal(d6.s.match(/^[0-9]+[.]?[0-9]*Z$/) != null, true, "now ({millis: true}) match/^d+.?d*Z$/");

    });

    test("Sequence Test", function () {
        expect(4);
        var d1a = new KJUR.asn1.DERUTF8String();
        d1a.setString('a');
        var d1b = new KJUR.asn1.DERUTF8String();
        d1b.setString('b');
        var d1 = new KJUR.asn1.DERSequence();
        d1.setByASN1ObjectArray([d1a, d1b]);
        equal(d1.getEncodedHex(), "30060c01610c0162", "setByASN1ObjectArray");

        var d2a = new KJUR.asn1.DERUTF8String({'str': 'a'});
        var d2b = new KJUR.asn1.DERUTF8String({'str': 'b'});
        var d2 = new KJUR.asn1.DERSequence({'array': [d2a, d2b]});
        equal(d2.getEncodedHex(), "30060c01610c0162", "constructor array");

        var d3 = new KJUR.asn1.DERSequence({'array': []});
        equal(d3.getEncodedHex(), "3000", "constructor array []");

        var d4 = new KJUR.asn1.DERSequence();
        equal(d4.getEncodedHex(), "3000", "constructor array no initialize");
    });

    test("Set Test", function () {
        expect(2);
        var d1a = new KJUR.asn1.DERUTF8String();
        d1a.setString('a');
        var d1b = new KJUR.asn1.DERUTF8String();
        d1b.setString('b');
        var d1 = new KJUR.asn1.DERSet();
        d1.setByASN1ObjectArray([d1a, d1b]);
        equal(d1.getEncodedHex(), "31060c01610c0162", "setByASN1ObjectArray");

        var d2a = new KJUR.asn1.DERUTF8String({'str': 'a'});
        var d2b = new KJUR.asn1.DERUTF8String({'str': 'b'});
        var d2 = new KJUR.asn1.DERSet({'array': [d2a, d2b]});
        equal(d2.getEncodedHex(), "31060c01610c0162", "constructor array");
    });

    test("TaggedObject Test", function () {
        expect(4);

        var d1a = new KJUR.asn1.DERUTF8String();
        d1a.setString('a'); // 0c0161
        var d1 = new KJUR.asn1.DERTaggedObject();
        d1.setASN1Object(true, "a0", d1a);
        equal(d1.getEncodedHex(), "a0030c0161", "setASN1Object");

        var d2a = new KJUR.asn1.DERUTF8String({'str': 'a'});
        var d2 = new KJUR.asn1.DERTaggedObject({'explicit': true, 'tag': 'a1', 'obj': d2a});
        equal(d2.getEncodedHex(), "a1030c0161", "constructor with params");

        var d3a = new KJUR.asn1.DERUTF8String({'str': 'a'});
        var d3 = new KJUR.asn1.DERTaggedObject({'explicit': false, 'tag': 'a1', 'obj': d2a});
        equal(d3.getEncodedHex(), "a10161", "constructor with params implicit");

        var d4a = new KJUR.asn1.DERUTF8String({'str': 'a'});
        var d4 = new KJUR.asn1.DERTaggedObject({'obj': d2a});
        equal(d4.getEncodedHex(), "a0030c0161", "constructor with defaults");
    });

    xtest("ASN1Util.getPEMStringFromHex", function () {
        var s = "" +
            "-----BEGIN HOGE HOGE-----\r\n" +
            "YWFh\r\n" +
            "-----END HOGE HOGE-----\r\n";

        equal(KJUR.asn1.ASN1Util.getPEMStringFromHex("616161", "HOGE HOGE"), s, "aaa");
    });

});
