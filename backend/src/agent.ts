import { query, tool, createSdkMcpServer } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { ThesysTool } from './tools/thesys';

export interface AgentConfig {
  anthropicApiKey: string;
  openaiApiKey: string;
  thesysBaseURL: string;
}

export class ClaudeWebAgent {
  private thesysTool: ThesysTool;
  private config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
    this.thesysTool = new ThesysTool(config.openaiApiKey, config.thesysBaseURL);
  }

  async chat(message: string): Promise<any> {
    try {
      console.log('User message:', message);
      
      // For Phase 1: Simple response
      // The Claude Agent SDK is more complex and designed for code-centric tasks
      // For a simple web chat, we'll use a basic response
      
      // Check if message requests visualization
      const needsVisualization = /visuali[sz]e|diagram|chart|flowchart|graph|show.*diagram/i.test(message);
      
      if (needsVisualization) {
        console.log('Creating visualization with Thesys...');
        const vizResult = await this.thesysTool.createVisualization({
          prompt: message,
          type: 'auto',
        });
        
        return {
          success: true,
          response: {
            message: 'Here is your visualization:',
            visualization: vizResult.data,
          },
        };
      }
      
      // Simple response for Phase 1
      return {
        success: true,
        response: {
          message: 'hi',
        },
      };
    } catch (error: any) {
      console.error('Agent error:', error);
      return {
        success: false,
        error: error.message || 'Failed to process message',
      };
    }
  }
}
