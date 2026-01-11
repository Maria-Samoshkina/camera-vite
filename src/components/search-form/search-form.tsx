import { useRef, useState, useEffect } from 'react';
import { Cameras } from '../../types/camera';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/catalog/cameras-selectors';
import { AppRoute, MIN_SEARCH_LENGTH } from '../../const';
import { Link, useNavigate } from 'react-router-dom';


function SearchForm (): JSX.Element {

  const cameras = useAppSelector(getCameras);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const [filteredCamerasByName, setFilteredCamerasByName] = useState<Cameras>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('.form-search__select-item');
      const selectedItem = items[selectedIndex] as HTMLElement;
      selectedItem?.focus();
    }
  }, [selectedIndex]);


  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);

    if(value.length < MIN_SEARCH_LENGTH){

      setIsDropDownOpen(false);
      setFilteredCamerasByName([]);
      return;
    }

    const filteredCameras = cameras.filter((camera)=> camera.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    setFilteredCamerasByName(filteredCameras);
    setIsDropDownOpen(filteredCameras.length > 0);
  };

  const handleClearButtonClick = ()=> {
    if(searchQuery){
      setSearchQuery('');
      setIsDropDownOpen(false);
      setSelectedIndex(-1);

    }
  };

  const handleSearchInputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement | HTMLLIElement>) => {
    if (!isDropdownOpen || filteredCamerasByName.length === 0) {
      return;
    }

    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCamerasByName.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        evt.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        evt.preventDefault();
        if (selectedIndex >= 0) {
          navigate(`${AppRoute.Camera}/${filteredCamerasByName[selectedIndex].id}`);
          setSearchQuery('');
          setIsDropDownOpen(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setIsDropDownOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
        break;
    }
  };


  return (
    <div className={`form-search ${(isDropdownOpen || searchQuery.length > 0) ? 'list-opened' : ''}`}>
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text" autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchQuery}
            onChange={(evt)=> handleSearchInputChange(evt.target.value)}
            onKeyDown={handleSearchInputKeyDown}
            ref={inputRef}

          />
        </label>

        {isDropdownOpen && (
          <ul
            className="form-search__select-list scroller"
            ref={dropdownRef}
          >
            {filteredCamerasByName.map((camera, index)=>
              (
                <li
                  key = {camera.id}
                  className={`form-search__select-item ${index === selectedIndex ? 'is-active' : ''}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  tabIndex={0}
                  onFocus={() => setSelectedIndex(index)}
                  onKeyDown={handleSearchInputKeyDown}
                >
                  <Link
                    to={`${AppRoute.Camera}/${camera.id}`}
                    className="form-search__select-link"
                    onClick={() => {
                      setSearchQuery('');
                      setIsDropDownOpen(false);
                      setSelectedIndex(-1);
                    }}
                  >
                    {camera.name}
                  </Link>
                </li>
              ))}
          </ul>
        )}

      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleClearButtonClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>

    </div>
  );
}

export default SearchForm;
