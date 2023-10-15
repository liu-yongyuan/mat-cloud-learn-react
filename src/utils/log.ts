import { ComponentName, getPrefix } from './component-interface';
import { BizEnv } from './env';

export const logStandPrefix = `[mat-log] [biz-env: ${BizEnv}] [${new Date().toLocaleString()}]`;

const log = (cname: ComponentName, ...args: any) => {
  if (BizEnv === 'prod') {
    return;
  }
  console.log(logStandPrefix, `[${getPrefix(cname)}]`, ...args);
};

export { log };
