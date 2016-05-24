import binascii

# ========== Challenge 1  ========== #
hex_str = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'

def hex_decode(string):
    hex = hex_str.decode("hex")
    return binascii.b2a_base64(hex)

print 'Challenge 1 solution: \n', hex_decode(hex_str) 

# equivalent of hex_str.decode("hex")
def hex2ascii(string):
    ascii_string = ''
    x = 0
    y = 2
    while y <= len(string):
        ascii_string += chr(int(string[x:y], 16))
        x += 2
        y += 2
    return ascii_string

def hex2binary(string):
    bin_str = ''
    x = 0
    y = 2
    while y <= len(string):
        bin_str += '{0:b}'.format(int(string[x:y], 16))
        x += 2
        y += 2
    return bin_str

def hex2bytes(string):
    byte_array = []
    x = 0
    y = 2
    while y <= len(string):
        byte_array.append(int(string[x:y], 16))
        x += 2
        y += 2
    return byte_array

# print(hex2binary(hex_str))
# print(hex2ascii(hex_str))
# print(hex2bytes(hex_str))


# ========== Challenge 2  ========== #
str1 = '1c0111001f010100061a024b53535009181c'
str2 = '686974207468652062756c6c277320657965'

def xor_hex_strings(xs, ys):
    bytes1 = hex2bytes(xs)
    bytes2 = hex2bytes(ys)
    return "".join(chr(x ^ y) for x, y in zip(bytes1, bytes2))

result = xor_hex_strings(str1, str2)
print "Challenge 2 solution: \n", result, '\n'

# ========== Challenge 3  ========== #

str3 = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
letters = map(chr, range(ord('a'), ord('z')+1))

char_freq = {
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

def xor_single_char(char, str):
    result = ''
    bytes = hex2bytes(str)
    for b in bytes:
        x = b ^ ord(char)
        if x >= 97 and x <= 122:
            x = x - 32;
            result += chr(x)
        elif x >= 65 and x <= 90:
            result += chr(x)
    return result

def find_char_freq(str):
    results = {}
    for l in letters:
        results[l] = xor_single_char(l, str)

    result_freq = []
    for char in results:
        result = results[char]
        frequencies = {}

        for letter in result:
            if frequencies.has_key(letter):
                frequencies[letter] += 1
            else:
                frequencies[letter] = 1

        sum = 0
        coincidenceIndex = 0.0655
        for c in frequencies:
            occ = float(frequencies[c]) / len(result)
            frequencies[c] = occ * char_freq[ord(c)]
            sum += frequencies[c]
        freq = coincidenceIndex - sum

        tup = (char, freq)
        result_freq.append(tup)

    sorted_by_freq = sorted(result_freq, key=lambda tup: tup[1])
    return sorted_by_freq

def printXorResult(range, str):
    result_freq = find_char_freq(str)
    num = 0
    while num < range:
        print "Number ", num + 1, " result: "
        print(xor_single_char(result_freq[num][0], str))
        num += 1

print 'Challenge 3 solution:'
printXorResult(3, str3)

