import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { 
    path: 'documentation',
     loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule) 
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
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
