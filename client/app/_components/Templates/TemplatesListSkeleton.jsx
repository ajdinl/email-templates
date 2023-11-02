import {
  BiUpArrowAlt,
  BiDownArrowAlt,
  Menu,
} from '@app/_components/ExternalComponents'
export default function TemplatesListSkeleton({ templatesLength }) {
  return (
    <>
      <table className='application__content__list reduceVisibility'>
        <thead className='application__content__list__header'>
          <tr className='application__content__list__header__row'>
            <th className='application__content__list__header__cell'>
              <div className='application__content__list__header__cell__items'>
                <div className='application__content__list__header__cell__items__title'>
                  Name
                </div>
                <div>
                  <div
                    className={`application__content__list__header__cell__items__arrowup`}
                  >
                    <BiUpArrowAlt></BiUpArrowAlt>
                  </div>
                  <div
                    className={`application__content__list__header__cell__items__arrowdown`}
                  >
                    <BiDownArrowAlt></BiDownArrowAlt>
                  </div>
                </div>
              </div>
            </th>
            <th className='application__content__list__header__cell'>
              <div className='application__content__list__header__cell__items'>
                <div className='application__content__list__header__cell__items__title'>
                  Last Modified By
                </div>
                <div>
                  <div
                    className={`application__content__list__header__cell__items__arrowup`}
                  >
                    <BiUpArrowAlt></BiUpArrowAlt>
                  </div>
                  <div
                    className={`application__content__list__header__cell__items__arrowdown`}
                  >
                    <BiDownArrowAlt></BiDownArrowAlt>
                  </div>
                </div>
              </div>
            </th>
            <th className='application__content__list__header__cell'>
              <div className='application__content__list__header__cell__items'>
                <div className='application__content__list__header__cell__items__title'>
                  Last Modified On
                </div>
                <div>
                  <div
                    className={`application__content__list__header__cell__items__arrowup`}
                  >
                    <BiUpArrowAlt></BiUpArrowAlt>
                  </div>
                  <div
                    className={`application__content__list__header__cell__items__arrowdown`}
                  >
                    <BiDownArrowAlt></BiDownArrowAlt>
                  </div>
                </div>
              </div>
            </th>
            <th className='application__content__list__header__cell'></th>
          </tr>
        </thead>
        <tbody className='application__content__list__items'>
          {[...Array(templatesLength).keys()].map((index) => {
            return (
              <tr
                className='application__content__list__items__row'
                key={index}
              >
                <td className='application__content__list__items__cell name'>
                  <span>Template</span>
                </td>
                <td className='application__content__list__items__cell'>
                  Username
                </td>
                <td className='application__content__list__items__cell'>
                  <div>01/01/23 @ 1:11 pm</div>
                </td>
                <td className='application__content__list__items__cell'>
                  <Menu
                    menuButton={
                      <div className='application__content__list__items__cell__button'>
                        <p className='application__content__list__items__cell__button__text'>
                          Actions
                        </p>
                        <span>&gt;</span>
                      </div>
                    }
                    transition
                  ></Menu>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
