import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationExtras } from '@angular/router';

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


  utag_data: Array<any> = [];
  utag_dataAnwers: Array<any> = [];
  questionIndex: number = 0;
  value: number = 0;
  answer: string = '';
  question: string  = '';
  clientQuestions: Array<any> = [];
  multiples: Array<any> = [];
  country: string | null = '';

  paragraph: string = '';

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
      text: 'inicio'
    },
    {
      question: '¿Eres mujer u hombre?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Mujer', value: 1, products: [] },
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
        { label: '18 a 39 años', value: 1, productsWomen: [10], productsMen: [], checkSex: true },
        { label: '40 a 49 años', value: 2, productsWomen: [2], productsMen: [4], checkSex: true },
        { label: '50 a 59 años', value: 3, productsWomen: [2], productsMen: [19], checkSex: true },
        { label: '60 o más años', value: 4, productsWomen: [2, 19], productsMen: [3, 4], checkSex: true },
      ],
      selected: null
    },
    {
      question: '¿Por qué te concentras en tu bienestar?',
      subQuestion: 'Selecciona todo lo que aplique.',
      multi: true,
      margin: 70,
      options: [
        { label: 'Quiero ser mi mejor versión.', value: 1, products: [14] },
        { label: 'Quiero desarrollar hábitos más saludables.', value: 2, products: [7] },
        { label: 'Estoy buscando mejorar mi bienestar.', value: 3, products: [3, 6] },
      ],
      selected: [],
      footer: ` <span class="gw-20 g-text text-center">¡Comprender por qué estás aquí, es importante para nosotros y tus resultados!</span>`
    },
    {
      question: '¿Consumes actualmente un suplemento alimenticio/dietario con vitaminas y/o minerales?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [] },
        { label: 'No', value: 2, products: [1] },
      ],
      selected: null
    },
    {
      question: '¿Qué tipo de asesoría sobre suplementos alimenticios/dietarios prefieres? ',
      multi: false,
      margin: 20,
      showRequired: false,
      options: [
        { label: 'De inicio', value: 1, products: [1] },
        { label: 'Avanzada', value: 2, products: [5, 12] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text">
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
        { label: 'Ninguna (0)', value: 1, products: [6, 13] },
        { label: '1 a 2 frutas y vegetales al día.', value: 2, products: [8, 16] },
        { label: '3 a 4 frutas y vegetales al día.', value: 3, products: [] },
        { label: '5 a 6 frutas y vegetales al día.', value: 4, products: [] },
        { label: '7 o más frutas y vegetales al día.', value: 5, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Cómo describirías tu alimentación actual?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Baja en carbohidratos (harina y azúcares), con mayor cantidad de proteínas y grasa.', value: 1, products: [18] },
        { label: 'Balanceada, con una mezcla equilibrada  de carbohidratos (harina y azúcares), proteínas y grasa.', value: 2, products: [1] },
        { label: 'Baja en grasa, con mayor cantidad de proteína y carbohidratos (harina y azúcares).', value: 3, products: [7] },
        { label: 'Alta en grasa y carbohidratos (harina y azúcares) y baja en proteína.', value: 4, products: [7, 18] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text">

                  <b>Algunos ejemplos que te ayudarán a seleccionar la mejor respuesta de acuerdo a tu alimentación.</b><br><br>
                <ul style="list-style-type: circle;">
                <li>
                  <b>Carbohidratos (harinas y azúcares):</b> pan, arepa, tortilla de maíz, tostada de maíz, pasta, papa, entre otros.<br>
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
        { label: 'Rara vez', value: 1, products: [12] },
        { label: 'Ocasionalmente', value: 2, products: [9] },
        { label: 'Me levanto muy activo(a).', value: 3, products: [] },
      ],
      selected: null
    },
    {
      question: '¿Cuántas porciones de alimentos ricos en calcio consumes diariamente?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label: 'Ninguna (0)', value: 1, products: [2] },
        { label: '1 porción al día.', value: 2, products: [2] },
        { label: '2 porciones al día.', value: 3, products: [] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text" >
                  <b>Por ejemplo:</b>  Leche, yogurt, queso, bebidas con soya fortificada, entre otros.
                </small>`
    },
    {
      question: '¿Con qué frecuencia haces ejercicio durante la semana?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'No hago ejercicios regularmente.', value: 1, products: [1] },
        { label: 'Hago ejercicios ligeros (caminar, actividades cotidianas) 1 a 2 días a la semana.', value: 2, products: [8, 9] },
        { label: 'Hago ejercicios moderados (trotar, ejercicio de fuerza moderados) 3 o 4 veces a la semana.', value: 3, products: [3, 10] },
        { label: 'Hago ejercicios moderados a vigorosos (correr, bicicleta, natación, ejercicios fuerza intensos) al menos 5 veces a la semana.', value: 4, products: [9, 10, 14] },
      ],
      selected: null
    },
    {
      question: '¿Vives o trabajas en un área de mucha contaminación, tráfico pesado, industrias alrededor, humo o aire de mala calidad?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label: 'Si', value: 1, products: [13, 17] },
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
        { label: 'Si', value: 1, products: [15, 16] },
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
        { label: 'Si', value: 1, products: [7, 19] },
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
        { label: 'Menos de 20 minutos al día.', value: 1, products: [16] },
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
      text: 'final',
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
      whyIsRecommended: 'Suplemento alimenticio/dietario con 22 micronutrientes esenciales: 12 vitaminas y 10 minerales, además de concentrados vegetales que aportan fitonutrientes que ayudan en el funcionamiento diario del cuerpo.',
      img: 'assets/img/LAS/Daily_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily_Plus.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=126009&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus',  // LINKS DE COMPRA PRODUCTOS
      count: 0,
    },
    {
      id: 2,
      name: 'Cal Mag D',
      whyIsRecommended: 'Aporta dos fuentes naturales de calcio: carbonato de calcio (piedra caliza) y algas marinas calcificadas, además contiene vitamina D y magnesio que promueven y ayudan al organismo con la absorción, retención y utilización del calcio para el desarrollo de huesos y dientes fuertes.',
      img: 'assets/img/LAS/CalMagD.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/CalMagD.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=110609&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D',
      count: 0,
    },
    {
      id: 3,
      name: 'Proteína Vegetal en polvo',
      whyIsRecommended: 'Fórmula con proteína 100% vegetal de alta calidad, libre de ingredientes modificados genéticamente, que combina propiedades de soya, chícharo/ arveja y trigo. Naturalmente libre de lactosa, grasas saturadas y colesterol.',
      img: 'assets/img/LAS/Protein.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Protein.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=110415&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina',
      count: 0,
    },
    {
      id: 4,
      name: 'Omega 3 Plus',
      whyIsRecommended: 'Suplemento alimenticio/dietario fuente de ácidos grasos Omega 3 esenciales, EPA y DHA, que junto con el ejercicio regular y una alimentación balanceada puede contribuir a mantener la salud cardiovascular.',
      img: 'assets/img/LAS/Omega.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Omega.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=122173&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3',
      count: 0,
    },
    {
      id: 5,
      name: 'Double X',
      whyIsRecommended: 'Suplemento alimenticio/dietario que contiene 12 Vitaminas, 10 Minerales y 22 Concentrados de Plantas (fitonutrientes) que ayudan a complementar tu alimentación, utilizando mejor la energía de los alimentos para mantener las exigencias del ritmo de vida diario.',
      img: 'assets/img/LAS/Double_X.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Double_X.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=120843&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X',
      count: 0,
    },
    {
      id: 6,
      name: 'Fibra en Polvo',
      whyIsRecommended: 'Suplemento alimenticio/dietario/alimento a base de tres fuentes de fibra soluble: maltodextrina, raíz de chicoria/ achicoria y goma guar. Fórmula libre de lactosa y colorantes artificiales que ayuda a reducir el azúcar y el colesterol en sangre y a su vez a disminuir la sensación de hambre.',
      img: 'assets/img/LAS/Fibra.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Fibra.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&line=G&NavM=N&BC=102736&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo',
      count: 0,
    },
    {
      id: 7,
      name: 'Daily +1 Equilibra tu vida',
      whyIsRecommended: 'Esta solución contribuye en el buen funcionamiento y mantenimiento del sistema circulatorio. Daily Plus aporta vitaminas y minerales como la vitamina B1, B2, B6, ácido fólico, vitamina C, hierro, cobre y zinc que contribuyen a la salud del corazón, apoyan el funcionamiento normal de los vasos sanguíneos, ayudan a formar y mantener las células sanguíneas y a la hemoglobina. Los Omega 3 EPA y DHA, contribuyen al funcionamiento normal del corazón.',
      img: 'assets/img/LAS/Daily+1/Equilibra_tu_vida.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Equilibra_tu_vida.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=321299&C=KR&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=omega3_daily1',
      count: 0,
    },
    {
      id: 8,
      name: 'C Plus',
      whyIsRecommended: 'Suplemento alimenticio/dietario que tiene la capacidad de liberar lentamente la vitamina C en el cuerpo, fortaleciendo las defensas y permitiendo que sus propiedades se aprovechen mejor.',
      img: 'assets/img/LAS/C_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/C_Plus.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=109741&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus',
      count: 0,
    },
    {
      id: 9,
      name: 'B Plus',
      whyIsRecommended: 'Aporta 8 vitaminas del complejo B que se liberan de forma gradual durante 8 horas gracias a su tecnología bicapa de doble acción. Las vitaminas B2 y B12 se liberan de inmediato, mientras que las vitaminas B1, B3, B5, B6, B7 y B9 se liberan de forma gradual, lenta y constantemente durante 8 horas. Las vitaminas del complejo B  ayudan a obtener la energía a partir de los alimentos. Si consume  B Plus y Daily Plus el mismo día, deje una ventana de 8 horas. Ej: Desayuno: Daily Plus y Cena: B Plus.',
      img: 'assets/img/LAS/B_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/B_Plus.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=110170&C=KH&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus',
      count: 0,
    },
    {
      id: 10,
      name: 'Tri Iron Folic',
      whyIsRecommended: 'Suplemento alimenticio/dietario rico en fitonutrientes. Aporta tres fuentes de hierro, ácido fólico y vitamina C la cual ayuda a una mejor absorción del hierro.',
      img: 'assets/img/LAS/Tri-Iron_Folic.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Tri-Iron_Folic.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=102046&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic',
      count: 0,
    },
    {
      id: 11,
      name: 'Bodykey Shake Plus',
      whyIsRecommended: 'Bebida en polvo baja en grasa y carbohidratos. Proporciona 9 g de proteína, además de vitaminas, minerales y fibra.',
      img: 'assets/img/LAS/Shake_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Shake_Plus.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdsList&Brand=GL&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey',
      count: 0,
    },
    {
      id: 12,
      name: 'Daily +1 Prende tu día',
      whyIsRecommended: 'Esta combinación aporta vitaminas del complejo B que junto con la vitamina C, el magnesio y el manganeso, son nutrientes necesarios para liberar la energía de los alimentos para que el organismo pueda utilizarla en sus funciones diarias como movimiento, mantenimiento de la temperatura corporal, metabolismo, defensas, entre otras. Se recomienda consumir ambos suplementos con una diferencia de 8 horas. Ej: Desayuno: Daily Plus y Cena: B Plus.',
      img: 'assets/img/LAS/Daily+1/Prende_tu_dia.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Prende_tu_dia.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=321276&C=KR&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bplus_daily1',
      count: 0,
    },
    {
      id: 13,
      name: 'Daily +1 Respuesta Óptima',
      whyIsRecommended: 'Esta combinación de la mano de hábitos saludables como el ejercicio, una alimentación equilibrada y el descanso, aporta variedad de nutrientes como vitamina C, D, E, A, B6, selenio y zinc que pueden contribuir para que el sistema de defensas funcione apropiadamente, protegiendo el organismo de multitud de agresores como virus y bacterias.',
      img: 'assets/img/LAS/Daily+1/Respuesta_optima.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Respuesta_optima.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=321288&C=KR&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=cplus_daily1',
      count: 0,
    },
    {
      id: 14,
      name: 'Daily +1 Muévete Libre',
      whyIsRecommended: 'Para ayudar a mantener huesos y músculos fuertes y resistentes, que nos permitan movilizarnos con facilidad, realizar trabajos de fuerza y potencia, junto con hábitos saludables, requerimos de nutrientes como proteína, calcio, vitamina C y vitamina D, presentes en esta solución.',
      img: 'assets/img/LAS/Daily+1/Mueevete_libre.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Mueevete_libre.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=321291&C=KR&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=proteina_daily1',
      count: 0,
    },
    {
      id: 15,
      name: 'Lecitina E',
      whyIsRecommended: 'Suplemento alimenticio/dietario masticable con vitamina E y lecitina, tiene un agradable sabor a miel y nuez de arce. La Vitamina E es antioxidante, ayuda a disminuir el daño celular ocasionado por los radicales libres.',
      img: 'assets/img/LAS/LecithinE.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/LecithinE.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=122174&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina',
      count: 0,
    },
    {
      id: 16,
      name: 'Multicaroteno',
      whyIsRecommended: 'Suplemento alimenticio/dietario aporta alfa y betacarotenos, luteína y zeaxantina. Los alfa y betacarotenos se transforman en vitamina A en el organismo después de ser consumidos. Importante para la protección de las células contra el daño ocasionado por los radicales libres y para el mantenimiento de la visión.Si consume Multicaroteno y Daily Plus el mismo día, deje una ventana de 8 horas. Ej: Desayuno: Daily  y Cena: Multicaroteno.',
      img: 'assets/img/LAS/Multicaroteno.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Multicaroteno.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&line=G&NavM=N&BC=109536&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno',
      count: 0,
    },
    {
      id: 17,
      name: 'Daily +1 Luce Radiante',
      whyIsRecommended: 'Esta combinación junto con una alimentación equilibrada aporta nutrientes como la vitamina C que ayuda a formar el colágeno, proteína que da estructura, firmeza y elasticidad a la piel y sus órganos anexos:  cabello y  uñas. Además, vitamina B2, biotina, vitamina A, vitamina E, cobre y selenio que pueden ayudar a tener la piel en adecuadas condiciones (suave, lisa, fresca, tersa), el cabello en condiciones normales, brillante, suave y resistente, así como mantener las uñas saludables, es decir, fuertes y resistentes.',
      img: 'assets/img/LAS/Daily+1/Luce_radiante.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Luce_radiante.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=321280&C=KR&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina_daily1',
      count: 0,
    },
    {
      id: 18,
      name: 'Daily + 1 Vive Libre',
      whyIsRecommended: 'La función principal del intestino es absorber los nutrientes y el agua; y a la vez eliminar los desechos de la digestión. Cumple otras funciones extraintestinales, relacionadas con la microbiota intestinal. Los prebióticos o fibras vegetales (como la de chicoria/ achicoria), les sirven de alimento a las bacterias buenas, estimula su crecimiento y ayuda a disminuir la absorción de grasas y azúcares de la alimentación. Esta solución apoya el bienestar intestinal aportando vitaminas, minerales y fibra soluble.',
      img: 'assets/img/LAS/Daily+1/Vive_libre.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Vive_libre.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=321296&C=KR&Brand=&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_daily1',
      count: 0,
    },
    {
      id: 19,
      name: 'Ajo Concentrado',
      whyIsRecommended: 'Contiene el ingrediente Alicina y Quercetina. Puede contribuir en la reducción de los niveles altos de grasa en sangre y a prevenir la formación de depósitos de grasa en las arterias. Hipotensor.',
      img: 'assets/img/LAS/Ajo_Concentrado.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Ajo_Concentrado.png',
      linkBuy:'https://www.amway.com.mx/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=K&BC=100566&utm_source=site&utm_medium=home&utm_campaign=mx_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo',
      count: 0,
    }
  ];



  recommendedProducts: Array<any> = [];

  constructor(private router: Router){}



  ngOnInit(): void {

    const icon = document.getElementById('ada-entry');

    if (icon) {
    (icon as HTMLElement).style.display = 'none';
    } else {
     console.error('Elemento con id "ada-entry" no encontrado.');
    }
    
    this.utag_data = environment.utagInfo.questionnaire;



    window.utag_data = Object.assign(window.utag_data, this.utag_data[this.questionIndex]);
    console.log(window.utag_data);
    setTimeout(() => {
      utag.view(window.utag_data);
    }, 500);

  
  }

  funtionAtribute(pregunta: string){
    try {
      var nodo = document.getElementById("seleccion");

      var valorQuestion = document.createAttribute("question");
      var valorAnswer = document.createAttribute("answer");

      valorQuestion.value = pregunta;
      valorAnswer.value = this.answer;


      nodo?.setAttributeNode(valorQuestion);
      nodo?.setAttributeNode(valorAnswer);



    } catch (error) {
      console.log(error);
    }

  }

  selectOption(indexQuestion: number, value: number, isMulti: boolean, option: string){
      if(isMulti){
      let index = this.questions[indexQuestion].selected.indexOf(value);
      if(index == -1){
        this.questions[indexQuestion].selected.push(value); 
        this.answer = option;
        
      }else { 
        this.questions[indexQuestion].selected.splice(index, 1); 
        this.answer = option;
       
      }
    }else{
      this.questions[indexQuestion].selected = value; 
      this.answer = option;
     
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


    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });

    this.validateCountryConditions();
  }

  validateCountryConditions(){
    let country = this.questions[0].country;

    console.log(country);

    for (let i = 0; i < this.recommendedProducts.length; i++) {

      if(country == 'mx'){

        if(this.recommendedProducts[i].name == 'Double X'){

          let aux = this.recommendedProducts[5];

          this.recommendedProducts[5] = this.recommendedProducts[i];
          this.recommendedProducts[i] = aux;  
       }  
        
      }
      
       else if(country == 'co'){
        // LinkBuy DailyPlus
        if(this.recommendedProducts[i].name == 'Daily Plus'){
           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=117548&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
         
        }
        // LinkBuy Omega 3 Plus
        if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
          
          }
        // LinkBuy C Plus
        if(this.recommendedProducts[i].name == 'C Plus'){
        this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
        } 
        // LinkBuy Proteina
        if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
        this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CC&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
     
        }         
        // LinkBuy CalMag D
        if(this.recommendedProducts[i].name == 'Cal Mag D'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';
         
         }
        // LinkBuy Double X
        if(this.recommendedProducts[i].name == 'Double X'){
          this.recommendedProducts[i].linkBuy = '';
         
         }
        // LinkBuy B Plus
        if(this.recommendedProducts[i].name == 'B Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110170&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';
         
         }


        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109536&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=100566&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdsList&Brand=IR&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321227&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321243&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321230&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321242&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321237&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321245&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }


        // eliminar Double X
        if(this.recommendedProducts[i].name == 'Double X')
          this.recommendedProducts[i] = null;

      }else if(country == 'ar'){
                // LinkBuy DailyPlus
        if(this.recommendedProducts[i].name == 'Daily Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=126009&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
        
       }
       // LinkBuy Omega 3 Plus
       if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=122173&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
         
         }
       // LinkBuy C Plus
       if(this.recommendedProducts[i].name == 'C Plus'){
       this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=109741&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
       } 
       // LinkBuy Proteina
       if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
       this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110415&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
    
       }         
       // LinkBuy CalMag D
       if(this.recommendedProducts[i].name == 'Cal Mag D'){
         this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110609&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';
        
        }
       // LinkBuy Double X
       if(this.recommendedProducts[i].name == 'Double X'){
         this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=120843&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';
        
        }
       // LinkBuy B Plus
       if(this.recommendedProducts[i].name == 'B Plus'){
         this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110178&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';
        
        }
        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=109536&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdsList&Brand=GC&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=122174&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=102736&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=102046&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321277&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321296&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321280&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321291&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321288&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321299&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }

        if(this.recommendedProducts[i].name == 'Double X'){

          let aux = this.recommendedProducts[5];

          this.recommendedProducts[5] = this.recommendedProducts[i];
          this.recommendedProducts[i] = aux;  
       }

        // eliminar Ajo concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado')
          this.recommendedProducts[i] = null;

  

      }else if(country == 'cr'){
              // LinkBuy DailyPlus
        if(this.recommendedProducts[i].name == 'Daily Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=126010&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
        
       }
       // LinkBuy Omega 3 Plus
       if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122173&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
         
         }
       // LinkBuy C Plus
       if(this.recommendedProducts[i].name == 'C Plus'){
       this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109741&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
       } 
       // LinkBuy Proteina
       if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
       this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110415&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
    
       }         
       // LinkBuy CalMag D
       if(this.recommendedProducts[i].name == 'Cal Mag D'){
         this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110609&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';
        
        }
       // LinkBuy Double X
       if(this.recommendedProducts[i].name == 'Double X'){
         this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=120843&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';
        
        }
       // LinkBuy B Plus
       if(this.recommendedProducts[i].name == 'B Plus'){
         this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110170&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';
        
        }
        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109536&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=100566&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdsList&Brand=GN&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122174&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102736&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102046&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321276&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321296&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321280&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321291&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321288&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321299&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }

          if(this.recommendedProducts[i].name == 'Double X'){

            let aux = this.recommendedProducts[5];
  
            this.recommendedProducts[5] = this.recommendedProducts[i];
            this.recommendedProducts[i] = aux;  
         }  



      }else if(country == 'gt'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=126009&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}
// LinkBuy Double X
if(this.recommendedProducts[i].name == 'Double X'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=120843&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

}
// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110170&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

}
        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109536&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=100566&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=286148&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321276&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321296&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdsList&IC=0&C=CZ&line=C&NavM=N&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321291&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321288&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321299&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }

          if(this.recommendedProducts[i].name == 'Double X'){

            let aux = this.recommendedProducts[5];
  
            this.recommendedProducts[5] = this.recommendedProducts[i];
            this.recommendedProducts[i] = aux;  
         }  


      }else if(country == 'hn'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=126009&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}
// LinkBuy Double X
if(this.recommendedProducts[i].name == 'Double X'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=120843&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

}
// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110170&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

}
        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109536&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=100566&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdsList&Brand=HQ&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321276&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321296&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321280&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321291&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321288&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321299&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }

          if(this.recommendedProducts[i].name == 'Double X'){

            let aux = this.recommendedProducts[5];
  
            this.recommendedProducts[5] = this.recommendedProducts[i];
            this.recommendedProducts[i] = aux;  
         }    

      }else if(country == 'sv'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=117548&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=122173&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=109741&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=110415&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=110609&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}
// LinkBuy Double X
if(this.recommendedProducts[i].name == 'Double X'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=120843&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

}
// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=110170&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

}

        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=109536&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=100566&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=286148&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=122174&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=102736&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=102046&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321227&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321243&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321230&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321242&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321237&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321245&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }

          if(this.recommendedProducts[i].name == 'Double X'){

            let aux = this.recommendedProducts[5];
  
            this.recommendedProducts[5] = this.recommendedProducts[i];
            this.recommendedProducts[i] = aux;  
         }    


      }else if(country == 'pa'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=117548&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122173&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109741&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110415&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110609&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}

// LinkBuy Double X
  if(this.recommendedProducts[i].name == 'Double X'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=120843&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';
 }

// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = '';

}

        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109536&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=100566&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=286149&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122174&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102736&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102046&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321243&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321230&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321242&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321237&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321245&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }

        if(this.recommendedProducts[i].name == 'Double X'){

        let aux = this.recommendedProducts[5];
  
         this.recommendedProducts[5] = this.recommendedProducts[i];
         this.recommendedProducts[i] = aux;  
       
        }  
        // eliminar B Plus
        // eliminar daily+1 prende tu dia
         if(this.recommendedProducts[i].name == 'B Plus' || 
         this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
         this.recommendedProducts[i] = null;


         }
          



      }else if(country == 'cl'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=117548&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}
// LinkBuy Double X
if(this.recommendedProducts[i].name == 'Double X'){
 this.recommendedProducts[i].linkBuy = '';

}
// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110181&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

}
        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdsList&Brand=DB&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321229&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321243&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321230&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321242&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321237&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321245&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }
        // eliminar double x
        // eliminar multicaroteno
        // eliminar Ajo concentrado
        if(this.recommendedProducts[i].name == 'Double X' || 
          this.recommendedProducts[i].name == 'Multicaroteno' || 
          this.recommendedProducts[i].name == 'Ajo Concentrado')
          this.recommendedProducts[i] = null;

      }else if(country == 'uy'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=117548&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=122173&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=109741&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=110415&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=110609&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}
// LinkBuy Double X
if(this.recommendedProducts[i].name == 'Double X'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=120843&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';
}
// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=110178&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

}
        // LinkBuy Multicaroteno
        if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=102736&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=102046&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
          }


          if(this.recommendedProducts[i].name == 'Double X'){

            let aux = this.recommendedProducts[5];
      
             this.recommendedProducts[5] = this.recommendedProducts[i];
             this.recommendedProducts[i] = aux;  
           
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
          this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
            this.recommendedProducts[i] = null;
          }

         

      }else if(country == 've'){
// LinkBuy DailyPlus
if(this.recommendedProducts[i].name == 'Daily Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=117549&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=v_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

}
// LinkBuy Omega 3 Plus
if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=100107&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
 }
// LinkBuy C Plus
if(this.recommendedProducts[i].name == 'C Plus'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=106710&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Acerola';
} 
// LinkBuy Proteina
if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=110415&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

}         
// LinkBuy CalMag D
if(this.recommendedProducts[i].name == 'Cal Mag D'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=110609&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

}
// LinkBuy Double X
if(this.recommendedProducts[i].name == 'Double X'){
 this.recommendedProducts[i].linkBuy = '';

}
// LinkBuy B Plus
if(this.recommendedProducts[i].name == 'B Plus'){
 this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=110178&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

}
         // LinkBuy Multicaroteno
         if(this.recommendedProducts[i].name == 'Multicaroteno'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Ajo Concentrado
        if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=100566&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Garlic';
       
          }
        // LinkBuy BodyKey Shake Plus
        if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Lecitina E
        if(this.recommendedProducts[i].name == 'Lecitina E'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=122174&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
          }
        // LinkBuy Fibra en polvo
        if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Tri Iron Folic
        if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=102046&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
          }
        // LinkBuy Daily+1 Prende tu día
        if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321228&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
          }
        // LinkBuy Daily+1 Vive libre
        if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
          this.recommendedProducts[i].linkBuy = '';
       
          }
        // LinkBuy Daily+1 Luce radiante
        if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321230&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
          }
        // LinkBuy Daily+1 Muévete libre
        if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321242&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
          }
        // LinkBuy Daily+1 Respuesta óptima
        if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321238&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
          }
        // LinkBuy Daily+1 Equilibra tu vida
        if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321248&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
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

      }
    }

    console.log([...this.recommendedProducts]);

    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });+


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
     
      if(this.questions[indexQuestion].selected == value){

        if(this.questions[indexQuestion].question == "¿Eres mujer u hombre?"){
          this.funtionAtribute(this.questions[indexQuestion].question);
        }
        if(this.questions[indexQuestion].question == "¿Qué edad tienes?"){
          this.funtionAtribute(this.questions[indexQuestion].question);
        }
        
        return true;
      }

      else {return false;}
      
    }
  }

  prevQuestion() {
    if(this.questionIndex == 0) {
      this.router.navigate(['how-does-it-work']);
      return;
    }

    this.questionIndex -= 1;
    window.utag_data = Object.assign(window.utag_data, this.utag_data[this.questionIndex]);
    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);
  }

  nextQuestion() {
    const paragraphElement = document.getElementById('original');
    const resultElement = document.getElementById('result');
    
    if (paragraphElement && resultElement) {
        const paragraph = paragraphElement.innerText;
        const result = this.concatenateWithHyphens(paragraph);

        this.question = result;

    } else {
        console.error('Uno o ambos elementos no existen.');
    }





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
    console.log(...this.recommendedProducts);

    console.log(this.question);
    console.log(this.answer);

    console.log(this.questions[0].country);







    // let utag_dataanwers = environment.utagInfo.QuestionnarieContinue;

    // this.utag_dataAnwers[this.questionIndex] = utag_dataanwers;



 

    // this.utag_dataAnwers[this.questionIndex].page_section = this.question;
    // this.utag_dataAnwers[this.questionIndex].continueAnswer = this.answer;

    // utag.link(this.utag_dataAnwers[this.questionIndex]);


this.country = this.questions[0].country;
    this.clientQuestions = this.questions;
if(this.questions[this.questionIndex].text == 'inicio'){
    



    this.utag_data[1].site_country = this.questions[0].country;
    this.utag_data[1].site_currencyCode = this.getCurrencyCode(this.questions[0].country);



    window.utag_data = Object.assign(window.utag_data, this.utag_data[1]);
}
if(this.questions[this.questionIndex].text == 'final'){
    



  this.utag_data[2].site_country = this.questions[0].country;
  this.utag_data[2].site_currencyCode = this.getCurrencyCode(this.questions[0].country);



  window.utag_data = Object.assign(window.utag_data, this.utag_data[2]);
}








    console.log(window.utag_data);
    // utag.view(window.utag_data);
    // console.log(utag.view(window.utag_data));
    console.log(this.questionIndex);
    // console.log(this.utag_dataAnwers[this.questionIndex]);
    // console.log(utag.link(this.utag_dataAnwers[this.questionIndex]));

    const navigationExtras: NavigationExtras = {
    fragment: 'question' + this.questionIndex
    };
    this.router.navigate(['/questionnaire'], navigationExtras);
  

    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);
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

  concatenateWithHyphens(text: string): string {
    return text.split(' ').join('-');
}

concat(){
  const paragraphElement = document.getElementById('original')!;
  const paragraph = paragraphElement.innerText;
  const result = this.concatenateWithHyphens(paragraph);
  
  const resultElement = document.getElementById('result')!;
  resultElement.innerText = result;

  console.log(resultElement.innerText);
}




}
