import React, {ChangeEvent, RefObject} from 'react';

type ChangesInputsPropsType = {
  error: string
  setError: (value: string) => void
  setNewPhoto: (value: string) => void
  setFileData: (file: FormData) => void
  inputRef: RefObject<HTMLInputElement>
}

export const InputFile: React.FC<ChangesInputsPropsType> = (
  {
    error,
    setError,
    setNewPhoto,
    setFileData,
    inputRef
  }
) => {

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (error) setError('');
    const newFile = e.target.files && e.target.files[0];
    // if (newFile && newFile.size > 1048576) { // photo size validation
    //   return setError('The size of the photo is not more than 1MB');
    // }

    if (newFile) {
      const reader = new FileReader();
      const formData = new FormData(); // for send to back
      reader.onloadend = () => setNewPhoto(reader.result as string);
      formData.append('image', newFile, newFile.name);
      setFileData(formData);
      reader.readAsDataURL(newFile);
    }
  }

  return (
    <>
      <input ref={inputRef} type='file'
             style={{display: 'none'}}
             onChange={upload}/>
    </>
  );
};
