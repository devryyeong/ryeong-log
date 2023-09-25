import React, { PropsWithChildren } from "react";
import Header from './Header'
import Footer from './Footer'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

export default RootLayout