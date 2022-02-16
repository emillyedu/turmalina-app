import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

const routes: Routes = [
  { 
    path: 'documentation',
     loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule) ,
  },
  { 
    path: 'turmalina',
     loadChildren: () => import('./turmalina/turmalina.module').then(m => m.TurmalinaModule) 
  },
  { 
    path: 'rank',
     loadChildren: () => import('./rank/rank.module').then(m => m.RankModule) 
  },
  { 
    path: 'relatorio',
     loadChildren: () => import('./relatorio/relatorio.module').then(m => m.RelatorioModule) 
  },
  { 
    path: 'avaliacoes',
     loadChildren: () => import('./avaliacoes/avaliacoes.module').then(m => m.AvaliacoesModule) 
  },
  { 
    path: 'sandbox',
     loadChildren: () => import('./sandbox/sandbox.module').then(m => m.SandboxModule) 
  },
  {
    path: '',
    redirectTo: 'turmalina',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    ),
    NgCircleProgressModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
