import { Menu, MenuItem } from '@szhsin/react-menu'
import { BsSearch } from 'react-icons/bs'

export default function Header({
  searchQuery,
  dispatch,
  userAvatar,
  userFirstLetter,
  signOut,
}) {
  return (
    <div className='app-header'>
      <input
        type='text'
        className='app-header__search'
        placeholder="Search by user's name, email, company name or location"
        aria-label='search'
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
        }
      />
      <BsSearch className='app-header__search__icon'></BsSearch>
      <div className='app-header__user'>
        <Menu
          menuButton={
            userAvatar ? (
              <img src={userAvatar} className='app-header__user__avatar'></img>
            ) : (
              <div className='app-header__user__avatar__placeholder'>
                {userFirstLetter}
              </div>
            )
          }
          transition
          className='app-header__user__user-menu user-menu'
        >
          <MenuItem
            className='app-header__user__user-menu__item'
            onClick={signOut}
          >
            Log out
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}
