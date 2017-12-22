<template>
  <div>
      Mitteilung:<br>
      <input type="text" v-model="message" :size="bits/8 - 1" :maxlength="bits/8 - 1">
      {{(bits/8-1) - message.length}} Zeichen übrig
      <br><br>
      Mitteilung als Zahl:
      <code class="bignum">
        <template v-if="message !== ''">m = {{messageEncoded.toString()}}</template>
        <template v-else>-</template>
      </code>
      <br>
      <br>
      Öffentlicher Schlüssel des Empfängers (A):<br>
      <code>A<sub>Empfänger</sub> =
      <input type="text" v-model="A_receiver" :size="Math.floor(bits/3.322)"></code>
      <br><br>
      <p>
        <button @click="genRand_r()">Neuer temporärer Schlüssel generieren</button>    
        <br><br>
        <template v-if="r !== false">
        Temporärer privater Schlüssel (r), generierte Zufallszahl: 
        <a @click="showPrivR = !showPrivR;" href="javascript://">{{showPrivR? 'verstecken': 'anzeigen'}}</a>
        <code class="bignum priv">r =
          <template v-if="showPrivR">{{r.toString()}}</template>
          <template v-else><i>GEHEIM</i></template>
        </code>
        <br>
        Temporärer öffentlicher Schlüssel (R = g<sup>r</sup> (mod p)), berechnet:
        <code class="bignum pub">R = {{R.toString()}}</code>
        </template>
      </p>
      Verschlüsselte Mitteilung (c = A<sup>r</sup> · m (mod p)):
      <code class="bignum">
        c = {{messageEncrypted.toString()}}<br>
      </code>
    </div>
</template>

<script>
import bigInt from 'big-integer';

export default {
    name: 'Encrypt',
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
    },
    data () {
        return {
            message: '',
            r: false,
            showPrivR: false,
            A_receiver: '',
        };    
    },
    computed: {
        R () {
            if (this.r) {
                return this.g.modPow(this.r, this.p);
            }
            return '-';
        },
        messageEncoded () {
            if (this.message.trim() !== '') {
                return bigInt(this.hexEncode(this.message.trim()), 16);
            }
            return '-';
        },
        messageEncrypted () {
            if (this.messageEncoded !== '-' && this.A_receiver.trim() !== ''
                && this.r) {
                try {
                    return bigInt(this.A_receiver.trim()).modPow(this.r, this.p)
                            .multiply(this.messageEncoded).mod(this.p);
                } catch (error) {
                    // nothing
                }
            }
            return '-';
        },
    },    
    methods: {
        genRand_r () {
            this.r = bigInt.randBetween(this.p.divide(10), this.p);
            this.showPrivR = false;
        },
        hexEncode (str) {
            var hex, i;
            var result = '';
            for (i=0; i<str.length; i++) {
                hex = str.charCodeAt(i).toString(16);
                result += ('0'+hex).slice(-2);
            }
            return result;
        },
    }
};
</script>

<style>

</style>
