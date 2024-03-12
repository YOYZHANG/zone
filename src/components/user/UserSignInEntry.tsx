export const UserSignInEntry: React.FC = () => {
  const currentServer = 'mastodon.social'
  return (<>
    <div className="hidden lg:block">
      <div className="p8 flex flex-col gap4">
        <p className="text-sm">
          Viewing <strong>{currentServer}</strong> public data
        </p>
        <p className="text-sm text-secondary">
          Add an existing account
        </p>
        <button className="btn-solid text-center">
          Sign in
        </button>
      </div>
    </div>
  </>)
}
