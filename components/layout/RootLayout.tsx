import React, { PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'

interface RootLayoutProps {
  children: React.ReactNode
}
const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default RootLayout