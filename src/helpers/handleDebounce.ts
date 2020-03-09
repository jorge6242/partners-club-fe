import _ from 'lodash'

const handleDebounce = (handler: any, time: number) => _.flowRight(
  _.debounce(handler, time),
  _.property('')
);

export default handleDebounce;