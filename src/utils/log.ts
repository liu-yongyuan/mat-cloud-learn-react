import { ComponentName } from './component-interface';
import { BaseEnv } from './env';
import { getPrefix } from './global-tools';

export const logStandPrefix = `[mat-log] [biz-env: ${BaseEnv}] [${new Date().toLocaleString()}]`;

const log = (cname: ComponentName, ...args: any) => {
  if (BaseEnv === 'prod') {
    return;
  }
  console.log(logStandPrefix, `[${getPrefix(cname.prefix, cname.name)}]`, ...args);
};

export { log };
