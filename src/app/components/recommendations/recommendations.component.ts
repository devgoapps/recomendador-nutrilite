import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../template/footer/footer.component';
import {NgxPrintModule} from 'ngx-print';

import { ChipsModule } from 'primeng/chips';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

declare var utag: any;
declare var window: any;
declare var Email: any;

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    FooterComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ChipsModule,
    NgxPrintModule,
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent implements OnInit {
  category: string = '';
  clientName: string | null = '';
  clientCountry: string | null = '';
  country: string  = '';
  recommendedProducts: Array<any> = [];
  clientQuestions: Array<any> = [];
  link: string = '';
  Share0: string = '';
  Share1: string = '';
  Share2: string = '';
  Share3: string = '';
  Share4: string = '';

  numberProducts: number = 4;

  code: string | null = '';
  values = [];
  sendForm!: FormGroup;
  captcha: string = '';
  captchaIsValid: boolean = false;
  isFormSubmitted: boolean = false;

  linknuevo: string = '';
                            
  constructor(private router: Router,private route: ActivatedRoute,
              private fb: FormBuilder){}

  ngOnInit(): void {
    let utag_data = environment.utagInfo.recommendations;

    this.code = sessionStorage.getItem('code');

        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    console.log(window.utag_data);
    setTimeout(() => {
      utag.view(window.utag_data);
    }, 500);

    this.clientName = sessionStorage.getItem('clientName');
    this.clientCountry = sessionStorage.getItem('clientCountry');
    let products = sessionStorage.getItem('recommendedProducts');
    if(products){
      this.recommendedProducts = JSON.parse(products);
      this.recommendedProducts = this.recommendedProducts.map((item) => {
        item.active = false;
        return item;
      });
    } 
    
        // Leer parámetros de consulta
        this.route.queryParams.subscribe(params => {
          const urlActual = window.location.href;
            // Verificar si hay una cadena de consulta en la URL
  const index = urlActual.indexOf('?');
  if (index === -1) {
    return {}; // Devuelve un objeto vacío si no hay cadena de consulta
  }

  const queryString = urlActual.substring(index + 1); // Obtener la cadena de consulta sin el signo de interrogación
  params = new URLSearchParams(queryString); // Crear un objeto URLSearchParams para manejar los parámetros

// Pega la URL copiada
const urlPegada = 'http://localhost:4200/?array=%257B%2522parametro1%2522%253A%2522Daily%2520%252B1%2520-%2520Bem-estar%2522%252C%2522parametro2%2522%253A%2522Esta%2520solu%25C3%25A7%25C3%25A3o%2520contribui%2520para%2520o%2520bom%2520funcionamento%2520e%2520a%2520manuten%25C3%25A7%25C3%25A3o%2520do%2520sistema%2520circulat%25C3%25B3rio.%2520Daily%2520Plus%2520fornece%2520vitaminas%2520e%2520minerais%2520como%2520vitamina%2520B1%252C%2520B2%252C%2520B6%252C%2520%25C3%25A1cido%2520f%25C3%25B3lico%252C%2520vitamina%2520C%252C%2520ferro%252C%2520cobre%2520e%2520zinco%2520que%2520contribuem%2520para%2520a%2520sa%25C3%25BAde%2520do%2520cora%25C3%25A7%25C3%25A3o%252C%2520apoiam%2520o%2520funcionamento%2520normal%2520dos%2520vasos%2520sangu%25C3%25ADneos%252C%2520ajudam%2520a%2520formar%2520e%2520manter%2520as%2520c%25C3%25A9lulas%2520sangu%25C3%25ADneas%2520e%2520a%2520hemoglobina.%2520Os%2520%25C3%25A1cidos%2520%25C3%25B4mega%25203%2520EPA%2520e%2520DHA%2520contribuem%2520para%2520o%2520funcionamento%2520normal%2520do%2520cora%25C3%25A7%25C3%25A3o.%2522%252C%2522parametro3%2522%253A%2522Vitamina%2520E%2522%252C%2522parametro4%2522%253A%2522Suplemento%2520alimentar%2520mastig%25C3%25A1vel%2520com%2520vitamina%2520E%2520e%2520lecitina%252C%2520com%2520um%2520sabor%2520agrad%25C3%25A1vel%2520de%2520mel%2520e%2520noz%2520de%2520%25C3%25A1cer.%2520A%2520vitamina%2520E%2520%25C3%25A9%2520antioxidante%252C%2520ajuda%2520a%2520diminuir%2520os%2520danos%2520celulares%2520causados%2520pelos%2520radicais%2520livres.%2522%252C%2522parametro5%2522%253A%2522Alho%2520Concentrado%2522%252C%2522parametro6%2522%253A%2522Cont%25C3%25A9m%2520alicina%2520e%2520quercetina.%2520Pode%2520contribuir%2520para%2520a%2520redu%25C3%25A7%25C3%25A3o%2520dos%2520n%25C3%25ADveis%2520elevados%2520de%2520gordura%2520no%2520sangue%2520e%2520prevenir%2520a%2520forma%25C3%25A7%25C3%25A3o%2520de%2520dep%25C3%25B3sitos%2520de%2520gordura%2520nas%2520art%25C3%25A9rias.%2520Hipotensor.%2522%252C%2522parametro7%2522%253A%2522Prote%25C3%25ADna%2520Vegetal%2520em%2520P%25C3%25B3%2522%252C%2522parametro8%2522%253A%2522F%25C3%25B3rmula%2520com%2520prote%25C3%25ADna%2520100%2525%2520vegetal%2520de%2520alta%2520qualidade%252C%2520livre%2520de%2520ingredientes%2520geneticamente%2520modificados.%2520A%2520Prote%25C3%25ADna%2520Vegetal%2520em%2520P%25C3%25B3%2520combina%2520propriedades%2520da%2520soja%252C%2520ervilha%2520e%2520trigo.%2520Naturalmente%2520livre%2520de%2520lactose%252C%2520gorduras%2520saturadas%2520e%2520colesterol.%2522%257D#/recommendations';
//const link = this.linknuevo;
// Seleccionar el elemento de lista donde se agregarán los parámetros
const paramsList = document.getElementById('params-list');
// Analiza la URL para obtener los parámetros
const url = new URL(urlActual);
const parametros = url.searchParams.get('array');
const parames = new URLSearchParams(url.search);

if (parametros) {
  // Decodifica y parsea el parámetro de array
  const decodedArray = decodeURIComponent(parametros);
  const array = JSON.parse(decodedArray);
  
      // Iterar sobre los parámetros y agregarlos como elementos de lista

      const decodedValues : Record<string, string> = {}; 
      for (const key in array) {
        if (Object.hasOwnProperty.call(array, key)) {
          const encodedValue = array[key];
          const decodedValue = decodeURIComponent(encodedValue);
          decodedValues[key] = decodedValue;
          const listItem = document.createElement('p');
          listItem.textContent = decodedValues[key];
          paramsList?.appendChild(listItem);
        }
      }

  // Utiliza el array como desees
  console.log('Array encontrado:', array);
} else {
  console.log('No se encontró ningún parámetro de array en la URL.');
}

return
        });
    
    this.funtionAtribute();
    this.buildForm();
    this.makeCaptcha();
  }


  funtionAtribute(){
    try {
      var nodo0 = document.getElementById("comprar1");
      var nodo1 = document.getElementById("comprar2");
      var nodo2 = document.getElementById("comprar3");
      var nodo3 = document.getElementById("comprar4");
      var nodo4 = document.getElementById("comprar5");
      var nodo5 = document.getElementById("comprar6");

      var share1 = document.getElementById("buttonshare1");
      var share2 = document.getElementById("buttonshare2");
      var share3 = document.getElementById("buttonshare3");
      var share4 = document.getElementById("buttonshare4");

      var valor0 = document.createAttribute("item-name");
      var valor1 = document.createAttribute("item-name");
      var valor2 = document.createAttribute("item-name");
      var valor3 = document.createAttribute("item-name");
      var valor4 = document.createAttribute("item-name");
      var valor5 = document.createAttribute("item-name");

      var valor6 = document.createAttribute("item-name");
      var valor7 = document.createAttribute("item-name");
      var valor8 = document.createAttribute("item-name");
      var valor9 = document.createAttribute("item-name");



      valor0.value = this.recommendedProducts[0].name;
      valor1.value = this.recommendedProducts[1].name;
      valor2.value = this.recommendedProducts[2].name;
      valor3.value = this.recommendedProducts[3].name;
      valor4.value = this.recommendedProducts[4].name;
      valor5.value = this.recommendedProducts[5].name;

      valor6.value = 'Correo';
      valor7.value = 'Whatssapp';
      valor8.value = 'Link Recomendador';
      valor9.value = 'Imprimir';

      this.Share1 = valor6.value;
      this.Share2 = valor7.value;
      this.Share3 = valor8.value;
      this.Share4 = valor9.value;


      nodo0?.setAttributeNode(valor0);
      nodo1?.setAttributeNode(valor1);
      nodo2?.setAttributeNode(valor2);
      nodo3?.setAttributeNode(valor3);
      nodo4?.setAttributeNode(valor4);
      nodo5?.setAttributeNode(valor5);

      share1?.setAttributeNode(valor6);
      share2?.setAttributeNode(valor7);
      share3?.setAttributeNode(valor8);
      share4?.setAttributeNode(valor9);


    } catch (error) {
      console.log(error);
    }
  }

  buildForm(){
    this.sendForm = this.fb.group({
      emails: [[], [Validators.required]],
      aditionalNote: [null],
      captcha: [null, [Validators.required]]
    });
  }

  submitForm(){
    this.isFormSubmitted = true;

    if(this.sendForm.invalid || !this.captchaIsValid) return;

    console.log(this.vSend);

    this.sendEmail();
  }

  sendEmail(){
    let toast = document.getElementById('toast');
    let mailBody = document.getElementById('mail2');

    let emails = this.vSend.emails.toString();

    let recomendado = environment.utagInfo.ShareContinue;

    recomendado[0].share_channel = this.Share1;

    //window.utag_data = Object.assign(window.utag_data, recomendado);

    utag.link(recomendado);
    console.log(recomendado);

    Email.send({
      SecureToken: "3037af90-3a76-4406-84ae-6935e5361872",
      From: "brenda@ethos.com.mx", // nutrirec@amway.com  Cambiar ruta de Amway

      //SecureToken: "c646155a-175b-47c7-b135-812a36bc50fc",
      //From: "diego.hernandez.condor@gmail.com", // Cambiar ruta de Amway

      To: emails,
      Subject: "Tus recomendaciones Nutrilite",
      Body: mailBody?.outerHTML,
    }).then((message: any) => {
      console.log(message);

      this.sendForm.reset();
      this.isFormSubmitted = false;
      this.makeCaptcha();

      toast?.classList.add("show");
      setTimeout(() => {
        toast?.classList.remove("show");
      }, 2000)
    });
  }


  sendWhatsapp(){
    
  let recomendado = environment.utagInfo.ShareContinue;

  recomendado[1].share_channel = this.Share2;

  //window.utag_data = Object.assign(window.utag_data, recomendado);

  utag.link(recomendado);
  console.log(recomendado);


      var message = encodeURIComponent('As suas recomendações NUTRILITE™') + encodeURI('\n') +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[0].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[0].linkBuy) +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[1].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[1].linkBuy) +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[2].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[2].linkBuy) +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[3].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[3].linkBuy);
      var whatsapp_url = "whatsapp://send?text=" + message;
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = whatsapp_url;

      }else{

        try { 

          const whatsappWebUrl = `https://web.whatsapp.com/send?text=` + message;
           window.open(whatsappWebUrl , '_blank');

        } catch (error) {
          console.log(error)
        }   

        // let share = environment.utagInfo.ShareContinue; 

        // share.share_channel = this.Share2;

        // utag.link(share);

        // console.log(share);

      }
  }

  linkcopiado(){
   
     // 1. Obtén la URL actual
//const currentUrl = window.location.href;


// 3. Construye un objeto con los parámetros
const parametros = {
  parametro1: this.recommendedProducts[0].name,
  parametro2: this.recommendedProducts[0].whyIsRecommended,
  parametro3: this.recommendedProducts[1].name,
  parametro4: this.recommendedProducts[1].whyIsRecommended,
  parametro5: this.recommendedProducts[2].name,
  parametro6: this.recommendedProducts[2].whyIsRecommended,
  parametro7: this.recommendedProducts[3].name,
  parametro8: this.recommendedProducts[3].whyIsRecommended,
  // Aquí puedes agregar más parámetros si es necesario
};

// 4. Convierte el objeto en una cadena de consulta
const queryString = new URLSearchParams(parametros).toString();

// 5. Combina la cadena de consulta con la URL parseada
//const nuevaUrl = `?${currentUrl.search.slice(1)}&${queryString}`;

//const link = currentUrl + nuevaUrl;


const arrayString = JSON.stringify(parametros);
const encodedArray = encodeURIComponent(arrayString);
const currentUrl = new URL(window.location.href);
currentUrl.searchParams.set('array', encodedArray);

// Actualiza la URL en la barra de direcciones del navegador
window.history.pushState({}, '', currentUrl.toString());

// Copia la URL resultante al portapapeles
const nuevaUrl = currentUrl.toString(); // Obtiene la URL actualizada después de pushState
this.linknuevo = nuevaUrl;
navigator.clipboard.writeText(nuevaUrl)
  .then(() => {
    console.log('URL copiada al portapapeles:', nuevaUrl);
  })
  .catch((error) => {
    console.error('Error al copiar la URL:', error);
  });

  }

  CopyLink(){
    let recomendado = environment.utagInfo.ShareContinue;

    recomendado[2].share_channel = this.Share3;
    
    //window.utag_data = Object.assign(window.utag_data, recomendado);
    
    utag.link(recomendado);
    console.log(recomendado);


      var message =     "%" + 
                        encodeURIComponent(this.recommendedProducts[0].id)  + "%" +
                        encodeURIComponent(this.recommendedProducts[1].id) + "%" +
                        encodeURIComponent(this.recommendedProducts[2].id)+ "%" +
                        encodeURIComponent(this.recommendedProducts[3].id);
    
        var copyHref = window.location.href + "/?text=" + message;

    try{
      navigator.clipboard.writeText(copyHref); 
      alert("El enlace a sido copiado");
    }
    catch{
      alert("El enlace NO se copio correctamente");
    }

  }

  printToPDF(){

    let recomendado = environment.utagInfo.ShareContinue;

    recomendado[3].share_channel = this.Share4;

    //window.utag_data = Object.assign(window.utag_data, recomendado);

    utag.link(recomendado);
    console.log(recomendado);

}
  
  openLink(link: string){
    let recomendado = environment.utagInfo.RecommendationsContinue;

    window.open(link, '_blank');

    utag.link(recomendado);
    console.log(recomendado);
  }
  /*
  Secure token
  c646155a-175b-47c7-b135-812a36bc50fc

  Nombre de usuario
  diego.hernandez.condor@gmail.com
  
  Contraseña
  9F7FE47F902F7F5A87321E28C2571FB05BC0
  
  Servidor
  smtp.elasticemail.com
  
  Puerto
  2525
  */


    /*
  Secure token
  c646155a-175b-47c7-b135-812a36bc50fc
  f374c7fd-3795-49cd-b789-67042c1c5e5e
  3037af90-3a76-4406-84ae-6935e5361872
  288B302B23A8A6B58CC0297142A99B585ACE2938FBCABE718BC61C7C43C50524DFBC2C4538ED466CBBA65E8823D55FEE

  Nombre de usuario
  nutrirec@amway.com
  brendacavazos14@outlook.es
  Contraseña
DBB6AD785D81E60B33707AD39F5235A97A44
  
  Servidor
  smtp.elasticemail.com
  
  Puerto
  2525
  */

  validateCaptcha(){
    if(this.vSend.captcha == this.captcha){
      this.captchaIsValid = true;
    }else {
      this.captchaIsValid = false;
    }
  }

  addEmail(event: any){
    if(event.value && !event.value.includes('@')){
      this.vSend.emails.splice(this.vSend.emails.length - 1, 1);
      this.vSend.emails = [...this.vSend.emails];
    }
  }

  makeCaptcha() {
    this.captchaIsValid = false;

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 5) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.captcha = result;
  }

  startQuestionnaire(){
    this.router.navigate(['start-questionnaire']);
  }


  get vSend(){ return this.sendForm.value; }

  get cSend(){ return this.sendForm.controls; }

}


/**
 * 
 let body = ` 
      <div id="mail" style="display: flex; align-items: center; justify-content: center; background: #fff;">

        <div style="width: 100%; background: #fff;">
          <h1 style="color: green; text-align: center; font-size: 3rem;">Tus recomendaciones de Nutrilite</h1>

          <p style="color: #444;">Aqui estan tus recomendaciones de productos Nutrilite personalizadas según tu evaluación de suplementos recientemente completada.</p>`; 

    let products = `<div style="border: 1px solid #ccc;">`;
    for (let i = 0; i < this.recommendedProducts.length; i++) {
      //let img = await this.imageUrlToBase64('');
        //console.log(img)  
      products = products + 
        `<div style="padding: 1rem; border: 1px solid #ccc; display: flex; align-items: center; gap: 1rem; border-radius: 10px; margin-bottom: 1rem;">
            <img src="${ this.recommendedProducts[i].img }" draggable="false" style="width: 120px;" alt="">
            <div>
                <span style="margin-bottom: .5rem; font-size: 2.2rem; display: block;"><b>${ this.recommendedProducts[i].name }</b></span>
                <span style="font-size: 1rem; display: block;"><b>¿Por qué recomendamos esto?</b></span>
                <span style="font-size: 1rem; margin-bottom: 2rem; display: block;" >${ this.recommendedProducts[i].whyIsRecommended }</span>
                <button style="margin: 0; padding: 0.5rem 2.5rem; background-color: green; color: #fff; border-radius: 50px; outline: none; border: none; display: block;">
                    Comprar ahora
                </button>
                <small style="margin-top: 2rem; color: green; font-size: 1rem;">Consulta la disponibilidad de productos en tu país</small>
            </div>
        </div>`; 
    }
    products = products + `</div>`;
    body = body + products;
    
    body = body + 
    `<div>
      <p style="color: #444;" >Notas adicionales: ${ this.vSend.aditionalNote }</p>
    </div>`;


    body = body + `</div></div>`;

 */