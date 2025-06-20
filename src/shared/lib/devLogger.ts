/**
 * 개발 환경에서만 콘솔 로깅을 수행하는 유틸리티입니다.
 * 프로덕션 빌드에서는 모든 로그가 무시됩니다.
 */
class DevLogger {
  private isDev = process.env.NODE_ENV === "development";

  log(...args: unknown[]) {
    if (this.isDev) {
      console.log(...args);
    }
  }

  warn(...args: unknown[]) {
    if (this.isDev) {
      console.warn(...args);
    }
  }

  error(...args: unknown[]) {
    if (this.isDev) {
      console.error(...args);
    }
  }

  info(...args: unknown[]) {
    if (this.isDev) {
      console.info(...args);
    }
  }

  debug(...args: unknown[]) {
    if (this.isDev) {
      console.debug(...args);
    }
  }
}

export const devLogger = new DevLogger();
