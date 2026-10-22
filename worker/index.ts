interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
}

/**
 * Embeddables Hosting serves a file that exists in the build before this Worker runs, but it
 * does not apply `not_found_handling`. Every other path is a client route, so it gets the app
 * shell and React Router renders it.
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const shell = new URL('/', request.url)
    return env.ASSETS.fetch(new Request(shell, request))
  },
}
