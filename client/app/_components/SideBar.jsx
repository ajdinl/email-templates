import Link from 'next/link'
import {
  BsFillSendFill,
  BsFillPersonFill,
  BsInbox,
  MdEmail,
  RxExit,
} from '@app/_components/ExternalComponents'

export default function SideBar() {
  return (
    <div className='app-sidebar'>
      <div className='app-sidebar__upper'>
        <Link href='/'>
          <MdEmail className='app-sidebar__upper__logo'></MdEmail>
        </Link>
        <ul>
          <li>
            <BsFillPersonFill className='app-sidebar__upper__icon1'></BsFillPersonFill>
          </li>
          <li>
            <BsFillSendFill className='app-sidebar__upper__icon2'></BsFillSendFill>
          </li>
          <li>
            <BsInbox className='app-sidebar__upper__icon3'></BsInbox>
          </li>
        </ul>
      </div>
      <div className='app-sidebar__lower'>
        <ul>
          <li>
            <RxExit className='app-sidebar__upper__icon4'></RxExit>
          </li>
        </ul>
      </div>
    </div>
  )
}
