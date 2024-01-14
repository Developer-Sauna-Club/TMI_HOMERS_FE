import { getKeyByValue } from './getKeyByValue';

describe('getKeyByValue 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: 'B',
      c: 'C',
    };

    expect(getKeyByValue(obj, 'A')).toEqual('a');
  });

  it('obj에 없는 키의 값을 입력하면 null을 반환한다', () => {
    const obj = {
      a: 'A',
      b: 'B',
      c: 'C',
    };

    expect(getKeyByValue(obj, '')).toEqual(null);
  });
});
