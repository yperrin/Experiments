import { getState, patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { combineLatest, of, pipe, switchMap, tap } from 'rxjs';
import { computed, inject } from '@angular/core';
import { setLoaded, setLoading, withCallState } from '@fdm-ui/shared';
import { Agent, AgentModel, AgentResponse, AgentState } from './agent.model';
import { AgentService } from './agent.service';

const initialState: AgentState = {
  sessionId: '',
  agent: 'gemini',
  model: 'Auto',
  agents: [],
  prompt: '',
  selectedFiles: [],
  thread: [],
};

export const AgentStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withCallState(),
  withComputed(({ agent, agents }) => {
    return {
      models: computed(() => {
        const value = agents().find((a) => a.id === agent())?.models || [];
        return value;
      }),
    };
  }),
  withMethods((store) => {
    return {
      setPrompt: (prompt: string) => {
        patchState(store, { prompt });
      },
      setAgent: (agent: string) => {
        const models = store.agents().find((a) => a.id === agent)?.models || [];
        if (models.length > 0) {
          patchState(store, { agent, model: models[0].value });
        } else {
          patchState(store, { agent });
        }
      },
      setModel: (model: string) => {
        patchState(store, { model });
      },
    };
  }),
  withMethods((store) => {
    const agentService = inject(AgentService);
    return {
      queryPrompt: rxMethod<{ formData: FormData }>(
        pipe(
          tap(({ formData }) => {
            const agent = store.agent();
            let prompt = (formData.get('prompt') as string);
            if (agent === 'n8n') {
              const name = store.models().find((models) => models.value === store.model())?.name
              prompt = 'Calling workflow \'' + name + '\'...';
            }
            const userPrompt: AgentResponse = {
              type: 'user',
              content: prompt,
            };
            patchState(store, setLoading());
            patchState(store, { thread: [...getState(store).thread, userPrompt], prompt: '' });
          }),
          switchMap(({ formData }) => {
              return agentService.callN8NChat(formData, store.agent(), store.model(), store.sessionId());
          }),
          tap((agentResponse) => {
            patchState(store, { thread: [...getState(store).thread, agentResponse] });
            patchState(store, setLoaded());
          })
        )
      ),
    };
  }),
  withHooks({
    onInit: (store) => {
      patchState(store, setLoading());
      const agentService = inject(AgentService);
      const agents: Agent[] = [];
      agents.push({
        id: 'gemini',
        name: 'Gemini',
        models: [
          { name: 'Auto', value: 'Auto' },
          { name: 'Gemini 1.5', value: 'models/gemini-1.5-flash' },
          { name: 'Gemini 2.0 Flash', value: 'models/gemini-2.0-flash' },
          { name: 'Gemini 2.5 Flash', value: 'models/gemini-2.5-flash-preview-04-17-thinking' },
        ],
      });
      patchState(store, { agents, model: 'Auto', sessionId: crypto.randomUUID() });

      // need to use combine latest
      combineLatest([agentService.getAAndGModels(), agentService.getN8nWorkflows()]).subscribe({
        next: ([agModels, n8nModels]) => {
          if (agModels && agModels.length > 0) {
            agents.push({
              id: 'A&G',
              name: 'A&G',
              models: agModels,
            });
          }
          if (n8nModels && n8nModels.length > 0) {
            const n8nAgentModels: AgentModel[] = n8nModels.map(
              (model) =>
                ({
                  name: model.name,
                  value: model.id + ';' + model.async,
                } as AgentModel)
            );
            agents.push({
              id: 'n8n',
              name: 'N8N',
              models: n8nAgentModels,
            });
          }
          patchState(store, { agents });
          patchState(store, setLoaded());
        },
        error: (error) => {
          const models: AgentModel[] = [{ name: 'Error-VPN?', value: '' }];
          agents.push({
            id: 'A&G',
            name: 'A&G',
            models,
          });
          patchState(store, { agents });
          patchState(store, setLoaded());
          console.error('Error fetching A&G models:', error);
        },
      });
    },
  })
);
