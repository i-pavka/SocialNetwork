
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('urlAva');
    if (serializedState === null) {
      return;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
  }
};

export const saveState = (url: string) => {
  try {
    if(!loadState()) {
      const serializedState = JSON.stringify(url);
      localStorage.setItem('urlAva', serializedState);
    }

  } catch (err) {
    console.log(err);
  }
};

export const clearState = () => {
  localStorage.clear();
};