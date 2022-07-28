import React, {useState} from 'react';
import s from "./SearchUsers.module.scss";
import {InputText} from "../../../../sc1-main/m1-ui/common/components/InputText/InputText";
import {Button} from "../../../../sc1-main/m1-ui/common/components/Button/Button";
import {getUsersDataTC, setCurrentPageAC} from "../../bll/usersReducer";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";


type SearchUsersPropsType = {
  search: string
  setSearch: (value: string) => void
}

export const SearchUsers: React.FC<SearchUsersPropsType> = (
  {
    search,
    setSearch,
  }
) => {

  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);


  const searchChangeHandler = (value: string) => {
    value && setError(null);
    setSearch(value);
  }

  const searchPressHandler = () => {
    if (search === "") {
      setError("name is required");
    } else {
      dispatch(getUsersDataTC(search));
    }
  }

  const resetHandler = () => {
    setSearch('');
    dispatch(setCurrentPageAC(1));
  }

  return (
    <div className={s.searchBlock}>
      <div className={s.inputSearch}>
        <InputText value={search}
                   onChangeText={searchChangeHandler}
                   placeholder='search by name'
                   error={error}
                   onEnter={searchPressHandler}/>
      </div>
      <div>
        <Button className={s.buttonSearch}
                onClick={searchPressHandler}>
          search</Button>
        {search && <Button className={s.buttonSearch}
                           color='delete'
                           onClick={resetHandler}>
          reset</Button>}
      </div>
    </div>
  );
};
