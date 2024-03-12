interface Props {}

export const SearchResultSkeleton: React.FC<Props> = () => {
  return (
    <div className="px-4 py-3 flex gap-4">
      <div className="w-12 h-12 rounded-full skeleton-loading-bg"></div>
      <div className="flex flex-col flex-1 gap-2 pb2 min-w-0">
        <div className="flex h-6 rounded skeleton-loading-bg"></div>
        <div className="flex h-4 rounded skeleton-loading-bg"></div>
      </div>
    </div>
  )
}
