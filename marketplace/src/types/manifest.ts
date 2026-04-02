export interface Skill {
  id: string
  type: 'skill'
  name: string
  description: string
  argumentHint: string | null
  version: string | null
  author: string | null
  license: string | null
  body: string
  assets: string[]
  keywords: string[]
  analogy: string | null
}

export interface Agent {
  id: string
  type: 'agent'
  name: string
  description: string
  category: string
  tools: string[]
  model: string
  body: string
}

export interface Command {
  id: string
  type: 'command'
  name: string
  description: string
  allowedTools: string[]
  argumentHint: string | null
  body: string
}

export interface Collaboration {
  trigger: string[]
  skills: string[]
  description: string
}

export interface Manifest {
  generatedAt: string
  skills: Skill[]
  agents: Agent[]
  commands: Command[]
  collaborations: Collaboration[]
  categories: {
    agents: string[]
  }
  stats: {
    totalSkills: number
    totalAgents: number
    totalCommands: number
  }
}

export type ItemType = 'skill' | 'agent' | 'command'
export type AnyItem = Skill | Agent | Command
