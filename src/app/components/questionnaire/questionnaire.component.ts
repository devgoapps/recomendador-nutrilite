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
      question: 'Que tal nos contar o seu nome?',
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
      question: 'Você é mulher ou homem?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Mulher', value: 1, products: [2] },
        { label: 'Homem', value: 2, products: [] }
      ],
      selected: null,
    },
    {
      question: 'Qual é a sua idade?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label: '18 a 39 anos', value: 1, productsWomen: [2], productsMen: [3], checkSex: true },
        { label: '40 a 49 anos', value: 2, productsWomen: [2, 3], productsMen: [4], checkSex: true },
        { label: '50 a 59 anos', value: 3, productsWomen: [2, 3], productsMen: [3, 4], checkSex: true },
        { label: '60 anos ou mais', value: 4, productsWomen: [3], productsMen: [3], checkSex: true },
      ],
      selected: null
    },
    {
      question: 'Qual o seu foco com relação ao seu bem-estar?',
      subQuestion: 'Selecione todas as opções que considerar adequadas.',
      multi: true,
      margin: 70,
      options: [
        { label: 'Quero ser a minha melhor versão.', value: 1, products: [5] },
        { label: 'Quero desenvolver hábitos mais saudáveis.', value: 2, products: [7] },
        { label: 'Quero melhorar meu bem-estar.', value: 3, products: [3, 6] },
      ],
      selected: [],
      footer: ` <span class="gw-30 g-text text-center">Compreender por que você está aqui é importante para nós e para a precisão dos seus resultados!</span>`
    },
    {
      question: 'Você consome atualmente algum suplemento alimentar com vitaminas ou minerais?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, products: [4, 5, 6] },
        { label: 'Não', value: 2, products: [1, 2, 4, 6, 8] },
      ],
      selected: null
    },
    {
      question: 'Que tipo de assessoria sobre suplementos alimentares você prefere?',
      multi: false,
      margin: 20,
      showRequired: false,
      options: [
        { label: 'Básica', value: 1, products: [1, 4, 6] },
        { label: 'Avançada', value: 2, products: [2, 4, 5, 6, 8] },
      ],
      selected: null,
      footer: ` <small class="gw-30 g-text">
                <ul style="list-style-type: circle;">
                <li>
                  <b class="field-items"> Básica:</b> trata-se da suplementação alimentar quando a pessoa nunca consumiu nenhum produto deste tipo e que serve como adaptação.<br><br> 
                </li>
                <li>  
                  <b class="field-items"> Avançada:</b> é o próximo passo após o básico, incluindo uma maior variedade de produtos e nutrientes para uma suplementação mais específica de acordo com as necessidades.
                </li>
                </ul>
                </small>`
    },
    {
      question: 'Quantas porções de frutas e legumes e verduras você consome por dia?',
      multi: false,
      margin: 40,
      showRequired: false,
      options: [
        { label: 'Nenhuma (0)', value: 1, products: [1, 6, 8] },
        { label: '1 a 2 frutas e verduras por dia.', value: 2, products: [5, 6, 8] },
        { label: '3 a 4 frutas e verduras por dia.', value: 3, products: [5] },
        { label: '5 a 6 frutas e verduras por dia.', value: 4, products: [1] },
        { label: '7 ou mais frutas e verduras por dia.', value: 5, products: [1] },
      ],
      selected: null
    },
    {
      question: 'Como você descreveria a sua alimentação atualmente?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Com baixo teor de carboidratos e uma maior proporção de proteínas e gorduras.', value: 1, products: [4, 6, 9] },
        { label: 'Equilibrada, com uma combinação equilibrada de carboidratos, proteínas e gorduras.', value: 2, products: [1, 4] },
        { label: 'Com baixo teor de gorduras e poucos ingredientes com alto teor de gordura animal ou fritura.', value: 3, products: [8] },
        { label: 'Com alto teor de gordura e carboidratos e pouca proteína.', value: 4, products: [4, 6, 10, 11] },
      ],
      selected: null,
      footer: ` <small class="gw-30 g-text">

                  <b>Alguns exemplos que vão ajudar a selecionar a melhor resposta de acordo com a sua alimentação.</b><br><br>
                <ul style="list-style-type: circle;">
                <li>
                  <b>Carboidratos:</b> pão, arepa, tortilha de milho, torrada, massas, batata, entre outros.<br>
                </li>
                <li>  
                  <b>Proteína:</b> carne bovina, frango, peixe, frutos do mar, ovos, leite e derivados, leguminosas como feijão, ervilha e oleaginosas como nozes, avelãs, pinhões.<br>
                </li>
                <li>  
                  <b>Gorduras:</b> óleo, manteiga, creme de leite, bacon, margarina.
                </li>  
                </ul>          
                  </small>
              `
    },
    {
      question: 'Ao acordar de manhã, você se sente com energia?',
      multi: false,
      margin: 50,
      showRequired: false,
      options: [
        { label: 'Raramente', value: 1, products: [12, 13] },
        { label: 'De vez em quando', value: 2, products: [12] },
        { label: 'Acordo muito ativo(a).', value: 3, products: [13] },
      ],
      selected: null
    },
    {
      question: 'Quantas porções de alimentos ricos em cálcio você consome diariamente?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label: 'Nenhuma (0)', value: 1, products: [1, 2] },
        { label: '1 porção por dia.', value: 2, products: [2] },
        { label: '2 porções por dia.', value: 3, products: [2] },
      ],
      selected: null,
      footer: ` <small class="gw-30 g-text" >
                  <b>Por exemplo:</b>  Leite, iogurte, queijo, bebidas com soja enriquecida, entre outros.
                </small>`
    },
    {
      question: 'Com que frequência você pratica exercícios físicos durante a semana?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Não pratico exercícios físicos regularmente.', value: 1, products: [] },
        { label: 'Faço exercícios físicos leves (caminhadas, atividades cotidianas), 1 ou 2 vezes por semana.', value: 2, products: [8, 9, 15] },
        { label: 'Faço atividades físicas moderadas (corrida leve, exercícios de força moderados), de 3 a 4 vezes por semana.', value: 3, products: [1, 2, 3] },
        { label: 'Tenho uma rotina de exercícios de moderados a vigorosos (corrida, ciclismo, natação, exercícios de força intensos), pelo menos, 5 vezes por semana.', value: 4, products: [4, 5, 9, 14] },
      ],
      selected: null
    },
    {
      question: 'Você mora ou trabalha em uma área muito poluída, com trânsito intenso, indústrias próximas, fumaça ou ar de má qualidade?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, products: [13, 16, 17] },
        { label: 'Não', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Tem interesse em seu bem-estar digestivo?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, products: [18] },
        { label: 'Não', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Você passa muito tempo no computador ou fica com os olhos cansados no final do dia?',
      multi: false,
      margin: 50,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, products: [16] },
        { label: 'Não', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'O seu médico disse que você precisa consumir mais ferro na sua alimentação?',
      multi: false,
      margin: 70,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, productsWomen: [10], productsMen: [], checkSex: true },
        { label: 'Não', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Quer manter níveis saudáveis de colesterol e triglicerídeos, além de promover seu bem-estar cardiovascular?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, products: [6,  7, 19] },
        { label: 'Não', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Em média, como você descreve sua exposição diária ao sol?',
      multi: false,
      margin: 0,
      showRequired: false,
      options: [
        { label: 'Menos de 20 minutos por dia.', value: 1, products: [1] },
        { label: 'Mais de 20 minutos por dia.', value: 2, products: [15] },
      ],
      selected: null
    },
    {
      question: 'Quer manter as unhas, o cabelo e a pele em condições adequadas?',
      multi: false,
      margin: 40,
      showRequired: false,
      options: [
        { label: 'Sim', value: 1, products: [17] },
        { label: 'Não', value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Ótimo trabalho! Chegamos ao fim das perguntas!',
      multi: false,
      margin: 70,
      showRequired: false,
      isFinished: true,
      options: [],
      selected: 'Despedida',
      footer: ` <span class="gw-50 g-text text-center" >
      Agora temos tudo o que precisamos para preparar recomendações personalizadas para você. <br><br>
      Sente-se, relaxe e prepare-se para descobrir recomendações e produtos que podem ajudar a melhorar o seu bem-estar. Além disso, temos algumas sugestões de produtos especiais para o seu bem-estar diário.
                </span>`
    },
  ]

  
  products: Array<any> = [
    {
      id: 1,
      name: 'Daily Plus',
      whyIsRecommended: 'Suplemento alimentar com 22 micronutrientes essenciais: 12 vitaminas e 10 minerais, além de concentrados vegetais que fornecem fitonutrientes que auxiliam o funcionamento diário do corpo.',
      img: 'assets/img/LAS/Daily_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily_Plus.png',
      linkBuy:'',  // LINKS DE COMPRA PRODUCTOS
      count: 0,
    },
    {
      id: 2,
      name: 'Cal Mag D',
      whyIsRecommended: 'Oferece duas fontes naturais de cálcio: carbonato de cálcio (pedra calcária) e algas marinhas calcificadas, além de conter vitamina D e magnésio que promovem e auxiliam o corpo na absorção, retenção e utilização do cálcio para o desenvolvimento de ossos e dentes fortes.',
      img: 'assets/img/LAS/CalMagD.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/CalMagD.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 3,
      name: 'Proteína Vegetal em Pó',
      whyIsRecommended: 'Fórmula com proteína 100% vegetal de alta qualidade, livre de ingredientes geneticamente modificados. A Proteína Vegetal em Pó combina propriedades da soja, ervilha e trigo. Naturalmente livre de lactose, gorduras saturadas e colesterol.',
      img: 'assets/img/LAS/Protein.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Protein.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 4,
      name: 'Ômega 3 Plus',
      whyIsRecommended: 'Suplemento alimentar, fonte de ácidos graxos ômega 3 essenciais, EPA e DHA, que, juntamente com a prática regular de exercícios físicos e uma alimentação equilibrada, pode contribuir para a manutenção da saúde cardiovascular.',
      img: 'assets/img/LAS/Omega.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Omega.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 5,
      name: 'Double X',
      whyIsRecommended: 'Suplemento alimentar com 12 vitaminas, 10 minerais e 22 concentrados de plantas (fitonutrientes) que ajudam a suplementar sua alimentação, utilizando melhor a energia dos alimentos para atender às demandas do ritmo do dia a dia.',
      img: 'assets/img/LAS/Double_X.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Double_X.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 6,
      name: 'Fibra em Pó',
      whyIsRecommended: 'Combina três fontes de fibra solúvel: maltodextrina, raiz de chicória e goma guar. Fórmula livre de lactose e corantes artificiais que ajuda a reduzir o açúcar e o colesterol no sangue e, ao mesmo tempo, diminui a sensação de fome.',
      img: 'assets/img/LAS/Fibra.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Fibra.png',
      linkBuy:'https://www.amway.com.br/pt/Fibras-em-Po-Nutrilite/p/102736?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=fibras_po',
      count: 0,
    },
    {
      id: 7,
      name: 'Daily +1 - Bem-estar',
      whyIsRecommended: 'Esta solução contribui para o bom funcionamento e a manutenção do sistema circulatório. Daily Plus fornece vitaminas e minerais como vitamina B1, B2, B6, ácido fólico, vitamina C, ferro, cobre e zinco que contribuem para a saúde do coração, apoiam o funcionamento normal dos vasos sanguíneos, ajudam a formar e manter as células sanguíneas e a hemoglobina. Os ácidos ômega 3 EPA e DHA contribuem para o funcionamento normal do coração.',
      img: 'assets/img/LAS/Daily+1/Equilibra_tu_vida.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Equilibra_tu_vida.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-BEM-ESTAR-D45/p/321304?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_bem_estar',
      count: 0,
    },
    {
      id: 8,
      name: 'C Plus',
      whyIsRecommended: 'Suplemento alimentar que possibilita a liberação lenta da vitamina C no corpo, fortalecendo as defesas e permitindo aproveitar melhor as suas propriedades.',
      img: 'assets/img/LAS/C_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/C_Plus.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 9,
      name: 'B Plus',
      whyIsRecommended: 'Fornece 8 vitaminas do complexo B que são liberadas de forma gradual durante 8 horas graças à sua tecnologia de duas camadas de dupla ação. As vitaminas B2 e B12 são liberadas imediatamente, enquanto as vitaminas B1, B3, B5, B6, B7 e B9 são liberadas de forma gradual, lenta e constante durante 8 horas.',
      img: 'assets/img/LAS/B_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/B_Plus.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 10,
      name: 'Tri Iron Folic',
      whyIsRecommended: 'Suplemento alimentar rico em fitonutrientes. Fornece três fontes de ferro, ácido fólico e vitamina C, que ajuda a absorver melhor o ferro.',
      img: 'assets/img/LAS/Tri-Iron_Folic.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Tri-Iron_Folic.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 11,
      name: 'Bodykey Shake Plus',
      whyIsRecommended: 'Bebida em pó com baixo teor de gordura e carboidratos. Fornece 9 g de proteína, além de vitaminas, minerais e fibras.',
      img: 'assets/img/LAS/Shake_Plus.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Shake_Plus.png',
      linkBuy:'https://www.amway.com.br/pt/Nutri%C3%A7%C3%A3o/c/nutricao?q=%3Arelevance%3Abrand%3ABodyKey&view=&utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Bodykey',
      count: 0,
    },
    {
      id: 12,
      name: 'Daily +1 Prende tu día',
      whyIsRecommended: 'Esta combinação fornece vitaminas do complexo B que, juntamente com a vitamina C, o magnésio e o manganês, são nutrientes necessários para liberar a energia dos alimentos para que o organismo possa usá-la em suas funções diárias como as de movimento, manutenção da temperatura corporal, metabolismo, defesas, entre outras.',
      img: 'assets/img/LAS/Daily+1/Prende_tu_dia.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Prende_tu_dia.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 13,
      name: 'Daily +1 - Imunidade',
      whyIsRecommended: 'Esta combinação de hábitos saudáveis, como, por exemplo, exercícios físicos, alimentação equilibrada e descanso, fornece uma variedade de nutrientes como as vitaminas C, D, E, A, B6, além de selênio e zinco, que podem contribuir para o bom funcionamento do sistema imunológico, protegendo o corpo contra uma variedade de agressores como vírus e bactérias.',
      img: 'assets/img/LAS/Daily+1/Respuesta_optima.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Respuesta_optima.png',
      linkBuy:'https://www.amway.com.br/pt/Daily-%2B1-IMUNIDADE-D45/p/321240?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_imunidade',
      count: 0,
    },
    {
      id: 14,
      name: 'Daily +1 - Movimento',
      whyIsRecommended: 'Para ajudar a manter ossos e músculos fortes e resistentes, que nos permitam nos movimentar com facilidade, realizar trabalhos de força e potência, juntamente com hábitos saudáveis, precisamos de nutrientes como proteína, cálcio, vitaminas C e D, presentes nesta solução.',
      img: 'assets/img/LAS/Daily+1/Mueevete_libre.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Mueevete_libre.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-MOVIMENTO-D90/p/321628?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_movimento',
      count: 0,
    },
    {
      id: 15,
      name: 'Vitamina E',
      whyIsRecommended: 'Suplemento alimentar mastigável com vitamina E e lecitina, com um sabor agradável de mel e noz de ácer. A vitamina E é antioxidante, ajuda a diminuir os danos celulares causados pelos radicais livres.',
      img: 'assets/img/LAS/LecithinE.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/LecithinE.png',
      linkBuy:'https://www.amway.com.br/pt/Suplemento-de-Vitamina-E---Nutrilite/p/A4309?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=vitaminaE',
      count: 0,
    },
    {
      id: 16,
      name: 'Multicaroteno',
      whyIsRecommended: 'Suplemento alimentar que fornece alfacaroteno e betacaroteno, luteína e zeaxantina. Os alfa e betacarotenos são convertidos em vitamina A no organismo após serem consumidos. Importante para a proteção das células contra os danos causados pelos radicais livres e para a manutenção da visão.',
      img: 'assets/img/LAS/Multicaroteno.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Multicaroteno.png',
      linkBuy:'',
      count: 0,
    },
    {
      id: 17,
      name: 'Daily +1 - Beleza',
      whyIsRecommended: 'Esta combinação, juntamente com uma alimentação equilibrada, fornece nutrientes como a vitamina C, que ajuda na formação do colágeno, uma proteína que dá estrutura, firmeza e elasticidade à pele e seus órgãos anexos: cabelo e unhas. Além disso, nutrientes como vitamina B2, biotina, vitamina A, vitamina E, cobre e selênio podem ajudar a manter a pele em condições adequadas (macia, lisa, fresca, firme), o cabelo em condições normais, brilhante, macio e resistente, e as unhas saudáveis, ou seja, fortes e resistentes.',
      img: 'assets/img/LAS/Daily+1/Luce_radiante.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Luce_radiante.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-BELEZA-D45/p/321236?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_beleza',
      count: 0,
    },
    {
      id: 18,
      name: 'Daily + 1 - Equilíbrio intestinal',
      whyIsRecommended: 'A principal função do intestino é absorver os nutrientes e a água, ao mesmo tempo em que elimina os resíduos da digestão. O intestino também desempenha outras funções extraintestinais relacionadas à microbiota intestinal. Os prebióticos ou fibras vegetais (como a da chicória) servem como alimento para as bactérias benéficas, estimulam o seu crescimento e ajudam a diminuir a absorção de gorduras e açúcares da alimentação. Esta solução contribui para o bem-estar intestinal, fornecendo vitaminas, minerais e fibras solúveis.',
      img: 'assets/img/LAS/Daily+1/Vive_libre.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Daily+1/Vive_libre.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-EQUILIBRIO-INTESTINAL-D90/p/321611?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=equilibrio_intestinal',
      count: 0,
    },
    {
      id: 19,
      name: 'Alho Concentrado',
      whyIsRecommended: 'Contém alicina e quercetina. Pode contribuir para a redução dos níveis elevados de gordura no sangue e prevenir a formação de depósitos de gordura nas artérias. Hipotensor.',
      img: 'assets/img/LAS/Ajo_Concentrado.png',
      emailImg: 'https://amway-2024.web.app/assets/img/LAS/Ajo_Concentrado.png',
      linkBuy:'https://www.amway.com.br/pt/Garlic-Plus-Nutrilite/p/125618?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Garlic',
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

    // console.log(country);

    for (let i = 0; i < this.recommendedProducts.length; i++) {
      
//       if(country == 'CO'){
//         // LinkBuy DailyPlus
//         if(this.recommendedProducts[i].name == 'Daily Plus'){
//            this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=117548&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
         
//         }
//         // LinkBuy Omega 3 Plus
//         if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//            this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
          
//           }
//         // LinkBuy C Plus
//         if(this.recommendedProducts[i].name == 'C Plus'){
//         this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
//         } 
//         // LinkBuy Proteina
//         if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
//         this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CC&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
     
//         }         
//         // LinkBuy CalMag D
//         if(this.recommendedProducts[i].name == 'Cal Mag D'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';
         
//          }
//         // LinkBuy Double X
//         if(this.recommendedProducts[i].name == 'Double X'){
//           this.recommendedProducts[i].linkBuy = '';
         
//          }
//         // LinkBuy B Plus
//         if(this.recommendedProducts[i].name == 'B Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110170&C=CB&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';
         
//          }


//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109536&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=100566&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdsList&Brand=IR&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321227&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321243&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321230&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321242&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321237&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.co/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321245&C=CF&Brand=&utm_source=site&utm_medium=home&utm_campaign=co_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }


//         // eliminar Double X
//         if(this.recommendedProducts[i].name == 'Double X')
//           this.recommendedProducts[i] = null;

//       }else if(country == 'AR'){
//                 // LinkBuy DailyPlus
//         if(this.recommendedProducts[i].name == 'Daily Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=126009&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
        
//        }
//        // LinkBuy Omega 3 Plus
//        if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=122173&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
         
//          }
//        // LinkBuy C Plus
//        if(this.recommendedProducts[i].name == 'C Plus'){
//        this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=109741&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
//        } 
//        // LinkBuy Proteina
//        if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
//        this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110415&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
    
//        }         
//        // LinkBuy CalMag D
//        if(this.recommendedProducts[i].name == 'Cal Mag D'){
//          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110609&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';
        
//         }
//        // LinkBuy Double X
//        if(this.recommendedProducts[i].name == 'Double X'){
//          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=120843&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';
        
//         }
//        // LinkBuy B Plus
//        if(this.recommendedProducts[i].name == 'B Plus'){
//          this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=110178&C=PE&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';
        
//         }
//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=109536&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdsList&Brand=GC&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=122174&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=102736&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=102046&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321277&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321296&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321280&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321291&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321288&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ar/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=P&BC=321299&C=PQ&Brand=&utm_source=site&utm_medium=home&utm_campaign=ar_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }

//         // eliminar Ajo concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado')
//           this.recommendedProducts[i] = null;

//       }else if(country == 'CR'){
//               // LinkBuy DailyPlus
//         if(this.recommendedProducts[i].name == 'Daily Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=126010&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';
        
//        }
//        // LinkBuy Omega 3 Plus
//        if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122173&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
         
//          }
//        // LinkBuy C Plus
//        if(this.recommendedProducts[i].name == 'C Plus'){
//        this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109741&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
//        } 
//        // LinkBuy Proteina
//        if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
//        this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110415&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';
    
//        }         
//        // LinkBuy CalMag D
//        if(this.recommendedProducts[i].name == 'Cal Mag D'){
//          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110609&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';
        
//         }
//        // LinkBuy Double X
//        if(this.recommendedProducts[i].name == 'Double X'){
//          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=120843&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';
        
//         }
//        // LinkBuy B Plus
//        if(this.recommendedProducts[i].name == 'B Plus'){
//          this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110170&C=BS&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';
        
//         }
//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109536&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=100566&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdsList&Brand=GN&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122174&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102736&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102046&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321276&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321296&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321280&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321291&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321288&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.co.cr/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321299&C=BY&Brand=&utm_source=site&utm_medium=home&utm_campaign=cr_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }



//       }else if(country == 'GU'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=126009&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=120843&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110170&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

// }
//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109536&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=100566&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=286148&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321276&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321296&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdsList&IC=0&C=CZ&line=C&NavM=N&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321291&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321288&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.gt/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321299&C=CZ&Brand=&utm_source=site&utm_medium=home&utm_campaign=gt_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }


// }else if(country == 'HO'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=126009&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=120843&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110170&C=CY&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

// }
//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109536&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=100566&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdsList&Brand=HQ&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321276&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321296&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321280&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321291&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321288&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.hn/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321299&C=CA&Brand=&utm_source=site&utm_medium=home&utm_campaign=hn_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }

// }else if(country == 'ES'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=117548&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=122173&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=109741&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=110415&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=110609&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=120843&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=110170&C=OY&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

// }

//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=109536&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=100566&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=286148&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=122174&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=102736&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=102046&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321227&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321243&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321230&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321242&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321237&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.sv/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=O&BC=321245&C=OA&Brand=&utm_source=site&utm_medium=home&utm_campaign=sv_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }


// }else if(country == 'PA'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=117548&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122173&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109741&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110415&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=110609&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=120843&C=BB&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = '';

// }

//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=109536&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Multicaroteno';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=100566&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=ajo';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=286149&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=122174&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102736&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=102046&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321243&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321230&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321242&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321237&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.pa/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=B&BC=321245&C=BP&Brand=&utm_source=site&utm_medium=home&utm_campaign=pa_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }

//         // eliminar B Plus
//         // eliminar daily+1 prende tu dia
//         if(this.recommendedProducts[i].name == 'B Plus' || 
//           this.recommendedProducts[i].name == 'Daily +1 Prende tu día')
//           this.recommendedProducts[i] = null;

//       }else if(country == 'CH'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=117548&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122173&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=109741&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110415&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110609&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = '';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=110181&C=CO&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

// }
//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdsList&Brand=DB&NC=BodyKey&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Bodykey';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=122174&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102736&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=102046&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321229&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321243&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321230&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321242&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321237&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.cl/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=C&BC=321245&C=CX&Brand=&utm_source=site&utm_medium=home&utm_campaign=cl_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }
//         // eliminar double x
//         // eliminar multicaroteno
//         // eliminar Ajo concentrado
//         if(this.recommendedProducts[i].name == 'Double X' || 
//           this.recommendedProducts[i].name == 'Multicaroteno' || 
//           this.recommendedProducts[i].name == 'Ajo Concentrado')
//           this.recommendedProducts[i] = null;

//       }else if(country == 'UY'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=117548&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=122173&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=109741&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=C_Plus';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=110415&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=110609&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=120843&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=Double_X';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=110178&C=FR&Brand=&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

// }
//         // LinkBuy Multicaroteno
//         if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=102736&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=fibra_polvo';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=F&BC=102046&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=vive_libre';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.uy/Store/Catalogue.aspx?show=PrdsList&IC=0&C=FY&line=F&NavM=N&utm_source=site&utm_medium=home&utm_campaign=uy_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }


//         // eliminar multicaroteno
//         // eliminar Ajo concentrado
//         // eliminar shake plus
//         // eliminar lectina e
//         // eliminar daily+1 luce radiante
//         if(this.recommendedProducts[i].name == 'Multicaroteno' || 
//           this.recommendedProducts[i].name == 'Ajo Concentrado' ||
//           this.recommendedProducts[i].name == 'Bodykey Shake Plus' || 
//           this.recommendedProducts[i].name == 'Lecitina E' ||
//           this.recommendedProducts[i].name == 'Daily +1 Luce Radiante')
//           this.recommendedProducts[i] = null;

//       }else if(country == 'VZ'){
// // LinkBuy DailyPlus
// if(this.recommendedProducts[i].name == 'Daily Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=117549&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=v_es_site_trazabilidad&utm_content=cta_ver&utm_term=Daily_Plus';

// }
// // LinkBuy Omega 3 Plus
// if(this.recommendedProducts[i].name == 'Omega 3 Plus'){
//   this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=100107&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Omega3';
 
//  }
// // LinkBuy C Plus
// if(this.recommendedProducts[i].name == 'C Plus'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=106710&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Acerola';
// } 
// // LinkBuy Proteina
// if(this.recommendedProducts[i].name == 'Proteína Vegetal en polvo'){
// this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=110415&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Proteina';

// }         
// // LinkBuy CalMag D
// if(this.recommendedProducts[i].name == 'Cal Mag D'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=110609&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=Calmag_D';

// }
// // LinkBuy Double X
// if(this.recommendedProducts[i].name == 'Double X'){
//  this.recommendedProducts[i].linkBuy = '';

// }
// // LinkBuy B Plus
// if(this.recommendedProducts[i].name == 'B Plus'){
//  this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=110178&C=AG&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_ver&utm_term=B_Plus';

// }
//          // LinkBuy Multicaroteno
//          if(this.recommendedProducts[i].name == 'Multicaroteno'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Ajo Concentrado
//         if(this.recommendedProducts[i].name == 'Ajo Concentrado'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=100566&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Garlic';
       
//           }
//         // LinkBuy BodyKey Shake Plus
//         if(this.recommendedProducts[i].name == 'Bodykey Shake Plus'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Lecitina E
//         if(this.recommendedProducts[i].name == 'Lecitina E'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=122174&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=lecitina';
       
//           }
//         // LinkBuy Fibra en polvo
//         if(this.recommendedProducts[i].name == 'Fibra en Polvo'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Tri Iron Folic
//         if(this.recommendedProducts[i].name == 'Tri Iron Folic'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=102046&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=Tri_iron_folic';
       
//           }
//         // LinkBuy Daily+1 Prende tu día
//         if(this.recommendedProducts[i].name == 'Daily +1 Prende tu día'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321228&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=prende_tu_dia';
       
//           }
//         // LinkBuy Daily+1 Vive libre
//         if(this.recommendedProducts[i].name == 'Daily + 1 Vive Libre'){
//           this.recommendedProducts[i].linkBuy = '';
       
//           }
//         // LinkBuy Daily+1 Luce radiante
//         if(this.recommendedProducts[i].name == 'Daily +1 Luce Radiante'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321230&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=luce_radiante';
       
//           }
//         // LinkBuy Daily+1 Muévete libre
//         if(this.recommendedProducts[i].name == 'Daily +1 Muévete Libre'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321242&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=muevete_libre';
       
//           }
//         // LinkBuy Daily+1 Respuesta óptima
//         if(this.recommendedProducts[i].name == 'Daily +1 Respuesta Óptima'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321238&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=respuesta_optima';
       
//           }
//         // LinkBuy Daily+1 Equilibra tu vida
//         if(this.recommendedProducts[i].name == 'Daily +1 Equilibra tu vida'){
//           this.recommendedProducts[i].linkBuy = 'https://www.amway.com.ve/Store/Catalogue.aspx?show=PrdDetail&NavM=N&line=A&BC=321248&C=AA&Brand=&utm_source=site&utm_medium=home&utm_campaign=ve_es_site_trazabilidad&utm_content=cta_comprar&utm_term=equilibra_tu_vida';
       
//           }

      
//         // eliminar double x
//         // eliminar multicaroteno
//         // eliminar shake plus
//         // eliminar fibra
//         // eliminar daily+1 vive libre
//         if(this.recommendedProducts[i].name == 'Double X' ||
//           this.recommendedProducts[i].name == 'Multicaroteno' || 
//           this.recommendedProducts[i].name == 'Bodykey Shake Plus' || 
//           this.recommendedProducts[i].name == 'Fibra en Polvo' ||
//           this.recommendedProducts[i].name == 'Daily + 1 Vive Libre')
//           this.recommendedProducts[i] = null;

//       }else{

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

      // }
    }

    console.log([...this.recommendedProducts]);

    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });+

    console.warn([...this.recommendedProducts]);

    sessionStorage.setItem('clientName', this.questions[0].selected);
    // sessionStorage.setItem('clientCountry', this.questions[0].country);
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

    // if(!this.questions[0].country || this.questions[0].country.length == 0){
    //   this.questions[0].showRequired = true;
    //   return;
    // }

    this.questionIndex += 1;
  }
}
