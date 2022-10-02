import { environment } from './../../../environments/environment';
import { delay, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dictionary } from './../models/dictionary.model';

@Injectable({ providedIn: 'root' })
export class DictionaryService {
  constructor(private readonly httpClient: HttpClient) {}

  API = `${environment.api}words`;

  getDictionaries(): Observable<Dictionary[]> {
    return this.httpClient.get<Dictionary[]>(this.API).pipe(delay(500));
  }

  createDictionary(dictionary: Dictionary) {
    return this.httpClient.post<Dictionary>(this.API, dictionary);
  }

  deleteDictionary(id: string) {
    return this.httpClient.delete<Dictionary>(`${this.API}/${id}`);
  }
}
