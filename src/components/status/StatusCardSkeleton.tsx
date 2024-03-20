interface Props {
}

export const StatusCardSkeleton: React.FC<Props> = () => {
  return (
    <div className="flex flex-col gap-2 px-4 py-3">
      <div className="flex gap-4">
        <div>
          <div className="w-12 h-12 rounded-full skeleton-loading-bg" />
        </div>
        <div className="flex flex-col flex-1 gap2 pb2 min-w-0">
          <div className="flex skeleton-loading-bg h-5 w-20 rounded"/>
          <div className="flex skeleton-loading-bg h-5 w-full rounded" />
          <div className="flex skeleton-loading-bg h-5 w-4/5 rounded" />
          <div className="flex skeleton-loading-bg h-5 w-2/5 rounded" />
        </div>
      </div>
    </div>
  )
}
