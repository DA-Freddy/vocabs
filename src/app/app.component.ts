import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './shared/services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vocable-app';

  constructor(public firebaseService : FirebaseService){}

  vocabulary = {
    english: '',
    german: ''
  };

  submitVocabulary() {
    this.firebaseService.addVocabularyToDatabase(this.vocabulary);
    this.clearInputFields();
  }

  clearInputFields() {
    this.vocabulary.english = '';
    this.vocabulary.german = '';
  }
}
