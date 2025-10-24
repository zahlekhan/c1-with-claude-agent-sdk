import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface ChatMessage {
  message: string;
}

export interface ChatResponse {
  success: boolean;
  response?: any;
  error?: string;
}

export const api = {
  async chat(message: string): Promise<ChatResponse> {
    try {
      const response = await axios.post<ChatResponse>(
        `${API_BASE_URL}/api/chat`,
        { message }
      );
      return response.data;
    } catch (error: any) {
      console.error('API error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to send message',
      };
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data.status === 'ok';
    } catch (error) {
      return false;
    }
  },
};
