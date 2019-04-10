import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

export const aesAdd = function (str, key, iv) {
    let AES_KEY = CryptoJS.enc.Utf8.parse(key);
    let AES_IV = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(str, AES_KEY, {
        iv: AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

export const aesEdd = function (str, key, iv) {
    let AES_KEY = CryptoJS.enc.Utf8.parse(key);
    let AES_IV = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(str, AES_KEY, {
        iv: AES_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}

export const rsaAdd = function (str, rsakey) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(rsakey);
    return encrypt.encrypt(str);
}

export const getAesKey = function () {
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var n = 32, s = "";
    for (var i = 0; i < n; i++) {
        var rand = Math.floor(Math.random() * str.length);
        s += str.charAt(rand);
    }
    return s
}
