const React = require('react')
const { AuthProvider } = require('./src/context/AuthContext')

exports.wrapRootElement = ({ element }) => {
    return <AuthProvider>{element}</AuthProvider>
}

