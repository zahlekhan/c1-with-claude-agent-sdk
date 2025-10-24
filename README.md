# Claude Web Agent with Thesys Integration

A full-stack web application featuring a Claude AI agent with Thesys visualization capabilities. Built with the Claude Agent SDK and integrated with Thesys C1 API for creating interactive visualizations.

## 🌟 Features

- **Phase 1**: Simple Claude agent that responds via HTTP API
- **Phase 2**: Thesys C1 API integration for creating visualizations (diagrams, charts, flowcharts)
- **Phase 3**: React UI with Thesys React SDK for rendering interactive visualizations

## 🏗️ Architecture

```
claude-web-agent/
├── backend/          # Express server + Claude Agent SDK
│   ├── src/
│   │   ├── index.ts      # Server entry point
│   │   ├── agent.ts      # Claude agent setup
│   │   └── tools/
│   │       └── thesys.ts # Thesys visualization tool
│   └── package.json
│
└── frontend/         # React + Vite UI
    ├── src/
    │   ├── App.tsx           # Main component
    │   ├── components/
    │   │   ├── ChatInput.tsx
    │   │   ├── MessageList.tsx
    │   │   └── ThesysRenderer.tsx
    │   └── services/
    │       └── api.ts
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Anthropic API Key
- OpenAI API Key (for Thesys API access)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd claude-web-agent
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   THESYS_API_BASE_URL=https://api.thesys.dev/v1
   PORT=3001
   ```

3. **Install dependencies**
   ```bash
   # Install all dependencies (backend + frontend)
   npm run install:all
   ```

### Running the Application

#### Option 1: Run Both (Recommended)
```bash
npm run dev
```
This starts both backend (port 3001) and frontend (port 3000) concurrently.

#### Option 2: Run Separately
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📖 Usage

### Basic Chat

1. Open http://localhost:3000 in your browser
2. Type a message in the input box
3. Claude will respond to your message

### Creating Visualizations

Ask Claude to create visualizations:

**Example prompts:**
- "Create a flowchart showing the user authentication process"
- "Show me a diagram of microservices architecture"
- "Visualize the steps in a machine learning pipeline"
- "Draw a chart comparing different data structures"

Claude will use the Thesys tool to generate interactive visualizations!

## 🛠️ Technology Stack

### Backend
- **@anthropic-ai/claude-agent-sdk**: Claude AI agent capabilities
- **openai**: SDK for calling Thesys C1 API
- **express**: HTTP server
- **typescript**: Type safety

### Frontend
- **react**: UI framework
- **@thesys/react**: Thesys visualization renderer
- **vite**: Fast dev server and build tool
- **tailwindcss**: Styling
- **axios**: HTTP client

## 📡 API Endpoints

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Claude Web Agent is running"
}
```

### `POST /api/chat`
Send a message to the Claude agent.

**Request:**
```json
{
  "message": "Create a diagram of a REST API"
}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "message": "Here's your REST API diagram:",
    "visualization": {
      // Thesys C1 visualization data
    }
  }
}
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev
```

The backend will auto-reload on file changes.

### Frontend Development
```bash
cd frontend
npm run dev
```

The frontend will auto-reload on file changes with HMR (Hot Module Replacement).

### Building for Production

```bash
# Build both backend and frontend
npm run build

# Or build separately
npm run build:backend
npm run build:frontend
```

## 📝 Notes

### Thesys React SDK Integration

The current implementation includes a placeholder for the `@thesys/react` package. Once you have access to the actual package, update `ThesysRenderer.tsx`:

```tsx
import { C1Renderer } from '@thesys/react';

export const ThesysRenderer: React.FC<ThesysRendererProps> = ({ data }) => {
  return <C1Renderer data={data} />;
};
```

### Customizing the Agent

Edit `backend/src/agent.ts` to customize the agent's behavior, add more tools, or change the model.

### Adding More Tools

Create new tool files in `backend/src/tools/` and register them in the agent configuration.

## 🐛 Troubleshooting

**Backend won't start:**
- Check that all environment variables are set in `.env`
- Verify your API keys are valid
- Ensure port 3001 is not in use

**Frontend can't connect:**
- Make sure the backend is running on port 3001
- Check the browser console for CORS errors
- Verify the proxy configuration in `vite.config.ts`

**Thesys visualizations not rendering:**
- Ensure `@thesys/react` package is installed
- Check that the Thesys API is accessible
- Verify your OpenAI API key has access to Thesys endpoints

## 📚 Resources

- [Claude Agent SDK Documentation](https://docs.claude.com/en/api/agent-sdk/overview)
- [Thesys Documentation](https://docs.thesys.dev)
- [Anthropic API Documentation](https://docs.anthropic.com)

## 📄 License

MIT

## 🤝 Contributing

Feel free to open issues or submit pull requests!

---

Built with ❤️ using Claude Agent SDK and Thesys
