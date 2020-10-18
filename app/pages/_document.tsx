import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover">

          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
