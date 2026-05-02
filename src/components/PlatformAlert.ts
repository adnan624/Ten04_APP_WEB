// Fallback stub — resolved only if neither .web.ts nor .native.ts match
const showPlatformAlert = (title: string, message: string): void => {
  console.log(`[Alert] ${title}: ${message}`);
};
export default showPlatformAlert;
