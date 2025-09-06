import * as React from "react"
import { Link } from "gatsby"

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}


const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>404 - Página no encontrada</h1>
      <p style={paragraphStyles}>
        Lo sentimos, la página que buscas no existe.
        <br />
        <Link to="/">Volver al inicio</Link>
      </p>
    </main>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
