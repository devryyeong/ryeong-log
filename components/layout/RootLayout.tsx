import React, { PropsWithChildren } from 'react'
import Header from './Header'

interface RootLayoutProps {
  children: React.ReactNode
}
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <div>footer</div>
    </div>
  )
}

export default RootLayout