export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserSession();
    if (!user.loggedIn.value) {
        return navigateTo('/');
    }
})
