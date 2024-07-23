import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'start-questionnaire',
        loadComponent: () => import('./components/start-questionnaire/start-questionnaire.component').then(c => c.StartQuestionnaireComponent)
    },
    {
        path: 'how-does-it-work',
        loadComponent: () => import('./components/how-does-it-work/how-does-it-work.component').then(c => c.HowDoesItWorkComponent)
    },
    {
        path: 'questionnaire',
        loadComponent: () => import('./components/questionnaire/questionnaire.component').then(c => c.QuestionnaireComponent)
    },
    {
        path: 'recommendations',
        loadComponent: () => import('./components/recommendations/recommendations.component').then(c => c.RecommendationsComponent)
    },
    {
        path: 'countries',
        loadComponent: () => import('./components/countries/countries.component').then(c => c.CountriesComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'start-questionnaire'
    }
];
