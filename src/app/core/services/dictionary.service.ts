import { Word } from '@models/word.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.api}words`;

  getWords(): Observable<Word[]> {
    return this.httpClient.get<Word[]>(`${this.API}`);
  }

  getWordById(id: string): Observable<Word> {
    return this.httpClient.get<Word>(`${this.API}/${id}`);
  }

  createWord(word: Word) {
    return this.httpClient.post<Word>(this.API, word);
  }

  updateWord(body: Word) {
    return this.httpClient.patch<Word>(`${this.API}/${body._id}`, body);
  }

  deleteWord(id: string) {
    return this.httpClient.delete<Word>(`${this.API}/${id}`);
  }

  search(keyword?: string) {
    return this.httpClient.get<Word[]>(`${this.API}/search?keyword=${keyword}`);
  }
}
