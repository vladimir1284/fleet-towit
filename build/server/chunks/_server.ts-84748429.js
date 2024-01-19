import { e as deleteUser } from './admin-92ee4c14.js';
import './sentry-release-injection-file-4a7720ec.js';
import './prisma-50863289.js';
import '@prisma/client';
import '@auth/core/providers/email';

const DELETE = async ({ params }) => {
  try {
    await deleteUser({ companyUserId: params.userId || "" });
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response("Deletion failed", { status: 400 });
  }
};

export { DELETE };
//# sourceMappingURL=_server.ts-84748429.js.map
