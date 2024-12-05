import { ThemeProvider } from '@mui/material/styles'
import ReactQueryProvider from './react-query-provider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import theme from '@avc/app/theme'
import { ApolloWrapper } from '@avc/lib/apollo/apollo-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'css' }}>
      <ThemeProvider theme={theme}>
        <ApolloWrapper>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ApolloWrapper>
      </ThemeProvider>
    </AppRouterCacheProvider>
  )
}
