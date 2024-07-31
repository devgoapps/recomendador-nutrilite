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

  utag_data: any = environment.utagInfo.questionnaire;
  utag_dataAnwers: Array<any> = [];
  questionIndex: number = 0;
  value: number = 0;
  answer: string  = '';
  question: string  = '';
  clientQuestions: Array<any> = [];
  multiples: Array<any> = [];
  country: string | null = '';
  pagina: number = 0;

  paragraph: string = '';

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
      text: 'inicio'
    },
    {
      question: 'Você é mulher ou homem?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label:  `Mulher`, value: 1, products: [] },
        { label:  `Homem`, value: 2, products: [] }
      ],
      selected: null,
    },
    {
      question: 'Qual é a sua idade?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label:  `18 a 39 anos`, value: 1, productsWomen: [10], productsMen: [], checkSex: true },
        { label:  `40 a 49 anos`, value: 2, productsWomen: [2], productsMen: [4], checkSex: true },
        { label:  `50 a 59 anos`, value: 3, productsWomen: [2], productsMen: [19], checkSex: true },
        { label:  `60 anos ou mais`, value: 4, productsWomen: [2, 19], productsMen: [3, 4], checkSex: true },
      ],
      selected: null
    },
    {
      question: 'Qual o seu foco com relação ao seu bem-estar?',
      multi: false,
      margin: 70,
      options: [
        { label:  `Estou começando a fazer pequenas mudanças para melhorar meu bem-estar.`, value: 3, products: [3, 6] },
        { label:  `Já fiz algumas mudanças na minha vida e quero desenvolver hábitos mais saudáveis.​`, value: 2, products: [7] },
        { label:  `Foco no meu bem-estar diário e quero alcançar a minha melhor versão.​`, value: 1, products: [14] },
      ],
      selected: [],
      footer: ` <span class="gw-20 g-text-footer text-center">Compreender por que você está aqui é importante para nós e para a precisão dos seus resultados!</span>`
    },
    {
      question: 'Você consome atualmente algum suplemento alimentar com vitaminas ou minerais?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, products: [] },
        { label:  `Não`, value: 2, products: [1] },
      ],
      selected: null
    },
    {
      question: 'Que tipo de assessoria sobre suplementos alimentares você prefere?',
      multi: false,
      margin: 20,
      showRequired: false,
      options: [
        { label:  `Básica`, value: 1, products: [1] },
        { label:  `Avançada`, value: 2, products: [5, 12] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text-footer">
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
        { label:  `Nenhuma (0)`, value: 1, products: [6, 13] },
        { label:  `1 a 2 frutas e verduras por dia.`, value: 2, products: [8, 16] },
        { label:  `3 a 4 frutas e verduras por dia.`, value: 3, products: [] },
        { label:  `5 a 6 frutas e verduras por dia.`, value: 4, products: [] },
        { label:  `7 ou mais frutas e verduras por dia.`, value: 5, products: [] },
      ],
      selected: null
    },
    {
      question: 'Como você descreveria a sua alimentação atualmente?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label:  `Proteína: Alta. Gordura: Alta. Carboidratos: Baixo.`, value: 1, products: [18] },
        { label:  `Proteína: Alta. Gordura: Baixa. Carboidratos: Alto.`, value: 3, products: [7] },
        { label:  `Proteína: Baixa. Gordura: Alta. Carboidratos: Alto.`, value: 4, products: [7, 18] },  
        { label:  `Equilibrado: com uma mistura equilibrada de carboidratos, proteínas e gorduras.`, value: 2, products: [1] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text-footer">

                  <b>Alguns exemplos que vão ajudar a selecionar a melhor resposta de acordo com a sua alimentação.</b><br><br>
                <ul style="list-style-type: circle;">
                <li>
                  <b>Carboidratos:</b> <b>farinhas</b> como pão, arroz, tortilha de milho, tapioca, macarrão, batata, entre outros e <b>açúcares</b> como açúcar de mesa, mel, melaço, melaço de cana, doces, bolos, entre outros.<br>
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
        { label:  `Raramente`, value: 1, products: [12] },
        { label:  `De vez em quando.`, value: 2, products: [9] },
        { label:  `Acordo muito ativo(a).`, value: 3, products: [] },
      ],
      selected: null
    },
    {
      question: 'Quantas porções de alimentos ricos em cálcio você consome diariamente?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label:  `Nenhuma (0)`, value: 1, products: [2] },
        { label:  `1 porção por dia.`, value: 2, products: [2] },
        { label:  `2 porções por dia.`, value: 3, products: [] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text-footer" >
                  <b>Por exemplo:</b>  Leite, iogurte, queijo, bebidas com soja enriquecida, entre outros.
                </small>`
    },
    {
      question: 'Com que frequência você pratica exercícios físicos durante a semana?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label:  `Não pratico exercícios físicos regularmente.`, value: 1, products: [1] },
        { label:  `Faço exercícios físicos leves (caminhadas, atividades cotidianas), 1 ou 2 vezes por semana.`, value: 2, products: [8, 9] },
        { label:  `Faço atividades físicas moderadas (corrida leve, exercícios de força moderados), de 3 a 4 vezes por semana.`, value: 3, products: [3, 10] },
        { label:  `Tenho uma rotina de exercícios de moderados a vigorosos (corrida, ciclismo, natação, exercícios de força intensos), pelo menos, 5 vezes por semana.`, value: 4, products: [9, 10, 14] },
      ],
      selected: null
    },
    {
      question: 'Você mora ou trabalha em uma área muito poluída, com trânsito intenso, indústrias próximas, fumaça ou ar de má qualidade?',
      multi: false,
      margin: 30,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, products: [13, 17] },
        { label:  `Não`, value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Tem interesse em seu bem-estar digestivo?',
      multi: false,
      margin: 60,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, products: [18] },
        { label:  `Não`, value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Você passa muito tempo no computador ou fica com os olhos cansados no final do dia?',
      multi: false,
      margin: 50,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, products: [15, 16] },
        { label:  `Não`, value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Seu médico recomendou que você incluísse mais fontes de ferro em sua dieta?​',
      multi: false,
      margin: 70,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, productsWomen: [10], productsMen: [], checkSex: true },
        { label:  `Não`, value: 2, products: [] },
      ],
      selected: null,
      footer: ` <small class="gw-20 g-text-footer">
                <b>Alguns exemplos de alimentos fontes de Ferro.​​</b><br><br>
              <ul style="list-style-type: circle;">
              <li>
                <b>Origem animal:</b> fígado, carne vermelha e magra (especialmente carne bovina), salmão, atum, ovos, carne de aves (especialmente patos e gansos).​<br>
              </li>
              <li>  
                <b>Origem vegetal:</b> leguminosas (feijão, grão de bico, lentilha, etc.), espinafre, brócolis, couve, aspargos, sementes (amêndoas, castanha do Pará).​<br>
              </li>  
              </ul>          
                </small>
            `
    },
    {
      question: 'Quer manter níveis saudáveis de colesterol e triglicerídeos, além de promover seu bem-estar cardiovascular?',
      multi: false,
      margin: 10,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, products: [7, 19] },
        { label:  `Não`, value: 2, products: [] },
      ],
      selected: null
    },
    {
      question: 'Em média, como você descreve sua exposição diária ao sol?',
      multi: false,
      margin: 0,
      showRequired: false,
      options: [
        { label:  `Menos de 20 minutos por dia.`, value: 1, products: [16] },
        { label:  `Mais de 20 minutos por dia.`, value: 2, products: [15] },
      ],
      selected: null
    },
    {
      question: 'Quer manter as unhas, o cabelo e/ou a pele em condições adequadas?',
      multi: false,
      margin: 40,
      showRequired: false,
      options: [
        { label:  `Sim`, value: 1, products: [17] },
        { label:  `Não`, value: 2, products: [] },
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
      text: 'final',
      footer: ` <span class="gw-50 g-text-footer text-center" >
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
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily_Plus.png',
      linkBuy:'https://amway.com.br/pt/Multivitaminico-Nutrilite-Daily-Plus-45-tabletes/p/126007?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Daily_Plus_45',  // LINKS DE COMPRA PRODUCTOS
      count: 0,
      itemsku: '126007',
    },
    {
      id: 2,
      name: 'Cal Mag D',
      whyIsRecommended: 'Oferece duas fontes naturais de cálcio: carbonato de cálcio (pedra calcária) e algas marinhas calcificadas, além de conter vitamina D e magnésio que promovem e auxiliam o corpo na absorção, retenção e utilização do cálcio para o desenvolvimento de ossos e dentes fortes.',
      img: 'assets/img/LAS/CalMagD.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/CalMagD.png',
      linkBuy:'https://amway.com.br/pt/Vitamina-D-Calcio-Magnesio/p/110609?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Cal_mag_D',
      count: 0,
      itemsku: '110609',
    },
    {
      id: 3,
      name: 'Proteína Vegetal em Pó',
      whyIsRecommended: 'Fórmula com proteína 100% vegetal de alta qualidade, livre de ingredientes geneticamente modificados. A Proteína Vegetal em Pó combina propriedades da soja, ervilha e trigo. Naturalmente livre de lactose, gorduras saturadas e colesterol.',
      img: 'assets/img/LAS/Protein.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Protein.png',
      linkBuy:'https://amway.com.br/pt/Proteina-Vegetal-em-Po-Nutrilite/p/110415?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Proteina_Vegetal',
      count: 0,
      itemsku: '110415',
    },
    {
      id: 4,
      name: 'Ômega 3 Plus',
      whyIsRecommended: 'Suplemento alimentar, fonte de ácidos graxos ômega 3 essenciais, EPA e DHA, que, juntamente com a prática regular de exercícios físicos e uma alimentação equilibrada, pode contribuir para a manutenção da saúde cardiovascular.',
      img: 'assets/img/LAS/Omega.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Omega.png',
      linkBuy:'https://amway.com.br/pt/Omega-3-Nutrilite---Oleo-de-Peixe-em-Capsulas/p/A8919?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=omega3',
      count: 0,
      itemsku: 'A8919',
    },
    {
      id: 5,
      name: 'Double X',
      whyIsRecommended: 'Suplemento alimentar com 12 vitaminas, 10 minerais e 22 concentrados de plantas (fitonutrientes) que ajudam a suplementar sua alimentação, utilizando melhor a energia dos alimentos para atender às demandas do ritmo do dia a dia.',
      img: 'assets/img/LAS/Double_X.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Double_X.png',
      linkBuy:'',
      count: 0,
      itemsku: '',
    },
    {
      id: 6,
      name: 'Fibra em Pó',
      whyIsRecommended: 'Combina três fontes de fibra solúvel: maltodextrina, raiz de chicória e goma guar. Fórmula livre de lactose e corantes artificiais que ajuda a reduzir o açúcar e o colesterol no sangue e, ao mesmo tempo, diminui a sensação de fome.',
      img: 'assets/img/LAS/Fibra.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Fibra.png',
      linkBuy:'https://www.amway.com.br/pt/Fibras-em-Po-Nutrilite/p/102736?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=fibras_po',
      count: 0,
      itemsku: '102736',
    },
    {
      id: 7,
      name: 'Daily +1 - Bem-estar',
      whyIsRecommended: 'Esta solução contribui para o bom funcionamento e a manutenção do sistema circulatório. Daily Plus fornece vitaminas e minerais como vitamina B1, B2, B6, ácido fólico, vitamina C, ferro, cobre e zinco que contribuem para a saúde do coração, apoiam o funcionamento normal dos vasos sanguíneos, ajudam a formar e manter as células sanguíneas e a hemoglobina. Os ácidos ômega 3 EPA e DHA contribuem para o funcionamento normal do coração.',
      img: 'assets/img/LAS/Daily+1/Equilibra_tu_vida.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily+1/Equilibra_tu_vida.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-BEM-ESTAR-D45/p/321304?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_bem_estar',
      count: 0,
      itemsku: '321304',
    },
    {
      id: 8,
      name: 'C Plus',
      whyIsRecommended: 'Suplemento alimentar que possibilita a liberação lenta da vitamina C no corpo, fortalecendo as defesas e permitindo aproveitar melhor as suas propriedades.',
      img: 'assets/img/LAS/C_Plus.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/C_Plus.png',
      linkBuy:'https://amway.com.br/pt/Acerola-C-Mastigavel/p/106710?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Acerola',
      count: 0,
      itemsku: '106710',
    },
    {
      id: 9,
      name: 'B Plus',
      whyIsRecommended: 'Fornece 8 vitaminas do complexo B que são liberadas de forma gradual durante 8 horas graças à sua tecnologia de duas camadas de dupla ação. As vitaminas B2 e B12 são liberadas imediatamente, enquanto as vitaminas B1, B3, B5, B6, B7 e B9 são liberadas de forma gradual, lenta e constante durante 8 horas.',
      img: 'assets/img/LAS/B_Plus.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/B_Plus.png',
      linkBuy:'',
      count: 0,
      itemsku: '',
    },
    {
      id: 10,
      name: 'Tri Iron Folic',
      whyIsRecommended: 'Suplemento alimentar rico em fitonutrientes. Fornece três fontes de ferro, ácido fólico e vitamina C, que ajuda a absorver melhor o ferro.',
      img: 'assets/img/LAS/Tri-Iron_Folic.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Tri-Iron_Folic.png',
      linkBuy:'',
      count: 0,
      itemsku: '',
    },
    {
      id: 11,
      name: 'Bodykey Shake Plus',
      whyIsRecommended: 'Bebida em pó com baixo teor de gordura e carboidratos. Fornece 9 g de proteína, além de vitaminas, minerais e fibras.',
      img: 'assets/img/LAS/Shake_Plus.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Shake_Plus.png',
      linkBuy:'https://www.amway.com.br/pt/Nutri%C3%A7%C3%A3o/c/nutricao?q=%3Arelevance%3Abrand%3ABodyKey&view=&utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Bodykey',
      count: 0,
      itemsku: '',
    },
    {
      id: 12,
      name: 'Daily +1 Prende tu día',
      whyIsRecommended: 'Esta combinação fornece vitaminas do complexo B que, juntamente com a vitamina C, o magnésio e o manganês, são nutrientes necessários para liberar a energia dos alimentos para que o organismo possa usá-la em suas funções diárias como as de movimento, manutenção da temperatura corporal, metabolismo, defesas, entre outras.',
      img: 'assets/img/LAS/Daily+1/Prende_tu_dia.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily+1/Prende_tu_dia.png',
      linkBuy:'',
      count: 0,
      itemsku: '',
    },
    {
      id: 13,
      name: 'Daily +1 - Imunidade',
      whyIsRecommended: 'Esta combinação de hábitos saudáveis, como, por exemplo, exercícios físicos, alimentação equilibrada e descanso, fornece uma variedade de nutrientes como as vitaminas C, D, E, A, B6, além de selênio e zinco, que podem contribuir para o bom funcionamento do sistema imunológico, protegendo o corpo contra uma variedade de agressores como vírus e bactérias.',
      img: 'assets/img/LAS/Daily+1/Respuesta_optima.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily+1/Respuesta_optima.png',
      linkBuy:'https://www.amway.com.br/pt/Daily-%2B1-IMUNIDADE-D45/p/321240?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_imunidade',
      count: 0,
      itemsku: '321240',
    },
    {
      id: 14,
      name: 'Daily +1 - Movimento',
      whyIsRecommended: 'Para ajudar a manter ossos e músculos fortes e resistentes, que nos permitam nos movimentar com facilidade, realizar trabalhos de força e potência, juntamente com hábitos saudáveis, precisamos de nutrientes como proteína, cálcio, vitaminas C e D, presentes nesta solução.',
      img: 'assets/img/LAS/Daily+1/Mueevete_libre.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily+1/Mueevete_libre.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-MOVIMENTO-D90/p/321628?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_movimento',
      count: 0,
      itemsku: '321628',
    },
    {
      id: 15,
      name: 'Vitamina E',
      whyIsRecommended: 'Suplemento alimentar mastigável com vitamina E e lecitina, com um sabor agradável de mel e noz de ácer. A vitamina E é antioxidante, ajuda a diminuir os danos celulares causados pelos radicais livres.',
      img: 'assets/img/LAS/LecithinE.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/LecithinE.png',
      linkBuy:'https://www.amway.com.br/pt/Suplemento-de-Vitamina-E---Nutrilite/p/A4309?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=vitaminaE',
      count: 0,
      itemsku: 'A4309',
    },
    {
      id: 16,
      name: 'Multicaroteno',
      whyIsRecommended: 'Suplemento alimentar que fornece alfacaroteno e betacaroteno, luteína e zeaxantina. Os alfa e betacarotenos são convertidos em vitamina A no organismo após serem consumidos. Importante para a proteção das células contra os danos causados pelos radicais livres e para a manutenção da visão.',
      img: 'assets/img/LAS/Multicaroteno.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Multicaroteno.png',
      linkBuy:'',
      count: 0,
      itemsku: '',
    },
    {
      id: 17,
      name: 'Daily +1 - Beleza',
      whyIsRecommended: 'Esta combinação, juntamente com uma alimentação equilibrada, fornece nutrientes como a vitamina C, que ajuda na formação do colágeno, uma proteína que dá estrutura, firmeza e elasticidade à pele e seus órgãos anexos: cabelo e unhas. Além disso, nutrientes como vitamina B2, biotina, vitamina A, vitamina E, cobre e selênio podem ajudar a manter a pele em condições adequadas (macia, lisa, fresca, firme), o cabelo em condições normais, brilhante, macio e resistente, e as unhas saudáveis, ou seja, fortes e resistentes.',
      img: 'assets/img/LAS/Daily+1/Luce_radiante.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily+1/Luce_radiante.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-BELEZA-D45/p/321236?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=daily1_beleza',
      count: 0,
      itemsku: '321236',
    },
    {
      id: 18,
      name: 'Daily + 1 - Equilíbrio intestinal',
      whyIsRecommended: 'A principal função do intestino é absorver os nutrientes e a água, ao mesmo tempo em que elimina os resíduos da digestão. O intestino também desempenha outras funções extraintestinais relacionadas à microbiota intestinal. Os prebióticos ou fibras vegetais (como a da chicória) servem como alimento para as bactérias benéficas, estimulam o seu crescimento e ajudam a diminuir a absorção de gorduras e açúcares da alimentação. Esta solução contribui para o bem-estar intestinal, fornecendo vitaminas, minerais e fibras solúveis.',
      img: 'assets/img/LAS/Daily+1/Vive_libre.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Daily+1/Vive_libre.png',
      linkBuy:'https://www.amway.com.br/pt/Daily%2B1-EQUILIBRIO-INTESTINAL-D90/p/321611?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=equilibrio_intestinal',
      count: 0,
      itemsku: '321611',
    },
    {
      id: 19,
      name: 'Alho Concentrado',
      whyIsRecommended: 'Contém alicina e quercetina. Pode contribuir para a redução dos níveis elevados de gordura no sangue e prevenir a formação de depósitos de gordura nas artérias. Hipotensor.',
      img: 'assets/img/LAS/Ajo_Concentrado.png',
      emailImg: 'https://recomendador-br-amway.web.app/assets/img/LAS/Ajo_Concentrado.png',
      linkBuy:'https://www.amway.com.br/pt/Garlic-Plus-Nutrilite/p/125618?utm_source=site&utm_medium=home&utm_campaign=br_pt_site_trazabilidad&utm_content=cta_compra&utm_term=Garlic',
      count: 0,
      itemsku: '125618',
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
        
    this.functionpage2(this.pagina);
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


funtionAtribute2(){
  try{
    var nodo = document.getElementById("seleccion");

    var valorQuestion = document.createAttribute("question");
    var valorAnswer = document.createAttribute("answer");

    valorQuestion.value = "";
    valorAnswer.value = "";


    nodo?.setAttributeNode(valorQuestion);
    nodo?.setAttributeNode(valorAnswer);



  } catch (error) {
    console.log(error);
  }
}
  
updateUtagView() {
  if (window.utag && window.utag.view) {
      // Asegúrate de que los datos de utag_data están correctamente definidos
      if (window.utag_data) {
          utag.view(window.utag_data);
          console.log('Datos enviados a Tealium:', window.utag_data);
      } else {
          console.error('Datos de uTag no están definidos.');
      }
  } else {
      console.error('uTag o uTag.view no está disponible.');
  }
}

  functionpage2(pagina: number) {
    // Asegúrate de que `utag` y `window.utag_data` estén definidos
    if (!window.utag || !window.utag_data) {
        console.error('Tealium uTag no está disponible.');
        return;
    }

    // Actualizar `utag_data` según el valor de `pagina`
    switch (pagina) {
        case 0:
            this.utag_data.page_section = "country";
            break;

        case 1:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;

        case 2:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;

        case 3:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 4:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 5:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 6:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;

        case 7:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 8:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 9:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 10:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 11:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 12:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 13:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 14:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 15:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 16:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 17:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;
        case 18:
                this.utag_data.page_section = "questionnaire_start";
                this.utag_data.site_country = this.questions[0]?.country || ''; // Asegúrate de que `questions[0]` esté definido
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;

        case 19:
                this.utag_data.page_section = "questionnaire_complete";
                this.utag_data.site_country = this.questions[0]?.country || '';
                this.utag_data.site_currencyCode = this.getCurrencyCode(this.questions[0]?.country || '');
                break;

        default:
            console.warn('Página no reconocida:', pagina);
            return;
    }


        // Actualizar `window.utag_data` con los nuevos datos
        window.utag_data = { ...window.utag_data, ...this.utag_data };

        this.updateUtagView();
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
    //console.error([...this.recommendedProducts]);

    this.validateSpecialConditions();
  }

  validateSpecialConditions(){

    
    let hasDaily1 = false;
    let daily1Index = null;

    let hasDailyPlus = false;
    let dailyPlusIndex = null;


    for (let i = 0; i < this.recommendedProducts.length; i++) {
      if(this.recommendedProducts[i].name == 'Daily Plus'){
        hasDailyPlus = true;
        dailyPlusIndex = i;
      }else if(this.recommendedProducts[i].name.includes('Daily +1')){
        hasDaily1 = true;
        daily1Index = i;
      }
    }


    if(hasDailyPlus && hasDaily1){
      if(dailyPlusIndex !== null && daily1Index !== null) {
        this.recommendedProducts[dailyPlusIndex] = null;
      }
    }


    //console.log([...this.recommendedProducts]);

    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });

   // console.warn([...this.recommendedProducts]);

    this.validateCountryConditions();
  }

  validateCountryConditions(){

    for (let i = 0; i < this.recommendedProducts.length; i++) {
      


        // Cambiar imagen
        // Cambiar nombre de C Plus a Acerola masticable

        // eliminar Double X
        // eliminar Multicaroteno
        // eliminar B Plus
        // eliminar daily+1 prende tu dia
        // eliminar Tri Iron Folic
        this.recommendedProducts[i].img = this.recommendedProducts[i].img.replaceAll(/LAS/gi, "BZ");
        this.recommendedProducts[i].emailImg = this.recommendedProducts[i].emailImg.replaceAll(/LAS/gi, "BZ");

        if(this.recommendedProducts[i].name == 'C Plus')
          this.recommendedProducts[i].name = 'Acerola Masticable';

        if(this.recommendedProducts[i].name == 'Double X' || 
          this.recommendedProducts[i].name == 'Multicaroteno' ||
          this.recommendedProducts[i].name == 'B Plus' ||
          this.recommendedProducts[i].name == 'Daily +1 Prende tu día' ||
          this.recommendedProducts[i].name == 'Tri Iron Folic')
          this.recommendedProducts[i] = null;

      
    }

    //console.log([...this.recommendedProducts]);

    this.recommendedProducts = this.recommendedProducts.filter((product) => {
      if(product != null) return product;
    });+

    //console.warn([...this.recommendedProducts]);

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

        if(this.questions[indexQuestion].question == "Você é mulher ou homem?"){
          this.funtionAtribute(this.questions[indexQuestion].question);
        }
        else if(this.questions[indexQuestion].question == "Qual é a sua idade?"){
          this.funtionAtribute(this.questions[indexQuestion].question);
        }
        else{
          this.funtionAtribute2();
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
    this.pagina = this.questionIndex;

    this.functionpage2(this.pagina);
    //this.updateUtagView();    


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


    

    this.questions[0].country = 'br';
    this.country = this.questions[0].country;

this.questionIndex += 1;
this.pagina = this.questionIndex;

this.functionpage2(this.pagina);
//this.updateUtagView();    
    console.log(this.country);


    
    const navigationExtras: NavigationExtras = {
      fragment: 'question' + this.questionIndex
      };
      this.router.navigate(['/questionnaire'], navigationExtras);
    
    setTimeout(() => {
      //utag.view(window.utag_data);
    }, 500);    
    

  }

  getCurrencyCode(country: string) {
    if (country == 'br') return 'brl';
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
