import { e as useNuxtApp } from '../server.mjs';

const useDayjs = () => {
  const { $dayjs: dayjs } = useNuxtApp();
  return dayjs;
};

export { useDayjs as u };
//# sourceMappingURL=dayjs-3b727b6b.mjs.map
