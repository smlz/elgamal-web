<template>
<div>
    Temporärer öffentlicher Schlüssel des Senders (R):<br>
    <code>
      R<sub>Sender</sub> =
      <input type="text" v-model="R_sender" :size="Math.floor(bits/3.322)">
    </code>
    <br><br>
    Verschlüsselte Mitteilung:<br>
    <code>
      c = <input type="text" v-model="messageToDecrypt"
                :size="Math.floor(bits/3.322)">
    </code>
    <br><br>
    Entschlüsselte Mitteilung als Zahl
    (m = R<sub>Sender</sub><sup>p - 1 - a</sup> · c (mod p)):
    <code class="bignum">m = {{messageDecrypted.toString()}}</code>
    <br>
    Entschlüsselte (und decodierte) Mitteilung:
    <code class="bignum">{{messageDecoded}}</code>
</div>
</template>

<script>
import bigInt from 'big-integer';

export default {
    name: 'decrypt',
    props: {
        p: {
            type: bigInt,
            required: true,
        },
        g: {
            type: bigInt, 
            required: true,
        },
        bits: {
            type: Number,
            required: true,
        },
        a: {
            type: bigInt,
            required: true,
        },
    },
    data () {
        return {
            R_sender: '',
            messageToDecrypt: '',
        };    
    },
    computed: {
        messageDecrypted () {
            if (this.messageToDecrypt !== '' && this.R_sender !== '' && this.a) {
                try {
                    var c = bigInt(this.messageToDecrypt.trim());
                    return bigInt(this.R_sender.trim())
                            .modPow(this.p.minus(1).minus(this.a), this.p)
                            .multiply(c).mod(this.p);
                } catch (error) {
                    // nothing
                }
            }
            return '-';
        },
        messageDecoded () {
            if (this.messageDecrypted !== '-') {
                return this.hexDecode(this.messageDecrypted.toString(16));
            }
            return '-';
        },
    },
    methods: {
        hexDecode (str) {
            var j;
            var hexes = str.match(/.{1,2}/g) || [];
            var result = '';
            for(j = 0; j<hexes.length; j++) {
                result += String.fromCharCode(parseInt(hexes[j], 16));
            }
            return result;
        }
    },
};
</script>
