export interface AgentState {
  sessionId: string;
  agent: string;
  model: string;
  agents: Agent[];
  selectedFiles: File[];
  thread: AgentResponse[];
  prompt: string;
  promptHistoryIndex: number;
  promptHistory: string[];
  tasks: TaskModel[];
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

export interface TaskModel {
  name: string;
  run: boolean;
  description: string;
  agent: string;
  model: string;
  prompt: string;
}
