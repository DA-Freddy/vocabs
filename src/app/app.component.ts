import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vocable-app';

  constructor(public firebaseService : FirebaseService){}
}
