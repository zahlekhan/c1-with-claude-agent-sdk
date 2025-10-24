import OpenAI from 'openai';

export interface ThesysVisualizationRequest {
  prompt: string;
  type?: 'diagram' | 'chart' | 'flowchart' | 'auto';
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
      
      // Call Thesys C1 API using OpenAI SDK
      const response = await this.client.chat.completions.create({
        model: 'thesys-c1',
        messages: [
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        // @ts-ignore - Thesys-specific parameters
        visualization_type: request.type || 'auto',
      });

      console.log('Thesys response:', JSON.stringify(response, null, 2));

      return {
        success: true,
        data: response,
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
      description: 'Creates interactive visualizations, diagrams, charts, and flowcharts using Thesys C1 API. Use this when the user asks to visualize data, create diagrams, or show information graphically.',
      input_schema: {
        type: 'object',
        properties: {
          prompt: {
            type: 'string',
            description: 'Description of the visualization to create. Be specific about what needs to be visualized.',
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
