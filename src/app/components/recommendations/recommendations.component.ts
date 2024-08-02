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

       
    setTimeout(() => {
      utag.view(window.utag_data);
    }, 500);

    this.buildForm();
    this.makeCaptcha();
    console.log(this.country); 
    
  }

  ngAfterViewInit() {
    this.functionatribute2();
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
    // Inicializa el arreglo para almacenar los itemsku
    const newProductIds: string[] = [];
  
    // Recorre los primeros 8 productos (ajustado a 0-7 para evitar índice fuera de rango)
    for (let i = 0; i < 8; i++) {
      const product = this.recommendedProducts[i];
      if (product) {
        // Añade el itemsku del producto al arreglo
        newProductIds.push(product.itemsku);
      } else {
        // Si el producto no existe, salimos del bucle
        resultado = newProductIds;
        return resultado;
      }
    }
  
    // Asigna el arreglo completo a resultado
    resultado = newProductIds;
    //console.log( resultado);
    // Devuelve el resultado actualizado
    return resultado;
    }
  
    fillProductNameDirectly(resultado: Array<any>){
  
    // Inicializa el arreglo para almacenar los itemsku
    const newProductNames: string[] = [];
  
    // Recorre los primeros 8 productos (ajustado a 0-7 para evitar índice fuera de rango)
    for (let i = 0; i < 8; i++) {
      const product = this.recommendedProducts[i];
      if (product) {
        // Añade el itemsku del producto al arreglo
        newProductNames.push(product.name);
      } else {
        // Si el producto no existe, salimos del bucle
        resultado = newProductNames;
        return resultado;
      }
    }
  
    // Asigna el arreglo completo a resultado
    resultado = newProductNames;
    //console.log( resultado);
    // Devuelve el resultado actualizado
    return resultado;
  
  
    }


    toggleCard() {
      const showfront = document.getElementById('Showfront');
      const showback = document.getElementById('Showback');

      if (showfront && showback) {

            // Toggle the `active` state
            this.recommendedProducts[0].active = !this.recommendedProducts[0].active;

            // Update visibility based on the `active` state
            if (this.recommendedProducts[0].active) {
                showfront.style.display = 'none';
                showback.style.display = 'block';
            } else {
                showfront.style.display = 'block';
                showback.style.display = 'none';
            }         

      }
  }
    toggleCard2() {
      const showfront = document.getElementById('Showfront2');
      const showback = document.getElementById('Showback2');

      if (showfront && showback) {

            // Toggle the `active` state
            this.recommendedProducts[1].active = !this.recommendedProducts[1].active;

            // Update visibility based on the `active` state
            if (this.recommendedProducts[1].active) {
                showfront.style.display = 'none';
                showback.style.display = 'block';
            } else {
                showfront.style.display = 'block';
                showback.style.display = 'none';
            }         

      }
  }
    toggleCard3() {
      const showfront = document.getElementById('Showfront3');
      const showback = document.getElementById('Showback3');

      if (showfront && showback) {

            // Toggle the `active` state
            this.recommendedProducts[2].active = !this.recommendedProducts[2].active;

            // Update visibility based on the `active` state
            if (this.recommendedProducts[2].active) {
                showfront.style.display = 'none';
                showback.style.display = 'block';
            } else {
                showfront.style.display = 'block';
                showback.style.display = 'none';
            }         

      }
  }
    toggleCard4() {
      const showfront = document.getElementById('Showfront4');
      const showback = document.getElementById('Showback4');

      if (showfront && showback) {

            // Toggle the `active` state
            this.recommendedProducts[3].active = !this.recommendedProducts[3].active;

            // Update visibility based on the `active` state
            if (this.recommendedProducts[3].active) {
                showfront.style.display = 'none';
                showback.style.display = 'block';
            } else {
                showfront.style.display = 'block';
                showback.style.display = 'none';
            }         

      }
  }

  functionatribute2() {
    try {
      // Obtén todos los botones y atributos de compartir
      const nodes: any[] = [];
      for (let i = 1; i <= 8; i++) {
        const node = document.getElementById(`comprar${i}`);
        nodes.push(node);
      }

      const shares = [];
      for (let i = 1; i <= 4; i++) {
        const share = document.getElementById(`buttonshare${i}`);
        shares.push(share);
      }

    // Agrega atributos a los botones de compra
    for (let i = 0; i <= 8; i++) {
      const product = this.recommendedProducts[i];
      const node = nodes[i - 0];
      if (node) {
        node.setAttribute('item-name', product.name || '');
        node.setAttribute('item-sku', product.itemsku || '');
      } else {
        console.error(`Node with ID 'comprar${i + 1}' not found for setting attributes.`);
      }
    }

      // Agrega atributos a los botones de compartir
      const shareValues = ['email', 'whatssapp', 'copy link', 'print'];
      shares.forEach((share, index) => {
        if (share) {
          share.setAttribute('item-name', shareValues[index]);
        }
      });

    } catch (error) {
      console.error('An error occurred:', error);
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

    recomendado.share_channel = "email";

    utag.link(recomendado);
    //console.log(recomendado);
  }

  sendWhatsapp(){

  let recomendado = environment.utagInfo.ShareContinue;
  
  recomendado.share_channel = "whatssapp";
  
  //window.utag_data = Object.assign(window.utag_data, recomendado);
  
  utag.link(recomendado);
  //console.log(recomendado);



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
        //console.log(recomendado);
        // let share = environment.utagInfo.ShareContinue; 

        // share.share_channel = this.Share2;
      }else{
        try { 
          
          const whatsappWebUrl = `https://web.whatsapp.com/send?text=` + message;
           window.open(whatsappWebUrl , '_blank');

           let recomendado = environment.utagInfo.ShareContinue;

           //window.utag_data = Object.assign(window.utag_data, recomendado);
           utag.link(recomendado);
           //console.log(recomendado);

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
    //console.log(recomendado);
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

    recomendado.share_channel = "print";

    utag.link(recomendado);

    
    //console.log(recomendado);

  }
  
  openLink(link: string){

     let recomendado = environment.utagInfo.RecommendationsContinue;

       //window.utag_data = Object.assign(window.utag_data, recomendado);
       window.open(link, '_blank')
       utag.link(recomendado);
       //console.log(recomendado);
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