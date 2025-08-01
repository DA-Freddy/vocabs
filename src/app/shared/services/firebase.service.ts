import { Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  unsubscribe;
  vocabs : {
    id: string,
    german : string,
    english : string,
  }[] = [];

  constructor(private firestore : Firestore){
    this.unsubscribe = onSnapshot(collection(this.firestore, "vocabs"),(vocabsSnapshot)=>{
      vocabsSnapshot.forEach((vocab)=>{
        console.log(vocab.data());
        this.vocabs.push(
          this.setVocabObjects(vocab.data(), vocab.id)
        );
      })
    })
  }

  ngOnDestroy(){
    this.unsubscribe();
  }
 
  setVocabObjects(obj: any, id: string) {
    return {
      id: id || '',
      german: obj.german || '',
      english: obj.english || '',
    };
  }
}
