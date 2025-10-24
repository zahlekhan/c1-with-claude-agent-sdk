import Anthropic from '@anthropic-ai/sdk';
import { ThesysTool } from './tools/thesys';

export interface AgentConfig {
  anthropicApiKey: string;
  openaiApiKey: string;
  thesysBaseURL: string;
}

export class ClaudeWebAgent {
  private anthropic: Anthropic;
  private thesysTool: ThesysTool;
  private config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
    this.anthropic = new Anthropic({ apiKey: config.anthropicApiKey });
    this.thesysTool = new ThesysTool(config.openaiApiKey, config.thesysBaseURL);
  }

  async chat(message: string): Promise<any> {
    try {
      console.log('User message:', message);

      // Define the Thesys visualization tool for Claude
      const tools: Anthropic.Tool[] = [
        {
          name: 'create_visualization',
          description: 'Create interactive visualizations, diagrams, charts, and flowcharts using Thesys C1 API. Use this when the user asks to visualize, diagram, chart, or show something graphically.',
          input_schema: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
                description: 'Description of the visualization to create',
              },
            },
            required: ['prompt'],
          },
        },
      ];

      // Query Claude with the Thesys tool available
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        tools: tools,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      });

      console.log('Claude response:', JSON.stringify(response, null, 2));

      // Check if Claude used the visualization tool
      const toolUseBlock = response.content.find(
        (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
      );

      if (toolUseBlock && toolUseBlock.name === 'create_visualization') {
        console.log('Creating visualization with Thesys...');
        const input = toolUseBlock.input as { prompt: string; type?: string };

        const vizResult = await this.thesysTool.createVisualization({
          prompt: input.prompt,
        });

        // Get Claude's text response if any
        const textBlock = response.content.find(
          (block): block is Anthropic.TextBlock => block.type === 'text'
        );

        return {
          success: true,
          response: {
            message: textBlock?.text || 'Here is your visualization:',
            visualization: vizResult.data,
          },
        };
      }

      // Return Claude's text response
      const textBlock = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === 'text'
      );

      return {
        success: true,
        response: {
          message: textBlock?.text || 'I received your message.',
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
