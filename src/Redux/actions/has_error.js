export const ERROR_SET = 'ERROR_SET';
export const ERROR_CLEAR = 'ERROR_CLEAR';

export function errorSet(text){
  return {
    type: ERROR_SET,
    errorText: text
  }
}

export function errorClear(){
  return {
    type: ERROR_CLEAR
  }
}