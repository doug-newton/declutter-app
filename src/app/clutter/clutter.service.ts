import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface AddClutterData {
  name: string
  description: string | null
}

export interface AddClutterResponse {
  message: string
  clutterId: string
}

export interface Clutter {
  name: string
  description: string | null
}

export interface GetClutterResponse {
  message: string,
  clutter: Clutter[]
}

@Injectable({
  providedIn: 'root'
})
export class ClutterService {

  constructor(
    private http: HttpClient
  ) { }

  addClutter(data: AddClutterData) {
    this.http.post<AddClutterResponse>('http://localhost:3000/api/clutter/create', data).subscribe()
  }

  getClutter(): Observable<Clutter[]> {
    return this.http.get<GetClutterResponse>('http://localhost:3000/api/clutter').pipe(
      map(response => response.clutter)
    )
  }
}
