/// ================ Challenge 1 ========================
var hexString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'
var base64 = new Buffer(hexString, 'hex').toString('base64')
// console.log(base64)

function hexToBase64(str){
    return new Buffer(str, 'hex').toString('base64')
}

//// =============== Challenge 2 ================================
var str1 = '1c0111001f010100061a024b53535009181c'
var str2 = '686974207468652062756c6c277320657965'
// var test = xor(rs(buf1), rs(buf2))

var buf1 = new Buffer(hexToBase64(str1), 'base64').toString('utf8')
var buf2 = new Buffer(hexToBase64(str2), 'base64').toString('utf8')

var output = '';
for (var i = 0; i < buf1.length; i ++){
    var x = buf1.charCodeAt(i) ^ buf2.charCodeAt(i)
    output += String.fromCharCode(x)
}
// console.log('output:', output)

function toHex(str){
    var hex = '';
    for (var i = 0; i < str.length; i++){
        hex += str.charCodeAt(i).toString(16)
    }
    return hex
}
// console.log('hex', toHex(output))

//// =============== Challenge 3 ========================

var string = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736';
var letters = 'abcdefghijklmnopqrstuvwxyz';
var char_freq = {
    65: 0.08167,
    66: 0.01492,
    67: 0.02782,
    68: 0.04253,
    69: 0.12702,
    70: 0.02228,
    71: 0.02015,
    72: 0.06094,
    73: 0.06966,
    74: 0.00153,
    75: 0.00772,
    76: 0.04025,
    77: 0.02406,
    78: 0.06749,
    79: 0.07507,
    80: 0.01929,
    81: 0.00095,
    82: 0.05987,
    83: 0.06327,
    84: 0.09056,
    85: 0.02758,
    86: 0.00978,
    87: 0.0236,
    88: 0.0015,
    89: 0.01974,
    90: 0.00074
}

function hexToBytes(hex) {
    var bytes = []
    for (x = 0; x < hex.length; x += 2){
        bytes.push(parseInt(hex.substr(x, 2), 16));
    }
    return bytes;
}

function xorSingleChar(char, str){
    var result = '';
    var bytes = hexToBytes(str);
    for (var i = 0; i < bytes.length; i ++){
        var x = bytes[i] ^ char.charCodeAt(0);
        if (x >= 97 && x <= 122){
            x = x - 32;
            result += String.fromCharCode(x)
        } else if (x >= 65 && x <= 90) {
            result += String.fromCharCode(x)
        }
    }
    return result
}

function findCharFreq(str){ // takes hex
    var results = {};
    for (var c = 0; c < letters.length; c++){
        results[letters[c]] = xorSingleChar(letters[c], str);
    }

    var charFreqs = [];
    for (r in results){
        var result = results[r];
        var freqHash = {};

        var array = result.split('')
        for (i = 0; i < array.length; i ++){
            if (freqHash[array[i]]){
                freqHash[array[i]] += 1;
            } else {
                freqHash[array[i]] = 1;
            }
        }
        var sum = 0;
        for (c in freqHash) {
            var occ = freqHash[c] / array.length;
            freqHash[c] = occ * char_freq[c.charCodeAt(0)];
            sum += freqHash[c];
        }

        var coincidenceIndex = 0.0655;
        var freq = coincidenceIndex - sum;
        var obj = {};
        obj.letter = r;
        obj.freq = freq;
        charFreqs.push(obj);
    }

    charFreqs.sort(function(a, b){
        if (a.freq > b.freq){
            return 1;
        } else if (a.freq < b.freq){
            return -1;
        } else{
            return 0;
        }
    });
    // console.log("charFreqs sorted: ", charFreqs)
    return charFreqs;
}

// prints xor result of three most likely characters
function printResult(range, str){
    var charFreqs = findCharFreq(str);
    var num = 1;
    for (var i = 0; i < range; i ++){
        console.log("Number", num, "result: ")
        console.log(xorSingleChar(charFreqs[i]['letter'], str));
        num += 1;
    }
}

printResult(3, string)






