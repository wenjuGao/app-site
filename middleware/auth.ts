export default defineNuxtRouteMiddleware((to, from) => {
	// isAuthenticated() is an example method verifying if a user is authenticated
	// if (isAuthenticated() === false) {
	// 	return navigateTo('/login')
	// }
	navigateTo(to.path)
	console.log(to);
})
