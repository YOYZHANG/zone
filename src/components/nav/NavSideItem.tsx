import { Link } from "react-router-dom"
// import {CommonTooltip} from '../common/CommonToolTip'

interface Props {
  to: string
  icon: string
  text: string
}

export const NavSideItem: React.FC<Props> = ({to, icon, text}) => {
  return (
    <Link to={to}>
      {/* <CommonTooltip disabled="false" content="text" placement="right"> */}
        <div className="flex w-fit px2 mx3 lg:mx0 lg:px5 py2 gap4 items-center transition-100 rounded-full hover:bg-active group-focus-visible:ring-2 group-focus-visible:ring-current">
          <div className={`${icon} text-xl`}></div>
          <span className="block sm:hidden lg:block">{ text }</span>
        </div>
      {/* </CommonTooltip> */}
    </Link>
  )
}
