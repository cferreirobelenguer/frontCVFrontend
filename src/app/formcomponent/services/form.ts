import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    private apiUrl = 'http://localhost:3000'; // Reemplaza con la URL de tu servidor

    constructor(private http: HttpClient) { }

    uploadDataWithFile(data: FormData) {
    return this.http.post(`${this.apiUrl}/api/upload`, data);
    }
}
