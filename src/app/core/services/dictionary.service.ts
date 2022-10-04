import { Dictionary } from '@models/dictionary.model';
import { environment } from './../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.api}words`;

  getDictionaries(): Observable<Dictionary[]> {
    return this.httpClient.get<Dictionary[]>(this.API);
  }

  getDictionaryById(id: string): Observable<Dictionary> {
    return this.httpClient.get<Dictionary>(`${this.API}/${id}`);
  }

  createDictionary(dictionary: Dictionary) {
    return this.httpClient.post<Dictionary>(this.API, dictionary);
  }

  updateDictionary(body: Dictionary) {
    return this.httpClient.patch<Dictionary>(`${this.API}/${body._id}`, body);
  }

  deleteDictionary(id: string) {
    return this.httpClient.delete<Dictionary>(`${this.API}/${id}`);
  }
}
