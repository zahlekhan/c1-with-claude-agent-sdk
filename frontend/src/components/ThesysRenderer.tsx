import React from 'react';
import { C1Component, ThemeProvider } from '@thesysai/genui-sdk';
import { TaskList } from './TaskList';

interface ThesysRendererProps {
  data: any;
}

export const ThesysRenderer: React.FC<ThesysRendererProps> = ({ data }) => {
  // If data is not a string, it might be an error or invalid response
  if (!data || typeof data !== 'string') {
    return (
      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
        <div className="text-sm font-semibold text-red-900 mb-2">
          ⚠️ Invalid Visualization Data
        </div>
        <div className="text-xs text-red-600">
          Expected a C1 response string but received: {typeof data}
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <C1Component
        c1Response={data}
        isStreaming={false}
        customComponents={{ TaskList }}
      />
    </ThemeProvider>
  );
};
