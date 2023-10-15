/**
 * NODE_ENV
 * 启动参数, 判断是以开发模式还是生产环境做打包和执行
 */
export const BootEnv: string | 'development' | 'production' = process.env.NODE_ENV!;
/**
 * BASE_ENV
 * 业务参数, 判断环境是开发,测试或生产的部署
 */
export const BizEnv: string | 'dev' | 'test' | 'prod' = process.env.BASE_ENV!;
