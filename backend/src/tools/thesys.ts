import OpenAI from 'openai';
import { CUSTOM_COMPONENT_SCHEMAS } from '../schemas/customComponents';

export interface ThesysVisualizationRequest {
  prompt: string;
}

export interface ThesysVisualizationResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class ThesysTool {
  private client: OpenAI;
  private baseURL: string;

  constructor(apiKey: string, baseURL: string = 'https://api.thesys.dev/v1') {
    this.baseURL = baseURL;
    this.client = new OpenAI({
      apiKey,
      baseURL: this.baseURL,
    });
  }

  async createVisualization(request: ThesysVisualizationRequest): Promise<ThesysVisualizationResponse> {
    try {
      console.log('Creating visualization with Thesys:', request);

      // Call Thesys C1 API using OpenAI SDK with custom component schemas
      const response = await this.client.chat.completions.create({
        model: 'c1/anthropic/claude-sonnet-4/v-20250915',
        messages: [
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        // Pass custom component schemas to enable C1 to use our custom components
        // @ts-ignore - OpenAI SDK types don't include metadata but Thesys API supports it
        metadata: {
          thesys: JSON.stringify({
            c1_custom_components: CUSTOM_COMPONENT_SCHEMAS,
          }),
        },
      });

      console.log('Thesys response:', JSON.stringify(response, null, 2));
      const content = response.choices[0].message.content;

      return {
        success: true,
        data: content,
      };
    } catch (error: any) {
      console.error('Error creating visualization:', error);
      return {
        success: false,
        error: error.message || 'Failed to create visualization',
      };
    }
  }

  // Tool definition for Claude Agent SDK
  getToolDefinition() {
    return {
      name: 'create_visualization',
      description: 'Creates interactive visualizations, diagrams, charts, and flowcharts using Thesys C1 API. Use this when the user asks to visualize data, create diagrams, or show information graphically. Supports custom components like TaskList for displaying interactive task management interfaces.',
      input_schema: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            description: 'Description of the visualization to create. Be specific about what needs to be visualized. For task management, ask C1 to use the TaskList custom component.',
          },
          type: {
            type: 'string',
            enum: ['diagram', 'chart', 'flowchart', 'auto'],
            description: 'Type of visualization to create. Use "auto" to let Thesys decide the best format.',
          },
        },
        required: ['prompt'],
      },
    };
  }
}
