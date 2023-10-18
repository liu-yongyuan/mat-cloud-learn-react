import { ComponentName, getPrefix } from './component-interface';
import { BaseEnv } from './env';

export const logStandPrefix = `[mat-log] [biz-env: ${BaseEnv}] [${new Date().toLocaleString()}]`;

const log = (cname: ComponentName, ...args: any) => {
  if (BaseEnv === 'prod') {
    return;
  }
  console.log(logStandPrefix, `[${getPrefix(cname)}]`, ...args);
};

export { log };
