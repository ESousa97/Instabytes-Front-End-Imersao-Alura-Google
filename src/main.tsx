import React from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Oops! Algo deu errado
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Ocorreu um erro inesperado na aplicação. Tente recarregar a página ou entre em contato com o suporte se o problema persistir.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
            >
              Recarregar Página
            </button>
            {this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">
                  Detalhes do erro
                </summary>
                <pre className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Função para esconder a tela de loading
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    setTimeout(() => {
      document.body.classList.add('loaded')
    }, 1000)
  }
}

// Tipagem explícita do root element
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)

// Esconder loading screen quando o React carregar
hideLoadingScreen()
