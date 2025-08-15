import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { WordsPageComponent } from './pages/words-page/words-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { GrammerToLearnPageComponent } from './pages/grammer-to-learn-page/grammer-to-learn-page.component';

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '',
        component: WelcomePageComponent,
        data: { title: 'Home', description: 'There is a home page description' }
      },
      {
        path: 'words-to-learn',
        component: WordsPageComponent,
        data: { title: 'Words', description: 'There is a words to learn page description' }
      },
      {
        path: 'grammer-to-learn',
        component: GrammerToLearnPageComponent,
        data: { title: 'Grammer', description: 'There is a grammer to learn page description' }
      }
    ]
  }
];
