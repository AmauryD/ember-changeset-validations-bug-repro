import { helper } from '@ember/component/helper';

export default helper(function json([arg] /*, named*/) {
  return JSON.stringify(arg);
});
