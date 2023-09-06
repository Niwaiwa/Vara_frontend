
const getDuration = (timestamp: number) => {
    const now = Date.now();
    const elapsed = now - timestamp;

    if (elapsed < 60000) {
      return Math.floor(elapsed / 1000) + '秒前';
    } else if (elapsed < 3600000) {
      return Math.floor(elapsed / 60000) + '分前';
    } else if (elapsed < 86400000) {
      return Math.floor(elapsed / 3600000) + '時間前';
    } else if (elapsed < 2592000000) {
      return Math.floor(elapsed / 86400000) + '日前';
    } else if (elapsed < 31536000000) {
      return Math.floor(elapsed / 2592000000) + 'ヶ月前';
    } else {
      return Math.floor(elapsed / 31536000000) + '年前';
    }
};

export { getDuration };