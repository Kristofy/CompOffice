import { auth } from '@/auth';
import { apiAuthPrefix } from '@/routes';

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

	// If you are logged in then the sigin page should redirect to the dashboard
	if (isLoggedIn && nextUrl.pathname === '/api/auth/signin') {
		return Response.redirect(new URL('/', nextUrl));
	}

	// The auth routes are almost always public
	if (isApiAuthRoute) {
		return;
	}

	// If you are visiting a direct link or just / then redirect to the login page if you are not logged in
	if (!isLoggedIn) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);
		return Response.redirect(
			new URL(`/api/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
		);
	}

	return;
});

// Optionally, don't invoke Middleware on some paths
// From clerk
export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
