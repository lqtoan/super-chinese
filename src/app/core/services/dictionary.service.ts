import { Word } from '@models/word.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DictionaryService {
  constructor(private readonly _httpClient: HttpClient) {}

  private API = `${environment.api}words`;

  getAllWords(): Observable<Word[]> {
    return this._httpClient.get<Word[]>(`${this.API}`);
  }

  getLatestWords(): Observable<Word[]> {
    return this._httpClient.get<Word[]>(`${this.API}/latest`);
  }

  createWord(word: Word) {
    return this._httpClient.post<Word>(this.API, word);
  }

  updateWord(body: Word) {
    return this._httpClient.patch<Word>(`${this.API}/${body._id}`, body);
  }

  deleteWord(id: string) {
    return this._httpClient.delete<Word>(`${this.API}/${id}`);
  }

  search(keyword?: string) {
    return this._httpClient.get<Word[]>(`${this.API}/search?keyword=${keyword}`);
  }
}
