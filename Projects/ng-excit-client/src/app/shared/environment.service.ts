import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class EnvironmentService {
    private environment: string;
    private environmentStorageVariableName = 'environment';
    private environmentSubject = new BehaviorSubject<string>('Production');
    public environment$ = this.environmentSubject.asObservable();

    constructor() {
        const storedValue = localStorage.getItem(this.environmentStorageVariableName);
        this.environment = storedValue ? storedValue : 'Production';
        this.environmentSubject.next(this.environment);
    }

    setEnvironment(value: string): void {
        this.environment = value;
        localStorage.setItem(this.environmentStorageVariableName, value);
        this.environmentSubject.next(this.environment);
    }

    getEnvironment(): string {
        return this.environment;
    }

    refresh(): void {
        this.environmentSubject.next(this.environment);
    }
}
