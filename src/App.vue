<template>
  <div id="app">
    <h1>Elgamal Calculator</h1>
    <h2>Fixe Grundparameter</h2>
    <p>
      Gruppengrösse ({{this.groups[this.selectedGroup].bits}}-bit):
      <code class="bignum">p = {{p.toString()}}</code>
      <br>
      Generator: <code>g = {{g.toString()}}</code>
    </p>

    <h2>Schlüsselpaar generieren</h2>
    <button @click="genKeyPair()">Neuer Privater Schlüssel generieren</button>
    <br>
    <p v-if="a !== false">
      Privater Schlüssel (a), generierte Zufallszahl:
      <a @click="showPrivA = !showPrivA" href="javascript://">{{showPrivA? 'verstecken': 'anzeigen'}}</a>
      <code class="bignum priv">a =
        <template v-if="showPrivA">{{a.toString()}}</template>
        <template v-else><i>GEHEIM</i></template>
      </code>
      <br>
      Öffentlicher Schlüssel (A = g<sup>a</sup> (mod p)), mit dem privaten Schlüssel berechnet:
      <code class="bignum pub">A = {{A.toString()}}</code>
    </p>

    <template v-if="a !== false">
      <h2>
        <a href="javascript://" :class="{active: showEncrypt}" @click="showEncrypt = true">
          Mitteilung verschlüsseln
        </a>
        <a href="javascript://" :class="{active: !showEncrypt}" @click="showEncrypt = false">
          Mitteilung entschlüsseln
        </a>
      </h2>
      <encrypt v-if="showEncrypt" :p="p" :g="g" :bits="bits"/>
      <decrypt v-else :p="p" :g="g" :bits="bits" :a="a"/>
    </template>
  </div>
</template>

<script>
import bigInt from 'big-integer';
import Encrypt from './components/Encrypt';
import Decrypt from './components/Decrypt';

export default {
    name: 'app',
    data () {
        return {
            groups: [
                {id: 0, bits: 2048, g: 5, p: bigInt('31737565950851398909263463161284348682160315370485844965773040301422571251968505941718690470938845581322223570301250788847757846711414196640122115992079899775925576469834049791069892049442459039594755032328144507551012292392721234041299962841174554138915949840743189769849810005110211091700863374701874429641781652204752412044971475194460466104872288721378802463561148222989139292310654710464375527587651455691574801612790535048720559147146408276929935982236504198974200058608717718254958522101278495251103087932695351017544549131722559365092424715236186537161016690590723535973928948754553674977403028854337787928323')},
                {id: 1, bits: 1024, g: 5, p: bigInt('159819981681861685228745855278653361342177204500485825848298672229115311629784471597986506927599905189262585823082607178368059294438282020643902176394840139784260492792114249221517479870700549909554679186273970784084519185341369652140326171466864756385606312523307581517823972926489963055849521932211018272883')},
                {id: 2, bits: 512, g: 5, p: bigInt('13110251033247263553178100544755907143695412337941230657908852613728642884000122745282407778361775395517267938133336505686330134925429377897143790925061003')},
                {id: 3, bits: 256, g: 5, p: bigInt('81468211328722123306858066832132128014034308233325202328321941526153900552303')},
                {id: 4, bits: 128, g: 5, p: bigInt('187696290347723666271064587106794651083')},
                {id: 5, bits: 64, g: 5, p: bigInt('11792624869596505283')},
            ],
            selectedGroup: 3,
            a: localStorage.getItem('privateKey') ?
                bigInt(localStorage.getItem('privateKey')) : false,
            showPrivA: false,
            showEncrypt: true,
        };
    },
    computed: {
        p () { return this.groups[this.selectedGroup].p; },
        g () { return bigInt(this.groups[this.selectedGroup].g); },
        bits () { return this.groups[this.selectedGroup].bits; },
        A () {
            if (this.a) {
                return bigInt(this.g).modPow(this.a, this.p);
            }
            return false;
        },
    },
    methods: {
        genKeyPair () {
            var confirmText = 'Neues Schlüsselpaar generieren, und altes Schlüsselpaar überschreiben?';
            if (this.a === false || confirm(confirmText)) {
                this.a = bigInt.randBetween(this.p.divide(10), this.p);
                localStorage.setItem('privateKey', this.a.toString());
            }
        },
    },
    components: {
        Encrypt,
        Decrypt,
    },
};
</script>

<style>
#app {
  font-family: sans-serif;
}
h2 {
    margin-top: 60px;
    border-bottom: 3px solid gray;
}
h2 a {
    color: black;
    border: 3px solid gray;
    padding: 5px;
    margin-left: 5px;
    padding-bottom: 0px;
    text-decoration: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    outline: 0;
}

h2 a:not(.active) {
    background-color: lightgray;
}
h2 a.active {
    border-bottom: 3px solid white;
}

code {
    font-size: 11pt;
    padding: 1px 4px;
    background-color: lightgray;
    border-radius: 5px;
}
code.bignum {
    word-wrap: break-word;
    display: block;
}
code.priv {
    color: red;
}
code.pub {
    color: green;
}
code input {
    font-family: monospace;
}
</style>
