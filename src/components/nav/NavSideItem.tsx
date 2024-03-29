import { Link } from "react-router-dom"
import classNames from "classnames"
import { useUserStore } from "../../store/user"
// import {CommonTooltip} from '../common/CommonToolTip'


interface Props {
  to: string
  icon: string
  text: string
  isUserOnly: boolean
}

export const NavSideItem: React.FC<Props> = ({to, icon, text, isUserOnly}) => {
  const {currentUser} = useUserStore()
  return (
    <div className={classNames({
      'pointer-events-none': !currentUser && isUserOnly
    })}>
      <Link to={to}>
        {/* <CommonTooltip disabled="false" content="text" placement="right"> */}
          <div className={classNames(
            "flex w-fit px2 mx3 lg:mx0 lg:px5 py2 gap4 items-center transition-100 rounded-full hover:bg-active group-focus-visible:ring-2 group-focus-visible:ring-current", {
              'op-50': !currentUser && isUserOnly,
          })}>
            <div className={`${icon} text-xl`}></div>
            <span className="block sm:hidden lg:block">{ text }</span>
          </div>
        {/* </CommonTooltip> */}
      </Link>
    </div>
  )
}
