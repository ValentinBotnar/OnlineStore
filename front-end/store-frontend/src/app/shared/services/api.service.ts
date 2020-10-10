import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private httpClient: HttpClient) { }

    public post(url: string, payload: any, headers?: any): Observable<any> {
        return this.httpClient.post<any>(url, payload);
    }

    public get(url: string): Observable<any> {
        return this.httpClient.get<any>(url);
    }

    public put(url: string, payload: any): Observable<any> {
        return this.httpClient.put<any>(url, payload);
    }

    public delete(url: string): Observable<any> {
        return this.httpClient.delete<any>(url);
    }

}

