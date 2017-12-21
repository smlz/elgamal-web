<template>
  <div id="app">
    <h1>Elgamal Calculator</h1>
    <h2>Fixe Grundparameter</h2>
    <!--label for="group">Group</label>
    <select name="group" id="group" v-model="selectedGroup">
      <option v-for="option in groups" v-bind:key="option.id" v-bind:value="option.id">
        {{option.id + 1}}. p: {{option.bits}}-bit-prime, g: {{option.g}}
      </option>
    </select-->
    <p>
    Gruppengrösse ({{this.groups[this.selectedGroup].bits}}-bit):
    <code class="bignum">p = {{p.toString()}}</code>
    <br>
    Generator: <code>g = {{g}}</code>
    </p>

    <h2>Schlüsselpaar generieren</h2>
    <button @click="genKeyPair()">Neuer Privater Schlüssel generieren</button>
    <br>
    <p v-if="a !== false">
    Privater Schlüssel (a), generierte Zufallszahl: <a @click="showPrivA = !showPrivA" href="javascript://">{{showPrivA? 'verstecken': 'anzeigen'}}</a>
    <code class="bignum priv">a = <template v-if="showPrivA">{{a.toString()}}</template><template v-else><i>GEHEIM</i></template></code>
    <br>
    Öffentlicher Schlüssel (A = g<sup>a</sup> (mod p)), mit dem privaten Schlüssel berechnet:
    <code class="bignum pub">A = {{A.toString()}}</code>
    </p>

    <template v-if="a !== false">
    
    <h2>
        <a href="javascript://" :class="{active: showEncrypt}" @click="showEncrypt = true; r = false;">Mitteilung verschlüsseln</a>
        <a href="javascript://" :class="{active: !showEncrypt}" @click="showEncrypt = false">Mitteilung entschlüsseln</a>
    </h2>
    
    <template v-if="showEncrypt">
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
    <code>A<sub>Empfänger</sub> = <input type="text" v-model="A_receiver" :size="Math.floor(bits/3.322)"></code>
    <br><br>
    <p >
        <button @click="r = genRand()">Neuer temporärer Schlüssel generieren</button>    
        <br><br>
        <template v-if="R !== false">
        Temporärer privater Schlüssel (r), generierte Zufallszahl: 
        <a @click="showPrivR = !showPrivR; false" href="javascript://">{{showPrivR? 'verstecken': 'anzeigen'}}</a>
        <code class="bignum priv">r = <template v-if="showPrivR">{{a.toString()}}</template><template v-else><i>GEHEIM</i></template></code>
        <br>
        Temporärer öffentlicher Schlüssel (R = g<sup>r</sup> (mod p)), berechnet:
        <code class="bignum pub">R = {{R.toString()}}</code>
        </template>
    </p>
    Verschlüsselte Mitteilung (c = A<sup>r</sup> * m (mod p)):
    <code class="bignum">
        c = {{messageEncrypted.toString()}}<br>
    </code>
    </template>

    <template v-else>
    Temporärer öffentlicher Schlüssel des Senders (R):<br>
    <code>R<sub>Sender</sub> = <input type="text" v-model="R_sender" :size="Math.floor(bits/3.322)"></code>
    <br><br>
    Verschlüsselte Mitteilung:<br>
    <code>c = <input type="text" v-model="messageToDecrypt" :size="Math.floor(bits/3.322)"></code>
    <br><br>
    Entschlüsselte Mitteilung als Zahl (m = R<sub>Sender</sub><sup>p - 1 - a</sup> * c (mod p)):
    <code class="bignum">m = {{messageDecrypted.toString()}}</code>
    <br>
    Entschlüsselte Mitteilung:
    <code class="bignum">{{messageDecrypted === '-' ? '-' : hexDecode(messageDecrypted.toString(16))}}</code>
    </template>
    </template>
  </div>
</template>

<script>
import bigInt from 'big-integer';

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
                {id: 6, bits: 63, g: 5, p: bigInt('5551110073370691443')},
                {id: 7, bits: 62, g: 5, p: bigInt('4016824210885800323')},
                {id: 8, bits: 61, g: 5, p: bigInt('2141642793116134103')},
                {id: 9, bits: 60, g: 5, p: bigInt('1006583990022390083')},
                {id: 10, bits: 59, g: 5, p: bigInt('450682470959344223')},
                {id: 11, bits: 58, g: 5, p: bigInt('187673700120276263')},
                {id: 12, bits: 57, g: 5, p: bigInt('88477584696606023')},
                {id: 13, bits: 56, g: 5, p: bigInt('44332584257073923')},
                {id: 14, bits: 55, g: 5, p: bigInt('33323025340796123')},
                {id: 15, bits: 54, g: 5, p: bigInt('17154375899054783')},
                {id: 16, bits: 53, g: 5, p: bigInt('6573655436658923')},
                {id: 17, bits: 52, g: 5, p: bigInt('4189652261201423')},
                {id: 18, bits: 51, g: 5, p: bigInt('1952321882389343')},
                {id: 19, bits: 50, g: 5, p: bigInt('634424543333843')},
                {id: 20, bits: 49, g: 5, p: bigInt('403979840073323')},
                {id: 21, bits: 48, g: 5, p: bigInt('141959264544863')},
                {id: 22, bits: 47, g: 5, p: bigInt('77441901102023')},
                {id: 23, bits: 46, g: 5, p: bigInt('65683755995783')},
                {id: 24, bits: 45, g: 5, p: bigInt('21735555496583')},
                {id: 25, bits: 44, g: 5, p: bigInt('9360263387243')},
                {id: 26, bits: 43, g: 5, p: bigInt('5114337947723')},
                {id: 27, bits: 42, g: 5, p: bigInt('2718357190343')},
                {id: 28, bits: 41, g: 5, p: bigInt('1437758158583')},
                {id: 29, bits: 40, g: 5, p: bigInt('1026632686763')},
                {id: 30, bits: 39, g: 5, p: bigInt('489300181583')},
                {id: 31, bits: 38, g: 5, p: bigInt('263791390463')},
                {id: 32, bits: 37, g: 5, p: bigInt('109620340463')},
                {id: 33, bits: 36, g: 5, p: bigInt('36819466703')},
                {id: 34, bits: 35, g: 5, p: bigInt('27050549063')},
                {id: 35, bits: 34, g: 5, p: bigInt('16030301543')},
                {id: 36, bits: 33, g: 5, p: bigInt('6778292363')},
                {id: 37, bits: 32, g: 5, p: bigInt('2786909843')},
                {id: 38, bits: 31, g: 5, p: bigInt('1261032083')},
                {id: 39, bits: 30, g: 5, p: bigInt('854427143')},
                {id: 40, bits: 29, g: 5, p: bigInt('398343503')},
                {id: 41, bits: 28, g: 5, p: bigInt('247798883')},
                {id: 42, bits: 27, g: 5, p: bigInt('112469663')},
                {id: 43, bits: 26, g: 5, p: bigInt('36260723')},
                {id: 44, bits: 25, g: 5, p: bigInt('18092303')},
                {id: 45, bits: 24, g: 5, p: bigInt('16509743')},
                {id: 46, bits: 23, g: 5, p: bigInt('5452823')},
                {id: 47, bits: 22, g: 5, p: bigInt('4095683')},
                {id: 48, bits: 21, g: 5, p: bigInt('1343183')},
                {id: 49, bits: 20, g: 5, p: bigInt('652343')},
                {id: 50, bits: 19, g: 5, p: bigInt('263723')},
                {id: 51, bits: 18, g: 5, p: bigInt('185363')},
                {id: 52, bits: 17, g: 5, p: bigInt('119243')},
                {id: 53, bits: 16, g: 5, p: bigInt('65063')},
            ],
            selectedGroup: 3,
            a: localStorage.getItem('privateKey') ?
                bigInt(localStorage.getItem('privateKey')) : false,
            showPrivA: false,
            r: false,
            showPrivR: false,
            showEncrypt: true,
            message: '',
            A_receiver: '',
            messageToDecrypt: '',
            R_sender: '',
        };
    },
    methods: {
        genRand () {
            return bigInt.randBetween(this.p.divide(10), this.p);
        },
        genKeyPair () {
            if (this.a === false || confirm('Neues Schlüsselpaar generieren, und altes Schlüsselpaar überschreiben?')) {
                this.a = this.genRand();
            }
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
        hexDecode (str) {
            var j;
            var hexes = str.match(/.{1,2}/g) || [];
            var result = '';
            for(j = 0; j<hexes.length; j++) {
                result += String.fromCharCode(parseInt(hexes[j], 16));
            }
            return result;
        },

    },

    computed: {
        A () {
            if (this.a) {
                return bigInt(this.g).modPow(this.a, this.p);
            } else {
                return false;
            }
        },
        R () {
            if (this.r) {
                return bigInt(this.g).modPow(this.r, this.p);
            } else {
                return false;
            }
        },
        p () {
            return this.groups[this.selectedGroup].p;
        },
        g () {
            return this.groups[this.selectedGroup].g;
        },
        bits () {
            return this.groups[this.selectedGroup].bits;
        },
        messageEncoded () {
            if (this.message !== '') {
                return bigInt(this.hexEncode(this.message), 16);
            }
            return '';
        },
        messageEncrypted () {
            if (this.messageEncoded !== '' && this.A_receiver !== '' && this.r) {
                try {
                    var messageEncoded = bigInt(this.hexEncode(this.message), 16);
                    return bigInt(this.A_receiver).modPow(this.r, this.p)
                            .multiply(messageEncoded).mod(this.p);
                } catch (error) {
                    // nothing
                }
            }
            return '-';
        },
        messageDecrypted () {
            if (this.messageToDecrypt !== '' && this.R_sender !== '' && this.a) {
                try {
                    var c = bigInt(this.messageToDecrypt);
                    return bigInt(this.R_sender)
                            .modPow(this.p.minus(1).minus(this.a), this.p)
                            .multiply(c).mod(this.p);
                } catch (error) {
                    // nothing
                }
            }
            return '-';
        },
    },
    watch: {
        a () {
            localStorage.setItem('privateKey', this.a.toString());
        }
    }
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
