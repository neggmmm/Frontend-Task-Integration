import { post, put } from './api'
import { AgentCreateRequest, AgentResponse } from './types'

export async function createAgent(data: AgentCreateRequest): Promise<AgentResponse> {
  try {
    const res = await post<AgentResponse>('/agents', data)
    return res
  } catch (error) {
    console.error('Failed to create agent:', error)
    throw error
  }
}

export async function updateAgent(agentId: string, data: AgentCreateRequest): Promise<AgentResponse> {
  try {
    const res = await put<AgentResponse>(`/agents/${agentId}`, data)
    return res
  } catch (error) {
    console.error('Failed to update agent:', error)
    throw error
  }
}

export async function saveAgent(agentId: string | null, data: AgentCreateRequest): Promise<AgentResponse> {
  if (agentId) {
    return updateAgent(agentId, data)
  } else {
    return createAgent(data)
  }
}
