import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FooterComponent } from '../../template/footer/footer.component';
import {NgxPrintModule} from 'ngx-print';


import { ChipsModule } from 'primeng/chips';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

declare var utag: any;
declare var window: any;
declare var link: any;
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

  clientName: string | null = '';
  clientCountry: string | null = '';
  country: string = '';
  recommendedProducts: Array<any> = [];
  clientQuestions: Array<any> = [];
  link: string = '';
  Share0: string = '';
  Share1: string = '';
  Share2: string = '';
  Share3: string = '';
  Share4: string = '';

  resID: Array<any> = [];
  resName: Array<any> = [];

  recommendations: { product_id: number[] } = {
    product_id: []
  };
  

  numberProducts: number = 4;

  code: string | null = '';

  values = [];

  sendForm!: FormGroup;
  captcha: string = '';
  captchaIsValid: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder){
              }

  ngOnInit(): void {

    const icon = document.getElementById('ada-entry');

    if (icon) {
      (icon as HTMLElement).style.display = 'none';
    } else {
      console.error('Elemento con id "ada-entry" no encontrado.');
    }

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
    
    const IDs = this.fillProductIdsDirectly(this.resID);
    const Names =this.fillProductNameDirectly(this.resName);

    let utag_data = environment.utagInfo.recommendations;

    this.country = this.clientCountry ?? '';

    utag_data.product_id = IDs;
    utag_data.product_name = Names;
    utag_data.site_country = this.country;
    utag_data.site_currencyCode = this.getCurrencyCode(this.country);
        
    window.utag_data = Object.assign(window.utag_data, utag_data);

     console.log(window.utag_data);   
    setTimeout(() => {
      utag.view(window.utag_data);
    }, 500);

    this.funtionAtribute();
    this.buildForm();
    this.makeCaptcha();

    
  }

  getCurrencyCode(country: string) {
    if (country == 'mx') return 'mxn';
    else if (country == 'gt') return 'gtq';  //guatemala
    else if (country == 'sv') return 'svc';  //el salvador
    else if (country == 'hn') return 'hnl';  //honduras
    else if (country == 'pa') return 'pab';  //panama
    else if (country == 'cr') return 'crc';  //costa rica
    else if (country == 'ar') return 'ars';  //argentina
    else if (country == 'cl') return 'clp';  //chile
    else if (country == 'uy') return 'uyu';  //uruguay
    else if (country == 'co') return 'cop';  //colombia
    else if (country == 've') return 'vef';  //venezuela
    else return '';
  }

  fillProductIdsDirectly(resultado: Array<any>){

    const newProductIds = [this.recommendedProducts[0].itemsku, this.recommendedProducts[1].itemsku, this.recommendedProducts[2].itemsku, this.recommendedProducts[3].itemsku, this.recommendedProducts[4].itemsku, this.recommendedProducts[5].itemsku, this.recommendedProducts[6].itemsku, this.recommendedProducts[7].itemsku];

    resultado = newProductIds;
    
    //console.log(resultado);
    return resultado;

  }

  fillProductNameDirectly(resultado: Array<any>){

    const newProductName = [this.recommendedProducts[0].name, this.recommendedProducts[1].name, this.recommendedProducts[2].name, this.recommendedProducts[3].name, this.recommendedProducts[4].name, this.recommendedProducts[5].name, this.recommendedProducts[6].name, this.recommendedProducts[7].name];

    resultado = newProductName;

    //console.log(resultado);
    return resultado;

  }


  funtionAtribute(){
    try {
      var nodo0 = document.getElementById("comprar1");
      var nodo1 = document.getElementById("comprar2");
      var nodo2 = document.getElementById("comprar3");
      var nodo3 = document.getElementById("comprar4");
      var nodo4 = document.getElementById("comprar5");
      var nodo5 = document.getElementById("comprar6");
      var nodo6 = document.getElementById("comprar7");
      var nodo7 = document.getElementById("comprar8");


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
      var valor10 = document.createAttribute("item-name");
      var valor11 = document.createAttribute("item-name");


      var idvalor0 = document.createAttribute("item-sku");
      var idvalor1 = document.createAttribute("item-sku");
      var idvalor2 = document.createAttribute("item-sku");
      var idvalor3 = document.createAttribute("item-sku");
      var idvalor4 = document.createAttribute("item-sku");
      var idvalor5 = document.createAttribute("item-sku");
      var idvalor6 = document.createAttribute("item-sku");
      var idvalor7 = document.createAttribute("item-sku");

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
      valor10.value = this.recommendedProducts[6].name;
      valor11.value = this.recommendedProducts[7].name;

      idvalor0.value = this.recommendedProducts[0].itemsku;
      idvalor1.value = this.recommendedProducts[1].itemsku;
      idvalor2.value = this.recommendedProducts[2].itemsku;
      idvalor3.value = this.recommendedProducts[3].itemsku;
      idvalor4.value = this.recommendedProducts[4].itemsku;
      idvalor5.value = this.recommendedProducts[5].itemsku;
      idvalor6.value = this.recommendedProducts[6].itemsku;
      idvalor7.value = this.recommendedProducts[7].itemsku;

      valor6.value = 'email';
      valor7.value = 'whatssapp';
      valor8.value = 'copy link';
      valor9.value = 'print';

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
      nodo6?.setAttributeNode(valor10);
      nodo7?.setAttributeNode(valor11);

      nodo0?.setAttributeNode(idvalor0);
      nodo1?.setAttributeNode(idvalor1);
      nodo2?.setAttributeNode(idvalor2);
      nodo3?.setAttributeNode(idvalor3);
      nodo4?.setAttributeNode(idvalor4);
      nodo5?.setAttributeNode(idvalor5);
      nodo6?.setAttributeNode(idvalor6);
      nodo7?.setAttributeNode(idvalor7);

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

    // let recomendado = environment.utagInfo.ShareContinue;
  
    // recomendado[0].share_channel = this.Share1;
    
    //window.utag_data = Object.assign(window.utag_data, recomendado);

    Email.send({
      SecureToken: "3037af90-3a76-4406-84ae-6935e5361872",
      From: "nutrirec@amway.com", // Cambiar ruta de Amway   nutrirec@amway.com

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

  
  sendemails(){
    let recomendado = environment.utagInfo.ShareContinue;

    recomendado.share_channel = this.Share1;

    utag.link(recomendado);
    console.log(recomendado);
  }

  sendWhatsapp(){

  let recomendado = environment.utagInfo.ShareContinue;
  
  recomendado.share_channel = this.Share2;
  
  //window.utag_data = Object.assign(window.utag_data, recomendado);
  
  utag.link(recomendado);
  console.log(recomendado);



      var message = encodeURIComponent('Tus recomendaciones de NUTRILITE™') + encodeURI('\n') +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[0].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[0].linkBuy) +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[1].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[1].linkBuy) +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[2].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[2].linkBuy) +
      encodeURI('\n') + encodeURIComponent(this.recommendedProducts[3].name) + encodeURI('\n') + encodeURIComponent(this.recommendedProducts[3].linkBuy);
      var whatsapp_url = "whatsapp://send?text=" + message;
      
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = whatsapp_url;
        let recomendado = environment.utagInfo.ShareContinue;

        //window.utag_data = Object.assign(window.utag_data, recomendado);
        utag.link(recomendado);
        console.log(recomendado);
        // let share = environment.utagInfo.ShareContinue; 

        // share.share_channel = this.Share2;
      }else{
        try { 
          
          const whatsappWebUrl = `https://web.whatsapp.com/send?text=` + message;
           window.open(whatsappWebUrl , '_blank');

           let recomendado = environment.utagInfo.ShareContinue;

           //window.utag_data = Object.assign(window.utag_data, recomendado);
           utag.link(recomendado);
           console.log(recomendado);

        } catch (error) {
          console.log(error)
        }   

        // let share = environment.utagInfo.ShareContinue; 

        // share.share_channel = this.Share2;

        // utag.link(share);

        // console.log(share);
      }
  }
 
 

  copyUrl(): void {    

    let recomendado = environment.utagInfo.ShareContinue;

    recomendado.share_channel = this.Share3;


    utag.link(recomendado);
    console.log(recomendado);
    // Convertir los IDs a una cadena codificada
    const productIds = this.recommendedProducts.map(product => product.id).join('%');
    const encodedProductIds = encodeURIComponent(productIds);
    const newUrl = `${window.location.origin}/recommendationsShare/${encodedProductIds}`;

    // Copiar la URL al portapapeles
    navigator.clipboard.writeText(newUrl).then(() => {

      alert("LINK DEL RECOMENDADOR A SIDO COPIADO");
      console.error('URL COPIADO: ' + newUrl);

        
    }).catch(err => {
      console.error('Error al copiar la URL: ', err);
    });
  }

  




  printToPDF(){   

    let recomendado = environment.utagInfo.ShareContinue;

    recomendado.share_channel = this.Share4;

    utag.link(recomendado);

    
    console.log(recomendado);

  }
  
  openLink(link: string){

     let recomendado = environment.utagInfo.RecommendationsContinue;

       //window.utag_data = Object.assign(window.utag_data, recomendado);
       window.open(link, '_blank')
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