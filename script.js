const word_el = document.getElementById("word");
const popup = document.getElementById("popup-container");
const message_el = document.getElementById("success-message");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");  // birden cok items class oldugu için querySelectorAll kullanilir
const PlayAgainBtn = document.querySelector("#play-again");

const correctLetters = [];
const wrongLetters = [];


let selectedWord = getRandomWord();  // buradan fonksiyon icerisinden kelime alındı pyhton javascript vs. vs...

function getRandomWord() {

    const words = ["python", "javascript",  "java", "html", "vida", "araba", "cicek", "ders", "kitap"];
    return words[Math.floor(Math.random() * words.length)]; // math.random 0-1 arası doner
    // words.length 4'dur 0-1 arası deger ile carpılır  math floor kucuk sayi yuvarlama islemi yapar
};


// NOT: includes metodu true veya false donmektedir 
// Bu fonksiyon harf ekleme işlemi yapar, harflerin hepsi giris yaptysa ekrana tebrikler ciktisi verir
function displayWord() {
    

    let lettersHTML = "";  // bos let tanimlandi

    for (let i = 0; i < selectedWord.length; i++) {   
        /*  correct letter icerisindeki harfler selectedWord[i] icinde var mı true ise selectedWord[i] yap yoksa "" ile bos gec  */
        lettersHTML += 
        `                   
        <div class="letter">${correctLetters.includes(selectedWord[i]) ? selectedWord[i] : ""}</div>
        
        `; 

    }

    // word_innerHTML ile aktarildi en son
    word_el.innerHTML = lettersHTML;


    // bu kısım direkt ezeber
    // console.log(word_el.innerText);  konsolda girilmiş doğru harfleri alt alta yazar 
    // alt alta yazmaması direkt yan yana yazmasi için bu sekilde tanımlandı
    const w = word_el.innerText.replace(/\n/g,"");   

    // eger w yani ekranda girilmis olan harfler selectedWord kelimem ile direkt uyusuyorsa if blok calıstır
    if(w === selectedWord) {
        popup.style.display = "flex";   // yapılan popup kutusu css tanimlandi display none oldugu için direkt ekranda gozukmuyor
        message_el.innerHTML = `Tebrikler Kazandinz;`   // eger uyusursa kelime ve harfler flex yapılarak ekranda gozukur
    }



    //! gelen kelime konsolda kontrol etmek icin yazildi
    //! console.log(selectedWord)
}



// keydown event çalıştıgında eger kosul saglıyorsa fonksiyon calisir
function updateWrongLetters() {
    // DOM içerisine ilk olarak h4 baslık atanir
    wrongLetters_el.innerHTML = `  
      <h4>Hatalı Harfler</h4>
    `;
    
    // bu kısım hatali harfler ekran gosterilmesi icin vardır
    // i wrongletter dizininden kucuk oldugu surece devam eder 
    // bu dongu icerisinde DOM içerisine span ile letterlar aktarilir
    for (let i = 0; i < wrongLetters.length; i++) {
      wrongLetters_el.innerHTML += `
        <span style="font-size:20px">${wrongLetters[i] + "  "}</span>
      `;
    }

    items.forEach((item, index) => {

        const errorCount = wrongLetters.length

        if(index < errorCount) {
            item.style.display = "block";
        }   
        else {
            item.style.display = "none"
        }

    });


    if(wrongLetters.length === items.length) {
        popup.style.display = "flex";   
        message_el.innerHTML = `Maalesef Kaybettiniz;`
    }

}
   


PlayAgainBtn.addEventListener("click", function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = `none`;
});





// Not: her harfin bir keycode degeri vardı a 65 iken z 90'dır türkçe harfler ş,ç gibi
// bu aralikta degildir
// window bir nesnedir uzerinde islem genel olarak yapilir
// keydown girilen klavyede herhangi bir tus icin eventdir
window.addEventListener("keydown", function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90) {  // eger bu aralikta vermeseydim ctrl bile bassam işlem yapacakti
        //! console.log(e.key); // key degeri bastığım harfdir
        //! console.log(e.keyCode); //keycode basilan harfin kodudur

        const letter = e.key;  // klavye bastıgım harf letter atandi

        // selected word letter include içerir mi içeriyorsa true don
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {  // correct içerisinde letter yoksa (!) false ise if blok don
                correctLetters.push(letter);   // bastıgım tus letter push ile correct dizin aktarilir
                displayWord();   // basilan tus display fonksiyon ile ekrana yansitilir
                console.log("Dogru harf girisi...")
            }
            else {          
                // girilen ayni hard icin kullanici uyarma
                console.log("Bu harf eklendi, tekrar giriniz...");
            }
        }
        else {                                   // includes letter iceriyorsa true doner ama ! var false doner
            if(!wrongLetters.includes(letter)) { // harf yok ise true doner kısacası buna gore blok islemleri yapilir
                wrongLetters.push(letter)
                console.log("Hatali Harf...")
                updateWrongLetters();
            }
        }
    }
});





displayWord();




