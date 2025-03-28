import type { IAuthService } from "@/server/applications/interfaces/services/applications";
import type {
  AuthSession,
  ISessionService,
} from "@/server/applications/interfaces/services/infrastructure";
import type {
  IPlayerRepository,
  IStaffRepository,
} from "@/server/domain/interfaces/repositories";

export class AuthService implements IAuthService {
  constructor(
    private readonly playerRepo: IPlayerRepository,
    private readonly staffRepo: IStaffRepository,
    private readonly sessionService: ISessionService,
  ) {}

  async authPlayer(): Promise<AuthSession> {
    const session = await this.sessionService.getSession();
    if (!session) {
      throw new AuthError("user is unauthenticated", session);
    }
    const player = await this.playerRepo.getByUserId({
      userId: session.user.id,
    });
    if (!player) {
      throw new AuthError("user is not a player", session);
    }
    return { ...session, user: { ...session.user, playerId: player.id } };
  }

  async authStaff(): Promise<AuthSession> {
    const session = await this.sessionService.getSession();
    if (!session) {
      throw new AuthError("user is unauthenticated", session);
    }
    const staff = await this.staffRepo.getByUserId({ userId: session.user.id });
    if (!staff) {
      throw new AuthError("user is not a staff", session);
    }
    return { ...session, user: { ...session.user, staffId: staff.id } };
  }
}

class AuthError extends Error {
  constructor(
    message: string,
    readonly session: AuthSession | null,
  ) {
    super(message);
  }
}
