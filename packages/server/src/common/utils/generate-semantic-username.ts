const DEFAULT_USERNAME_PREFIX = 'user';

/**
 * 根据 target 生成不重复的、由字母和数字组成的 username
 * @param target 邮箱或手机号
 * @returns
 */
export const generateSemanticUsername = (target: string) => {
  return `${DEFAULT_USERNAME_PREFIX}_${target.replace(/\W+/g, '')}`;
};
