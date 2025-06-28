import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse, NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { isAuthenticated } = getKindeServerSession()
  if(!(await isAuthenticated())){
      return NextResponse.redirect(new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url))
  }
}
 
export const config = {
    //NOTE -  If you have more that one page you have use array of matcher
  matcher: ['/dashboard'],
}