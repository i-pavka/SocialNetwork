export type ErrorType = {
  fullName?: string
  aboutMe?: string
  lookingForAJobDescription?: string
  facebook?: string
  website?: string
  vk?: string
  twitter?: string
  instagram?: string
  youtube?: string
  github?: string
  mainLink?: string
}

const buildFinalObj = (array: string[]) => {
  const resultObj: {[key: string]: string} = {};
  const pattern = ['aboutMe', 'fullName', 'lookingForAJobDescription'];
  for (let index = 0; index < array.length; index++) {
    const element: string = array[index];
    if (pattern.includes(element)) {
      resultObj[element] = 'Field is required';
    } else {
      resultObj[element] = 'Invalid url format';
    }
  }
  return resultObj;
}
export const makeErrorObject = (array: string[]) => {
  const result = [];
  const regExp = /\(([^)]+)\)/;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const regResult = regExp.exec(element)![1].replace('Contacts->', '');
    result.push(`${regResult[0].toLocaleLowerCase()}${regResult.slice(1)}`);
  }
  return buildFinalObj(result);
}

