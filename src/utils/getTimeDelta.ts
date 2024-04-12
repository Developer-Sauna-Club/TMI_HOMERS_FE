export const getTimeDelta = (postedDate: string) => {
  const dt = new Date(postedDate);
  const now = new Date();
  const diff = now.getTime() - dt.getTime();

  if (isNaN(diff)) {
    return '알 수 없음';
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  let result = '';

  switch (true) {
    case seconds < 60:
      result = `방금 전`;
      break;
    case minutes < 60:
      result = `${minutes}분 전`;
      break;
    case hours < 24:
      result = `${hours}시간 전`;
      break;
    case days < 30:
      result = `${days}일 전`;
      break;
    case months < 12:
      result = `${months}달 전`;
      break;
    default:
      result = `${years}년 전`;
  }

  return result;
};
