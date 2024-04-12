import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { environment } from '../../../environments/environment';

declare var utag: any;
declare var window: any;

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
  //encapsulation: ViewEncapsulation.None,
})
export class QuestionnaireComponent implements OnInit {

  questionIndex: number = 0;

  questions: Array<any> = [
    {
      question: '¿Puedes darnos tu nombre y país?',
      multi: false,
      margin: 0,
      showRequired: false,
      isInput: true,
      options: [],
      selected: null,
      country: null,
    },
    {
      question: '',
      multi: false,
      margin: 50,
      showRequired: false,
      isMessage: true,
      options: [],
      selected: 'Saludo',
    },
    {
      question: '¿Eres mujer u hombre?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Mujer', value: 1, products: [2] },
        { label: 'Hombre', value: 2, products: [] }
      ],
      selected: null,
    },
    {
      question: '¿Qué edad tienes?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label: '18 a 39 años', value: 1, productsWomen: [2], productsMen: [3], checkSex: true },
        { label: '40 a 49 años', value: 2, productsWomen: [2, 3], productsMen: [4], checkSex: true },
        { label: '50 a 59 años', value: 3, productsWomen: [2, 3], productsMen: [3, 4], checkSex: true },
        { label: '60 o más años', value: 4, productsWomen: [3], productsMen: [3], checkSex: true },
      ],
      selected: null
    },
    {
      question: '¿Por qué te concentras en tu bienestar?',
      subQuestion: 'Selecciona todo lo que aplique.',
      multi: true,
      margin: 70,
      options: [
        { label: 'Quiero ser mi mejor versión.', value: 1, products: [5] },
        { label: 'Quiero desarrollar hábitos más saludables.', value: 2, products: [7] },
        { label: 'Estoy buscando mejorar mi bienestar.', value: 3, products: [3, 6] },
      ],
      selected: [],
      footer: ` <span class="gw-30 g-text text-center">¡Comprender por qué estás aquí, es importante para nosotros y tus resultados!</span>`
    },
    {
      question: '¿Consumes actualmente un suplemento alimenticio/dietario con vitaminas y/o minerales?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [4, 5, 6] },
        { label: 'No', value: 2, products: [1, 2, 4, 6, 8] },
      ],
      selected: null
    },
    {
      question: '¿Qué tipo de asesoría sobre suplementos alimenticios/dietarios prefieres? ',
      multi: false,
      margin: 20,
      showRequired: false,
      options: [
        { label: 'Básica', value: 1, products: [1, 4, 6] },
        { label: 'Óptima', value: 2, products: [2, 4, 5, 6, 8] },
      ],
      selected: null,
      footer: ` <small class="gw-30 g-text">
                <ul style="list-style-type: circle;">
                <li>
                  <b class="field-items"> Básica:</b> Es complementar la alimentación con suplementos alimenticios/dietarios que se inicia cuando no se han consumido antes estos productos y que sirve como adaptación. <br><br> 
                </li>
                <li>  
                  <b class="field-items"> Óptima:</b> Es el paso siguiente a la básica, se incluye mayor variedad de productos/nutrientes para una complementación más específica según las necesidades.
                </li>
                </ul>
                </small>`
    },
    {
      question: '¿Cuántas frutas y vegetales consumes diariamente?',
      multi: false,
      margin: 40,
      showRequired: false,
      options: [
        { label: 'Ninguna (0)', value: 1, products: [1, 6, 8] },
        { label: '1 a 2 frutas y vegetales al día.', value: 2, products: [5, 6, 8] },
        { label: '3 a 4 frutas y vegetales al día.', value: 3, products: [5] },
        { label: '5 a 6 frutas y vegetales al día.', value: 4, products: [1] },
        { label: '7 o más frutas y vegetales al día.', value: 5, products: [1] },
      ],
      selected: null
    },
    {
      question: '¿Cómo describirías tu alimentación actual?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Baja en carbohidratos, con mayor proporción de proteínas y grasa.', value: 1, products: [4, 6, 9] },
        { label: 'Balanceada, con una mezcla equilibrada  de carbohidratos, proteínas y grasa.', value: 2, products: [1, 4] },
        { label: 'Baja en grasa, con pocos productos altos en grasa animal o alimentos fritos.', value: 3, products: [8] },
        { label: 'Alta en grasa y carbohidratos y baja en proteína.', value: 4, products: [4, 6, 10, 11] },
      ],
      selected: null,
      footer: ` <small class="gw-30 g-text">

                  <b>Algunos ejemplos que te ayudarán a seleccionar la mejor respuesta de acuerdo a tu alimentación.</b><br><br>
                <ul style="list-style-type: circle;">
                <li>
                  <b>Carbohidratos:</b> pan, arepa, tortilla de maíz, tostada de maíz, pasta, papa, entre otros.<br>
                </li>
                <li>  
                  <b>Proteína:</b> carne de res, pollo, pescado, mariscos, huevos, leche y derivados, leguminosas como frijol, guisantes y semillas como nueces, avellanas, piñones.<br>
                </li>
                <li>  
                  <b>Grasas:</b> aceites, mantequilla, crema de leche, tocino, margarinas.
                </li>  
                </ul>          
                  </small>
              `
    },
    {
      question: 'Cuando te despiertas por la mañana, ¿Te sientes con energía?',
      multi: false,
      margin: 50,
      showRequired: false,
      options: [
        { label: 'Rara vez', value: 1, products: [12, 13] },
        { label: 'Ocasionalmente', value: 2, products: [12] },
        { label: 'Me levanto muy activo(a).', value: 3, products: [13] },
      ],
      selected: null
    },
    {
      question: '¿Cuántas porciones de alimentos ricos en calcio consumes diariamente?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label: 'Ninguna (0)', value: 1, products: [1, 2] },
        { label: '1 porción al día.', value: 2, products: [2] },
        { label: '2 porciones al día.', value: 3, products: [2] },
      ],
      selected: null,
      footer: ` <small class="gw-30 g-text" >
                  <b>Por ejemplo:</b>  Leche, yogurt, queso, bebidas con soya fortificada, entre otros.
                </small>`
    },
    {
      question: '¿Con qué frecuencia haces ejercicio durante la semana?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'No hago ejercicios regularmente.', value: 1, products: [] },
        { label: 'Hago ejercicios ligeros (caminar, actividades cotidianas) 1 a 2 días a la semana.', value: 2, products: [8, 9, 15] },
        { label: 'Hago ejercicios moderados (trotar, ejercicio de fuerza moderados) 3 o 4 veces a la semana.', value: 3, products: [1, 2, 3] },
        { label: 'Hago ejercicios moderados a vigorosos (correr, bicicleta, natación, ejercicios fuerza intensos) al menos 5 veces a la semana.', value: 4, products: [4, 5, 9, 14] },
      ],
      selected: null
    },
    {
      question: '¿Vives o trabajas en un área de mucha contaminación, tráfico pesado, industrias alrededor, humo o aire de mala calidad?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [13, 16, 17] },
        { label: 'No', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Estás interesado(a) en tu bienestar digestivo?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [18] },
        { label: 'No', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Pasas mucho tiempo frente a la computadora/ordenador, o se sienten cansados tus ojos al final del día?',
      multi: false,
      margin: 50,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [16] },
        { label: 'No', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Te dijo tu doctor que necesitas más hierro en tu dieta?',
      multi: false,
      margin: 70,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, productsWomen: [10], productsMen: [], checkSex: true },
        { label: 'No', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Quieres mantener niveles sanos de colesterol y triglicéridos, además de promover tu bienestar cardiovascular?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [6,  7, 19] },
        { label: 'No', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Cómo describes mejor tu exposición al sol en promedio por día?',
      multi: false,
      margin: 0,
      showRequired: false,
      options: [
        { label: 'Menos de 20 minutos al día.', value: 1, products: [1] },
        { label: 'Más de 20 minutos al día.', value: 2, products: [15] },
      ],
      selected: null
    },
    {
      question: '¿Estás interesado(a) en mantener en condiciones normales las  uñas, el cabello y la piel?',
      multi: false,
      margin: 40,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [17] },
        { label: 'No', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Buen trabajo ¡Eso es todo!',
      multi: false,
      margin: 70,
      showRequired: false,
      isFinished: true,
      options: [],
      selected: 'Despedida',
      footer: ` <span class="gw-50 g-text text-center" >
                  Ahora tenemos todo lo que necesitamos para elegir recomendaciones personalizadas solo para ti. <br><br>
                  Siéntate, relájate y prepárate para descubrir recomendaciones y productos que pueden ayudarte a mejorar tu bienestar. Además, tenemos algunas sugerencias de productos especiales para tu bienestar diario. 
                </span>`
    },
  ]

  
  products: Array<any> = [
    {
      id: 1,
      name: 'Daily Plus',
      whyIsRecommended: 'Suplemento alimenticio/dietario con 22 micronutrientes esenciales: 12 vitaminas & 10 minerales, además de concentrados vegetales que aportan fitonutrientes que ayudan en el funcionamiento diario del cuerpo.',
      img: 'assets/img/LAS/Daily Plus.png',
      emailImg: 'https://www.amway.com.mx/img_pict/170_Catalog/Products/large/170_126009.jpg',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=126009&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus',  // LINKS DE COMPRA PRODUCTOS
      count: 0,
    },
    {
      id: 2,
      name: 'Cal Mag D',
      whyIsRecommended: 'Cal Mag D aporta dos fuentes naturales de calcio: carbonato de calcio (piedra caliza) y algas marinas calcificadas, además contiene vitamina D y magnesio que promueven y ayudan al organismo con la absorción, retención y utilización del calcio para el desarrollo de huesos y dientes fuertes.',
      img: 'assets/img/LAS/CalMagD.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/CalMagD.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 3,
      name: 'Proteína Vegetal en polvo',
      whyIsRecommended: 'Fórmula con proteína 100% vegetal de alta calidad, libre de ingredientes modificados genéticamente, que combina propiedades de soya, chícharo/ arveja y trigo. Naturalmente libre de lactosa, grasas saturadas y colesterol.',
      img: 'assets/img/LAS/Protein.png',
      emailImg: 'https://www.amway.com.mx/img_pict/170_Catalog/Products/large/170_110415.jpg',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=110415&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina',
      count: 0,
    },
    {
      id: 4,
      name: 'Omega 3 Plus',
      whyIsRecommended: 'Suplemento alimenticio/dietario fuente de ácidos grasos Omega 3 esenciales, EPA y DHA, que junto con el ejercicio regular y una alimentación balanceada puede contribuir a mantener la salud cardiovascular.',
      img: 'assets/img/LAS/Omega.png',
      emailImg: 'https://www.amway.com.mx/img_pict/170_Catalog/Products/large/170_122173.jpg',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=122173&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3',
      count: 0,
    },
    {
      id: 5,
      name: 'Double X',
      whyIsRecommended: 'Suplemento alimenticio/dietario que contiene 12 Vitaminas, 10 Minerales y 22 Concentrados de Plantas (fitonutrientes) que ayudan a complementar tu alimentación, utilizando mejor la energía de los alimentos para mantener las exigencias del ritmo de vida diario.',
      img: 'assets/img/LAS/Double X.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Double X.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 6,
      name: 'Fibra en Polvo',
      whyIsRecommended: 'Suplemento alimenticio/dietario/alimento a base de tres fuentes de fibra soluble: maltodextrina, raíz de chicoria/ achicoria y goma guar. Fórmula libre de lactosa y colorantes artificiales que ayuda a reducir el azúcar y el colesterol en sangre y a su vez a disminuir la sensación de hambre.',
      img: 'assets/img/LAS/Fibra.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Fibra.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 7,
      name: 'Daily +1 Equilibra tu vida',
      whyIsRecommended: 'Esta solución contribuye en el buen funcionamiento y mantenimiento del sistema circulatorio. Daily Plus aporta vitaminas y minerales como la vitamina B1, B2, B6, ácido fólico, vitamina C, hierro, cobre y zinc que contribuyen a la salud del corazón, apoyan el funcionamiento normal de los vasos sanguíneos, ayudan a formar y mantener las células sanguíneas y a la hemoglobina. Los Omega 3 EPA y DHA, contribuyen al funcionamiento normal del corazón.',
      img: 'assets/img/LAS/Daily+1/Equilibra tu vida.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Daily+1/Equilibra tu vida.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 8,
      name: 'C Plus',
      whyIsRecommended: 'Suplemento alimenticio/dietario que tiene la capacidad de liberar lentamente la vitamina C en el cuerpo, fortaleciendo las defensas y permitiendo que sus propiedades se aprovechen mejor.',
      img: 'assets/img/LAS/C Plus.png',
      emailImg: 'https://www.amway.com.mx/img_pict/170_Catalog/Products/large/170_109741.jpg',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=109741&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus',
      count: 0,
    },
    {
      id: 9,
      name: 'B Plus',
      whyIsRecommended: 'Aporta 8 vitaminas del complejo B y gracias a su tecnología bicapa de doble acción, libera las vitaminas del complejo B durante 8 horas. Las vitaminas B2 y B12 se liberan de inmediato.Las vitaminas B1, B3, B5, B6, B7 y B9 se liberan de forma gradual, lenta y constantemente durante 8 horas.',
      img: 'assets/img/LAS/B Plus.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/B Plus.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 10,
      name: 'Tri Iron Folic',
      whyIsRecommended: 'Suplemento alimenticio/dietario rico en fitonutrientes. Aporta tres fuentes de hierro, ácido fólico y vitamina C la cual ayuda a una mejor absorción del hierro.',
      img: 'assets/img/LAS/Tri-Iron Folic.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Tri-Iron Folic.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 11,
      name: 'Bodykey Shake Plus',
      whyIsRecommended: 'Bebida en polvo baja en grasa y carbohidratos. Proporciona 9 g de proteína, además de vitaminas, minerales y fibra.',
      img: 'assets/img/LAS/Shake Plus.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Shake Plus.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 12,
      name: 'Daily +1 Prende tu día',
      whyIsRecommended: 'Esta combinación aporta vitaminas del complejo B que junto con la vitamina C, el magnesio y el manganeso, son nutrientes necesarios para liberar la energía de los alimentos para que el organismo pueda utilizarla en sus funciones diarias como movimiento, mantenimiento de la temperatura corporal, metabolismo, defensas, entre otras.',
      img: 'assets/img/LAS/Daily+1/Prende tu dia.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Daily+1/Prende tu dia.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 13,
      name: 'Daily +1 Respuesta Óptima',
      whyIsRecommended: 'Esta combinación de la mano de hábitos saludables como el ejercicio, una alimentación equilibrada y el descanso, aporta variedad de nutrientes como vitamina C, D, E, A, B6, selenio y zinc que pueden contribuir para que el sistema de defensas funcione apropiadamente, protegiendo el organismo de multitud de agresores como virus y bacterias.',
      img: 'assets/img/LAS/Daily+1/Respuesta optima.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Daily+1/Respuesta optima.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 14,
      name: 'Daily +1 Muévete Libre',
      whyIsRecommended: 'Para ayudar a mantener huesos y músculos fuertes y resistentes, que nos permitan movilizarnos con facilidad, realizar trabajos de fuerza y potencia, junto con hábitos saludables, requerimos de nutrientes como proteína, calcio, vitamina C y vitamina D, presentes en esta solución.',
      img: 'assets/img/LAS/Daily+1/Mueevete libre.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Daily+1/Mueevete libre.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 15,
      name: 'Lecitina E',
      whyIsRecommended: 'Suplemento alimenticio masticable con vitamina E y lecitina, tiene un agradable sabor a miel y nuez de arce. La Vitamina E es antioxidante, ayuda a disminuir el daño celular ocasionado por los radicales libres.',
      img: 'assets/img/LAS/LecithinE.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/LecithinE.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 16,
      name: 'Multicaroteno',
      whyIsRecommended: 'Suplemento alimenticio/dietario aporta alfa y betacarotenos, luteína y zeaxantina. Los alfa y betacarotenos se transforman en vitamina A en el organismo después de ser consumidos. Importante para la protección de las células contra el daño ocasionado por los radicales libres y para el mantenimiento de la visión.',
      img: 'assets/img/LAS/Multicaroteno.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Multicaroteno.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 17,
      name: 'Daily +1 Luce Radiante',
      whyIsRecommended: 'Esta combinación junto con una alimentación equilibrada aporta nutrientes como la vitamina C que ayuda a formar el colágeno, proteína que da estructura, firmeza y elasticidad a la piel y sus órganos anexos:  cabello y  uñas. Además, vitamina B2, biotina, vitamina A, vitamina E, cobre y selenio que pueden ayudar a tener la piel en adecuadas condiciones (suave, lisa, fresca, tersa), el cabello en condiciones normales  brillante, suave y resistente y mantener las uñas saludables, es decir, fuertes y resistentes.',
      img: 'assets/img/LAS/Daily+1/Luce radiante.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Daily+1/Luce radiante.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 18,
      name: 'Daily + 1 Vive Libre',
      whyIsRecommended: 'La función principal del intestino es absorber los nutrientes y el agua; y a la vez eliminar los desechos de la digestión. Cumple otras funciones extraintestinales, relacionadas con la microbiota intestinal. Los prebióticos o fibras vegetales (como la de chicoria/ achicoria), les sirven de alimento a las bacterias buenas, estimula su crecimiento y ayuda a disminuir la absorción de grasas y azúcares de la alimentación. Esta solución apoya el bienestar intestinal aportando vitaminas, minerales y fibra soluble.',
      img: 'assets/img/LAS/Daily+1/Vive libre.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Daily+1/Vive libre.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 19,
      name: 'Ajo Concentrado',
      whyIsRecommended: 'Contiene el ingrediente Alicina y Quercetina. Puede contribuir en la reducción de los niveles altos de grasa en sangre y a prevenir la formación de depósitos de grasa en las arterias. Hipotensor.',
      img: 'assets/img/LAS/Ajo Concentrado.png',
      emailImg: 'https://www.amway.com.mx/recomendador/assets/img/LAS/Ajo Concentrado.png',
      linkBuy:'',
      count: 0,
    }
  ];



  recommendedProducts: Array<any> = [];

  constructor(private router: Router){}

  ngOnInit(): void {
    let utag_data = environment.utagInfo.home;
        
    window.utag_data = Object.assign(window.utag_data, utag_data);
    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);
  }

  selectOption(indexQuestion: number, value: number, isMulti: boolean){
    if(isMulti){
      let index = this.questions[indexQuestion].selected.indexOf(value);
      if(index == -1){
        this.questions[indexQuestion].selected.push(value);
      }else { 
        this.questions[indexQuestion].selected.splice(index, 1);
      }
    }else{
      this.questions[indexQuestion].selected = value; 
    }
  }
  
  showProducts(){
    let products: Array<number> = [];
    
    // Obtengo todos los ID's de los productos relacionados a las opciones seleccionadas en el questionario
    for (let i = 0; i < this.questions.length; i++) {
      if(this.questions[i].multi) {
        let allProd: Array<number> = [];

        for (let j = 0; j < this.questions[i].selected.length; j++) {
          let prod = this.questions[i].options.filter((item: any) => {
            if(item.value == this.questions[i].selected[j]) return item;
          })[0];

          if(prod && prod.checkSex){
            if(this.questions[0].selected == 1){ // Mujer
              allProd = [...allProd, ...prod.productsWomen];
            }else { // Hombre
              allProd = [...allProd, ...prod.productsMen];
            }
          }else if(prod && !prod.checkSex){
            allProd = [...allProd, ...prod.products];
          }
        }
        products = [...products, ...allProd];
      } else {
        let prod = this.questions[i].options.filter((item: any) => {
          if(item.value === this.questions[i].selected) return item;
        })[0];
        
        if(prod && prod.checkSex){
          if(this.questions[0].selected == 1){ // Mujer
            products = [...products, ...prod.productsWomen];
          }else { // Hombre
            products = [...products, ...prod.productsMen];
          }
        }else if(prod && !prod.checkSex){
          products = [...products, ...prod.products];
        }
      }
    }

    // Obtengo los productos seleccionados y hago un conteo de las veces que se recomendo de acuerdo al cuestionario
    for (let a = 0; a < products.length; a++) {
      for (let b = 0; b < this.products.length; b++) {
        if(products[a] == this.products[b].id){
          this.products[b].count += 1;
        }
      }
    }

    // Obtengo solo los productos que tienen al menos 1 recomendacion de acuerdo al cuestionario
    this.recommendedProducts = [];

    for (let c = 0; c < this.products.length; c++) {
      if(this.products[c].count > 0)
        this.recommendedProducts.push(this.products[c]);
    }

    //console.error([...this.recommendedProducts]);
    this.recommendedProducts = this.recommendedProducts.sort(this.sortByCount);
    console.error([...this.recommendedProducts]);

    this.validateSpecialConditions();
  }

  validateSpecialConditions(){
    console.warn([...this.recommendedProducts]);

    let hasDaily1 = false;
    let daily1Index = null;

    let hasDailyPlus = false;
    let dailyPlusIndex = null;

    let hasDoubleX = false;
    let doubleXIndex = null;

    let bPlusIndex = null;
    let multicarotenoIndex = null;

    for (let i = 0; i < this.recommendedProducts.length; i++) {
      if(this.recommendedProducts[i].name == 'Daily Plus'){
        hasDailyPlus = true;
        dailyPlusIndex = i;
      }else if(this.recommendedProducts[i].name.includes('Daily +1')){
        hasDaily1 = true;
        daily1Index = i;
      }else if(this.recommendedProducts[i].name == 'Double X'){
        hasDoubleX = true;
        doubleXIndex = i;
      }else if(this.recommendedProducts[i].name == 'B Plus'){
        bPlusIndex = i;
      }else if(this.recommendedProducts[i].name == 'Multicaroteno'){
        multicarotenoIndex = i;
      }
    }

    console.log(hasDaily1, hasDailyPlus, hasDoubleX)
    console.log(daily1Index, dailyPlusIndex, doubleXIndex)

    if(hasDailyPlus && hasDoubleX){
      if(dailyPlusIndex !== null && doubleXIndex !== null && (dailyPlusIndex < doubleXIndex)) {
        this.recommendedProducts[doubleXIndex] = null;

        /*if(bPlusIndex)
          this.recommendedProducts[bPlusIndex] == null;
        if(multicarotenoIndex)
          this.recommendedProducts[multicarotenoIndex] == null;*/
      }else if(dailyPlusIndex !== null && doubleXIndex !== null && (dailyPlusIndex > doubleXIndex)) {
        this.recommendedProducts[dailyPlusIndex] = null;
      }
    }else if(hasDaily1 && hasDoubleX){
      if(doubleXIndex)
        this.recommendedProducts[doubleXIndex] = null;

      /*if(bPlusIndex)
        this.recommendedProducts[bPlusIndex] == null;
      if(multicarotenoIndex)
        this.recommendedProducts[multicarotenoIndex] == null;*/
    }else if(hasDoubleX && !hasDaily1 && !hasDailyPlus){
      if(bPlusIndex !== null)
        this.recommendedProducts[bPlusIndex] = null;
      if(multicarotenoIndex !== null)
        this.recommendedProducts[multicarotenoIndex] = null;
    }

    console.log([...this.recommendedProducts]);

    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });

    console.warn([...this.recommendedProducts]);

    this.validateCountryConditions();
  }

  validateCountryConditions(){
    let country = this.questions[0].country;

    console.log(country);

    for (let i = 0; i < this.recommendedProducts.length; i++) {
      
      if(country == 'CO'){
        // LinkBuy DailyPlus
        if(this.recommendedProducts[i].name == 'Daily Plus'){
           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=117548&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
           this.recommendedProducts[i].emailImg = 'https://www.amway.com.co/img_pict/190_Catalog/Products/large/190_117548.jpg';
        }
        // LinkBuy Omega 3 Plus
        if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
           this.recommendedProducts[i].emailImg = 'https://www.amway.com.co/img_pict/190_Catalog/Products/large/190_122173.jpg';
          }
        // LinkBuy C Plus
        if(this.recommendedProducts[i].name == 'C Plus'){
        this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
        this.recommendedProducts[i].emailImg = 'https://www.amway.com.co/img_pict/190_Catalog/Products/large/190_109741.jpg';
        }
        // LinkBuy Proteina
        if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
        this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CC&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
        this.recommendedProducts[i].emailImg = 'https://www.amway.com.co/img_pict/190_Catalog/Products/large/190_110415.jpg';
        }

        // eliminar Double X
        if(this.recommendedProducts[i].name == 'Double X')
          this.recommendedProducts[i] = null;

      }else if(country == 'AR'){
                // LinkBuy DailyPlus
                if(this.recommendedProducts[i].name == 'Daily Plus'){
                  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=126009&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
                  this.recommendedProducts[i].emailImg = 'https://www.amway.com.ar/img_pict/380_Catalog/Products/large/380_126009.jpg';
                }
               // LinkBuy Omega 3 Plus
               if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
                  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=122173&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
                  this.recommendedProducts[i].emailImg = 'https://www.amway.com.ar/img_pict/380_Catalog/Products/large/380_122173.jpg';
                }
               // LinkBuy C Plus
               if(this.recommendedProducts[i].name == 'C Plus'){
               this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=109741&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
               this.recommendedProducts[i].emailImg = 'https://www.amway.com.ar/img_pict/380_Catalog/Products/large/380_109741.jpg';
               }
               // LinkBuy Proteina
               if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
               this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110415&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
               this.recommendedProducts[i].emailImg = 'https://www.amway.com.ar/img_pict/380_Catalog/Products/large/380_110415.jpg';
               }

        // eliminar Ajo concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado')
          this.recommendedProducts[i] = null;

      }else if(country == 'CR'){
                // LinkBuy DailyPlus
                if(this.recommendedProducts[i].name == 'Daily Plus'){
                  this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=126010&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
                  this.recommendedProducts[i].emailImg = 'https://www.amway.co.cr/img_pict/290_Catalog/Products/large/290_126010.jpg';
                }
               // LinkBuy Omega 3 Plus
               if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
                  this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122173&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
                  this.recommendedProducts[i].emailImg = 'https://www.amway.co.cr/img_pict/290_Catalog/Products/large/290_122173.jpg';
                }
               // LinkBuy C Plus
               if(this.recommendedProducts[i].name == 'C Plus'){
               this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109741&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
               this.recommendedProducts[i].emailImg = 'https://www.amway.co.cr/img_pict/290_Catalog/Products/large/290_109741.jpg';
              }
               // LinkBuy Proteina
               if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
               this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110415&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
               this.recommendedProducts[i].emailImg = 'https://www.amway.co.cr/img_pict/290_Catalog/Products/large/290_110415.jpg';
              }


      }else if(country == 'GU'){
        // LinkBuy DailyPlus
        if(this.recommendedProducts[i].name == 'Daily Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=126009&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
          this.recommendedProducts[i].emailImg = 'https://www.amway.com.gt/img_pict/260_Catalog/Products/full/260_126009.jpg?20240408070428';
        }
       // LinkBuy Omega 3 Plus
       if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
          this.recommendedProducts[i].emailImg = 'https://www.amway.com.gt/img_pict/260_Catalog/Products/large/260_122173.jpg';
        }
       // LinkBuy C Plus
       if(this.recommendedProducts[i].name == 'C Plus'){
       this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
       this.recommendedProducts[i].emailImg = 'https://www.amway.com.gt/img_pict/260_Catalog/Products/large/260_109741.jpg'; 
      }
       // LinkBuy Proteina
       if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
       this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
       this.recommendedProducts[i].emailImg = 'https://www.amway.com.gt/img_pict/260_Catalog/Products/large/260_110415.jpg'; 
      }


}else if(country == 'HO'){
  // LinkBuy DailyPlus
  if(this.recommendedProducts[i].name == 'Daily Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=126009&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.hn/img_pict/520_Catalog/Products/full/520_126009.jpg?20240408080422';
  }
 // LinkBuy Omega 3 Plus
 if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.hn/img_pict/520_Catalog/Products/large/520_122173.jpg';
  }
 // LinkBuy C Plus
 if(this.recommendedProducts[i].name == 'C Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
 this.recommendedProducts[i].emailImg = 'https://www.amway.com.hn/img_pict/520_Catalog/Products/large/520_109741.jpg'; 
}
 // LinkBuy Proteina
 if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
 this.recommendedProducts[i].emailImg = 'https://www.amway.com.hn/img_pict/520_Catalog/Products/large/520_110415.jpg'; 
}


}else if(country == 'ES'){
  // LinkBuy DailyPlus
  if(this.recommendedProducts[i].name == 'Daily Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=117548&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.sv/img_pict/510_Catalog/Products/large/510_117548.jpg';
  }
 // LinkBuy Omega 3 Plus
 if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=122173&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.sv/img_pict/510_Catalog/Products/large/510_122173.jpg';
  }
 // LinkBuy C Plus
 if(this.recommendedProducts[i].name == 'C Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=109741&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
 this.recommendedProducts[i].emailImg = 'https://www.amway.com.sv/img_pict/510_Catalog/Products/large/510_109741.jpg'; 
}
 // LinkBuy Proteina
 if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
 this.recommendedProducts[i].linkBuy = '';
 this.recommendedProducts[i].emailImg = '';
 }


}else if(country == 'PA'){
  // LinkBuy DailyPlus
  if(this.recommendedProducts[i].name == 'Daily Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=117548&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.pa/img_pict/230_Catalog/Products/large/230_117548.jpg';
  }
 // LinkBuy Omega 3 Plus
 if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122173&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.pa/img_pict/230_Catalog/Products/large/230_122173.jpg';
  }
 // LinkBuy C Plus
 if(this.recommendedProducts[i].name == 'C Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109741&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
 this.recommendedProducts[i].emailImg = 'https://www.amway.com.pa/img_pict/230_Catalog/Products/large/230_109741.jpg'; 
}
 // LinkBuy Proteina
 if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
 this.recommendedProducts[i].linkBuy = '';
 this.recommendedProducts[i].emailImg = '';
 }

        // eliminar B Plus
        // eliminar daily+1 prende tu dia
        if(this.recommendedProducts[i].name == 'B Plus' || 
          this.recommendedProducts[i].name == 'Daily +1 Prende tu día')
          this.recommendedProducts[i] = null;

      }else if(country == 'CH'){
  // LinkBuy DailyPlus
  if(this.recommendedProducts[i].name == 'Daily Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=117548&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
    this.recommendedProducts[i].emailImg = 'https://www.amway.cl/img_pict/400_Catalog/Products/large/400_117548.jpg';
  }
 // LinkBuy Omega 3 Plus
 if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
    this.recommendedProducts[i].emailImg = 'https://www.amway.cl/img_pict/400_Catalog/Products/large/400_122173.jpg';
  }
 // LinkBuy C Plus
 if(this.recommendedProducts[i].name == 'C Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
 this.recommendedProducts[i].emailImg = 'https://www.amway.cl/img_pict/400_Catalog/Products/large/400_109741.jpg'; 
}
 // LinkBuy Proteina
 if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
 this.recommendedProducts[i].linkBuy = '';
 this.recommendedProducts[i].emailImg = ''; 
}


        // eliminar double x
        // eliminar multicaroteno
        // eliminar Ajo concentrado
        if(this.recommendedProducts[i].name == 'Double X' || 
          this.recommendedProducts[i].name == 'Multicaroteno' || 
          this.recommendedProducts[i].name == 'Ajo Concentrado')
          this.recommendedProducts[i] = null;

      }else if(country == 'UY'){
  // LinkBuy DailyPlus
  if(this.recommendedProducts[i].name == 'Daily Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=117548&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.uy/img_pict/440_Catalog/Products/large/440_117548.jpg';
  }
 // LinkBuy Omega 3 Plus
 if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=122173&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.uy/img_pict/440_Catalog/Products/large/440_122173.jpg';
  }
 // LinkBuy C Plus
 if(this.recommendedProducts[i].name == 'C Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=109741&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
 this.recommendedProducts[i].emailImg = 'https://www.amway.com.uy/img_pict/440_Catalog/Products/large/440_109741.jpg'; 
}
 // LinkBuy Proteina
 if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
 this.recommendedProducts[i].linkBuy = '';
 this.recommendedProducts[i].emailImg = ''; 
}


        // eliminar multicaroteno
        // eliminar Ajo concentrado
        // eliminar shake plus
        // eliminar lectina e
        // eliminar daily+1 luce radiante
        if(this.recommendedProducts[i].name == 'Multicaroteno' || 
          this.recommendedProducts[i].name == 'Ajo Concentrado' ||
          this.recommendedProducts[i].name == 'Bodykey Shake Plus' || 
          this.recommendedProducts[i].name == 'Lecitina E' ||
          this.recommendedProducts[i].name == 'Daily +1 Luce Radiante')
          this.recommendedProducts[i] = null;

      }else if(country == 'VZ'){
  // LinkBuy DailyPlus
  if(this.recommendedProducts[i].name == 'Daily Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=117549&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=v_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.ve/img_pict/600_Catalog/Products/large/600_117549.jpg';
  }
 // LinkBuy Omega 3 Plus
 if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
    this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=100107&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
    this.recommendedProducts[i].emailImg = 'https://www.amway.com.ve/img_pict/600_Catalog/Products/full/600_100107.jpg?20240408080417';
  }
 // LinkBuy C Plus
 if(this.recommendedProducts[i].name == 'C Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=106710&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Acerola';
 this.recommendedProducts[i].emailImg = 'https://www.amway.com.ve/img_pict/600_Catalog/Products/large/600_106710.jpg'; 
}
 // LinkBuy Proteina
 if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
 this.recommendedProducts[i].linkBuy = '';
 this.recommendedProducts[i].emailImg = '';
 }

      
        // eliminar double x
        // eliminar multicaroteno
        // eliminar shake plus
        // eliminar fibra
        // eliminar daily+1 vive libre
        if(this.recommendedProducts[i].name == 'Double X' ||
          this.recommendedProducts[i].name == 'Multicaroteno' || 
          this.recommendedProducts[i].name == 'Bodykey Shake Plus' || 
          this.recommendedProducts[i].name == 'Fibra en Polvo' ||
          this.recommendedProducts[i].name == 'Daily + 1 Vive Libre')
          this.recommendedProducts[i] = null;

      }else if(country == 'BZ'){
        // Cambiar imagen
        // Cambiar nombre de C Plus a Acerola masticable

        // eliminar Double X
        // eliminar Multicaroteno
        // eliminar B Plus
        // eliminar daily+1 prende tu dia
        this.recommendedProducts[i].img = this.recommendedProducts[i].img.replaceAll(/LAS/gi, "BZ");
        this.recommendedProducts[i].emailImg = this.recommendedProducts[i].emailImg.replaceAll(/LAS/gi, "BZ");

        if(this.recommendedProducts[i].name == 'C Plus')
          this.recommendedProducts[i].name = 'Acerola Masticable';

        if(this.recommendedProducts[i].name == 'Double X' || 
          this.recommendedProducts[i].name == 'Multicaroteno' ||
          this.recommendedProducts[i].name == 'B Plus' ||
          this.recommendedProducts[i].name == 'Daily +1 Prende tu día')
          this.recommendedProducts[i] = null;

      }
    }

    console.log([...this.recommendedProducts]);

    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });

    console.warn([...this.recommendedProducts]);

    sessionStorage.setItem('clientName', this.questions[0].selected);
    sessionStorage.setItem('clientCountry', this.questions[0].country);
    sessionStorage.setItem('recommendedProducts', JSON.stringify(this.recommendedProducts));

    this.router.navigate(['recommendations']);
  }

  sortByCount(a: any, b: any){
    if (a.count < b.count){
      return 1;
    }
    if (a.count > b.count){
      return -1;
    }
    return 0;
  }

  isActive(indexQuestion: number, value: number, isMulti: boolean){
    if(isMulti){
      let exist = this.questions[indexQuestion].selected.includes(value);

      return exist;
    }else{
      if(this.questions[indexQuestion].selected == value) return true;
      else return false;
    }
  }

  prevQuestion() {
    if(this.questionIndex == 0) {
      this.router.navigate(['how-does-it-work']);
      return;
    }

    this.questionIndex -= 1;
  }

  nextQuestion() {
    if(this.questionIndex == (this.questions.length - 1)) return;

    if(!this.questions[this.questionIndex].selected || this.questions[this.questionIndex].selected.length == 0){
      this.questions[this.questionIndex].showRequired = true;
      return;
    }

    if(!this.questions[0].country || this.questions[0].country.length == 0){
      this.questions[0].showRequired = true;
      return;
    }

    this.questionIndex += 1;
  }
}
