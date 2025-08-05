import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  unsubscribe;
  vocabs: {
    id: string,
    german: string,
    english: string,
  }[] = [];

  constructor(private firestore: Firestore) {
    this.unsubscribe = onSnapshot(collection(this.firestore, "vocabs"), (vocabsSnapshot) => {
      this.vocabs = [];
      vocabsSnapshot.forEach((vocab) => {
        console.log(vocab.data());
        this.vocabs.push(
          this.setVocabObjects(vocab.data(), vocab.id)
        );
      })
    })
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  async addVocabularyToDatabase(vocabulary: {
    english: string,
    german: string,
  }) {
    await addDoc(collection(this.firestore, "vocabs"), vocabulary);
  }

  async deleteVocabs(vocabId: string){
    await deleteDoc(doc(this.firestore, "vocabs", vocabId));
  }

  setVocabObjects(obj: any, id: string) {
    return {
      id: id || '',
      german: obj.german || '',
      english: obj.english || '',
    };
  }
}
