# Nuxt Passkeys Sample

This is example implementation of Passwordless identification.
Say goodbye to forgotten passwords, thanks to [webauthn](https://webauthn.guide).

As persistent storage is used [NuxtHub KV](https://hub.nuxt.com/docs/features/kv)

You can try it at [nuxt.dev](https://nuxt-passkeys.nuxt.dev)

## Dependencies

```json
{
  "dependencies": {
    "@nuxthub/core": "^0.8.7",
    "@simplewebauthn/browser": "^11.0.0",
    "@simplewebauthn/server": "^11.0.0",
    "h3-zod": "^0.5.3",
    "human-id": "^4.1.1",
    "nanoid": "3",
    "nuxt": "^3.14.159",
    "nuxt-auth-utils": "^0.5.3",
    "vue": "latest",
    "vue-router": "latest",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "wrangler": "^3.86.1"
  }
}
```
