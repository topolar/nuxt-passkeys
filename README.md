# Nuxt Passkeys Sample

A modern implementation of passwordless authentication using WebAuthn in a Nuxt.js application. This project demonstrates how to implement secure, passwordless authentication using passkeys, leveraging the Web Authentication API (WebAuthn).

## 🌟 Features

- **Passwordless Authentication**: Secure login using device biometrics or security keys
- **WebAuthn Integration**: Built using the Web Authentication API
- **Persistent Storage**: Utilizes NuxtHub KV for data storage
- **Modern Stack**: Built with Nuxt 3 and Vue.js
- **Type Safety**: Full TypeScript support

## 🚀 Demo

Try the live demo at [nuxt-passkeys.nuxt.dev](https://nuxt-passkeys.nuxt.dev)

## 🛠️ Tech Stack

- **Frontend**: Nuxt.js 3, Vue.js
- **Authentication**: WebAuthn (@simplewebauthn/browser, @simplewebauthn/server)
- **Storage**: NuxtHub KV
- **Type Safety**: TypeScript, Zod
- **Development**: Wrangler for development tools

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- PNPM package manager
- A WebAuthn-compatible browser
- A device with biometric capabilities or a security key (for testing)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd nuxt-passkeys
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

## 🚀 Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Building for Production

```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm generate` - Generate static site
- `pnpm preview` - Preview production build
- `pnpm logs-prod` - View production logs

## 🔒 Security

This implementation uses WebAuthn, a secure authentication standard that:
- Eliminates password-related vulnerabilities
- Provides phishing-resistant authentication
- Uses public-key cryptography
- Supports biometric authentication and security keys

## 📦 Dependencies

### Core Dependencies
- `@nuxthub/core`: ^0.8.7
- `@simplewebauthn/browser`: ^11.0.0
- `@simplewebauthn/server`: ^11.0.0
- `nuxt`: ^3.14.159
- `nuxt-auth-utils`: ^0.5.3
- `vue`: latest
- `vue-router`: latest

### Utility Dependencies
- `h3-zod`: ^0.5.3
- `human-id`: ^4.1.1
- `nanoid`: 3
- `zod`: ^3.23.8

### Development Dependencies
- `wrangler`: ^3.86.1

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [WebAuthn Guide](https://webauthn.guide) for excellent documentation on Web Authentication
- [Nuxt Team](https://nuxt.com) for the fantastic framework
- [SimpleWebAuthn](https://simplewebauthn.dev) for the WebAuthn implementation
