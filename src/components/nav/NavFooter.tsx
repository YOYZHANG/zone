import { CommonTooltip } from "../common/CommonTooltip"

export const NavFooter: React.FC = () => {
  return (
    <footer className="p4 text-sm text-secondary-light flex flex-col">
      <div className="flex flex-gap2 items-center mb4">
        <CommonTooltip content="toggle theme">
          <button flex i-ri:sun-line dark:i-ri:moon-line text-lg :aria-label="$t('nav_footer.toggle_theme')" @click="toggleDark()" />
        </CommonTooltip>
      </div>
    </footer>
  )
}
