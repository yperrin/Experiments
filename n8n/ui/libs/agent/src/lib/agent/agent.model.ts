export interface AgentState {
    sessionId: string;
    agent: string;
    model: string;
    agents: Agent[];
    selectedFiles: File[];
    thread: AgentResponse[];
    prompt: string;
}

export interface AgentResponse {
    type: 'user' | 'agent' | 'error';
    content: string;
}

export interface Agent {
    id: string;
    name: string;
    models: AgentModel[];
}

export interface AgentModel {
    name: string;
    value: string;
}

export interface Workflow {
    id: string;
    name: string;
    async: string;
}