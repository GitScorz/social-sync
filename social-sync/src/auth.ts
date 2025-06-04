import {
  createAccount,
  createUser,
  findAccount,
  findUserByEmail,
  sendEmail,
} from '@/lib/crud';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import Twitter from 'next-auth/providers/twitter';
import Tiktok from 'next-auth/providers/tiktok';
import NextAuth, { CredentialsSignin } from 'next-auth';

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    // Tiktok,
    Google,
    Twitter,
  ],
  callbacks: {
    async signIn(params) {
      const { account, user, profile } = params;

      const currentSession = await auth();

      const currentUserId = currentSession?.userId;

      // Se já houver um utilizador logado que reconhecemos,
      // e temos uma conta que está sendo acessada com

      if (account && currentUserId) {
        // Do the account linking
        const existingAccount = await findAccount({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        if (existingAccount) {
          throw new Error('Account is already connected to another user!');
        }

        // Vincula apenas contas que ainda não foram vinculadas
        // Vincular a nova conta
        await createAccount({
          providerAccountId: account.providerAccountId,
          provider: account.provider,
          userId: currentUserId,
          email: user.email!,
        });

        // Redirecionar para a página inicial após a conclusão da vinculação
        return '/dashboard/accounts-center';
      }

      return true;
    },

    async jwt(params) {
      const { token, account, user, profile } = params;

      // Se houver uma conta para a qual geramos o JWT (por exemplo, ao entrar)
      // então anexa nosso userId ao token
      if (account) {
        const existingAppAccount = await findAccount({
          provider: account.provider,
          providerAccountId: account.providerAccountId,
        });

        // A conta do utilizador já existe, então associamos o ID do utilizador no token a ser adicionado à sessão no retorno de chamada da sessão
        if (existingAppAccount) {
          token.userId = existingAppAccount.userId;
        }

        // Não existe nenhuma conta com este ID de conta, então provavelmente é um novo "utilizador"
        if (!existingAppAccount) {
          const appUser = await createUser({
            provider: account.provider,
          });

          const accountId = await createAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider,
            userId: appUser.id.toString(),
            email: user.email!,
          });

          token.userId = accountId;

          if (account.provider === 'google') {
            const emailData = {
              subject: 'Bem-vindo ao Social Sync!',
              text: 'Olá,\n\nBem-vindo ao Social Sync! Estamos entusiasmados por tê-lo connosco. Com a nossa plataforma, poderá gerir as suas interações e engajamentos de forma mais eficiente. Aproveite ao máximo os recursos disponíveis e comece a otimizar a sua presença nas redes sociais hoje mesmo.\n\nCom os melhores cumprimentos,\nEquipa Social Sync',
              html: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 20px;
                      }
                      .container {
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                      }
                      .header {
                        text-align: center;
                        padding-bottom: 20px;
                      }
                      .header h1 {
                        color: #333333;
                      }
                      .content {
                        font-size: 16px;
                        line-height: 1.6;
                        color: #666666;
                      }
                      .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 14px;
                        color: #999999;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                        <h1>Bem-vindo ao Social Sync!</h1>
                      </div>
                      <div class="content">
                        <p>Olá,</p>
                        <p>Bem-vindo ao <strong>Social Sync</strong>! Estamos entusiasmados por tê-lo connosco. Com a nossa plataforma, poderá gerir as suas interações e engajamentos de forma mais eficiente. Aproveite ao máximo os recursos disponíveis e comece a otimizar a sua presença nas redes sociais hoje mesmo.</p>
                        <p>Se precisar de ajuda, não hesite em contactar-nos.</p>
                        <p>Com os melhores cumprimentos,<br>Equipa Social Sync</p>
                      </div>
                      <div class="footer">
                        <p>&copy; 2024 Social Sync. Todos os direitos reservados.</p>
                      </div>
                    </div>
                  </body>
                </html>
              `,
            };

            await sendEmail(emailData.subject, emailData.text, emailData.html);
          }
        }
      }

      return token;
    },

    async session(params) {
      const { session, token } = params;

      // Associamos o ID do utilizador da nossa tabela à sessão para poder vincular as contas posteriormente ao fazer login
      // quando fazemos a chamada para auth

      session.userId = token.userId as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
