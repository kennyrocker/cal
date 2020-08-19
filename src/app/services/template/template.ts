import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../../constants/apiUrl';

@Injectable()
export class TemplateService {

    constructor(private http: HttpClient) {}

    public getTemplateSample(lang: string): Observable<any> {
        return this.http.get(apiUrls.GET_TEMPLATE_SAMPLE(lang));
    }
}
