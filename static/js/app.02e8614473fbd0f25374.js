webpackJsonp([1],{KkEY:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("/5sW"),r=s("hsXF"),n=s.n(r),a={name:"app",data:function(){return{groups:[{id:0,bits:2048,g:5,p:n()("31737565950851398909263463161284348682160315370485844965773040301422571251968505941718690470938845581322223570301250788847757846711414196640122115992079899775925576469834049791069892049442459039594755032328144507551012292392721234041299962841174554138915949840743189769849810005110211091700863374701874429641781652204752412044971475194460466104872288721378802463561148222989139292310654710464375527587651455691574801612790535048720559147146408276929935982236504198974200058608717718254958522101278495251103087932695351017544549131722559365092424715236186537161016690590723535973928948754553674977403028854337787928323")},{id:1,bits:1024,g:5,p:n()("159819981681861685228745855278653361342177204500485825848298672229115311629784471597986506927599905189262585823082607178368059294438282020643902176394840139784260492792114249221517479870700549909554679186273970784084519185341369652140326171466864756385606312523307581517823972926489963055849521932211018272883")},{id:2,bits:512,g:5,p:n()("13110251033247263553178100544755907143695412337941230657908852613728642884000122745282407778361775395517267938133336505686330134925429377897143790925061003")},{id:3,bits:256,g:5,p:n()("81468211328722123306858066832132128014034308233325202328321941526153900552303")},{id:4,bits:128,g:5,p:n()("187696290347723666271064587106794651083")},{id:5,bits:64,g:5,p:n()("11792624869596505283")},{id:6,bits:63,g:5,p:n()("5551110073370691443")},{id:7,bits:62,g:5,p:n()("4016824210885800323")},{id:8,bits:61,g:5,p:n()("2141642793116134103")},{id:9,bits:60,g:5,p:n()("1006583990022390083")},{id:10,bits:59,g:5,p:n()("450682470959344223")},{id:11,bits:58,g:5,p:n()("187673700120276263")},{id:12,bits:57,g:5,p:n()("88477584696606023")},{id:13,bits:56,g:5,p:n()("44332584257073923")},{id:14,bits:55,g:5,p:n()("33323025340796123")},{id:15,bits:54,g:5,p:n()("17154375899054783")},{id:16,bits:53,g:5,p:n()("6573655436658923")},{id:17,bits:52,g:5,p:n()("4189652261201423")},{id:18,bits:51,g:5,p:n()("1952321882389343")},{id:19,bits:50,g:5,p:n()("634424543333843")},{id:20,bits:49,g:5,p:n()("403979840073323")},{id:21,bits:48,g:5,p:n()("141959264544863")},{id:22,bits:47,g:5,p:n()("77441901102023")},{id:23,bits:46,g:5,p:n()("65683755995783")},{id:24,bits:45,g:5,p:n()("21735555496583")},{id:25,bits:44,g:5,p:n()("9360263387243")},{id:26,bits:43,g:5,p:n()("5114337947723")},{id:27,bits:42,g:5,p:n()("2718357190343")},{id:28,bits:41,g:5,p:n()("1437758158583")},{id:29,bits:40,g:5,p:n()("1026632686763")},{id:30,bits:39,g:5,p:n()("489300181583")},{id:31,bits:38,g:5,p:n()("263791390463")},{id:32,bits:37,g:5,p:n()("109620340463")},{id:33,bits:36,g:5,p:n()("36819466703")},{id:34,bits:35,g:5,p:n()("27050549063")},{id:35,bits:34,g:5,p:n()("16030301543")},{id:36,bits:33,g:5,p:n()("6778292363")},{id:37,bits:32,g:5,p:n()("2786909843")},{id:38,bits:31,g:5,p:n()("1261032083")},{id:39,bits:30,g:5,p:n()("854427143")},{id:40,bits:29,g:5,p:n()("398343503")},{id:41,bits:28,g:5,p:n()("247798883")},{id:42,bits:27,g:5,p:n()("112469663")},{id:43,bits:26,g:5,p:n()("36260723")},{id:44,bits:25,g:5,p:n()("18092303")},{id:45,bits:24,g:5,p:n()("16509743")},{id:46,bits:23,g:5,p:n()("5452823")},{id:47,bits:22,g:5,p:n()("4095683")},{id:48,bits:21,g:5,p:n()("1343183")},{id:49,bits:20,g:5,p:n()("652343")},{id:50,bits:19,g:5,p:n()("263723")},{id:51,bits:18,g:5,p:n()("185363")},{id:52,bits:17,g:5,p:n()("119243")},{id:53,bits:16,g:5,p:n()("65063")}],selectedGroup:3,a:!!localStorage.getItem("privateKey")&&n()(localStorage.getItem("privateKey")),showPrivA:!1,r:!1,showPrivR:!1,showEncrypt:!0,message:"",A_receiver:"",messageToDecrypt:"",R_sender:""}},methods:{genRand:function(){return n.a.randBetween(this.p.divide(10),this.p)},genKeyPair:function(){(!1===this.a||confirm("Neues Schlüsselpaar generieren, und altes Schlüsselpaar überschreiben?"))&&(this.a=this.genRand())},hexEncode:function(e){var t,s="";for(t=0;t<e.length;t++)s+=("0"+e.charCodeAt(t).toString(16)).slice(-2);return s},hexDecode:function(e){var t,s=e.match(/.{1,2}/g)||[],i="";for(t=0;t<s.length;t++)i+=String.fromCharCode(parseInt(s[t],16));return i}},computed:{p:function(){return this.groups[this.selectedGroup].p},g:function(){return this.groups[this.selectedGroup].g},bits:function(){return this.groups[this.selectedGroup].bits},A:function(){return!!this.a&&n()(this.g).modPow(this.a,this.p)},R:function(){return!!this.r&&n()(this.g).modPow(this.r,this.p)},messageEncoded:function(){return""!==this.message?n()(this.hexEncode(this.message.trim()),16):""},messageEncrypted:function(){if(""!==this.messageEncoded&&""!==this.A_receiver&&this.r)try{return n()(this.A_receiver.trim()).modPow(this.r,this.p).multiply(this.messageEncoded).mod(this.p)}catch(e){}return"-"},messageDecrypted:function(){if(""!==this.messageToDecrypt&&""!==this.R_sender&&this.a)try{var e=n()(this.messageToDecrypt.trim());return n()(this.R_sender.trim()).modPow(this.p.minus(1).minus(this.a),this.p).multiply(e).mod(this.p)}catch(e){}return"-"},messageDecoded:function(){if("-"===this.messageDecrypted)return"-";this.hexDecode(this.messageDecrypted.toString(16))}},watch:{a:function(){localStorage.setItem("privateKey",this.a.toString())}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("h1",[e._v("Elgamal Calculator")]),e._v(" "),s("h2",[e._v("Fixe Grundparameter")]),e._v(" "),s("p",[e._v("\n    Gruppengrösse ("+e._s(this.groups[this.selectedGroup].bits)+"-bit):\n    "),s("code",{staticClass:"bignum"},[e._v("p = "+e._s(e.p.toString()))]),e._v(" "),s("br"),e._v("\n    Generator: "),s("code",[e._v("g = "+e._s(e.g))])]),e._v(" "),s("h2",[e._v("Schlüsselpaar generieren")]),e._v(" "),s("button",{on:{click:function(t){e.genKeyPair()}}},[e._v("Neuer Privater Schlüssel generieren")]),e._v(" "),s("br"),e._v(" "),!1!==e.a?s("p",[e._v("\n    Privater Schlüssel (a), generierte Zufallszahl:\n    "),s("a",{attrs:{href:"javascript://"},on:{click:function(t){e.showPrivA=!e.showPrivA}}},[e._v(e._s(e.showPrivA?"verstecken":"anzeigen"))]),e._v(" "),s("code",{staticClass:"bignum priv"},[e._v("a =\n      "),e.showPrivA?[e._v(e._s(e.a.toString()))]:[s("i",[e._v("GEHEIM")])]],2),e._v(" "),s("br"),e._v("\n    Öffentlicher Schlüssel (A = g"),s("sup",[e._v("a")]),e._v(" (mod p)), mit dem privaten Schlüssel berechnet:\n    "),s("code",{staticClass:"bignum pub"},[e._v("A = "+e._s(e.A.toString()))])]):e._e(),e._v(" "),!1!==e.a?[s("h2",[s("a",{class:{active:e.showEncrypt},attrs:{href:"javascript://"},on:{click:function(t){e.showEncrypt=!0,e.r=!1}}},[e._v("\n      Mitteilung verschlüsseln\n    ")]),e._v(" "),s("a",{class:{active:!e.showEncrypt},attrs:{href:"javascript://"},on:{click:function(t){e.showEncrypt=!1}}},[e._v("\n      Mitteilung entschlüsseln\n    ")])]),e._v(" "),e.showEncrypt?[e._v("\n    Mitteilung:"),s("br"),e._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"message"}],attrs:{type:"text",size:e.bits/8-1,maxlength:e.bits/8-1},domProps:{value:e.message},on:{input:function(t){t.target.composing||(e.message=t.target.value)}}}),e._v("\n    "+e._s(e.bits/8-1-e.message.length)+" Zeichen übrig\n    "),s("br"),s("br"),e._v("\n    Mitteilung als Zahl:\n    "),s("code",{staticClass:"bignum"},[""!==e.message?[e._v("m = "+e._s(e.messageEncoded.toString()))]:[e._v("-")]],2),e._v(" "),s("br"),e._v(" "),s("br"),e._v("\n    Öffentlicher Schlüssel des Empfängers (A):"),s("br"),e._v(" "),s("code",[e._v("A"),s("sub",[e._v("Empfänger")]),e._v(" =\n    "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.A_receiver,expression:"A_receiver"}],attrs:{type:"text",size:Math.floor(e.bits/3.322)},domProps:{value:e.A_receiver},on:{input:function(t){t.target.composing||(e.A_receiver=t.target.value)}}})]),e._v(" "),s("br"),s("br"),e._v(" "),s("p",[s("button",{on:{click:function(t){e.r=e.genRand()}}},[e._v("Neuer temporärer Schlüssel generieren")]),e._v(" "),s("br"),s("br"),e._v(" "),!1!==e.R?[e._v("\n      Temporärer privater Schlüssel (r), generierte Zufallszahl: \n      "),s("a",{attrs:{href:"javascript://"},on:{click:function(t){e.showPrivR=!e.showPrivR}}},[e._v(e._s(e.showPrivR?"verstecken":"anzeigen"))]),e._v(" "),s("code",{staticClass:"bignum priv"},[e._v("r =\n        "),e.showPrivR?[e._v(e._s(e.a.toString()))]:[s("i",[e._v("GEHEIM")])]],2),e._v(" "),s("br"),e._v("\n      Temporärer öffentlicher Schlüssel (R = g"),s("sup",[e._v("r")]),e._v(" (mod p)), berechnet:\n      "),s("code",{staticClass:"bignum pub"},[e._v("R = "+e._s(e.R.toString()))])]:e._e()],2),e._v("\n    Verschlüsselte Mitteilung (c = A"),s("sup",[e._v("r")]),e._v(" · m (mod p)):\n    "),s("code",{staticClass:"bignum"},[e._v("\n      c = "+e._s(e.messageEncrypted.toString())),s("br")])]:[e._v("\n    Temporärer öffentlicher Schlüssel des Senders (R):"),s("br"),e._v(" "),s("code",[e._v("R"),s("sub",[e._v("Sender")]),e._v(" = "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.R_sender,expression:"R_sender"}],attrs:{type:"text",size:Math.floor(e.bits/3.322)},domProps:{value:e.R_sender},on:{input:function(t){t.target.composing||(e.R_sender=t.target.value)}}})]),e._v(" "),s("br"),s("br"),e._v("\n    Verschlüsselte Mitteilung:"),s("br"),e._v(" "),s("code",[e._v("c = "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.messageToDecrypt,expression:"messageToDecrypt"}],attrs:{type:"text",size:Math.floor(e.bits/3.322)},domProps:{value:e.messageToDecrypt},on:{input:function(t){t.target.composing||(e.messageToDecrypt=t.target.value)}}})]),e._v(" "),s("br"),s("br"),e._v("\n    Entschlüsselte Mitteilung als Zahl (m = R"),s("sub",[e._v("Sender")]),s("sup",[e._v("p - 1 - a")]),e._v(" · c (mod p)):\n    "),s("code",{staticClass:"bignum"},[e._v("m = "+e._s(e.messageDecrypted.toString()))]),e._v(" "),s("br"),e._v("\n    Entschlüsselte (und decodierte) Mitteilung:\n    "),s("code",{staticClass:"bignum"},[e._v(e._s(e.messageDecoded))])]]:e._e()],2)},staticRenderFns:[]},c=s("VU/8")(a,o,!1,function(e){s("KkEY")},null,null).exports;i.a.config.productionTip=!1,new i.a({el:"#app",render:function(e){return e(c)}})}},["NHnr"]);
//# sourceMappingURL=app.02e8614473fbd0f25374.js.map