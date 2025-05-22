import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AgentModel, AgentResponse, Workflow } from './agent.model';

@Injectable({providedIn: 'root'})
export class AgentService {
    private readonly apiUrl = 'http://localhost:5678';
    constructor(private httpClient: HttpClient) { }
    
    callN8NChat(formData: FormData, agent: string, model: string, sessionId: string): Observable<AgentResponse> {
        const headers = new HttpHeaders();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'multipart/form-data');
        formData.append('agent', agent);
        formData.append('model', model);
        formData.append('sessionId', sessionId);
        return this.httpClient.post(this.apiUrl + '/webhook/chat', formData, { headers, observe: 'response' }).pipe(
            map((response) => {
                const value: AgentResponse = { 
                    type: 'agent',
                    content: (response.body as any)?.async ? 'The workflow was triggered' : (response.body as any)?.output as string                   
                }
                if (!value.content || value.content === '') {
                    value.type = 'error';
                    value.content = agent + ' is not able to process this request.';
                }
                return value;
            }),
            catchError((error) => {
                const value: AgentResponse = { 
                    type: 'error',
                    content: error.message
                }
                return of(value);
            })
        );
    }

    getAAndGModels(): Observable<AgentModel[]> {
        return this.httpClient.get<{models: AgentModel[]}>(this.apiUrl + '/webhook/ag/models').pipe(
            map((response) => {
                return response.models;
            }),
            catchError((error) => {
                console.error('Error fetching A&G models:', error);
                return of([]);
            })
        );
    }

    getN8nWorkflows(): Observable<Workflow[]> {
        return this.httpClient.get<Workflow[]>(this.apiUrl + '/webhook/n8n/workflows');
    }
}