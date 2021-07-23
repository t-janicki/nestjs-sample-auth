import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async encodePassword(unencryptedPassword: string) {
    return await bcrypt.hash(unencryptedPassword, 10);
  }

  async matchesPassword(
    unencryptedPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(unencryptedPassword, encryptedPassword);
  }
}
