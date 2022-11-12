/** The <head> shared between all pages, with utf-8, viewport, and favicon. */
export default async function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}
